"use client"

import { ThemeToggleButton } from "@/components/dashboard-layout/navbar/navbar-actions/ThemeToggleButton"
import { motion } from "framer-motion"
import { Suspense, useState } from "react"

export function CurrentTime() {
  const currentYear = new Date().getFullYear()
  return <span>{currentYear}</span>
}

export default function LandingPage() {
  const [open, setOpen] = useState(false)

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">TaskHub</h1>

          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#about" className="hover:text-foreground">
              About
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </nav>

          <div className="hidden gap-3 md:flex">
            <ThemeToggleButton className="mt-1.5" />
            <a
              href="/login"
              className="rounded-lg border border-border px-4 py-2 transition hover:bg-accent"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90"
            >
              Get Started
            </a>
          </div>

          <div className="space-x-4 md:hidden">
            <ThemeToggleButton className="mt-1" />
            <button
              className="cursor-pointer text-xl"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-2 px-6 pb-4 text-sm text-muted-foreground md:hidden">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <hr className="border-border" />
            <a href="/login">Login</a>
            <a href="/register">Get Started</a>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background" />

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-bold md:text-6xl"
          >
            Manage Tasks with Role-Based Control
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8 }}
            className="mb-8 text-muted-foreground"
          >
            TaskHub is a full-stack task management system where users manage
            tasks, update profiles, and admins control users securely with
            Supabase.
          </motion.p>

          <div className="flex justify-center gap-4">
            <a
              href="/register"
              className="rounded-xl bg-primary px-6 py-3 text-primary-foreground transition hover:scale-105"
            >
              Get Started
            </a>

            <a
              href="#features"
              className="rounded-xl border border-border px-6 py-3 transition hover:bg-accent"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="px-6 py-24">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold"
        >
          Core Features
        </motion.h3>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Task Management",
              desc: "Users can create, update, delete tasks.",
            },
            {
              title: "Profile System",
              desc: "Users update their personal profiles.",
            },
            {
              title: "Admin Control",
              desc: "Admins manage users and system access.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm"
            >
              <h4 className="mb-2 font-semibold">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="bg-muted/40 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h3 className="mb-4 text-3xl font-bold">About TaskHub</h3>
          <p className="text-muted-foreground">
            TaskHub is a modern SaaS-style task management system built with
            Next.js and Supabase. It focuses on role-based access where users
            manage tasks and admins manage users securely.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h3 className="mb-4 text-3xl font-bold">Contact</h3>
          <p className="mb-6 text-muted-foreground">
            Have questions or feedback? Feel free to reach out.
          </p>
          <a
            href="mailto:chitkokoaung1056@gmail.com"
            className="rounded-xl bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
          >
            Send Email
          </a>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background" />

        <div className="relative mx-auto max-w-3xl px-6">
          <h3 className="mb-4 text-3xl font-bold">Start using TaskHub today</h3>

          <p className="mb-8 text-muted-foreground">
            Built for real-world productivity and admin control.
          </p>

          <a
            href="/register"
            className="inline-flex rounded-xl bg-primary px-8 py-3 text-primary-foreground shadow-md transition hover:scale-105"
          >
            Get Started Free
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <div className="mb-3 flex justify-center gap-6">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
        ©
        <Suspense fallback={<span>2026</span>}>
          <CurrentTime />
        </Suspense>
        TaskHub. All rights reserved.
      </footer>
    </div>
  )
}
