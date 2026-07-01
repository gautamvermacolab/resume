import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'content'>('intro');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 4 seconds ka G★ animation
    const introTimer = setTimeout(() => {
      setPhase('content');
    }, 4000);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    // Content aane ke baad smooth fade-in aur scale-up effect
    if (phase === 'content') {
      const popupTimer = setTimeout(() => {
        setShowPopup(true);
      }, 50); 
      return () => clearTimeout(popupTimer);
    }
  }, [phase]);

  return (
    <div className="bg-[#0b0b0e] min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden font-sans select-none text-white">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@900&family=Inter:wght@400;700;800&display=swap');
        
        .font-gta { font-family: 'Syncopate', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        /* G★ Intro Animation Styles */
        .g-outline {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.15);
        }
        .g-shine {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.9);
          -webkit-mask-image: linear-gradient(to bottom, transparent 40%, black 50%, transparent 60%);
          -webkit-mask-size: 100% 300%;
          -webkit-mask-repeat: no-repeat;
          animation: sweep 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes sweep {
          0% { -webkit-mask-position: 0 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { -webkit-mask-position: 0 100%; opacity: 0; }
        }
      `}</style>

      {/* --- PHASE 1: G★ ANIMATION (0 to 4 Seconds) --- */}
      {phase === 'intro' && (
        <div className="relative font-gta flex items-center justify-center">
          <div className="g-outline text-8xl md:text-[150px] font-black relative">
            G
            <span className="absolute bottom-[0.1em] right-[-0.25em] text-[0.4em] leading-none">★</span>
          </div>
          <div className="g-shine text-8xl md:text-[150px] font-black absolute top-0 left-0 w-full h-full">
            G
            <span className="absolute bottom-[0.1em] right-[-0.25em] text-[0.4em] leading-none">★</span>
          </div>
        </div>
      )}

      {/* --- PHASE 2: MAIN WEBSITE CONTENT --- */}
      {phase === 'content' && (
        <div className="w-full min-h-screen flex flex-col relative font-inter">
          
          {/* Top Navbar */}
          <nav className="w-full flex justify-between items-center p-6 md:px-12 absolute top-0 left-0 z-50">
            <div className="font-gta text-2xl font-black tracking-widest">VI</div>
            {/* Hamburger Menu Icon */}
            <div className="w-8 h-6 flex flex-col justify-between cursor-pointer">
              <span className="w-full h-1 bg-white rounded"></span>
              <span className="w-full h-1 bg-white rounded"></span>
            </div>
          </nav>

          {/* Main Hero Container - Width reduced from 1200px to 1050px */}
          <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-12 w-full max-w-[1050px] mx-auto">
            
            <div 
              className={`
                w-full transition-all duration-[1500ms] ease-out will-change-transform flex flex-col md:block
                ${showPopup ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}
              `}
            >
              
              {/* MOBILE ONLY: Top Text */}
              <div className="md:hidden text-center mb-6">
                <h2 className="font-extrabold text-xl tracking-widest uppercase leading-tight">Coming</h2>
                <h2 className="font-extrabold text-xl tracking-widest uppercase leading-tight">November 19, 2026</h2>
              </div>

              {/* Responsive Image Container */}
              <div className="w-full shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/5 rounded-[4px] overflow-hidden bg-black">
                {/* Desktop Wide Image - Fixed height class to max-h-[65vh] */}
                <img 
                  src="src/assets/image/7wonder.png" 
                  alt="7 Wonders Layout" 
                  className="hidden md:block w-full h-auto max-h-[65vh] object-contain"
                  loading="eager"
                />
                
                {/* Mobile Square/Portrait Image */}
                <img 
                  src="src/assets/image/7wonder2.png" 
                  alt="7 Wonders Mobile Layout" 
                  className="block md:hidden w-full h-auto object-contain"
                  loading="eager"
                />
              </div>

              {/* Bottom Layout Row */}
              <div className="mt-8 flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-0">
                
                {/* DESKTOP ONLY: Left Text */}
                <div className="hidden md:block text-left w-1/3">
                  <h2 className="font-extrabold text-[1.35rem] tracking-widest uppercase leading-tight">Coming</h2>
                  <h2 className="font-extrabold text-[1.35rem] tracking-widest uppercase leading-tight">November 19, 2026</h2>
                </div>

                {/* Mobile: Logos Middle | Desktop: Logos Right */}
                <div className="flex items-center justify-center gap-6 md:w-1/3 md:justify-end order-1 md:order-3">
                  <div className="flex items-center gap-2">
                     <span className="font-bold text-xl tracking-tighter">PS5</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[10px] font-black">X</div>
                     <span className="font-bold text-sm tracking-tight">XBOX SERIES X|S</span>
                  </div>
                </div>

                {/* Mobile: Button Bottom | Desktop: Button Center */}
                <div className="w-full md:w-1/3 flex justify-center order-2 md:order-2">
                  <button className="w-[80%] md:w-auto bg-[#ffced9] hover:bg-white text-black font-extrabold px-10 py-3.5 rounded-full transition-colors duration-300 shadow-[0_0_15px_rgba(255,206,217,0.3)]">
                    Pre-Order Now
                  </button>
                </div>

              </div>
              
            </div>
          </main>

        </div>
      )}

    </div>
  );
};

export default App;