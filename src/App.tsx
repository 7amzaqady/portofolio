import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

const LOOP_BLEND_SECONDS = 1.35

const experiences = [
  {
    year: "2025 — PRESENT",
    org: "TMAKIN FOUNDATION — SYRIA",
    role: "Trainer & Co-Founder",
    description:
      "Training mosque students in practical AI and computer skills, alongside robotics design and programming.",
    arOrg: "مؤسسة تمكين — سوريا",
    arRole: "مدرّب وشريك مؤسس",
    arDescription: "تدريب طلاب المساجد على مهارات الحاسوب والاستخدام العملي للذكاء الاصطناعي، إلى جانب تصميم وبرمجة الروبوتات.",
    className: "experience-card experience-card-right-bottom",
  },
  {
    year: "2024 — 2025",
    org: "BADR AL-DIN AL-HUSAYNI SCHOOL — SYRIA",
    role: "IT & Robotics Instructor",
    description:
      "Teaching IT and introductory programming through practical robotics activities built around creative problem solving.",
    arOrg: "مدرسة بدر الدين الحسني — سوريا",
    arRole: "مدرّس تكنولوجيا معلومات وروبوتكس",
    arDescription: "تدريس مفاهيم تكنولوجيا المعلومات والبرمجة التمهيدية من خلال أنشطة عملية في تصميم وبرمجة الروبوتات.",
    className: "experience-card experience-card-right",
  },
  {
    year: "2025",
    org: "TAKAFUL AL-SHAM ORGANIZATION — SYRIA",
    role: "Field Volunteer",
    description:
      "Supporting field activities for crisis-affected communities while working across a multi-task team toward program goals.",
    arOrg: "منظمة تكافل الشام — سوريا",
    arRole: "متطوّع ميداني",
    arDescription: "دعم الأنشطة الميدانية للمجتمعات المتضررة من الأزمات والعمل ضمن فريق متعدد المهام لتحقيق أهداف البرامج.",
    className: "experience-card experience-card-left-bottom",
  },
]

const capabilities = [
  { number: "01", title: "Visual Identity", arTitle: "الهوية البصرية", text: "Building distinct visual systems that give ideas a clear voice, rhythm, and presence.", arText: "بناء أنظمة بصرية مميزة تمنح الأفكار صوتًا واضحًا وحضورًا متماسكًا." },
  { number: "02", title: "Creative Frontend", arTitle: "تطوير الواجهات الإبداعية", text: "Turning identity into responsive digital experiences with detail, motion, and personality.", arText: "تحويل الهوية إلى تجارب رقمية متجاوبة مليئة بالتفاصيل والحركة والشخصية." },
  { number: "03", title: "AI-Assisted Creative Tech", arTitle: "التقنية الإبداعية بالذكاء الاصطناعي", text: "Using emerging tools to explore faster, prototype further, and make ambitious ideas tangible.", arText: "استخدام الأدوات الحديثة للاستكشاف بشكل أسرع وتحويل الأفكار الطموحة إلى نماذج ملموسة." },
  { number: "04", title: "Teaching & Robotics", arTitle: "التعليم والروبوتكس", text: "Making technology practical, approachable, and exciting through hands-on learning.", arText: "تبسيط التقنية وجعلها عملية وممتعة من خلال التعلم التطبيقي." },
]

const selectedWork = [
  { number: "01", type: "COMING SOON / BRAND SYSTEM", arType: "قريبًا / نظام هوية", title: "A visual language in progress.", arTitle: "لغة بصرية قيد البناء.", text: "Selected identity, interface, and creative technology work will live here.", arText: "ستظهر هنا نماذج مختارة من أعمال الهوية والواجهات والتقنية الإبداعية." },
  { number: "02", type: "CASE STUDY / DIGITAL EXPERIENCE", arType: "دراسة حالة / تجربة رقمية", title: "From idea to interaction.", arTitle: "من الفكرة إلى التفاعل.", text: "A closer look at the thinking, making, and refinement behind each project.", arText: "نظرة أقرب إلى التفكير والتنفيذ والتحسين خلف كل مشروع." },
  { number: "03", type: "EXPERIMENT / AI + FRONTEND", arType: "تجربة / ذكاء اصطناعي وواجهات", title: "Experiments with a point of view.", arTitle: "تجارب لها وجهة نظر.", text: "Small explorations that become tools, systems, and new ways to communicate.", arText: "استكشافات صغيرة تتحول إلى أدوات وأنظمة وطرق جديدة للتواصل." },
]

const processSteps = [
  { number: "01", title: "Discover", arTitle: "اكتشف", text: "Understand the context, audience, and opportunity.", arText: "فهم السياق والجمهور والفرصة." },
  { number: "02", title: "Shape", arTitle: "شكّل", text: "Find the idea and give it a visual system.", arText: "إيجاد الفكرة ومنحها نظامًا بصريًا." },
  { number: "03", title: "Build", arTitle: "ابنِ", text: "Turn the direction into a living digital experience.", arText: "تحويل التوجه إلى تجربة رقمية حيّة." },
  { number: "04", title: "Refine", arTitle: "طوّر", text: "Test, polish, and make every detail feel intentional.", arText: "اختبار كل تفصيل وصقله ليكون مقصودًا." },
]

function App() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const isArabic = language === "ar"
  const t = (english: string, arabic: string) => (isArabic ? arabic : english)
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const videoStageRef = useRef<HTMLDivElement>(null)
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const magneticRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const experienceStageRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const hero = heroRef.current
    const videoStage = videoStageRef.current
    const videoA = videoARef.current
    const videoB = videoBRef.current
    const content = contentRef.current
    const magnetic = magneticRef.current
    const experience = experienceRef.current
    const experienceStage = experienceStageRef.current
    const reveal = revealRef.current

    if (!hero || !videoStage || !videoA || !videoB || !content || !experience || !experienceStage || !reveal) {
      return
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const heroCtx = gsap.context(() => {
      if (!reduceMotion.matches) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.from("[data-nav]", {
          y: -14,
          opacity: 0,
          duration: 0.7,
        })
          .from(
            "[data-kicker]",
            { y: 16, opacity: 0, duration: 0.65 },
            "-=0.25",
          )
          .from(
            "[data-hero-line]",
            {
              yPercent: 120,
              opacity: 0,
              duration: 1.05,
              stagger: 0.12,
            },
            "-=0.2",
          )
          .from(
            "[data-subcopy]",
            { y: 18, opacity: 0, duration: 0.75 },
            "-=0.35",
          )
          .from(
            "[data-cta]",
            { y: 18, opacity: 0, duration: 0.7 },
            "-=0.45",
          )
          .from(
            "[data-footer-note]",
            { opacity: 0, duration: 0.6 },
            "-=0.35",
          )

        gsap.fromTo(
          videoStage,
          { scale: 1.08 },
          { scale: 1.055, duration: 2.6, ease: "power2.out" },
        )
      } else {
        gsap.set(videoStage, { scale: 1.055 })
      }
    }, hero)

    let activeVideo: 0 | 1 = 0
    let crossfading = false
    const videos = [videoA, videoB] as const

    gsap.set(videoA, { opacity: 1 })
    gsap.set(videoB, { opacity: 0 })

    const startVideo = (video: HTMLVideoElement) => {
      void video.play().catch(() => undefined)
    }

    const resetVideo = (video: HTMLVideoElement) => {
      video.pause()
      try {
        video.currentTime = 0
      } catch {
        // Browsers can reject seeking before metadata is ready.
      }
    }

    const beginCrossfade = () => {
      if (crossfading || document.hidden) return

      const from = videos[activeVideo]
      const nextIndex: 0 | 1 = activeVideo === 0 ? 1 : 0
      const to = videos[nextIndex]
      crossfading = true

      try {
        to.currentTime = 0
      } catch {
        // Playback will still begin from the start once metadata settles.
      }
      startVideo(to)

      gsap.killTweensOf([from, to])
      gsap.set(to, { opacity: 0 })

      gsap.to(to, {
        opacity: 1,
        duration: LOOP_BLEND_SECONDS,
        ease: "power1.inOut",
      })

      gsap.to(from, {
        opacity: 0,
        duration: LOOP_BLEND_SECONDS,
        ease: "power1.inOut",
        onComplete: () => {
          resetVideo(from)
          activeVideo = nextIndex
          crossfading = false
        },
      })
    }

    const onTimeUpdate = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement
      if (video !== videos[activeVideo] || crossfading) return
      if (!Number.isFinite(video.duration) || video.duration <= 0) return

      const remaining = video.duration - video.currentTime
      if (remaining <= LOOP_BLEND_SECONDS + 0.08) beginCrossfade()
    }

    const onEnded = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement
      if (video === videos[activeVideo] && !crossfading) beginCrossfade()
    }

    videoA.addEventListener("timeupdate", onTimeUpdate)
    videoB.addEventListener("timeupdate", onTimeUpdate)
    videoA.addEventListener("ended", onEnded)
    videoB.addEventListener("ended", onEnded)
    startVideo(videoA)

    let cleanupHeroPointer = () => {}
    let cleanupExperiencePointer = () => {}

    if (!reduceMotion.matches) {
      const stageX = gsap.quickTo(videoStage, "x", { duration: 1.15, ease: "power3.out" })
      const stageY = gsap.quickTo(videoStage, "y", { duration: 1.15, ease: "power3.out" })
      const contentX = gsap.quickTo(content, "x", { duration: 0.85, ease: "power3.out" })
      const contentY = gsap.quickTo(content, "y", { duration: 0.85, ease: "power3.out" })

      const onHeroPointerMove = (event: PointerEvent) => {
        const rect = hero.getBoundingClientRect()
        if (event.clientY < rect.top || event.clientY > rect.bottom) return

        const nx = event.clientX / window.innerWidth - 0.5
        const ny = event.clientY / window.innerHeight - 0.5
        stageX(nx * -20)
        stageY(ny * -12)
        contentX(nx * 6)
        contentY(ny * 4)
      }

      const resetHeroParallax = () => {
        stageX(0)
        stageY(0)
        contentX(0)
        contentY(0)
      }

      const onMagneticMove = (event: PointerEvent) => {
        if (!magnetic) return
        const rect = magnetic.getBoundingClientRect()
        const x = event.clientX - (rect.left + rect.width / 2)
        const y = event.clientY - (rect.top + rect.height / 2)
        gsap.to(magnetic, {
          x: x * 0.12,
          y: y * 0.16,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        })
      }

      const onMagneticLeave = () => {
        if (!magnetic) return
        gsap.to(magnetic, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        })
      }

      window.addEventListener("pointermove", onHeroPointerMove, { passive: true })
      hero.addEventListener("pointerleave", resetHeroParallax)
      magnetic?.addEventListener("pointermove", onMagneticMove)
      magnetic?.addEventListener("pointerleave", onMagneticLeave)

      cleanupHeroPointer = () => {
        window.removeEventListener("pointermove", onHeroPointerMove)
        hero.removeEventListener("pointerleave", resetHeroParallax)
        magnetic?.removeEventListener("pointermove", onMagneticMove)
        magnetic?.removeEventListener("pointerleave", onMagneticLeave)
      }

    }

    let revealFrame = 0

    const updateExperienceReveal = (event: PointerEvent) => {
      const rect = experienceStage.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width)
      const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)

      cancelAnimationFrame(revealFrame)
      revealFrame = requestAnimationFrame(() => {
        experienceStage.style.setProperty("--glow-x", `${x}px`)
        experienceStage.style.setProperty("--glow-y", `${y}px`)
        experienceStage.style.setProperty("--glow-opacity", "1")
      })
    }

    const hideExperienceReveal = () => {
      cancelAnimationFrame(revealFrame)
      experienceStage.style.setProperty("--glow-opacity", "0")
    }

    experienceStage.addEventListener("pointerenter", updateExperienceReveal)
    experienceStage.addEventListener("pointermove", updateExperienceReveal, { passive: true })
    experienceStage.addEventListener("pointerleave", hideExperienceReveal)

    cleanupExperiencePointer = () => {
      cancelAnimationFrame(revealFrame)
      experienceStage.removeEventListener("pointerenter", updateExperienceReveal)
      experienceStage.removeEventListener("pointermove", updateExperienceReveal)
      experienceStage.removeEventListener("pointerleave", hideExperienceReveal)
    }

    const experienceCtx = gsap.context(() => {
      if (reduceMotion.matches) {
        gsap.set("[data-experience-reveal]", { clearProps: "all" })
        return
      }

      gsap.from("[data-experience-title]", {
        y: 34,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: experience,
          start: "top 70%",
          once: true,
        },
      })

      gsap.from("[data-experience-card]", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: experience,
          start: "top 58%",
          once: true,
        },
      })

      gsap.from("[data-reveal-card]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-reveal-card]",
          start: "top 82%",
          once: true,
        },
      })

      gsap.fromTo(
        experienceStage,
        { scale: 1.035 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: experience,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      )
    }, experience)

    const onVisibility = () => {
      if (document.hidden) {
        videoA.pause()
        videoB.pause()
        return
      }

      startVideo(videos[activeVideo])
      if (crossfading) startVideo(videos[activeVideo === 0 ? 1 : 0])
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cleanupHeroPointer()
      cleanupExperiencePointer()
      document.removeEventListener("visibilitychange", onVisibility)
      videoA.removeEventListener("timeupdate", onTimeUpdate)
      videoB.removeEventListener("timeupdate", onTimeUpdate)
      videoA.removeEventListener("ended", onEnded)
      videoB.removeEventListener("ended", onEnded)
      resetVideo(videoA)
      resetVideo(videoB)
      gsap.killTweensOf([videoA, videoB, videoStage, content, magnetic, reveal, experienceStage])
      for (const trigger of ScrollTrigger.getAll()) trigger.kill()
      heroCtx.revert()
      experienceCtx.revert()
    }
  }, [])

  return (
    <div ref={rootRef} className={`portfolio-shell ${isArabic ? "is-arabic" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      <main ref={heroRef} id="hero" className="hero-shell">
        <div ref={videoStageRef} className="hero-video-stage" aria-hidden="true">
          <video
            ref={videoARef}
            className="hero-video hero-video-a"
            autoPlay
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <video
            ref={videoBRef}
            className="hero-video hero-video-b"
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>

        <nav data-nav className="hero-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="#hero" aria-label="Hamza Al-Qadi home">
            HAMZA AL-QADI
          </a>

          <div className="nav-links" aria-label="Portfolio navigation">
            <a className="nav-link nav-link-active" href="#hero">Home</a>
            <a className="nav-link" href="#work">{t("Work", "الأعمال")}</a>
            <a className="nav-link" href="#capabilities">{t("Capabilities", "القدرات")}</a>
            <a className="nav-link" href="#experience">{t("Experience", "الخبرة")}</a>
            <a className="nav-link" href="mailto:7amzaqady@gmail.com">{t("Contact", "تواصل")}</a>
          </div>

          <Button asChild size="nav" className="hidden sm:inline-flex">
            <a href="mailto:7amzaqady@gmail.com">{t("Start a Project", "ابدأ مشروعًا")}</a>
          </Button>
          <button className="language-toggle" type="button" onClick={() => setLanguage(isArabic ? "en" : "ar")} aria-label={t("Switch to Arabic", "التبديل إلى الإنجليزية")}>
            {isArabic ? "EN" : "عربي"}
          </button>
        </nav>

        <div ref={contentRef} className="hero-content">
          <p data-kicker data-reveal className="hero-kicker">
            {t("Visual Identity Designer", "مصمم هويات بصرية")} <span aria-hidden="true">×</span> {t("Frontend Developer", "مطور واجهات أمامية")}
          </p>

          <h1 className="hero-title" aria-label="I shape identities into digital experiences.">
            <span className="title-mask">
              <span data-hero-line data-reveal>{t("I shape identities", "أصوغ الهويات")}</span>
            </span>
            <span className="title-mask title-muted">
              <span data-hero-line data-reveal>{t("into digital experiences.", "لتصبح تجارب رقمية.")}</span>
            </span>
          </h1>

          <p data-subcopy data-reveal className="hero-copy">
            {t("Blending visual identity, creative frontend development, and AI-assisted creative technology to turn ideas into distinctive digital experiences.", "أجمع بين الهوية البصرية وتطوير الواجهات الإبداعية والتقنية المدعومة بالذكاء الاصطناعي لتحويل الأفكار إلى تجارب رقمية مميزة.")}
          </p>

          <div ref={magneticRef} data-cta data-reveal className="hero-actions magnetic-action">
            <Button asChild size="hero" className="group">
              <a href="#work">
                {t("View Selected Work", "شاهد الأعمال المختارة")}
                <ArrowDownRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </div>

        <div data-footer-note data-reveal className="hero-footer-note" aria-hidden="true">
          <span>{t("Brand Systems", "أنظمة العلامة")}</span>
          <span className="note-dot" />
          <span>{t("Creative Frontend", "واجهات إبداعية")}</span>
          <span className="note-dot" />
          <span>{t("AI-Assisted Creative Technology", "تقنية إبداعية بالذكاء الاصطناعي")}</span>
        </div>
      </main>

      <section className="positioning-section" aria-labelledby="positioning-title">
        <div className="section-label">01 / {t("THE POINT OF VIEW", "وجهة النظر")}</div>
        <h2 id="positioning-title">{t("I make ideas", "أجعل الأفكار")} <em>{t("feel real.", "ملموسة.")}</em></h2>
        <p>{t("Identity, interface, and technology come together when the details carry the same intention as the idea.", "تلتقي الهوية والواجهة والتقنية عندما تحمل التفاصيل نفس نية الفكرة.")}</p>
        <div className="positioning-tags" aria-label="Areas of practice">
          <span>{t("IDENTITY", "هوية")}</span><span>{t("INTERFACE", "واجهة")}</span><span>{t("EXPERIMENT", "تجربة")}</span>
        </div>
      </section>

      <section id="work" className="work-section" aria-labelledby="work-title">
        <div className="section-heading-row">
          <div><div className="section-label">03 / {t("SELECTED WORK", "أعمال مختارة")}</div><h2 id="work-title">{t("Work with a point of view.", "أعمال لها وجهة نظر.")}</h2></div>
          <p>{t("Selected projects, case studies, and experiments will be added here as the portfolio grows.", "ستُضاف هنا المشاريع ودراسات الحالة والتجارب المختارة مع نمو البورتفوليو.")}</p>
        </div>
        <div className="work-grid">
          {selectedWork.map((project) => (
            <article className="work-card" data-reveal-card key={project.number}>
              <div className="work-card-visual"><span>{project.number}</span><ArrowDownRight aria-hidden="true" /></div>
              <p className="work-type">{isArabic ? project.arType : project.type}</p><h3>{isArabic ? project.arTitle : project.title}</h3><p>{isArabic ? project.arText : project.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities" className="capabilities-section" aria-labelledby="capabilities-title">
        <div className="section-label">04 / {t("CAPABILITIES", "القدرات")}</div><h2 id="capabilities-title">{t("A hybrid practice.", "ممارسة هجينة.")}</h2>
        <div className="capabilities-grid">
          {capabilities.map((capability) => <article className="capability-item" data-reveal-card key={capability.number}><span>{capability.number}</span><h3>{isArabic ? capability.arTitle : capability.title}</h3><p>{isArabic ? capability.arText : capability.text}</p></article>)}
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="section-label">05 / {t("PROCESS", "المنهج")}</div><h2 id="process-title">{t("Make it meaningful.", "اصنع معنى.")}</h2>
        <div className="process-grid">
          {processSteps.map((step) => <article className="process-step" data-reveal-card key={step.number}><span>{step.number}</span><h3>{isArabic ? step.arTitle : step.title}</h3><p>{isArabic ? step.arText : step.text}</p></article>)}
        </div>
      </section>

      <section className="about-strip" aria-labelledby="about-title">
        <div className="section-label">06 / {t("PROFILE & EDUCATION", "الملف والتعليم")}</div>
        <div className="about-grid">
          <div><h2 id="about-title">{t("Visual thinking, technical grounding.", "تفكير بصري، وأساس تقني.")}</h2><p>{t("Visual Identity Designer and Frontend Developer with a background in Communications and Electronics Engineering.", "مصمم هويات بصرية ومطور واجهات أمامية بخلفية في هندسة الاتصالات والإلكترونيات.")}</p></div>
          <div className="about-facts"><div><span>{t("EDUCATION", "التعليم")}</span><strong>{t("Damascus University", "جامعة دمشق")}</strong><p>{t("Communications & Electronics Engineering · 2023 — Present", "هندسة الاتصالات والإلكترونيات · 2023 — حتى الآن")}</p></div><div><span>{t("LANGUAGES", "اللغات")}</span><strong>{t("Arabic · Native", "العربية · اللغة الأم")}</strong><p>{t("English · B2 Upper-Intermediate", "الإنجليزية · B2 فوق المتوسط")}</p></div></div>
        </div>
      </section>

      <section ref={experienceRef} id="experience" className="experience-section" aria-labelledby="experience-title">
        <div ref={experienceStageRef} className="experience-stage">
          <div className="experience-atmosphere" aria-hidden="true">
            <span className="experience-orb experience-orb-one" />
            <span className="experience-orb experience-orb-two" />
            <span className="experience-orb experience-orb-three" />
            <span className="experience-ring experience-ring-one" />
            <span className="experience-ring experience-ring-two" />
            <span className="experience-grid-plane" />
          </div>
          <div ref={revealRef} className="experience-gif-wrap" aria-hidden="true">
            <img className="experience-gif" src="/portofolio/hero-mindloop-preview.gif" alt="" />
          </div>
          <header data-experience-title data-experience-reveal className="experience-heading">
            <p className="experience-eyebrow">02 / {t("EXPERIENCE", "الخبرة")}</p>
            <h2 id="experience-title">{t("Built through", "بُنيت عبر")} <em>{t("practice.", "الممارسة.")}</em></h2>
            <p className="experience-intro">{t("Every chapter shaped the way I think, make, and bring ideas to life — from teaching and robotics to creative technology.", "كل محطة شكّلت طريقة تفكيري وصنعِي وتحويلي للأفكار إلى واقع — من التعليم والروبوتكس إلى التقنية الإبداعية.")}</p>
          </header>
          <div className="experience-axis" aria-hidden="true" />
          <div className="experience-cards">
            {experiences.map((experience) => (
              <article key={`${experience.year}-${experience.org}`} data-experience-card data-experience-reveal className={experience.className}>
                <span className="experience-year">{experience.year}</span>
                <h3>{isArabic ? experience.arOrg : experience.org}</h3>
                <p className="experience-role">{isArabic ? experience.arRole : experience.role}</p>
                <p className="experience-description">{isArabic ? experience.arDescription : experience.description}</p>
              </article>
            ))}
          </div>
          <div className="experience-hint" aria-hidden="true">{t("A practice in progress", "ممارسة مستمرة")}</div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="section-label">07 / {t("CONTACT", "تواصل")}</div>
        <h2 id="contact-title">{t("Have an idea", "لديك فكرة")}<br /><em>{t("worth making?", "تستحق التنفيذ؟")}</em></h2>
        <a className="contact-link" href="mailto:7amzaqady@gmail.com">7amzaqady@gmail.com <ArrowDownRight aria-hidden="true" /></a>
        <div className="contact-footer"><span>HAMZA AL-QADI</span><span>{t("DESIGN × TECHNOLOGY", "تصميم × تقنية")}</span><span>© 2025</span></div>
      </section>
    </div>
  )
}

export default App
