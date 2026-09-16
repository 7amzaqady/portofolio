import { useEffect, useRef } from "react"
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
    className: "experience-card experience-card-right-bottom",
  },
  {
    year: "2024 — 2025",
    org: "BADR AL-DIN AL-HUSAYNI SCHOOL — SYRIA",
    role: "IT & Robotics Instructor",
    description:
      "Teaching IT and introductory programming through practical robotics activities built around creative problem solving.",
    className: "experience-card experience-card-right",
  },
  {
    year: "2025",
    org: "TAKAFUL AL-SHAM ORGANIZATION — SYRIA",
    role: "Field Volunteer",
    description:
      "Supporting field activities for crisis-affected communities while working across a multi-task team toward program goals.",
    className: "experience-card experience-card-left-bottom",
  },
]

function App() {
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
    <div ref={rootRef} className="portfolio-shell">
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
            <a className="nav-link" href="#experience">Experience</a>
            <span className="nav-link nav-link-pending" aria-label="Selected Work, coming next">Selected Work</span>
            <span className="nav-link nav-link-pending" aria-label="About, coming next">About</span>
            <a className="nav-link" href="mailto:7amzaqady@gmail.com">Contact</a>
          </div>

          <Button asChild size="nav" className="hidden sm:inline-flex">
            <a href="mailto:7amzaqady@gmail.com">Start a Project</a>
          </Button>
        </nav>

        <div ref={contentRef} className="hero-content">
          <p data-kicker data-reveal className="hero-kicker">
            Visual Identity Designer <span aria-hidden="true">×</span> Frontend Developer
          </p>

          <h1 className="hero-title" aria-label="I shape identities into digital experiences.">
            <span className="title-mask">
              <span data-hero-line data-reveal>I shape identities</span>
            </span>
            <span className="title-mask title-muted">
              <span data-hero-line data-reveal>into digital experiences.</span>
            </span>
          </h1>

          <p data-subcopy data-reveal className="hero-copy">
            Blending visual identity, creative frontend development, and AI-assisted
            creative technology to turn ideas into distinctive digital experiences.
          </p>

          <div ref={magneticRef} data-cta data-reveal className="hero-actions magnetic-action">
            <Button asChild size="hero" className="group">
              <a href="#experience">
                Explore My Journey
                <ArrowDownRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </div>

        <div data-footer-note data-reveal className="hero-footer-note" aria-hidden="true">
          <span>Brand Systems</span>
          <span className="note-dot" />
          <span>Creative Frontend</span>
          <span className="note-dot" />
          <span>AI-Assisted Creative Technology</span>
        </div>
      </main>

      <section ref={experienceRef} id="experience" className="experience-section" aria-labelledby="experience-title">
        <div ref={experienceStageRef} className="experience-stage">
          <div className="experience-image experience-image-dark" aria-hidden="true" />
          <div ref={revealRef} className="experience-image experience-image-bright" aria-hidden="true" />
          <div className="experience-vignette" aria-hidden="true" />

          <header data-experience-title data-experience-reveal className="experience-heading">
            <p className="experience-eyebrow">02 / EXPERIENCE</p>
            <h2 id="experience-title">A journey built through practice.</h2>
            <p className="experience-intro">
              Move through the scene to reveal the light — each chapter marks a place where design,
              technology, teaching, and teamwork became part of the work.
            </p>
          </header>

          <div className="experience-cards">
            {experiences.map((experience) => (
              <article
                key={`${experience.year}-${experience.org}`}
                data-experience-card
                data-experience-reveal
                className={experience.className}
              >
                <span className="experience-year">{experience.year}</span>
                <h3>{experience.org}</h3>
                <p className="experience-role">{experience.role}</p>
                <p className="experience-description">{experience.description}</p>
              </article>
            ))}
          </div>

          <div className="experience-hint" aria-hidden="true">
            <span className="experience-hint-dot" />
            Move the light
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
