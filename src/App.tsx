import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'content'>('intro');
  const [showPopup, setShowPopup] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setPhase('content');
    }, 1000);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (phase === 'content') {
      setWindowHeight(window.innerHeight);
      
      const popupTimer = setTimeout(() => setShowPopup(true), 50);
      
      const handleScroll = () => {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
        });
      };
      
      const handleResize = () => setWindowHeight(window.innerHeight);

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearTimeout(popupTimer);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [phase]);

  // --- SCROLL MATH ---
  // Calculates how far down the user has scrolled relative to the window height
  const scrollProgress = scrollY / windowHeight;
  
  // Fades from 1 to 0 over 80% of the viewport height
  const heroOpacity = Math.max(0, 1 - scrollProgress * 1.25);
  
  // Shrinks from scale 1 down to 0.7 as you scroll
  const heroScale = Math.max(0.7, 1 - scrollProgress * 0.5);

  return (
    <div className="bg-[#0b0b0e] min-h-screen w-full font-sans select-none text-white relative">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@900&family=Inter:wght@400;700;800&display=swap');
        
        .font-gta { font-family: 'Syncopate', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

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

      {/* --- PHASE 1: G★ ANIMATION --- */}
      {phase === 'intro' && (
        <div className="fixed inset-0 font-gta flex items-center justify-center bg-[#0b0b0e] z-[100]">
          <div className="g-outline text-8xl md:text-[150px] font-black relative">
            G<span className="absolute bottom-[0.1em] right-[-0.25em] text-[0.4em] leading-none">★</span>
          </div>
          <div className="g-shine text-8xl md:text-[150px] font-black absolute top-0 left-0 w-full h-full flex items-center justify-center">
            G<span className="absolute bottom-[0.1em] right-[-0.25em] text-[0.4em] leading-none">★</span>
          </div>
        </div>
      )}

      {/* --- PHASE 2: MAIN WEBSITE CONTENT --- */}
      {phase === 'content' && (
        <>
          {/* Top Navbar */}
          <nav className="fixed w-full flex justify-between items-center p-6 md:px-12 top-0 left-0 z-50">
            <div className="font-gta text-2xl font-black tracking-widest text-white drop-shadow-md">VI</div>
            <div className="w-8 h-6 flex flex-col justify-between cursor-pointer">
              <span className="w-full h-1 bg-white rounded shadow-md"></span>
              <span className="w-full h-1 bg-white rounded shadow-md"></span>
            </div>
          </nav>

          {/* --- FIXED HERO SECTION (SCALES & FADES) --- */}
          <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-0 bg-[#0b0b0e]">
            <main 
              className="w-full max-w-5xl px-4 flex flex-col items-center justify-center will-change-transform"
              style={{
                opacity: heroOpacity,
                transform: `scale(${heroScale})`, 
                pointerEvents: heroOpacity < 0.1 ? 'none' : 'auto',
              }}
            >
              <div 
                className={`
                  w-full transition-all duration-[1500ms] ease-out flex flex-col
                  ${showPopup ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
              >
                <div className="md:hidden text-center mb-6">
                  <h2 className="font-extrabold text-xl tracking-widest uppercase leading-tight">Last Update</h2>
                  <h2 className="font-extrabold text-xl tracking-widest uppercase leading-tight">July 1, 2026</h2>
                </div>

                <div className="w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 rounded-[4px] overflow-hidden bg-black">
                  <img src="src/assets/image/7wonder.png" alt="Portfolio Grid" className="hidden md:block w-full h-auto object-cover" loading="eager" />
                  <img src="src/assets/image/7wonder2.png" alt="Portfolio Grid Mobile" className="block md:hidden w-full h-auto object-cover" loading="eager" />
                </div>

                <div className="mt-6 flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-0 font-inter">
                  <div className="hidden md:block text-left md:w-1/3">
                    <h2 className="font-extrabold text-[1.1rem] lg:text-[1.3rem] tracking-widest uppercase leading-tight">Last Update</h2>
                    <h2 className="font-extrabold text-[1.1rem] lg:text-[1.3rem] tracking-widest uppercase leading-tight">July 1, 2026</h2>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center order-2 md:order-2">
                    <button className="w-[80%] md:w-auto bg-[#ffced9] hover:bg-white text-black font-extrabold px-12 py-3 rounded-full transition-colors duration-300 shadow-[0_0_15px_rgba(255,206,217,0.3)]">
                      Resume
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-6 md:w-1/3 md:justify-end order-1 md:order-3">
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-lg tracking-tighter">REACT</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black text-[9px] font-black">TS</div>
                       <span className="font-bold text-sm tracking-tight">TYPESCRIPT</span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Invisible scroll track – keeps the page tall enough to allow scrolling down to trigger the effect */}
          <div className="w-full h-[150vh]"></div>
        </>
      )}

    </div>
  );
};
 
export default App;