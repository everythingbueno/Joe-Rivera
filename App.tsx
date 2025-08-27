import React, { useState, useEffect } from 'react';
import CanvaEmbed from './components/CanvaEmbed';
import Welcome from './components/Welcome';
import ThankYou from './components/ThankYou';

type View = 'welcome' | 'presentation' | 'thankyou';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<View>('welcome');

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'presentation':
        return <CanvaEmbed onClose={() => setView('welcome')} onFinish={() => setView('thankyou')} />;
      case 'thankyou':
        return (
           <section className="flex-grow w-full flex items-center justify-center p-4">
             <ThankYou onRestart={() => setView('welcome')} />
           </section>
        );
      case 'welcome':
      default:
        return (
           <section className="flex-grow w-full flex items-center justify-center p-4">
             <Welcome onStart={() => setView('presentation')} />
           </section>
        );
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Aurora Effect Layer */}
      {(view === 'welcome' || view === 'thankyou') && (
        <div
          className="pointer-events-none absolute inset-0 z-0 animate-aurora"
          style={{
            background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, #c13584, transparent 80%)`,
          }}
        />
      )}

      {/* Content Layer */}
      <main className="relative z-10 flex h-full flex-col text-gray-200">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;