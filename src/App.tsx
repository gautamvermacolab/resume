import React, { useState, useEffect } from 'react';

// --- WONDERS DATA (Easily edit text, images, and theme colors here) ---
const wondersData = [
  {
    id: 1,
    title: 'THE MARBLE PAVILION',
    subtitle: 'Strategic Brand Identity',
    desc: 'Analyzing architectural symmetry to understand digital brand trust. A case study in building premium aesthetics without clutter.',
    bgImg: 'src/assets/image/tagmahal.jpg',
    fgImg: 'src/assets/image/tagpng.png',
    accent: '#d4af37', // Luxury Gold
    boxBg: 'bg-[#1a1a24]/30', // Charcoal/Navy hint
  },
  {
    id: 2,
    title: 'THE ROSE CITY',
    subtitle: 'User Experience & Retention',
    desc: 'Carved from stone, built for endurance. Exploring how foundational UX structures dictate long-term user engagement and retention.',
    bgImg: 'src/assets/image/petra-bg.jpg', // Placeholder path
    fgImg: 'src/assets/image/petra-gf.png',
    accent: '#c88c7a', // Rose Gold/Parchment
    boxBg: 'bg-[#2a1b18]/40',
  },
  {
    id: 3,
    title: 'THE ARENA',
    subtitle: 'High-Performance Systems',
    desc: 'Engineering scalable solutions capable of handling massive traffic, drawing inspiration from ancient structural mastery.',
    bgImg: 'src/assets/image/arena.jpg',
    fgImg: 'src/assets/image/colosseum-fg.png',
    accent: '#b87333', // Bronze
    boxBg: 'bg-[#1e2329]/40', // Deep Charcoal
  },
  {
    id: 4,
    title: 'THE EQUINOX',
    subtitle: 'Data-Driven Architecture',
    desc: 'Precision mapping and algorithmic efficiency. Sharing insights on how backend logic creates seamless frontend experiences.',
    bgImg: 'src/assets/image/chichen-bg.jpg',
    fgImg: 'src/assets/image/chichen-fg.png',
    accent: '#50c878', // Emerald/Jade
    boxBg: 'bg-[#15201a]/40',
  },
  {
    id: 5,
    title: 'THE CLOUD PEAK',
    subtitle: 'Serverless Deployment',
    desc: 'Reaching new heights in deployment strategies. Optimizing cloud storage and continuous integration for elite client projects.',
    bgImg: 'src/assets/image/machu-bg.jpg',
    fgImg: 'src/assets/image/machu-fg.png',
    accent: '#8da399', // Slate/Forest
    boxBg: 'bg-[#1a211e]/40',
  },
  {
    id: 6,
    title: 'THE MONUMENT',
    subtitle: 'Global Outreach & SEO',
    desc: 'Establishing absolute visibility. Tactical knowledge on elevating search presence and authoritative domain structuring.',
    bgImg: 'src/assets/image/christ-bg.jpg',
    fgImg: 'src/assets/image/christ-fg.png',
    accent: '#a9b2c3', // Silver
    boxBg: 'bg-[#1a2530]/40', // Navy Blue
  },
  {
    id: 7,
    title: 'THE GREAT BARRIER',
    subtitle: 'Cybersecurity & Protection',
    desc: 'Fortifying digital assets. Essential protocols and memory management practices to ensure impenetrable application security.',
    bgImg: 'src/assets/image/wall-bg.jpg',
    fgImg: 'src/assets/image/wall-fg.png',
    accent: '#8b0000', // Crimson/Brick
    boxBg: 'bg-[#2b1818]/40',
  }
];

const App: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'content'>('intro');
  const [showPopup, setShowPopup] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1000);
  
  // --- NEW: Sidebar State ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- NEW: Menu Items ---
  const menuItems = [
    'Resume',
    'Projects',
    'Education',
    'Achievements',
    'Short / Long Goals',
    'Under Dev Projects',
    'Contact',
    'Feedback'
  ];

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setPhase('content');
    }, 1200);
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

  // --- GLOBAL SCROLL MATH ---
  const scrollProgress = windowHeight > 0 ? scrollY / windowHeight : 0;
  
  // Initial 7 Wonder Interface fading
  const wonderOpacity = Math.max(0, 1 - scrollProgress * 1.6);
  const wonderScale = Math.max(0.7, 1 - scrollProgress * 0.8);

  // Dynamic Background Opacity Calculator
  const getBgOpacity = (index: number) => {
    const sectionLength = 1.5; 
    const start = 1 + index * sectionLength;
    const end = start + sectionLength;
    const fadeDuration = 0.5;

    if (index === 0) {
      if (scrollProgress < end - fadeDuration) return 1;
      if (scrollProgress < end) return 1 - (scrollProgress - (end - fadeDuration)) / fadeDuration;
      return 0;
    }

    const fadeInStart = start - fadeDuration;
    const fadeInEnd = start;
    const fadeOutStart = end - fadeDuration;
    const fadeOutEnd = end;

    if (scrollProgress < fadeInStart) return 0;
    if (scrollProgress < fadeInEnd) return (scrollProgress - fadeInStart) / fadeDuration;
    if (scrollProgress < fadeOutStart) return 1;
    if (scrollProgress < fadeOutEnd) return 1 - (scrollProgress - fadeOutStart) / fadeDuration;
    return 0;
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <div className="bg-[#0b0b0e] min-h-screen w-full font-sans select-none text-white relative">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@900&family=Inter:wght@300;400;700;800&family=Cinzel:wght@400;600&display=swap');
        
        .font-gta { font-family: 'Syncopate', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-royal { font-family: 'Cinzel', serif; }

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
      `}</style>

      {/* --- PHASE 1: G★ INTRO --- */}
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

      {/* --- PHASE 2: MAIN CONTENT --- */}
      {phase === 'content' && (
        <>
          {/* Top Navbar */}
          <nav className="fixed w-full flex justify-between items-center p-6 md:px-12 top-0 left-0 z-[80]">
            <div className="font-gta text-2xl font-black tracking-widest text-white drop-shadow-md">VI</div>
            
            {/* UPDATED: Functional Hamburger Button */}
            <div 
              className="relative w-8 h-6 flex flex-col justify-between cursor-pointer group z-[90]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`w-full h-[3px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[10.5px] !bg-[#d4af37]' : 'group-hover:bg-[#d4af37]'}`}></span>
              <span className={`w-full h-[3px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'group-hover:bg-[#d4af37]'}`}></span>
              <span className={`w-full h-[3px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[10.5px] !bg-[#d4af37]' : 'group-hover:bg-[#d4af37]'}`}></span>
            </div>
          </nav>

          {/* --- NEW: FULL SCREEN SIDEBAR MENU --- */}
          {/* Dark Overlay Background */}
          <div 
            className={`fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Sliding Menu Panel */}
          <div 
            className={`fixed top-0 right-0 h-[100dvh] w-full md:w-[450px] bg-[#0b0b0e]/95 backdrop-blur-xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-[75] flex flex-col transform transition-transform duration-500 ease-in-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex-1 flex flex-col items-center justify-center p-8 mt-16 space-y-8">
              {menuItems.map((item, index) => (
                <div key={index} className="w-full flex justify-center overflow-hidden">
                  <a 
                    href={`#${item.toLowerCase().replace(/[\s/]+/g, '-')}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-royal text-2xl md:text-3xl text-[#f4f0e6] hover:text-[#d4af37] transition-all duration-300 uppercase tracking-widest transform hover:scale-110 hover:tracking-[0.3em]"
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
            
            <div className="w-full p-8 flex justify-center items-center border-t border-white/10 opacity-70">
              <span className="font-inter text-xs tracking-widest text-[#a8a69d]">
                PORTFOLIO © 2026
              </span>
            </div>
          </div>
          {/* --- END SIDEBAR MENU --- */}

          {/* --- LAYER 1: DYNAMIC BACKGROUNDS (7 Images Crossfading) --- */}
          <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#0b0b0e]">
            {wondersData.map((wonder, index) => (
              <div 
                key={`bg-${wonder.id}`}
                className="absolute inset-0 w-full h-full transition-opacity duration-[50ms]"
                style={{ opacity: getBgOpacity(index) }}
              >
                <img 
                  src={wonder.bgImg} 
                  alt={wonder.title} 
                  className="w-full h-full object-cover opacity-60 md:opacity-80" 
                />
                {/* Unified gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0e]/50 via-transparent to-[#0b0b0e]/95"></div>
              </div>
            ))}
          </div>

          {/* --- LAYER 2: ORIGINAL 7 WONDER UI (Scales & Fades OUT) --- */}
          <div 
            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10"
            style={{ pointerEvents: wonderOpacity < 0.1 ? 'none' : 'auto' }}
          >
            <main 
              className="w-full max-w-5xl px-4 flex flex-col items-center justify-center will-change-transform"
              style={{ opacity: wonderOpacity, transform: `scale(${wonderScale})` }}
            >
              <div className={`w-full transition-all duration-[1500ms] ease-out flex flex-col ${showPopup ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 rounded-[4px] overflow-hidden bg-[#121214]">
                  <img src="src/assets/image/7wonder.png" alt="Portfolio Grid" className="hidden md:block w-full h-auto object-cover" />
                  <img src="src/assets/image/7wonder2.png" alt="Portfolio Grid Mobile" className="block md:hidden w-full h-auto object-cover" />
                </div>
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between w-full font-inter">
                  <div className="hidden md:block text-left w-1/3">
                    <h2 className="font-extrabold text-[1.1rem] tracking-widest uppercase leading-tight text-[#e0ddcf]">Last Update</h2>
                    <h2 className="font-extrabold text-[1.1rem] tracking-widest uppercase leading-tight text-white">July 2, 2026</h2>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
                    <button className="w-[80%] md:w-auto bg-[#ffced9] hover:bg-white text-black font-extrabold px-12 py-3 rounded-full transition-colors duration-300 shadow-[0_0_15px_rgba(255,206,217,0.3)]">
                      Resume
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* --- LAYER 3: SCROLLABLE PROJECTS (The 7 Dynamic Boxes) --- */}
          <div className="relative z-20 w-full flex flex-col items-center">
            
            {/* Spacer pushes the first box down by 1.2 screen heights */}
            <div className="h-[120vh] w-full"></div>

            {wondersData.map((wonder) => (
              <div key={`box-${wonder.id}`} className="h-[150vh] w-full flex items-center justify-center pointer-events-none">
                
                {/* Enable pointer events only inside the card so you can click the button */}
                <div className="w-full max-w-5xl px-4 md:px-0 pointer-events-auto">
                  
                  {/* Dynamic Glassmorphism Box based on Theme */}
                  <div className={`flex flex-col md:flex-row items-stretch ${wonder.boxBg} backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_40px_0_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 hover:border-[${wonder.accent}]/40`}>
                    
                    {/* Left Side: Dynamic Image */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-black/40 flex items-center justify-center p-8">
                      <img 
                        src={wonder.fgImg} 
                        alt={wonder.title} 
                        className="max-w-full max-h-full object-contain transition-transform duration-1000 hover:scale-105 drop-shadow-2xl"
                        loading="lazy"
                      />
                    </div>

                    {/* Right Side: Information / Insight Focus */}
                    <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                      
                      {/* Dynamic Theme Color Accent Line */}
                      <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: wonder.accent }}></div>
                      
                      <p className="font-inter font-bold tracking-widest text-xs uppercase mb-2" style={{ color: wonder.accent }}>
                        {wonder.subtitle}
                      </p>
                      
                      <h2 className="font-royal text-3xl md:text-5xl text-[#f4f0e6] mb-4 tracking-wide">
                        {wonder.title}
                      </h2>
                      
                      <p className="font-inter font-light text-[#a8a69d] text-sm md:text-[15px] leading-relaxed mb-10">
                        {wonder.desc}
                      </p>

                      <div className="mt-auto">
                        <button 
                          className="group relative px-8 py-3 rounded-sm overflow-hidden bg-transparent border font-inter font-semibold tracking-widest text-xs transition-all"
                          style={{ borderColor: `${wonder.accent}50`, color: wonder.accent }}
                        >
                          <div className="absolute inset-0 w-0 transition-all duration-500 ease-out group-hover:w-full" style={{ backgroundColor: `${wonder.accent}20` }}></div>
                          <span className="relative transition-colors duration-300">EXPLORE INSIGHTS</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Final Spacer */}
            <div className="h-[50vh] w-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;