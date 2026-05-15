"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  GraduationCap,
  Briefcase,
  Film,
  BookOpen,
  Globe2,
  Trophy,
  Rocket,
  Quote,
  Sparkles,
  Link2,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Star,
} from "lucide-react";

const NAV_LINKS = [
 
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Career", href: "#career" },
  { label: "Film", href: "#film" },
  { label: "Achievements", href: "#achievements" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  if (!mounted) return <div className="w-9 h-9" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className='relative w-9 h-9 flex items-center justify-center rounded-full border border-amber-500 hover:bg-white/10 transition-colors backdrop-blur-sm '
      aria-label='Toggle theme '>
      <AnimatePresence mode='wait' initial={false}>
        {theme === "dark" ? (
          <motion.span
            key='sun'
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <Sun size={15} className='text-amber-500' />
          </motion.span>
        ) : (
          <motion.span
            key='moon'
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <Moon size={15} className='text-amber-500' />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "none"
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="main-content" className="relative bg-background text-foreground overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" aria-label="Dr. Shaibu Husseini — home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className={`font-playfair font-bold text-base tracking-tight transition-colors duration-300 min-w-0 truncate mr-4 ${scrolled ? "" : "text-amber-300"}`}>
            <span className="hidden sm:inline">Dr. Shaibu Husseini</span>
            <span className="sm:hidden">Dr. Shaibu</span>
          </motion.a>
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link, i) => (
              <motion.a key={link.href} href={link.href}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 + 0.15 }}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${scrolled ? "text-muted-foreground hover:text-foreground hover:bg-accent" : "text-amber-300 hover:text-amber-100 hover:bg-white/10"}`}>
                {link.label}
              </motion.a>
            ))}
            <div className="ml-3"><ThemeToggle /></div>
          </nav>
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-accent transition-colors text-amber-500">
                  {menuOpen ? <X size={15} aria-hidden="true" /> : <Menu size={15} aria-hidden="true" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full p-0 sm:max-w-full">
                <nav id="mobile-nav" aria-label="Mobile navigation" className="flex flex-col gap-1 pt-14 px-5 pb-6">
                  {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                      className="px-3 py-3 text-base font-medium rounded-xl hover:bg-accent transition-colors">
                      {link.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id='hero' ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        {/* Full-bleed photo */}
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
          <Image src="/shaibu.jpeg" alt="Dr. Shaibu Husseini" fill className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Floating orbs */}
        <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-20 pt-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white/70 tracking-wide uppercase">Executive Director · NFVCB Nigeria</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-5xl sm:text-6xl md:text-8xl lg:text-[96px] font-bold text-white leading-[0.95] tracking-tight">
              Dr. Shaibu
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">Husseini</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 text-lg md:text-xl text-white/65 max-w-xl leading-relaxed font-light">
              Film scholar. Cultural administrator. Documentarist of Nollywood&apos;s soul. Three decades at the intersection of Africa&apos;s most vibrant creative industry.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#achievements"
                className="group inline-flex items-center gap-2 px-3 sm:px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all duration-200 shadow-xl shadow-amber-500/30">
                Key Achievements
                <ArrowUpRight size={15} className="hidden sm:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://www.instagram.com/igalaman" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-6 py-3 rounded-full border border-white/25 text-white/85 hover:bg-white/10 font-medium text-sm transition-all duration-200 backdrop-blur-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
             <span className="hidden sm:block">@igalaman</span>   
              </a>
              <a href="https://www.facebook.com/shaibu.husseini.7" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-6 py-3 rounded-full border border-white/25 text-white/85 hover:bg-white/10 font-medium text-sm transition-all duration-200 backdrop-blur-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                
                  <span className="hidden sm:block">Facebook</span>
              </a>
              <a href="https://www.linkedin.com/in/husseini-shaibu" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-6 py-3 rounded-full border border-white/25 text-white/85 hover:bg-white/10 font-medium text-sm transition-all duration-200 backdrop-blur-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                
                  <span className="hidden sm:block">LinkedIn</span>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}
              className="mt-14 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 sm:gap-8 max-w-sm">
              {[{ value: "30+", label: "Years in Media" }, { value: "16yrs", label: "AMAA Chair" }, { value: "465", label: "Staff Empowered" }].map((s) => (
                <div key={s.label}>
                  <div className="font-playfair text-3xl font-bold text-amber-400">{s.value}</div>
                  <div className="text-xs text-white/50 mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-6 right-8 z-10 flex items-center gap-2 text-white/40">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Section header */}
          <FadeIn className="mb-16">
            <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-5">
              <Sparkles size={12} /> About
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight max-w-2xl">
              A life dedicated to<br />
              <span className="text-amber-500 dark:text-amber-400">culture & film</span>
            </h2>
          </FadeIn>

          {/* Bio + quick facts */}
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-24 items-start mb-20">
            <FadeIn direction="left">
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p className="text-lg text-foreground/85 leading-relaxed">
                  Dr. Shaibu Husseini — widely referred to as <strong className="text-foreground font-semibold">&ldquo;Mr. Nollywood&rdquo;</strong> — is one of Nigeria&apos;s most authoritative voices in film scholarship, cultural journalism, and creative policy. His journey spans over three decades: from the rehearsal stages of the National Dance Troupe to the helm of Nigeria&apos;s premier film regulatory body.
                </p>
                <p>
                  He earned a <strong className="text-foreground/80 font-medium">First Class BSc</strong> in Mass Communication from Lagos State University, followed by an <strong className="text-foreground/80 font-medium">MSc with Distinction</strong> from the University of Lagos. His doctoral research at UNILAG — <em>&ldquo;Structure of Film Production Companies in Nollywood&rdquo;</em> — remains a landmark study of the industry that defined him.
                </p>
                <p>
                  For over <strong className="text-foreground/80 font-medium">three decades</strong>, he was the cultural conscience of <em>The Guardian Nigeria</em>, rising to <strong className="text-foreground/80 font-medium">Editor-at-Large</strong> on the Culture, Theatre & Film Desk. His 2010 monograph <em>&ldquo;Moviedom: The Nollywood Narratives&rdquo;</em> — subtitled <em>&ldquo;Clips on the Pioneers&rdquo;</em> — became the definitive chronicle of Nollywood&apos;s formative era, cementing his place as the industry&apos;s foremost documentarist.
                </p>
                <p>
                  Beyond journalism, Dr. Husseini is an <strong className="text-foreground/80 font-medium">Adjunct Lecturer and Senior Teaching & Research Fellow</strong> in the Department of Mass Communication at the University of Lagos, where he mentors the next generation of media and film professionals.
                </p>
                <p>
                  A sought-after speaker at the intersection of policy, culture, and commerce, he has delivered keynote addresses at the <strong className="text-foreground/80 font-medium">Kingdom Film Festival</strong>, the <strong className="text-foreground/80 font-medium">Nollywood Creative Minds Forum</strong>, the <strong className="text-foreground/80 font-medium">Coal City Film Festival</strong>, and the <strong className="text-foreground/80 font-medium">Nigeria Economic Summit (NECLive)</strong>, advocating consistently for infrastructure, distribution, and global visibility of African cinema.
                </p>
                <p>
                  Appointed <strong className="text-foreground/80 font-medium">Executive Director / CEO of the NFVCB</strong> on January 12, 2024 by President Bola Ahmed Tinubu and assuming office on March 6, 2024, he immediately drove the board&apos;s philosophical transformation — from censorship to progressive content classification — while embarking on full digitalisation and deepened stakeholder engagement.
                </p>
                <p>
                  His international pedigree includes the <strong className="text-foreground/80 font-medium">U.S. State Department International Visitors Leadership Programme</strong>, the <strong className="text-foreground/80 font-medium">AIG/Rising Public Leaders Programme at the Blavatnik School of Governance, University of Oxford</strong>, a membership in the <strong className="text-foreground/80 font-medium">Golden Globe Awards</strong> international voting body, and recognition as an official consultant to the <strong className="text-foreground/80 font-medium">Berlin International Film Festival (Berlinale)</strong>.
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-10 pl-6 border-l-2 border-amber-400/60">
                <p className="font-playfair text-xl italic text-foreground/75 leading-relaxed">
                  &ldquo;The Golden Globe appointment is the highest imprimatur for my career as a culture journalist and critic.&rdquo;
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">— Dr. Shaibu Husseini, on his Golden Globe voting membership</p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-0 mb-10">
                {[
                  { label: "Nationality", value: "Nigerian" },
                  { label: "Alma Mater", value: "LASU · UNILAG" },
                  { label: "Highest Degree", value: "PhD, Mass Comm." },
                  { label: "NFVCB Since", value: "March 6, 2024" },
                  { label: "Appointed by", value: "President Tinubu" },
                  { label: "Guardian Nigeria", value: "Editor-at-Large" },
                  { label: "AMAA Chair", value: "16 Consecutive Years" },
                  { label: "Social Media", value: "@igalaman" },
                  { label: "Years in Media", value: "30+" },
                ].map(({ label, value }) => (
                  <div key={label} className="py-3 border-b border-border/60">
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
                    <p className="text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              {/* Credentials */}
              <div className="mb-8 p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-800/30">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 dark:text-amber-400 mb-3">Credentials & Fellowships</p>
                <div className="flex flex-wrap gap-2">
                  {["PhD", "MNIPR", "RPA", "FTA", "FGOND"].map((cred) => (
                    <span key={cred} className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-700/40">
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              {/* Areas of expertise */}
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Areas of Expertise</p>
              <div className="space-y-2">
                {[
                  "Theatre & Performing Arts",
                  "Film Criticism & Curation",
                  "Cultural Administration",
                  "Public Relations & Advertising",
                  "Journalism & Broadcasting",
                  "Film Policy & Regulation",
                  "Mass Communication",
                  "Nollywood Documentation",
                  "Creative Economy Development",
                ].map((tag, i) => (
                  <motion.div key={tag}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center justify-between px-5 py-3 rounded-xl border border-border/60 hover:border-amber-400/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all duration-200 cursor-default">
                    <span className="text-sm font-medium">{tag}</span>
                    <ArrowUpRight size={14} className="text-muted-foreground/0 group-hover:text-amber-500 transition-all duration-200" />
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* What friends & colleagues say */}
          <FadeIn>
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2">
                What colleagues & friends say
              </p>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold">In Their Own Words</h3>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                quote: "There is no one truly more deserving of this honour than Shaibu Husseini. Anywhere you put him, he will excel because he is so multi-talented that I cannot quantify how his experience spans.",
                name: "Egor Kelly",
                role: "British-Nigerian Filmmaker",
              },
              {
                quote: "Give the man his flowers. I cannot explain how ecstatic I am — this particular appointment sweet my bele pass. My friend. My brother.",
                name: "Egor Kelly",
                role: "British-Nigerian Filmmaker",
              },
              {
                quote: "A guru in Nigeria's film industry — his appointment is the most fitting recognition of decades of selfless service to culture and the arts.",
                name: "Mrs. Bunmi Adeniji",
                role: "Industry Observer",
              },
              {
                quote: "The appointment is well deserved. Dr. Husseini has consistently championed the cause of film and theatre with scholarship and passion.",
                name: "Dr. Sola Balogun",
                role: "Dept. of Theatre Arts, FUOYE",
              },
              {
                quote: "Today, we celebrate an incredible leader, mentor, and visionary — a man who has given everything to the culture of this nation.",
                name: "NFVCB Staff Collective",
                role: "Birthday tribute, December 2024",
              },
              {
                quote: "A round peg in a round hole. The industry has needed someone with his exact blend of scholarship, journalism, and institutional experience at the helm.",
                name: "Nigerian Film Community",
                role: "Consensus on NFVCB appointment",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={(i % 3) * 0.1}>
                <div className="group h-full p-7 rounded-2xl border border-border/60 hover:border-amber-400/40 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Quote size={20} className="text-amber-400/50 mb-4 flex-shrink-0" />
                  <p className="text-sm leading-relaxed text-foreground/80 italic mb-5 flex-1">&ldquo;{item.quote}&rdquo;</p>
                  <div className="pt-4 border-t border-border/60">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE INTERLUDE 1 ── */}
      <div className="py-20 md:py-28 bg-zinc-950 dark:bg-zinc-900/70 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(251,191,36,0.06),transparent)]" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
          <FadeIn direction="none">
            <div className="text-center">
              <div className="text-amber-400/30 font-playfair text-[120px] leading-none select-none mb-[-40px]">&ldquo;</div>
              <p className="font-playfair text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed italic max-w-3xl mx-auto">
                I am an open book. Since the reward for hard work is more work, I commit to continue working tirelessly to promote and advance the cause of theatre and film arts in Nigeria.
              </p>
              <p className="mt-6 text-white/40 text-sm font-medium tracking-wider uppercase">On assumption of office & receiving the FTA Fellowship — pledging inclusive leadership</p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── EDUCATION ── */}
      <section id="education" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                  <GraduationCap size={12} /> Education
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-[1.1]">Academic Excellence</h2>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">A foundation of rigorous scholarship in Mass Communication, culminating in doctoral research on Nollywood.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { degree: "BSc — First Class", field: "Mass Communication", school: "Lagos State University", short: "LASU", num: "01" },
              { degree: "MSc — Distinction", field: "Mass Communication", school: "University of Lagos", short: "UNILAG", num: "02" },
              { degree: "PhD", field: "Mass Communication", school: "University of Lagos", thesis: "Structure of Film Production Companies in Nollywood", short: "UNILAG", num: "03" },
            ].map((edu, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="group relative h-full p-8 rounded-2xl border border-border/60 hover:border-amber-400/50 bg-card hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-6 right-6 font-playfair text-5xl font-bold text-border/60 dark:text-white/5 group-hover:text-amber-400/15 transition-colors duration-300 select-none">
                    {edu.num}
                  </div>
                  <div className="relative">
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.15em] mb-3">{edu.field}</p>
                    <h3 className="font-playfair text-2xl font-bold leading-tight mb-1">{edu.degree}</h3>
                    <p className="text-muted-foreground text-sm">{edu.school}</p>
                    {edu.thesis && (
                      <div className="mt-5 pt-5 border-t border-border/60">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Doctoral Thesis</p>
                        <p className="text-sm italic text-foreground/75 leading-relaxed">&ldquo;{edu.thesis}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT POSITION ── */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/90 to-orange-600/90" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_0%_50%,rgba(255,255,255,0.12),transparent)]" />
              <div className="relative p-10 md:p-16 lg:p-20">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider mb-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Current Position
                    </div>
                    <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      Executive Director / CEO<br />
                      <span className="text-white/80">NFVCB, Nigeria</span>
                    </h2>
                    <p className="mt-5 text-white/75 text-lg leading-relaxed">
                      Appointed <strong className="text-white font-semibold">January 12, 2024</strong> by President Bola Ahmed Tinubu. Assumed office <strong className="text-white font-semibold">March 6, 2024</strong>. Charged with making Nigeria&apos;s creative sector more vibrant and robust.
                    </p>
                  </div>
                  <a href="https://www.nfvcb.gov.ng" target="_blank" rel="noopener noreferrer"
                    className="group flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-2xl">
                    nfvcb.gov.ng
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CAREER ── */}
      <section id="career" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn className="mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                <Briefcase size={12} /> Career History
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-[1.1]">Three Decades of<br />Distinguished Service</h2>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-0">
            {[
              { title: "Editor-at-Large", org: "The Guardian Nigeria", sub: "Culture, Theatre & Film Desk", detail: "Over 3 decades of authoritative cultural journalism" },
              { title: "Senior Teaching & Research Fellow", org: "University of Lagos", sub: "Department of Mass Communication" },
              { title: "Director of Dance & Music", org: "National Troupe of Nigeria", sub: "Also — Head, Strategic Communication Unit" },
              { title: "Secretary, Governing Board", org: "National Theatre / National Troupe", sub: "2011–2015" },
              { title: "Special Assistant to the Director General", org: "National Theatre / National Troupe" },
              { title: "Pioneer Artiste & Member", org: "National Dance Troupe of Nigeria" },
              { title: "Contributor / Broadcaster", org: "Mainland FM 98.3", sub: "Village Square Programme" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex gap-5 py-7 border-b border-border/50 hover:border-amber-400/40 transition-colors duration-200 ${i % 2 === 0 ? "" : "lg:border-l lg:pl-8 lg:border-b lg:border-l-border/50"}`}>
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-amber-400 bg-background flex items-center justify-center transition-colors duration-200">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 group-hover:bg-amber-400 transition-colors duration-200" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground leading-snug">{item.title}</h3>
                  <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mt-0.5">{item.org}</p>
                  {item.sub && <p className="text-muted-foreground text-sm mt-1">{item.sub}</p>}
                  {item.detail && <p className="text-muted-foreground text-xs mt-1.5 italic">{item.detail}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILM INDUSTRY ── */}
      <section id="film" className="py-24 md:py-36 bg-zinc-950 dark:bg-zinc-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,191,36,0.07),transparent)]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
          <FadeIn className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                  <Film size={12} /> Film Industry
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-[1.1]">A Pillar of<br />African Cinema</h2>
              </div>
              <p className="text-white/45 max-w-xs leading-relaxed text-sm">
                Described as <span className="text-white/70 italic">&ldquo;one of the most consistent documentarists of Nollywood&rdquo;</span>
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🏆", title: "Golden Globe Voting Member", desc: "International voting member of the prestigious Golden Globe Awards" },
              { icon: "🎬", title: "Berlin Film Festival Consultant", desc: "Official consultant to the Berlin International Film Festival (Berlinale)" },
              { icon: "🌍", title: "AMAA Selection Chair", desc: "Chaired the Selection Committee of the Africa Movie Academy Awards for 16 consecutive years" },
              { icon: "🎞️", title: "AMAA Jury Member", desc: "Member of the AMAA Jury adjudicating Africa's finest cinematic work" },
              { icon: "🎥", title: "Nigeria Oscar Selection Committee", desc: "Former member of Nigeria's Official Selection Committee for the Academy Awards" },
              { icon: "📽️", title: "Mainframe Film Institute Board", desc: "Board member of the institute run by legendary director Tunde Kelani" },
              { icon: "🎦", title: "In-Short Film Festival Board", desc: "Board member of the In-Short International Film Festival" },
              { icon: "💰", title: "BOI Nollywood Fund Board", desc: "Board member of Bank of Industry's dedicated Nollywood Fund" },
              { icon: "🗣️", title: "NECLive 2025 Panelist", desc: "Featured panelist at the Nigeria Economic Summit — Creative Economy track" },
            ].map((item, i) => (
              <FadeIn key={i} delay={(i % 3) * 0.08}>
                <div className="group p-6 rounded-2xl border border-white/8 hover:border-amber-400/40 bg-white/3 hover:bg-white/6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="text-2xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-amber-300 transition-colors">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS & LEADERSHIP ── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Publications */}
            <div>
              <FadeIn direction="left" className="mb-10">
                <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                  <BookOpen size={12} /> Publications
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold">Academic & Literary Work</h2>
              </FadeIn>
              <div className="space-y-5">
                {[
                  { year: "2010", type: "Monograph", title: "Moviedom: The Nollywood Narratives", desc: "A groundbreaking monograph documenting the pioneers of Nigeria's film and video industry — an invaluable archive of Nollywood's formative era." },
                  { year: "2024", type: "NFVCB Publications", title: "Three Decades of Film Classification", desc: "Contributed to three landmark NFVCB publications marking the board's 30th anniversary, covering Nigeria's classified and censored films." },
                ].map((pub, i) => (
                  <FadeIn key={i} direction="left" delay={i * 0.1}>
                    <div className="group p-7 rounded-2xl border border-border/60 hover:border-amber-400/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{pub.type} · {pub.year}</span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold leading-snug mb-3">{pub.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{pub.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* International Leadership */}
            <div>
              <FadeIn direction="right" className="mb-10">
                <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                  <Globe2 size={12} /> Global Leadership
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold">International Programmes</h2>
              </FadeIn>
              <div className="space-y-5">
                {[
                  { flag: "🇺🇸", title: "United States International Visitors Leadership Programme", org: "U.S. Department of State", desc: "Selected as part of the prestigious exchange programme connecting emerging global leaders with American institutions." },
                  { flag: "🇬🇧", title: "AIG-Public Leaders Programme", org: "Blavatnik School of Governance, University of Oxford", desc: "Advanced leadership training at one of the world's foremost institutions for public policy and governance." },
                ].map((item, i) => (
                  <FadeIn key={i} direction="right" delay={i * 0.12}>
                    <div className="group p-7 rounded-2xl border border-border/60 hover:border-amber-400/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
                      <div className="flex gap-4 items-start">
                        <span className="text-4xl flex-shrink-0">{item.flag}</span>
                        <div>
                          <h3 className="font-semibold leading-snug mb-1">{item.title}</h3>
                          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">{item.org}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section id="awards" className="py-24 md:py-36 bg-gradient-to-b from-background to-amber-50/40 dark:to-amber-900/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
              <Trophy size={12} /> Awards & Honours
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">Recognised by Peers<br />& Industry</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏅",
                title: "Fellow of Theatre Profession (FTA)",
                org: "NANTAP",
                date: "February 22, 2025",
                desc: "Conferred at Glover Hall, Lagos, in recognition of outstanding contributions to theatre, dance, film journalism, cultural advocacy, and administration.",
                featured: true,
              },
              {
                icon: "🎖️",
                title: "Recognition Award",
                org: "Nollywood Film Festival, Germany",
                date: "2014",
                desc: "Awarded for significant and sustained contributions to the Nigerian film industry on the international stage.",
              },
              {
                icon: "🌟",
                title: "Industry Birthday Tribute",
                org: "NFVCB Staff & Nigerian Film Community",
                date: "Ongoing",
                desc: "Celebrated as \"An incredible leader, mentor, and visionary\" by colleagues and the Nollywood community.",
              },
            ].map((award, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`group relative p-8 rounded-2xl h-full border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl
                  ${award.featured
                    ? "border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/10 shadow-lg shadow-amber-500/10"
                    : "border-border/60 bg-card hover:border-amber-400/40 hover:shadow-amber-500/5"}`}>
                  {award.featured && (
                    <div className="absolute top-5 right-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
                        <Star size={10} fill="white" /> Latest
                      </span>
                    </div>
                  )}
                  <div className="text-4xl mb-5">{award.icon}</div>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">{award.org} · {award.date}</p>
                  <h3 className="font-playfair text-xl font-bold leading-snug mb-3">{award.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{award.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn className="mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                <Rocket size={12} /> Achievements
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-[1.1]">Transforming Nigeria&apos;s<br />Film Landscape</h2>
              <p className="mt-4 text-muted-foreground max-w-lg">Since March 2024, Dr. Husseini has driven sweeping reforms across the NFVCB.</p>
            </div>
          </FadeIn>

          {/* Bento grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
            {[
              { icon: "🔄", title: "Censorship → Classification", desc: "Modernised Nigeria's regulatory approach to align with global standards, shifting from censorship to a progressive classification model.", size: "lg" },
              { icon: "💻", title: "Digitalisation Drive", desc: "Led the full transition from analogue to digital processes across all NFVCB classification operations.", size: "sm" },
              { icon: "🚫", title: "Content Standards Campaign", desc: "Nationwide NGO-backed campaign against harmful depictions of rituals, cigarettes, and alcohol.", size: "sm" },
              { icon: "👥", title: "Staff Empowerment", desc: "Empowered 465 NFVCB staff across 6 zonal offices and 26 state centres nationwide.", size: "sm" },
              { icon: "🎬", title: "Nollywood Box Office", desc: "Nigerian films now consistently outperforming foreign films at the local box office.", size: "lg" },
              { icon: "🤝", title: "Stakeholder Engagement", desc: "Deepened collaboration with producers, skit makers, cinema operators, and government agencies.", size: "sm" },
              { icon: "🛡️", title: "Anti-Piracy Collaboration", desc: "Partnered with NCC to tackle digital piracy and protect Nigerian creators.", size: "sm" },
              { icon: "🏛️", title: "PAO NDCRC Elevation", desc: "Elevated a board event into a national conference hosted at Sheraton Four Points and MUSON Centre.", size: "sm" },
              { icon: "🏘️", title: "Ekiti Film Village", desc: "Pledged technical support to Ekiti State Government for their film village development.", size: "sm" },
            ].map((item, i) => (
              <FadeIn key={i} delay={(i % 4) * 0.07}
                className={item.size === "lg" ? "col-span-2" : "col-span-1"}>
                <motion.div whileHover={{ scale: 1.015 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="group p-6 md:p-7 rounded-2xl border border-border/60 hover:border-amber-400/50 bg-card hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 h-full">
                  <div className="text-2xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE INTERLUDE 2 ── */}
      <div className="py-20 md:py-28 bg-zinc-950 dark:bg-zinc-900/70 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(251,191,36,0.05),transparent)]" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <FadeIn direction="none">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {[
                { quote: "We should no longer be doing analogue at a time when we should be talking about digital.", context: "On NFVCB's modernisation agenda" },
                { quote: "Since the reward for hard work is more work, I commit to continue working tirelessly to promote and advance the cause of theatre and film arts in Nigeria.", context: "On receiving the FTA Fellowship" },
              ].map((item, i) => (
                <div key={i} className={`flex-1 ${i === 1 ? "md:pt-10 md:border-l md:border-white/10 md:pl-16" : ""}`}>
                  <Quote size={20} className="text-amber-400/50 mb-4" />
                  <p className="font-playfair text-xl md:text-2xl font-medium text-white italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-4 text-white/35 text-xs font-medium tracking-wider uppercase">{item.context}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── AFFILIATIONS ── */}
      <section id="contact" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
              <Link2 size={12} /> Affiliations
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">Institutional Connections</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { name: "NFVCB", full: "National Film and Video Censors Board", role: "Executive Director / CEO", url: "https://www.nfvcb.gov.ng" },
              { name: "UNILAG", full: "University of Lagos", role: "Senior Research Fellow" },
              { name: "The Guardian", full: "The Guardian Nigeria", role: "Editor-at-Large" },
              { name: "AMAA", full: "Africa Movie Academy Awards", role: "Selection Chair (16 years)" },
              { name: "Golden Globes", full: "Golden Globe Awards", role: "International Voting Member" },
              { name: "Berlinale", full: "Berlin International Film Festival", role: "Official Consultant" },
            ].map((aff, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                {aff.url ? (
                  <a href={aff.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-start justify-between p-6 rounded-2xl border border-border/60 hover:border-amber-400/60 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <h3 className="font-bold text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{aff.name}</h3>
                      <p className="text-muted-foreground text-xs mt-0.5 leading-snug">{aff.full}</p>
                      <p className="text-xs font-medium text-amber-600/70 dark:text-amber-400/70 mt-2">{aff.role}</p>
                    </div>
                    <ArrowUpRight size={15} className="text-muted-foreground/0 group-hover:text-amber-500 flex-shrink-0 mt-0.5 transition-all duration-200" />
                  </a>
                ) : (
                  <div className="flex items-start justify-between p-6 rounded-2xl border border-border/60 hover:border-amber-400/40 bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div>
                      <h3 className="font-bold text-base">{aff.name}</h3>
                      <p className="text-muted-foreground text-xs mt-0.5 leading-snug">{aff.full}</p>
                      <p className="text-xs font-medium text-amber-600/70 dark:text-amber-400/70 mt-2">{aff.role}</p>
                    </div>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/40 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-playfair font-bold text-base">Dr. Shaibu Husseini</p>
              <p className="text-muted-foreground text-sm mt-0.5">
                Executive Director / CEO —{" "}
                <a href="https://www.nfvcb.gov.ng" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors underline underline-offset-2">
                  NFVCB Nigeria
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/igalaman" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                @igalaman
              </a>
              <a href="https://www.facebook.com/shaibu.husseini.7" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </a>
              <a href="https://www.linkedin.com/in/husseini-shaibu" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
