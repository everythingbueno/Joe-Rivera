import React, { useState } from 'react';

interface ThankYouProps {
  onRestart: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ onRestart }) => {
  const [showContactOptions, setShowContactOptions] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-10">
       <header className="w-full max-w-4xl text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
          Thanks for watching!
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-400 opacity-0 animate-[fadeIn_0.5s_ease-out_1.6s_forwards]">
          I'm excited to start something together.
        </p>
      </header>
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            aria-label="Back to start"
          >
            Back to Start
          </button>
           <button
              onClick={() => setShowContactOptions(!showContactOptions)}
              className="bg-zinc-800 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-zinc-700 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              aria-label="Show contact options"
              aria-expanded={showContactOptions}
            >
              Contact Me
            </button>
        </div>
        
        {showContactOptions && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
               <a
                  href="mailto:heyjoeriovera@gmail.com"
                  className="bg-zinc-800 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-zinc-700 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
                  aria-label="Send an email to heyjoeriovera@gmail.com"
                >
                  Email
                </a>
                <a
                  href="https://www.instagram.com/heyjoerivera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-zinc-700 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
                  aria-label="Visit Instagram profile"
                >
                  Instagram
                </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYou;