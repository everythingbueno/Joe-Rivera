import React, { useState, useRef } from 'react';

// Icons
const ArrowLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const FullscreenIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
    </svg>
);


interface CanvaEmbedProps {
  onClose: () => void;
  onFinish: () => void;
}

const CanvaEmbed: React.FC<CanvaEmbedProps> = ({ onClose, onFinish }) => {
  const TOTAL_SLIDES = 5;
  const [currentSlide, setCurrentSlide] = useState(1);
  const canvaEmbedUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const handleFullScreen = () => {
      if (!containerRef.current) return;
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black w-screen h-screen">
        <iframe
          key={currentSlide}
          loading="lazy"
          className="w-full h-full border-0"
          src={`https://www.canva.com/design/DAGwfJKEK04/Cko04Mmuxw5-nE6JmB-0sw/view?embed#${currentSlide}`}
          allowFullScreen
          allow="fullscreen"
          title="Hospitality Content Creation Presentation"
        >
        </iframe>
        
        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 z-[60] flex items-center gap-3">
            <a 
                href={canvaEmbedUrl} 
                download="presentation.pdf"
                className="p-3 bg-gray-800/50 rounded-full text-white backdrop-blur-sm hover:bg-gray-700/70 transition-all duration-300"
                aria-label="Download presentation"
            >
                <DownloadIcon />
            </a>
             <button
                onClick={handleFullScreen}
                className="p-3 bg-gray-800/50 rounded-full text-white backdrop-blur-sm hover:bg-gray-700/70 transition-all duration-300"
                aria-label="Toggle fullscreen"
            >
                <FullscreenIcon />
            </button>
             <button
                onClick={onClose}
                className="p-3 bg-gray-800/50 rounded-full text-white backdrop-blur-sm hover:bg-gray-700/70 transition-all duration-300"
                aria-label="Close presentation"
            >
                <CloseIcon />
            </button>
        </div>

        {/* Left Arrow */}
        <button
            onClick={handlePrev}
            disabled={currentSlide === 1}
            className="absolute top-1/2 left-4 z-[60] -translate-y-1/2 p-3 bg-gray-800/50 rounded-full text-white backdrop-blur-sm hover:bg-gray-700/70 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
        >
           <ArrowLeftIcon />
        </button>

         {/* Right Arrow */}
        <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 z-[60] -translate-y-1/2 p-3 bg-gray-800/50 rounded-full text-white backdrop-blur-sm hover:bg-gray-700/70 transition-all duration-300"
            aria-label="Next slide"
        >
            <ArrowRightIcon />
        </button>
    </div>
  );
};

export default CanvaEmbed;