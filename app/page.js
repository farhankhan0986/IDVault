"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HomePage() {
  const [showSupport, setShowSupport] = useState(false);

  const supportRef = useRef(null); // ✅ ADD THIS
  const router = useRouter();

  useEffect(() => {
    if (showSupport) {
      supportRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showSupport]);

  return (
    <main className="bg-background text-foreground overflow-hidden relative -top-10">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        {/* Glow */}
        <div className="absolute inset-0 ">
          <div className="absolute -top-50 left-1/2 -translate-x-1/2 h-[400px] w-[400px] bg-[var(--accent)] opacity-20 blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Your Digital Identity,
            <br />
            <span className="text-accent">Secured in One Place</span>
          </h1>

          <p className="mt-6 text-lg text-muted">
            IDVault lets you create, manage, and share a professional digital ID
            card — replacing physical cards, screenshots, and scattered
            profiles.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link href="/signup" className="btn-primary px-8 py-3">
              Get Started
            </Link>
            <Link
              href="/demo"
              className="rounded-xl border border-border px-8 py-3 hover:bg-border transition"
            >
              View Demo
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted">
            No ads • No clutter • Privacy-first
          </p>
        </motion.div>
      </section>

      {/* ================= VALUE STRIP ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Secure by Design",
              desc: "Your data is protected with authentication and private APIs.",
              icon: "🔐",
            },
            {
              title: "Instant Access",
              desc: "Access your digital card anytime, anywhere, on any device.",
              icon: "⚡",
            },
            {
              title: "Controlled Sharing",
              desc: "You decide what information is visible and shareable.",
              icon: "🛡️",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="card p-6 hover:scale-105 transition-discrete duration-500"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-medium text-lg">{f.title}</h3>
              <p className="text-sm text-muted mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCT EXPLANATION ================= */}
      <section className="py-24 px-6 bg-surface rounded-2xl">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-semibold">One Card. One Identity.</h2>
            <p className="mt-4 text-muted">
              IDVault replaces physical ID cards, PDFs, and social links with a
              single digital identity that is always up-to-date.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>✔ Name, role, bio & contact info</li>
              <li>✔ Social links (LinkedIn, GitHub)</li>
              <li>✔ Profile image & branding</li>
              <li>✔ Edit, update, or revoke anytime</li>
            </ul>
          </motion.div>

          {/* Fake Card Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card p-6 hover:scale-105 transition-discrete duration-500"
          >
            {" "}
            <span className="text-sm text-white flex items-center gap-1">
              <p className="animate-pulse">🔴</p> Live Card Preview
            </span>{" "}
            <div className=" bg-background px-6 py-8">
              <div className="max-w-5xl  mx-auto">
                <div className="max-w-md mx-auto animate-pulse rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-border rounded-full">
                      <img src="/john.png" className="rounded-full" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span>
                          <img
                            src="/check.png"
                            alt="Verified"
                            className="relative w-4 h-4 rounded-full bg-background ring-1 ring-accent/40 p-[2px]"
                          />
                        </span>
                        <p>John Doe</p>
                      </div>
                      <p className="text-sm text-white">Software Developer</p>
                    </div>
                  </div>

                  <div className=" mt-2">
                    <p className="text-sm text-white">
                      Passionate developer building clean, secure, and scalable
                      digital experiences.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/demo")}
                    className="btn-primary px-4 py-1 mt-4 cursor-pointer text-sm"
                  >
                    Visit →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">How IDVault Works</h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              ["Create", "Add your personal and professional details."],
              ["Customize", "Edit visibility, links, and profile image."],
              ["Share", "Access or share your card instantly."],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="card p-6 hover:scale-105 transition-discrete duration-500"
              >
                <div className="text-accent text-2xl font-bold mb-3">
                  {i + 1}
                </div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted mt-2">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO IT’S FOR ================= */}
      <section className="py-24 px-6 bg-surface rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">
            Who Is IDVault For?
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Students & Freshers",
                desc: "Share a verified digital ID with resumes, internships, and campus applications.",
              },
              {
                title: "Professionals",
                desc: "Present a trusted digital identity for recruiters, clients, and networking.",
              },
              {
                title: "Freelancers & Creators",
                desc: "Send one secure identity link to clients instead of multiple profiles.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="card p-6 hover:scale-105 transition-discrete duration-500"
              >
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECURITY ================= */}
      <section className="py-24 px-6 ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto mt-10 text-center"
        >
          <h2 className="text-3xl font-semibold">
            Your Privacy. Your Control.
          </h2>

          <p className="mt-4 text-muted">
            IDVault is designed with secure authentication, protected APIs, and
            complete user control. You decide what to share, when to share it,
            and with whom.
          </p>
        </motion.div>
      </section>

      {/* ================= SUPPORT DEVELOPER ================= */}
      <section ref={supportRef} className="py-24 px-6">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-4xl" // Reduced max-width for better vertical centering
          >
            {/* Glow */}
            <div className="absolute -inset-6 bg-accent/20 blur-3xl rounded-3xl opacity-30" />

            {/* Main Card */}
            <div className="relative card p-10 md:p-20 overflow-hidden gap-2 flex flex-col items-center text-center">
              {/* Header Badge */}
              <div className="flex flex-col items-center mt-6 gap-4 mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-4 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Support Development
                </span>
              </div>

              {/* Content Area */}
              <div className="max-w-2xl flex flex-col items-center gap-8">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                    Built with care, not investors
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg md:text-xl px-4">
                    IDVault is an independent project designed, built, and
                    maintained by a single developer. No ads, no tracking, and
                    no hidden paywalls.
                  </p>
                </div>

                {/* Features Horizontal List */}
                <ul className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base text-white/50 border-y border-white/5 py-6 w-full">
                  <li className="flex items-center gap-2.5">
                    <span className="text-accent text-xl">🚫</span> No
                    advertisements
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-accent text-xl">🔓</span> Everything
                    unlocked
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-accent text-xl">🛡️</span>{" "}
                    Privacy-first
                  </li>
                </ul>

                {/* Action Area */}
                <div className="flex flex-col mb-6 items-center gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSupport(true)}
                    className="btn-primary px-10 cursor-pointer py-4 rounded-2xl inline-flex items-center gap-3 text-base font-semibold shadow-lg shadow-accent/20"
                  >
                    <span>☕</span> Buy me a coffee →
                  </motion.button>
                  <p className="text-xs text-white/30 italic">
                    Optional support • All features remain 100% free
                  </p>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-6 text-center bg-surface  rounded-2xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl font-semibold">
            Create Your Digital ID Card
          </h2>

          <p className="mt-4 text-muted">
            Share your verified identity on resumes, LinkedIn, and anywhere
            online.
          </p>

          <div className="mt-8">
            <Link href="/signup" className="btn-primary px-10 py-3">
              Get Your Free ID →
            </Link>
          </div>
        </motion.div>
      </section>
      {/* ================= SUPPORT MODAL ================= */}
      {showSupport && (
        <section ref={supportRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 text-center border border-border">
            <h3 className="text-lg font-semibold">Support IDVault</h3>

            <p className="mt-2 text-sm text-muted">
              Scan the QR or use the UPI ID below
            </p>

            <img
              src="/upi-qr.png"
              alt="UPI QR"
              className="mx-auto my-4 w-40 h-40"
            />

            <p className="text-sm font-mono">farhankhan080304@oksbi</p>

            <button
              onClick={() => setShowSupport(false)}
              className="mt-6 cursor-pointer btn-primary px-10 py-3 text-sm text-muted"
            >
              Close
            </button>
          </div>
        </div>
      </section>
      )}
    </main>
  );
}
