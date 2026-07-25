"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Menu, 
  X, 
  Mail 
} from "lucide-react"
import { ThemeToggleButton } from "@/components/dashboard-layout/navbar/navbar-actions/ThemeToggleButton"

export function CurrentTime() {
  const currentYear = new Date().getFullYear()
  return <span>{currentYear}</span>
}

export default function LandingPage() {
  const [open, setOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const features = [
    {
      icon: CheckCircle2,
      title: "Task Organization",
      desc: "Create, structure, and prioritize your daily tasks effortlessly with real-time updates.",
    },
    {
      icon: User,
      title: "Personalized Profiles",
      desc: "Manage your personal workspace, track progress, and customize your user preferences.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Data Access",
      desc: "Your tasks and personal information stay protected with modern end-to-end security.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            TaskHub
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition hover:text-foreground">
              Features
            </a>
            <a href="#about" className="transition hover:text-foreground">
              About
            </a>
            <a href="#contact" className="transition hover:text-foreground">
              Contact
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggleButton />

            <Link
              href="/auth/login"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggleButton />

            <button
              aria-label="Toggle menu"
              className="rounded-lg p-2 text-foreground transition hover:bg-accent"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background px-6 pb-6 pt-2 text-sm font-medium md:hidden"
          >
            <div className="flex flex-col gap-4 text-muted-foreground">
              <a href="#features" onClick={() => setOpen(false)} className="hover:text-foreground">
                Features
              </a>
              <a href="#about" onClick={() => setOpen(false)} className="hover:text-foreground">
                About
              </a>
              <a href="#contact" onClick={() => setOpen(false)} className="hover:text-foreground">
                Contact
              </a>

              <hr className="border-border/60" />

              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-lg border border-border py-2 text-foreground"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-primary py-2 text-primary-foreground"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Soft Background Glows */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Smart Task Management</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl text-balance"
            >
              Organize your workflow with peak clarity
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance"
            >
              TaskHub simplifies task tracking and productivity. Keep your daily operations organized, clear, and perfectly structured in one place.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-7 py-3.5 font-medium transition hover:bg-accent hover:text-accent-foreground"
              >
                Explore Features
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="border-t border-border/40 bg-muted/20 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to stay on track
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with modern tools to help you manage tasks seamlessly without clutter.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="group relative rounded-2xl border border-border/80 bg-card p-8 shadow-xs transition hover:border-border hover:shadow-md"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">About TaskHub</h2>

          <p className="text-lg leading-relaxed text-muted-foreground">
            TaskHub is a modern productivity tool built with Next.js and Supabase. It prioritizes simplicity, clean interfaces, and fast interactions, letting you focus on completing tasks rather than managing software.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="border-t border-border/40 bg-muted/20 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Get in touch</h2>

          <p className="mb-8 text-muted-foreground">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>

          <a
            href="mailto:chitkokoaung1056@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" />
            Send Email
          </a>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden border-t border-border/60 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="relative mx-auto max-w-3xl px-6">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Start using TaskHub today
          </h2>

          <p className="mb-8 text-muted-foreground">
            Empower your workflow with simple, distraction-free task management.
          </p>

          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-medium text-primary-foreground shadow-md transition hover:bg-primary/90 hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-4 flex justify-center gap-6 font-medium">
            <a href="#about" className="transition hover:text-foreground">About</a>
            <a href="#contact" className="transition hover:text-foreground">Contact</a>
            <Link href="/privacy" className="transition hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="transition hover:text-foreground">Terms</Link>
          </div>

          <p>
            © <Suspense fallback={<span>2026</span>}><CurrentTime /></Suspense> TaskHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}