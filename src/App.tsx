import React, { useState, useEffect } from 'react';

// --- WONDERS DATA ---
const wondersData = [
  {
    id: 1,
    title: 'Projects',
    subtitle: 'Strategic Brand Identity',
    desc: 'Analyzing architectural symmetry to understand digital brand trust. A case study in building premium aesthetics without clutter.',
    bgImg: 'src/assets/image/tagmahal.jpg',
    fgImg: 'src/assets/image/tagpng.png',
    accent: '#d4af37',
    boxBg: 'bg-[#1a1a24]/30',
  },
  {
    id: 2,
    title: 'Deatils about me',
    subtitle: 'User Experience & Retention',
    desc: 'Carved from stone, built for endurance. Exploring how foundational UX structures dictate long-term user engagement and retention.',
    bgImg: 'src/assets/image/petra-bg.jpg',
    fgImg: 'src/assets/image/petra-gf.png',
    accent: '#c88c7a',
    boxBg: 'bg-[#2a1b18]/40',
  },
  {
    id: 3,
    title: 'THE ARENA',
    subtitle: 'High-Performance Systems',
    desc: 'Engineering scalable solutions capable of handling massive traffic, drawing inspiration from ancient structural mastery.',
    bgImg: 'src/assets/image/arena.jpg',
    fgImg: 'src/assets/image/colosseum-fg.png',
    accent: '#b87333',
    boxBg: 'bg-[#1e2329]/40',
  },
  {
    id: 4,
    title: 'THE EQUINOX',
    subtitle: 'Data-Driven Architecture',
    desc: 'Precision mapping and algorithmic efficiency. Sharing insights on how backend logic creates seamless frontend experiences.',
    bgImg: 'src/assets/image/chichen-bg.jpg',
    fgImg: 'src/assets/image/chichen-fg.png',
    accent: '#50c878',
    boxBg: 'bg-[#15201a]/40',
  },
  {
    id: 5,
    title: 'THE CLOUD PEAK',
    subtitle: 'Serverless Deployment',
    desc: 'Reaching new heights in deployment strategies. Optimizing cloud storage and continuous integration for elite client projects.',
    bgImg: 'src/assets/image/machu-bg.jpg',
    fgImg: 'src/assets/image/machu-fg.png',
    accent: '#8da399',
    boxBg: 'bg-[#1a211e]/40',
  },
  {
    id: 6,
    title: 'THE MONUMENT',
    subtitle: 'Global Outreach & SEO',
    desc: 'Establishing absolute visibility. Tactical knowledge on elevating search presence and authoritative domain structuring.',
    bgImg: 'src/assets/image/christ-bg.jpg',
    fgImg: 'src/assets/image/christ-fg.png',
    accent: '#a9b2c3',
    boxBg: 'bg-[#1a2530]/40',
  },
  {
    id: 7,
    title: 'THE GREAT BARRIER',
    subtitle: 'Cybersecurity & Protection',
    desc: 'Fortifying digital assets. Essential protocols and memory management practices to ensure impenetrable application security.',
    bgImg: 'src/assets/image/wall-bg.jpg',
    fgImg: 'src/assets/image/wall-fg.png',
    accent: '#8b0000',
    boxBg: 'bg-[#2b1818]/40',
  }
];

const App: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'content'>('intro');
  const [showPopup, setShowPopup] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1000);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const menuItems = [
    'Resume (PDF)',
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
      const handleScroll = () => { requestAnimationFrame(() => setScrollY(window.scrollY)); };
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

  const scrollProgress = windowHeight > 0 ? scrollY / windowHeight : 0;
  const wonderOpacity = Math.max(0, 1 - scrollProgress * 1.6);
  const wonderScale = Math.max(0.7, 1 - scrollProgress * 0.8);

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

  useEffect(() => {
    if (isMenuOpen || isResumeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isResumeModalOpen]);

  return (
    <div className="bg-[#0b0b0e] min-h-screen w-full font-sans select-none text-white relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@900&family=Inter:wght@300;400;700;800&family=Cinzel:wght@400;600&display=swap');
        .font-gta { font-family: 'Syncopate', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-royal { font-family: 'Cinzel', serif; }
        .g-outline { color: transparent; -webkit-text-stroke: 2px rgba(255, 255, 255, 0.15); }
        .g-shine { color: transparent; -webkit-text-stroke: 2px rgba(255, 255, 255, 0.9); -webkit-mask-image: linear-gradient(to bottom, transparent 40%, black 50%, transparent 60%); -webkit-mask-size: 100% 300%; -webkit-mask-repeat: no-repeat; animation: sweep 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>

      {/* INTRO ANIMATION */}
      {phase === 'intro' && (
        <div className="fixed inset-0 font-gta flex items-center justify-center bg-[#0b0b0e] z-[100]">
          <div className="g-outline text-8xl md:text-[150px] font-black relative">G<span className="absolute bottom-[0.1em] right-[-0.25em] text-[0.4em] leading-none">★</span></div>
          <div className="g-shine text-8xl md:text-[150px] font-black absolute top-0 left-0 w-full h-full flex items-center justify-center">G<span className="absolute bottom-[0.1em] right-[-0.25em] text-[0.4em] leading-none">★</span></div>
        </div>
      )}

      {phase === 'content' && (
        <>
          {/* NAVIGATION BAR */}
          <nav className="fixed w-full flex justify-between items-center p-6 md:px-12 top-0 left-0 z-[60]">
            <div className="font-gta text-2xl font-black tracking-widest text-white drop-shadow-md">VI</div>
            <div className="relative w-8 h-6 flex flex-col justify-between cursor-pointer group z-[90]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className={`w-full h-[3px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[10.5px] !bg-[#d4af37]' : 'group-hover:bg-[#d4af37]'}`}></span>
              <span className={`w-full h-[3px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'group-hover:bg-[#d4af37]'}`}></span>
              <span className={`w-full h-[3px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[10.5px] !bg-[#d4af37]' : 'group-hover:bg-[#d4af37]'}`}></span>
            </div>
          </nav>

          {/* SIDEBAR MENU */}
          <div className={`fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}/>
          
          <div className={`fixed top-0 right-0 h-[100dvh] w-full md:w-[450px] bg-[#0b0b0e]/95 backdrop-blur-xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-[75] flex flex-col transform transition-transform duration-500 ease-in-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex-1 flex flex-col items-center justify-center p-8 mt-16 space-y-8">
              {menuItems.map((item, index) => (
                <div key={index} className="w-full flex justify-center overflow-hidden">
                  <a 
                    href={item === 'Resume (PDF)' ? '#' : `#${item.toLowerCase().replace(/[\s/]+/g, '-')}`}
                    onClick={(e) => {
                      if (item === 'Resume (PDF)') {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setIsResumeModalOpen(true);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className="whitespace-nowrap font-royal text-xl md:text-3xl text-[#f4f0e6] hover:text-[#d4af37] transition-all duration-300 uppercase tracking-widest transform hover:scale-110 hover:tracking-[0.3em] flex items-center gap-3"
                    style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms', opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)' }}
                  >
                    {item === 'Resume (PDF)' && <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    {item}
                  </a>
                </div>
              ))}
            </div>
            <div className="w-full p-8 flex justify-center items-center border-t border-white/10 opacity-70">
              <span className="font-inter text-xs tracking-widest text-[#a8a69d]">PORTFOLIO © 2026</span>
            </div>
          </div>

          {/* CUSTOM PDF MODAL - OPTIMIZED FOR MOBILE */}
          <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-500 ease-in-out ${isResumeModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`w-full h-full md:w-[85vw] md:h-[90vh] bg-[#1a1a24] md:rounded-2xl border-0 md:border border-white/10 flex flex-col shadow-2xl transform transition-transform duration-500 delay-100 ${isResumeModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
              
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-5 md:py-4 border-b border-white/10 bg-[#0b0b0e] md:rounded-t-2xl shrink-0">
                <h3 className="font-royal text-lg md:text-2xl text-[#f4f0e6] tracking-widest uppercase flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  My <span className="text-[#d4af37]">Resume</span>
                </h3>
                
                <div className="flex items-center gap-4">
                  {/* Desktop Action Buttons (Hidden on Mobile) */}
                  <div className="hidden md:flex items-center gap-4">
                    <a href="src/assets/pdf/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-[#d4af37]/20 hover:bg-[#d4af37] text-[#d4af37] hover:text-black px-4 py-2 rounded-full font-inter text-xs font-bold tracking-widest transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      OPEN
                    </a>
                    <a href="src/assets/pdf/resume.pdf" download="Resume.pdf" className="flex items-center gap-1 bg-white/10 hover:bg-white text-white hover:text-black px-4 py-2 rounded-full font-inter text-xs font-bold tracking-widest transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      DOWNLOAD
                    </a>
                  </div>

                  {/* Close Button (Visible on both Mobile and Desktop) */}
                  <button onClick={() => setIsResumeModalOpen(false)} className="text-white hover:text-[#ffced9] transition-colors p-1 bg-white/5 rounded-full hover:bg-white/10">
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>

              {/* PDF Container Area */}
              <div className="flex-1 w-full bg-[#0b0b0e] md:bg-[#121214] md:rounded-b-2xl overflow-hidden relative flex flex-col items-center justify-center">
                
                {/* 1. MOBILE UI (Displayed only on small screens) */}
                <div className="flex md:hidden flex-col items-center justify-center p-8 w-full h-full text-center">
                  <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="font-royal text-2xl text-white mb-2 tracking-widest uppercase">Resume Ready</h3>
                  <p className="font-inter text-[#a8a69d] text-sm mb-10 max-w-xs leading-relaxed">
                    Mobile browsers don't support embedded PDFs properly. For a perfect view, please open or download the file directly.
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full max-w-[280px]">
                    <a href="src/assets/pdf/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full bg-[#d4af37] text-black font-extrabold py-4 rounded-full tracking-widest text-sm flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      OPEN PDF
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a href="src/assets/pdf/resume.pdf" download="Resume.pdf" className="w-full bg-transparent border border-white/20 text-white font-bold py-4 rounded-full tracking-widest text-sm flex justify-center items-center gap-2 hover:bg-white/5 transition-colors">
                      DOWNLOAD PDF
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                  </div>
                </div>

                {/* 2. DESKTOP UI (Displayed only on medium+ screens) - Uses view=FitH to fix scaling */}
                <iframe 
                  src="src/assets/pdf/resume.pdf#toolbar=0&view=FitH" 
                  className="hidden md:block w-full h-full border-none z-10 relative bg-[#121214]"
                  title="Resume PDF Viewer"
                ></iframe>

              </div>
            </div>
          </div>

          {/* DYNAMIC BACKGROUNDS */}
          <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#0b0b0e]">
            {wondersData.map((wonder, index) => (
              <div key={`bg-${wonder.id}`} className="absolute inset-0 w-full h-full transition-opacity duration-[50ms]" style={{ opacity: getBgOpacity(index) }}>
                <img src={wonder.bgImg} alt={wonder.title} className="w-full h-full object-cover opacity-60 md:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0e]/50 via-transparent to-[#0b0b0e]/95"></div>
              </div>
            ))}
          </div>

          {/* 7 WONDERS UI GRID & BUTTON */}
          <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10" style={{ pointerEvents: wonderOpacity < 0.1 ? 'none' : 'auto' }}>
            <main className="w-full max-w-5xl px-4 flex flex-col items-center justify-center will-change-transform" style={{ opacity: wonderOpacity, transform: `scale(${wonderScale})` }}>
              <div className={`w-full transition-all duration-[1500ms] ease-out flex flex-col ${showPopup ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                
                {/* Image Grid */}
                <div className="w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 rounded-[4px] overflow-hidden bg-[#121214]">
                  <img src="src/assets/image/7wonder.png" alt="Portfolio Grid" className="hidden md:block w-full h-auto object-cover" />
                  <img src="src/assets/image/7wonder2.png" alt="Portfolio Grid Mobile" className="block md:hidden w-full h-auto object-cover" />
                </div>
                
                {/* BOTTOM SECTION: TEXT & WORKING BUTTON */}
                <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-between w-full font-inter relative z-[50]">
                  
                  <div className="hidden md:block text-left w-1/3">
                    <h2 className="font-extrabold text-[1.1rem] tracking-widest uppercase leading-tight text-[#e0ddcf]">Last Update</h2>
                    <h2 className="font-extrabold text-[1.1rem] tracking-widest uppercase leading-tight text-white">July 2, 2026</h2>
                  </div>
                  
                  <div className="w-full md:w-2/3 flex justify-center md:justify-end mt-4 md:mt-0">
                    <button 
                      onClick={() => setIsResumeModalOpen(true)}
                      className="cursor-pointer pointer-events-auto bg-[#ffced9] hover:bg-white text-black font-extrabold px-8 md:px-10 py-3 md:py-3.5 rounded-full transition-colors duration-300 shadow-[0_0_15px_rgba(255,206,217,0.3)] flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      View Resume
                    </button>
                  </div>

                </div>
              </div>
            </main>
          </div>

          {/* SCROLLABLE PROJECTS (The 7 Dynamic Boxes) */}
          <div className="relative z-20 w-full flex flex-col items-center pointer-events-none">
            <div className="h-[120vh] w-full"></div>
            {wondersData.map((wonder) => (
              <div key={`box-${wonder.id}`} className="h-[150vh] w-full flex items-center justify-center">
                <div className="w-full max-w-5xl px-4 md:px-0 pointer-events-auto">
                  <div className={`flex flex-col md:flex-row items-stretch ${wonder.boxBg} backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_40px_0_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 hover:border-[${wonder.accent}]/40`}>
                    <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-black/40 flex items-center justify-center p-8">
                      <img src={wonder.fgImg} alt={wonder.title} className="max-w-full max-h-full object-contain transition-transform duration-1000 hover:scale-105 drop-shadow-2xl" loading="lazy" />
                    </div>
                    <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                      <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: wonder.accent }}></div>
                      <p className="font-inter font-bold tracking-widest text-xs uppercase mb-2" style={{ color: wonder.accent }}>{wonder.subtitle}</p>
                      <h2 className="font-royal text-3xl md:text-5xl text-[#f4f0e6] mb-4 tracking-wide">{wonder.title}</h2>
                      <p className="font-inter font-light text-[#a8a69d] text-sm md:text-[15px] leading-relaxed mb-10">{wonder.desc}</p>
                      <div className="mt-auto">
                        <button className="group relative px-8 py-3 rounded-sm overflow-hidden bg-transparent border font-inter font-semibold tracking-widest text-xs transition-all" style={{ borderColor: `${wonder.accent}50`, color: wonder.accent }}>
                          <div className="absolute inset-0 w-0 transition-all duration-500 ease-out group-hover:w-full" style={{ backgroundColor: `${wonder.accent}20` }}></div>
                          <span className="relative transition-colors duration-300">EXPLORE INSIGHTS</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="h-[50vh] w-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;