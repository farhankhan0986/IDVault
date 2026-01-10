"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
  const router = useRouter();
  return (
    <main className="bg-background text-foreground overflow-hidden relative -top-10">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        {/* Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 h-[400px] w-[400px] bg-[var(--accent)] opacity-20 blur-[120px]" />
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
                      <p>John Doe</p>
                      <p className="text-sm text-gray-700">
                        Software Developer
                      </p>
                    </div>
                  </div>

                  <div className=" mt-2">
                    <p className="text-sm text-gray-700">
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
              "Students & Freshers",
              "Professionals",
              "Freelancers & Creators",
            ].map((role, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="card p-6 hover:scale-105 transition-discrete duration-500"
              >
                <h3 className="font-medium">{role}</h3>
                <p className="text-sm text-muted mt-2">
                  Present a clean, modern digital identity without relying on
                  multiple platforms.
                </p>
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
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold">Privacy Comes First</h2>
          <p className="mt-4 text-muted">
            IDVault is built with authentication, protected APIs, and
            user-controlled data. Your identity belongs to you — not platforms.
          </p>
        </motion.div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 px-6 text-center bg-surface rounded-2xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl font-semibold">
            Ready to Own Your Digital Identity?
          </h2>

          <p className="mt-4 text-muted">
            Create your IDVault in less than a minute.
          </p>

          <div className="mt-8">
            <Link href="/signup" className="btn-primary px-10 py-3">
              Create Your IDVault
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
