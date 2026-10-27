import os
import re
import math
import shutil
import tempfile
import asyncio
from pathlib import Path
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import yt_dlp
import imageio_ffmpeg

app = FastAPI(title="LinkMate Video Downloader API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FFMPEG_PATH = imageio_ffmpeg.get_ffmpeg_exe()
TEMP_DIR = Path(tempfile.gettempdir()) / "linkmate_downloads"
TEMP_DIR.mkdir(parents=True, exist_ok=True)

DEFAULT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

YOUTUBE_EXTRACTOR_ARGS = {
    'youtube': {
        'player_client': ['android', 'ios', 'mweb', 'web']
    }
}

def format_bytes(size: Optional[int]) -> str:
    if not size or size <= 0:
        return "Unknown size"
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024:
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} TB"

def format_duration(seconds: Optional[int]) -> str:
    if not seconds:
        return "N/A"
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m}:{s:02d}"

def format_views(count: Optional[int]) -> str:
    if not count:
        return "N/A"
    if count >= 1_000_000_000:
        return f"{count / 1_000_000_000:.1f}B views"
    if count >= 1_000_000:
        return f"{count / 1_000_000:.1f}M views"
    if count >= 1_000:
        return f"{count / 1_000:.1f}K views"
    return f"{count} views"

def sanitize_filename(name: str) -> str:
    clean = re.sub(r'[\/\\:\*\?"<>\|]', '_', name)
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean[:80] or "video"

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "ffmpeg": bool(FFMPEG_PATH),
        "ffmpeg_path": FFMPEG_PATH
    }

@app.get("/api/info")
def get_video_info(url: str = Query(...)):
    url = url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="Please enter a valid video link.")

    if not (url.startswith("http://") or url.startswith("https://")):
        raise HTTPException(status_code=400, detail="URL must start with http:// or https://")

    ydl_opts = {
        'skip_download': True,
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False,
        'ffmpeg_location': FFMPEG_PATH,
        'socket_timeout': 20,
        'extractor_args': YOUTUBE_EXTRACTOR_ARGS,
        'http_headers': DEFAULT_HEADERS,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if not info:
                raise HTTPException(status_code=404, detail="Could not retrieve video information. The link may be private or restricted.")

            title = info.get('title') or "Video"
            thumbnail = info.get('thumbnail') or ""
            duration = format_duration(info.get('duration'))
            views = format_views(info.get('view_count'))
            uploader = info.get('uploader') or info.get('channel') or info.get('extractor_key') or "Web"
            webpage_url = info.get('webpage_url') or url
            
            raw_formats = info.get('formats', [])
            
            video_audio_opts = []
            audio_opts = []
            video_only_opts = []
            seen_res = set()

            for f in raw_formats:
                vcodec = f.get('vcodec') or 'none'
                acodec = f.get('acodec') or 'none'
                height = f.get('height')
                filesize = f.get('filesize') or f.get('filesize_approx') or 0
                format_id = f.get('format_id')
                ext = f.get('ext') or 'mp4'

                # Video + Audio progressive
                if vcodec != 'none' and acodec != 'none' and height:
                    res_key = f"{height}p"
                    if res_key not in seen_res:
                        seen_res.add(res_key)
                        badge = "4K" if height >= 2160 else ("2K" if height >= 1440 else ("HD" if height >= 720 else ""))
                        video_audio_opts.append({
                            "id": format_id,
                            "type": "video_audio",
                            "format": "MP4 (Video + Audio)",
                            "quality": f"{height}p",
                            "badge": badge,
                            "size": format_bytes(filesize) if filesize else "Direct Stream",
                            "ext": "mp4",
                        })

                # Audio only
                elif vcodec == 'none' and acodec != 'none':
                    abr = f.get('abr') or 128
                    audio_opts.append({
                        "id": format_id,
                        "type": "audio",
                        "format": "MP3 (Audio Only)",
                        "quality": f"{int(abr)} kbps",
                        "badge": "HQ" if abr >= 256 else "",
                        "size": format_bytes(filesize) if filesize else "High Quality",
                        "ext": "mp3",
                    })

                # Video only
                elif vcodec != 'none' and acodec == 'none' and height:
                    res_key = f"{height}p_vo"
                    if res_key not in seen_res and height in [360, 480, 720, 1080, 1440, 2160]:
                        seen_res.add(res_key)
                        video_only_opts.append({
                            "id": format_id,
                            "type": "video_only",
                            "format": "MP4 (Video Only)",
                            "quality": f"{height}p",
                            "badge": "No Audio",
                            "size": format_bytes(filesize) if filesize else "Direct Stream",
                            "ext": "mp4",
                        })

            def parse_res(opt):
                num = re.findall(r'\d+', opt.get('quality', ''))
                return int(num[0]) if num else 0

            video_audio_opts.sort(key=parse_res, reverse=True)
            video_only_opts.sort(key=parse_res, reverse=True)
            audio_opts.sort(key=parse_res, reverse=True)

            if not video_audio_opts:
                video_audio_opts = [
                    {
                        "id": "bestvideo[height<=1080]+bestaudio/best[height<=1080]/best",
                        "type": "video_audio",
                        "format": "MP4 (Video + Audio)",
                        "quality": "1080p",
                        "badge": "HD",
                        "size": "Auto Merge (High Def)",
                        "ext": "mp4",
                    },
                    {
                        "id": "bestvideo[height<=720]+bestaudio/best[height<=720]/best",
                        "type": "video_audio",
                        "format": "MP4 (Video + Audio)",
                        "quality": "720p",
                        "badge": "HD",
                        "size": "Standard HD",
                        "ext": "mp4",
                    },
                    {
                        "id": "bestvideo[height<=480]+bestaudio/best[height<=480]/best",
                        "type": "video_audio",
                        "format": "MP4 (Video + Audio)",
                        "quality": "480p",
                        "badge": "",
                        "size": "Medium",
                        "ext": "mp4",
                    }
                ]

            if not audio_opts:
                audio_opts = [
                    {
                        "id": "bestaudio/best",
                        "type": "audio",
                        "format": "MP3 (Audio Only)",
                        "quality": "320 kbps",
                        "badge": "HQ",
                        "size": "HQ Audio",
                        "ext": "mp3",
                    }
                ]

            selected_options = []
            if video_audio_opts:
                selected_options.append(video_audio_opts[0])
            if audio_opts:
                selected_options.append(audio_opts[0])
            if video_only_opts:
                selected_options.append(video_only_opts[0])
            elif len(video_audio_opts) > 1:
                selected_options.append(video_audio_opts[1])

            return {
                "title": title,
                "thumbnail": thumbnail,
                "duration": duration,
                "views": views,
                "uploader": uploader,
                "webpage_url": webpage_url,
                "options": selected_options,
                "all_video_audio": video_audio_opts,
                "all_audio": audio_opts,
                "all_video_only": video_only_opts
            }

    except Exception as e:
        error_msg = str(e)
        if "Unsupported URL" in error_msg:
            raise HTTPException(status_code=400, detail="This platform or URL is not supported. Please check the URL.")
        if "Private video" in error_msg:
            raise HTTPException(status_code=403, detail="This video is private, age-restricted, or requires login.")
        raise HTTPException(status_code=400, detail=f"Failed to fetch video: {error_msg}")

def cleanup_file(filepath: Path):
    try:
        if filepath.exists():
            filepath.unlink()
    except Exception:
        pass

@app.get("/api/download")
async def download_video(
    background_tasks: BackgroundTasks,
    url: str = Query(...),
    format_id: str = Query("best"),
    format_type: str = Query("video_audio"),
    quality: str = Query("auto"),
    bitrate: str = Query("320k")
):
    url = url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="URL cannot be empty")

    import uuid
    req_uuid = uuid.uuid4().hex[:8]
    out_template = str(TEMP_DIR / f"{req_uuid}_%(title).40s.%(ext)s")

    postprocessors = []

    if format_type == "audio":
        audio_kbps = re.findall(r'\d+', bitrate)
        chosen_bitrate = audio_kbps[0] if audio_kbps else "320"
        postprocessors.append({
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': chosen_bitrate,
        })
        ydl_format = 'bestaudio/best'
    else:
        if quality and quality.lower() != 'auto':
            num = re.findall(r'\d+', quality)
            h = num[0] if num else None
            if h:
                if format_type == "video_only":
                    ydl_format = f"bestvideo[height<={h}]/best[height<={h}]"
                else:
                    ydl_format = f"bestvideo[height<={h}][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<={h}]+bestaudio/best[height<={h}]/best"
            else:
                ydl_format = format_id if format_id and format_id not in ['best', 'auto'] else 'bestvideo+bestaudio/best'
        else:
            ydl_format = format_id if format_id and format_id not in ['best', 'auto'] else 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'

    ydl_opts = {
        'format': ydl_format,
        'outtmpl': out_template,
        'quiet': True,
        'no_warnings': True,
        'ffmpeg_location': FFMPEG_PATH,
        'socket_timeout': 40,
        'extractor_args': YOUTUBE_EXTRACTOR_ARGS,
        'http_headers': DEFAULT_HEADERS,
        'merge_output_format': 'mp4',
    }
    if postprocessors:
        ydl_opts['postprocessors'] = postprocessors

    try:
        loop = asyncio.get_event_loop()

        def execute_download():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                downloaded_file = ydl.prepare_filename(info)
                title = info.get('title') or "video"
                
                if format_type == "audio":
                    expected_mp3 = Path(downloaded_file).with_suffix(".mp3")
                    if expected_mp3.exists():
                        return str(expected_mp3), title
                
                expected_mp4 = Path(downloaded_file).with_suffix(".mp4")
                if expected_mp4.exists():
                    return str(expected_mp4), title

                return downloaded_file, title

        filepath, title = await loop.run_in_executor(None, execute_download)
        file_path = Path(filepath)

        if not file_path.exists():
            matched = list(TEMP_DIR.glob(f"{req_uuid}_*"))
            if matched:
                file_path = matched[0]
            else:
                raise HTTPException(status_code=500, detail="Downloaded media file could not be found.")

        clean_title = sanitize_filename(title)
        ext = file_path.suffix.lower() or (".mp3" if format_type == "audio" else ".mp4")
        client_filename = f"{clean_title}{ext}"

        background_tasks.add_task(cleanup_file, file_path)

        media_type = "audio/mpeg" if ext == ".mp3" else "video/mp4"

        return FileResponse(
            path=file_path,
            filename=client_filename,
            media_type=media_type,
            headers={
                "Content-Disposition": f'attachment; filename="{client_filename}"',
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Download error: {str(e)}")

DIST_DIR = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if DIST_DIR.exists():
    app.mount("/", StaticFiles(directory=str(DIST_DIR), html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.server:app", host="0.0.0.0", port=8000, reload=True)
