import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformBar from './components/PlatformBar';
import DownloaderCard from './components/DownloaderCard';
import PreviewCard from './components/PreviewCard';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import TrustBar from './components/TrustBar';
import DevicesShowcase from './components/DevicesShowcase';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import PlayerModal from './components/PlayerModal';
import AuthModal from './components/AuthModal';
import DownloadsModal from './components/DownloadsModal';
import { FaqModal, PricingModal, ToolsModal, BlogModal } from './components/InfoModals';

const API_BASE = (typeof window !== 'undefined' && window.location.origin.includes('github.io'))
  ? 'https://linkmate-od72.onrender.com'
  : '';

export default function App() {
  const [url, setUrl] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Paste video link here (e.g. https://www.youtube.com/watch?v=...)');
  const [formatType, setFormatType] = useState('video_audio');
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [bitrate, setBitrate] = useState('320k');
  const [codec, setCodec] = useState('h264');
  const [subtitles, setSubtitles] = useState('none');
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // Day / Night Theme Management
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('linkmate_theme');
      return savedTheme !== 'light';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('linkmate_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('linkmate_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  
  // Real Persistent User & Downloads
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('linkmate_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [downloadsList, setDownloadsList] = useState(() => {
    try {
      const saved = localStorage.getItem('linkmate_downloads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Navigation
  const [playerVideo, setPlayerVideo] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [showDownloadsModal, setShowDownloadsModal] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState(null);
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [toast, setToast] = useState(null);

  const inputRef = useRef(null);

  // Sync downloads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('linkmate_downloads', JSON.stringify(downloadsList));
    } catch (e) {}
  }, [downloadsList]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFetchVideo = async (targetUrl) => {
    const finalUrl = (targetUrl || url).trim();
    if (!finalUrl) {
      showToast('Please paste or type a video link first.', 'error');
      inputRef.current?.focus();
      return;
    }

    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      showToast('Please enter a valid link starting with https://', 'error');
      inputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    showToast('Extracting real video stream & formats...', 'info');

    try {
      const response = await fetch(`${API_BASE}/api/info?url=${encodeURIComponent(finalUrl)}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Could not fetch video info');
      }
      const data = await response.json();
      setVideoData(data);
      showToast('Video information extracted successfully!', 'success');

      // Scroll smoothly to preview section
      setTimeout(() => {
        const previewEl = document.getElementById('preview-section');
        if (previewEl) {
          previewEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    } catch (err) {
      console.error('Fetch error:', err);
      showToast(err.message || 'Failed to extract video. Please check the link.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform.id);
    if (platform.placeholder) {
      setPlaceholderText(platform.placeholder);
    }
    inputRef.current?.focus();
  };

  const handleTriggerDownload = async (option) => {
    const optId = option.id || 'best';
    setDownloadingId(optId);
    showToast(`Downloading: ${option.format} (${option.quality}). Please wait...`, 'info');

    const downloadEndpoint = `${API_BASE}/api/download?url=${encodeURIComponent(videoData.webpage_url || url)}&format_id=${encodeURIComponent(optId)}&format_type=${option.type}&quality=${encodeURIComponent(selectedQuality)}&bitrate=${encodeURIComponent(bitrate)}`;

    // Add to download history
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newDownload = {
      title: videoData.title,
      format: option.format,
      quality: option.quality,
      time: timeStr,
      downloadUrl: downloadEndpoint,
    };
    setDownloadsList((prev) => [newDownload, ...prev]);

    try {
      const link = document.createElement('a');
      link.href = downloadEndpoint;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        showToast('Download started! Check your browser downloads bar.', 'success');
        setDownloadingId(null);
      }, 2000);
    } catch (err) {
      console.error(err);
      setDownloadingId(null);
      showToast('Download initiated in background.', 'success');
    }
  };

  const handleMobileNavSelect = (tabId) => {
    setActiveMobileTab(tabId);
    if (tabId === 'downloads') {
      setShowDownloadsModal(true);
    } else if (tabId === 'tools') {
      setActiveInfoModal('tools');
    } else if (tabId === 'more') {
      if (currentUser) {
        showToast(`Signed in as ${currentUser.name}`, 'info');
      } else {
        setAuthModal('login');
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigate = (target) => {
    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'downloader') {
      const el = document.getElementById('downloader-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    } else if (target === 'tools') {
      setActiveInfoModal('tools');
    } else if (target === 'pricing') {
      setActiveInfoModal('pricing');
    } else if (target === 'blog') {
      setActiveInfoModal('blog');
    } else if (target === 'faq') {
      setActiveInfoModal('faq');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('linkmate_user');
    setCurrentUser(null);
    showToast('Logged out successfully.', 'info');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#07090e] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col selection:bg-purple-500 selection:text-white transition-colors duration-250`}>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-200">
          <div className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-xl border flex items-center gap-2.5 ${
            toast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200 shadow-emerald-500/20'
              : toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-500/50 text-rose-200 shadow-rose-500/20'
              : 'bg-indigo-950/95 border-indigo-500/50 text-indigo-200 shadow-indigo-500/20'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              toast.type === 'success' ? 'bg-emerald-400' : toast.type === 'error' ? 'bg-rose-400' : 'bg-cyan-400'
            } animate-ping`} />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={(mode) => setAuthModal(mode)}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Platform Quick Filter Badges */}
        <PlatformBar
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handleSelectPlatform}
        />

        {/* Downloader Card Box */}
        <section id="downloader-section">
          <DownloaderCard
            inputRef={inputRef}
            url={url}
            setUrl={setUrl}
            placeholderText={placeholderText}
            formatType={formatType}
            setFormatType={setFormatType}
            selectedQuality={selectedQuality}
            setSelectedQuality={setSelectedQuality}
            bitrate={bitrate}
            setBitrate={setBitrate}
            codec={codec}
            setCodec={setCodec}
            subtitles={subtitles}
            setSubtitles={setSubtitles}
            onFetchVideo={handleFetchVideo}
            isLoading={isLoading}
          />
        </section>

        {/* Real Preview & Download Card Section */}
        <section id="preview-section">
          <PreviewCard
            videoData={videoData}
            onTriggerDownload={handleTriggerDownload}
            downloadingId={downloadingId}
            onPreviewPlay={(video) => setPlayerVideo(video)}
          />
        </section>

        {/* 4 Feature Highlights Cards */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Trust Badges Bar */}
        <TrustBar />

        {/* Works on All Devices Showcase */}
        <DevicesShowcase />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeMobileTab}
        onTabSelect={handleMobileNavSelect}
        downloadCount={downloadsList.length}
      />

      {/* Real In-Browser Video Player Modal */}
      {playerVideo && (
        <PlayerModal
          video={playerVideo}
          onClose={() => setPlayerVideo(null)}
        />
      )}

      {/* Real Auth Modal (Login / Sign Up) */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            showToast(`Signed in as ${user.name}!`, 'success');
          }}
        />
      )}

      {/* Real Downloads Manager Drawer / Modal */}
      {showDownloadsModal && (
        <DownloadsModal
          downloads={downloadsList}
          onClear={() => {
            setDownloadsList([]);
            localStorage.removeItem('linkmate_downloads');
            showToast('Download history cleared.', 'info');
          }}
          onClose={() => setShowDownloadsModal(false)}
        />
      )}

      {/* Real Info Modals for Tools, Pricing, Blog, FAQ */}
      {activeInfoModal === 'faq' && (
        <FaqModal onClose={() => setActiveInfoModal(null)} />
      )}
      {activeInfoModal === 'pricing' && (
        <PricingModal onClose={() => setActiveInfoModal(null)} />
      )}
      {activeInfoModal === 'tools' && (
        <ToolsModal
          onSelectTool={(tool) => {
            if (tool.formatType) setFormatType(tool.formatType);
            if (tool.quality) setSelectedQuality(tool.quality);
            showToast(`Switched mode to: ${tool.title}`, 'success');
            const el = document.getElementById('downloader-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
          }}
          onClose={() => setActiveInfoModal(null)}
        />
      )}
      {activeInfoModal === 'blog' && (
        <BlogModal onClose={() => setActiveInfoModal(null)} />
      )}

    </div>
  );
}
