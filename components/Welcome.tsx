import React, { useState, useEffect } from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const PointerIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8 text-white">
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
    </svg>
);


const BASE_USER = "@heyjoerivera";
const SEARCH_KEYWORDS = [
    "Content",
    "Influencer",
    "Lifestyle",
    "Travel",
    "Photography",
    "Social Media",
    "Denver, Colorado",
    "Latin Creator",
];
const FINAL_TERM = "@heyjoerivera Content Creator Denver";

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  
  // State for robust animation
  const [animationPhase, setAnimationPhase] = useState('cycling'); // cycling, clicking, done
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [typedKeyword, setTypedKeyword] = useState('');

  useEffect(() => {
    let timeoutId: number;

    if (animationPhase === 'cycling') {
      const currentKeywordToType = SEARCH_KEYWORDS[keywordIndex];
      if (typedKeyword.length < currentKeywordToType.length) {
        // Continue typing the current keyword
        timeoutId = window.setTimeout(() => {
          setTypedKeyword(currentKeywordToType.slice(0, typedKeyword.length + 1));
        }, 120);
      } else {
        // Finished typing, pause before next action
        timeoutId = window.setTimeout(() => {
          if (keywordIndex < SEARCH_KEYWORDS.length - 1) {
            // Move to the next keyword
            setKeywordIndex(prevIndex => prevIndex + 1);
            setTypedKeyword('');
          } else {
            // All keywords have been typed, move to the next phase
            setAnimationPhase('clicking');
          }
        }, 500); // Pause for 500ms
      }
    } else if (animationPhase === 'clicking') {
      // Wait for the click animation to finish, then move to the 'done' phase
      timeoutId = window.setTimeout(() => {
        setAnimationPhase('done');
      }, 800); // Duration of the click animation
    }

    // Cleanup timeout on component unmount or state change
    return () => clearTimeout(timeoutId);
  }, [animationPhase, keywordIndex, typedKeyword]);

  const showCursor = animationPhase === 'cycling';

  return (
    <div className="flex flex-col items-center justify-center text-center gap-10">
       <header className="w-full max-w-4xl text-center flex flex-col items-center gap-2">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
          Hospitality
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          Content Creation
        </h1>
        <div className="mt-4 w-full max-w-2xl opacity-0 animate-[fadeIn_0.5s_ease-out_2s_forwards]">
            <div className="relative">
                <div className={`flex w-full items-center gap-2 bg-zinc-900/50 border border-zinc-700 rounded-full pl-4 pr-16 py-2 text-lg`}>
                    <SearchIcon />
                    <div className="flex-1 flex justify-center items-center h-7 whitespace-nowrap overflow-hidden">
                       {animationPhase !== 'done' ? (
                          <p>
                            <span className="text-gray-300">{BASE_USER}</span>
                            <span
                                className={`text-white ml-2 whitespace-nowrap border-r-2 ${
                                showCursor
                                    ? 'border-r-white/75 animate-[blink_1s_step-end_infinite]'
                                    : 'border-r-transparent'
                                }`}
                            >
                                {typedKeyword}
                            </span>
                          </p>
                        ) : (
                          <span className="inline-block opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                            {FINAL_TERM}
                          </span>
                        )}
                    </div>
                </div>

                {animationPhase === 'clicking' && (
                  <div className="absolute inset-y-0 right-5 flex items-center animate-[cursorEnter_0.5s_ease-out_forwards]">
                    <div className="animate-[cursorClick_0.3s_ease-in-out_0.5s_forwards]">
                      <PointerIcon />
                    </div>
                  </div>
                )}
            </div>
        </div>
      </header>
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            aria-label="Start the presentation"
          >
            Start Presentation
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

export default Welcome;