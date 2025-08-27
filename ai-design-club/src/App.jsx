import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Users, MessageCircle, Sun, Moon, Menu, X, Youtube, Link, Rocket } from 'lucide-react';
import Logo from './components/Logo';
import SkoolLogo from './components/SkoolLogo';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import './App.css';

// TweakCN-style Badge Component
const TabBadge = ({ number, color }) => {
  const colorClasses = {
    green: 'bg-green-500 text-white',
    blue: 'bg-blue-500 text-white',
    orange: 'bg-orange-500 text-white',
    primary: 'bg-primary text-primary-foreground'
  };
  
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full ${colorClasses[color]} ml-2`}>
      {number}
    </span>
  );
};

// Resizable Navbar Component (Aceternity UI inspired, TweakCN styled)
const ResizableNavbar = ({ isDark, toggleTheme, handleJoinClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      {/* Desktop Navbar */}
      <div
        className="relative z-[60] mx-auto hidden max-w-6xl md:flex items-center justify-between bg-background/90 backdrop-blur-md border border-border/20 rounded-2xl shadow-lg mt-4 px-8 py-4"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center flex-shrink-0">
          <Logo variant="horizontal" isDark={isDark} className="h-7 w-auto" />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center justify-center space-x-6">
          <motion.button
            onClick={() => scrollToSection('community')}
            className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md border border-green-500/20 hover:border-green-400/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Community
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('features')}
            className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md border border-blue-500/20 hover:border-blue-400/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('about')}
            className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md border border-orange-500/20 hover:border-orange-400/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center justify-end space-x-3 flex-shrink-0">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 hover:bg-accent/80 transition-all duration-200 rounded-xl"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </motion.div>

          <motion.button
            onClick={handleJoinClick}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap border border-primary/20"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Join Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className="relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] min-w-[280px] flex-col items-center justify-between bg-background/90 backdrop-blur-md border border-border/20 rounded-2xl shadow-lg mt-4 mx-4 px-4 py-3 md:hidden"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Mobile Header */}
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center justify-center">
            <Logo variant="horizontal" isDark={isDark} className="h-6 w-auto" />
          </div>

          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-10 h-10 hover:bg-accent/80 transition-all duration-200 rounded-xl"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 hover:bg-accent/80 transition-all duration-200 rounded-xl"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-start justify-start gap-3 px-2 py-4 border-t border-border/20 mt-4"
            >
              <motion.button
                onClick={() => scrollToSection('community')}
                className="inline-flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-green-500/20"
                whileHover={{ x: 5 }}
              >
                Community
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('features')}
                className="inline-flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-blue-500/20"
                whileHover={{ x: 5 }}
              >
                Features
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-orange-500/20"
                whileHover={{ x: 5 }}
              >
                About
              </motion.button>

              <div className="pt-2 w-full">
                <motion.button
                  onClick={handleJoinClick}
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-primary/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Modular Hero Section Component
const HeroSection = ({ handleJoinClick, isDark }) => {
  return (
    <section style={{ padding: "48px 0 24px" }}>
      <div className="max-w-[1148px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <h1 style={{
            backgroundClip: "text",
            backgroundImage: isDark
              ? "linear-gradient(to right bottom, oklch(1 0 0) 0%, oklab(1 0 0 / 0.7) 100%)"
              : "linear-gradient(to right bottom, oklch(0.1 0 0) 0%, oklab(0.1 0 0 / 0.7) 100%)",
            color: "rgba(0, 0, 0, 0)",
            letterSpacing: "-1.5px",
            textAlign: "center",
            width: "100%",
            margin: "0 auto 20px",
            padding: "12px 0",
            font: "700 60px/64px 'Outfit', 'Inter', ui-sans-serif, system-ui, sans-serif"
          }}>
            The free community where designers figure out AI tools together.
          </h1>
          <div className="text-center mb-10">
            <p className="text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium" style={{ fontSize: "26px" }}>
              Skip the hype. Learn what actually works.
            </p>
          </div>
          <div style={{
            marginTop: "40px",
            marginBottom: "40px",
            width: "100%",
            maxWidth: "800px",
            margin: "40px auto"
          }}>
            <div style={{ position: "relative", paddingBottom: "62.14039125431531%", height: 0, borderRadius: "0.75rem", overflow: "hidden" }}>
              <iframe 
                src="https://www.loom.com/embed/7b37445748034f0fa07a24b183556758?sid=fb0f8969-51db-4138-a6a7-c94ee4359828" 
                frameBorder="0" 
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              ></iframe>
            </div>
          </div>
          <div style={{
            marginTop: "48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <button
              onClick={handleJoinClick}
              className="inline-flex items-center px-10 py-5 text-xl font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group"
            >
              Join Free
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modular Value Proposition Component
const ValueProposition = () => {
  return (
    <section id="community" className="py-12 lg:py-16">
      <div className="max-w-[1148px] mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight text-center">
            Most AI content is noise. We're different.
          </h2>
          <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-normal" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <p className="mb-6" style={{ fontSize: "22px", lineHeight: "24px" }}>
              I've been testing AI tools for years, and here's what I've learned: most content out there is either pure hype or completely impractical. AI Design Club cuts through that noise.
            </p>
            <p style={{ fontSize: "22px", lineHeight: "24px" }}>
              We're a community of designers sharing real workflows, real tools, and real wins. No fluff, no promises of overnight success. Just practical strategies you can use today to save time, sharpen your skills, and stay ahead without burning hours chasing the latest trend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modular Features Grid Component
const FeaturesGrid = ({ handleJoinClick }) => {
  const features = [
    {
      icon: <Youtube className="h-10 w-10" />,
      title: "🎥 Curated YouTube Workflows",
      description:
        "My best design + AI tutorials, organized by skill level. No hunting through random videos.",
    },
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "📚 Tool-Specific Superguides",
      description:
        "Step-by-step walkthroughs for tools like Lovable, Figma AI, and Midjourney. Real workflows, not theory.",
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: "🚀 Live App Showcases",
      description:
        "Watch me build real projects with AI tools. See the process, the mistakes, and what actually works.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "👥 Community That Gets It",
      description:
        "Ask questions, share wins, get feedback from designers who are actually using these tools daily.",
    },
  ];

  return (
    <section id="features" className="py-12 lg:py-24">
      <div className="max-w-[1148px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-20 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight text-center">
          What you'll actually get inside
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-background/50 border border-border/30 p-8 rounded-xl transition-all duration-300 hover:bg-background/80 hover:border-border/60"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-xl lg:text-2xl font-medium" style={{ fontSize: "26px" }}>{feature.title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "22px" }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleJoinClick}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group"
          >
            Join Free
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Modular About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="py-12 lg:py-24 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-[1148px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight" style={{ textAlign: "center" }}>
              Who's behind this
            </h2>
            <div className="prose prose-lg dark:prose-invert">
              <p style={{ fontWeight: "300", textAlign: "center", color: "rgba(155, 155, 155, 1)", fontSize: "22px", lineHeight: "26px", padding: "12px 0" }}>
                I'm Andreas "Drewskii" Michailidis. I didn't take the traditional path into design, and that's my edge.
              </p>
              <p style={{ fontWeight: "300", textAlign: "center", color: "rgba(155, 155, 155, 1)", fontSize: "22px", lineHeight: "26px", padding: "12px 0" }}>
                I started as a broke economics student who needed to make money. Along the way, I taught myself design, branding, and storytelling. I've built visual identities for 100+ companies, worked at the heart of the Greek gaming scene, and contributed to Game7, one of the most ambitious projects merging gaming and Web3.
              </p>
              <p style={{ fontWeight: "400", textAlign: "center", color: "rgba(155, 155, 155, 1)", fontSize: "22px", lineHeight: "26px", padding: "12px 0" }}>
                Those experiences taught me how to think creatively, move fast, and adapt to industries in constant change. More importantly, they taught me what actually works versus what just sounds good.
              </p>
              <p style={{ fontWeight: "400", textAlign: "center", color: "rgba(155, 155, 155, 1)", fontSize: "22px", lineHeight: "26px", padding: "12px 0" }}>
                Now I help designers integrate AI into their workflows through practical strategies that deliver real results. Through AI Design Club and AI Brand Mastery Lab, I create spaces where designers can learn real strategies together, skip the hype, and build a future-proof creative practice.
              </p>
            </div>
            <div className="flex justify-center space-x-6 mt-12">
              <Button
                variant="outline"
                className="flex items-center space-x-3 hover:bg-accent transition-all duration-300 border-border shadow-lg px-6 py-6 text-lg font-normal rounded-xl hover:scale-105"
                onClick={() => window.open('https://youtube.com/@drewskii', '_blank')}
              >
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-3 hover:bg-accent transition-all duration-300 border-border shadow-lg px-6 py-6 text-lg font-normal rounded-xl hover:scale-105"
                onClick={() => window.open('https://drewskii.com', '_blank')}
              >
                <Link className="w-5 h-5" />
                <span>Portfolio</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Modular Final CTA Component
const FinalCTA = ({ handleJoinClick }) => {
  return (
    <section className="py-8 lg:py-8">
      <div className="max-w-[1148px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
            Ready to design smarter?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 font-normal" style={{ fontSize: "22px", lineHeight: "26px" }}>
            Join AI Design Club today and connect with designers who are learning and building right alongside you. It's free, it's practical, and it's built by someone who's actually doing the work.
          </p>
          <button
            onClick={handleJoinClick}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group"
          >
            Join Free
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};


// Modular Footer Component (Compact and Centered)
const Footer = ({ handleJoinClick, isDark }) => {
  return (
    <motion.footer
      className="border-t border-border/20 py-8 bg-background/90 backdrop-blur-md mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6" role="contentinfo" aria-label="AI Design Club footer">
          {/* Centered Logo and Branding */}
          <motion.div
            className="flex flex-row items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            style={{ width: "auto", alignSelf: "center" }}
          >
            <Logo variant="horizontal" isDark={isDark} className="h-6 w-auto" style={{ width: "auto", flexGrow: 0 }} />
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs text-muted-foreground font-light whitespace-nowrap"
                style={{
                  lineHeight: "0",
                  marginBottom: "-1px",
                  letterSpacing: "0px"
                }}
              >
                Powered by
              </span>
              <SkoolLogo isDark={isDark} height="20" style={{ paddingBottom: "4px" }} />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={handleJoinClick}
            className="inline-flex items-center space-x-2 px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg border border-primary/20 group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Join Community</span>
            <motion.div
              className="w-4 h-4"
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
};

// Main App Component
function App() {
  // Initialize theme state based on localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Apply theme class on mount and when theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  // Initialize theme on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const handleJoinClick = () => {
    window.open('https://discord.gg/aidesignclub', '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResizableNavbar isDark={isDark} toggleTheme={toggleTheme} handleJoinClick={handleJoinClick} />
      <main className="pt-20">
        <HeroSection handleJoinClick={handleJoinClick} isDark={isDark} />
        <ValueProposition />
        <FeaturesGrid handleJoinClick={handleJoinClick} />
        <AboutSection />
        <FinalCTA handleJoinClick={handleJoinClick} />
      </main>
      <Footer handleJoinClick={handleJoinClick} isDark={isDark} />
    </div>
  );
}

export default App;
