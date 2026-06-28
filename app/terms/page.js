import {
  ShieldCheck, UserCheck, KeyRound, CreditCard, Globe, Lock,
  AlertTriangle, Trash2, Server, Scale, RefreshCw, Mail,
  FileText, Eye, Zap,
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | IDVault",
  description:
    "Read IDVault's Terms & Conditions — your rights, responsibilities, and how we handle your data.",
};

/* ── Section data ───────────────────────────────────────────────── */
const SECTIONS = [
  { id: "about",           icon: Zap,           color: "#6366f1", label: "About IDVault" },
  { id: "eligibility",     icon: UserCheck,      color: "#10b981", label: "Eligibility" },
  { id: "accounts",        icon: Lock,           color: "#f59e0b", label: "Accounts & Security" },
  { id: "digital-cards",   icon: CreditCard,     color: "#8b5cf6", label: "Digital ID Cards" },
  { id: "vault",           icon: KeyRound,       color: "#ec4899", label: "Password Vault" },
  { id: "privacy",         icon: Eye,            color: "#14b8a6", label: "Data & Privacy" },
  { id: "public-sharing",  icon: Globe,          color: "#0ea5e9", label: "Public Sharing" },
  { id: "prohibited",      icon: AlertTriangle,  color: "#ef4444", label: "Prohibited Conduct" },
  { id: "ip",              icon: FileText,       color: "#a78bfa", label: "Intellectual Property" },
  { id: "termination",     icon: Trash2,         color: "#f97316", label: "Termination" },
  { id: "disclaimers",     icon: Server,         color: "#64748b", label: "Disclaimers" },
  { id: "liability",       icon: Scale,          color: "#06b6d4", label: "Limitation of Liability" },
  { id: "changes",         icon: RefreshCw,      color: "#84cc16", label: "Changes to Terms" },
  { id: "contact",         icon: Mail,           color: "#f43f5e", label: "Contact Us" },
];

/* ── Reusable components ─────────────────────────────────────────── */
function SectionBlock({ id, icon: Icon, color, label, children }) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="flex items-start gap-4">
        {/* Accent line */}
        <div
          className="w-0.5 self-stretch rounded-full flex-shrink-0 mt-1"
          style={{ backgroundColor: color + "70" }}
        />
        <div className="flex-1 min-w-0">
          {/* Heading */}
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: color + "18", border: `1px solid ${color}35` }}
            >
              <Icon size={13} style={{ color }} />
            </div>
            <h2 className="text-base font-semibold tracking-tight">{label}</h2>
          </div>
          {/* Body */}
          <div className="text-sm leading-relaxed text-foreground/70 space-y-3 pl-1">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Ul({ items }) {
  return (
    <ul className="space-y-1.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-foreground/25 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Highlight({ children }) {
  return (
    <span className="px-1 py-0.5 rounded bg-foreground/6 border border-foreground/10 text-foreground/90 font-medium text-xs font-mono">
      {children}
    </span>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center border border-border-subtle"
              style={{ backgroundColor: "var(--surface-2)" }}
            >
              <ShieldCheck size={20} className="text-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted uppercase tracking-wider">Legal</p>
              <p className="text-xs text-muted-2">IDVault Platform</p>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-xl">
            These terms govern your access to and use of IDVault — our digital identity card
            platform and encrypted password vault. Please read them carefully before using the service.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-2">
            <span
              className="flex items-center gap-1.5 border border-border-subtle rounded-full px-3 py-1"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <RefreshCw size={10} />
              Last updated: June 2026
            </span>
            <span
              className="flex items-center gap-1.5 border border-border-subtle rounded-full px-3 py-1"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <Globe size={10} />
              Applies to: id-vault.vercel.app
            </span>
          </div>
        </header>

        <div className="flex gap-8">

          {/* ── Sticky Table of Contents (desktop) ─────────────── */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div
              className="sticky top-6 rounded-2xl border border-border-subtle p-4"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <p className="text-[10px] font-semibold text-muted-2 uppercase tracking-wider mb-3">
                Contents
              </p>
              <nav className="space-y-0.5">
                {SECTIONS.map(({ id, label, color }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-muted hover:text-foreground hover:bg-surface-2 transition-colors group"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: color }}
                    />
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────────── */}
          <div
            className="flex-1 min-w-0 rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-10"
            style={{ backgroundColor: "var(--surface)" }}
          >
            {/* Intro */}
            <p className="text-sm text-foreground/75 leading-relaxed border-l-2 border-border pl-4">
              By creating an account or using IDVault in any way, you agree to these Terms. If you
              disagree with any part, you must stop using the platform immediately.
            </p>

            {/* ── 1. About ── */}
            <SectionBlock id="about" icon={Zap} color="#6366f1" label="About IDVault">
              <p>
                IDVault is a personal digital identity platform built for individuals who want
                to manage their online presence professionally. It provides two core features:
              </p>
              <Ul items={[
                "Digital ID Cards — create a shareable, public-facing profile card with your name, role, bio, contact info, and social links.",
                "Password Vault — an AES-256-GCM encrypted store for your login credentials, accessible only to you.",
              ]} />
              <p>
                IDVault is operated as a personal project hosted at{" "}
                <a href="https://id-vault.vercel.app" className="text-foreground underline underline-offset-2 hover:opacity-80 transition">
                  id-vault.vercel.app
                </a>
                . It is provided free of charge with no subscription fees.
              </p>
            </SectionBlock>

            {/* ── 2. Eligibility ── */}
            <SectionBlock id="eligibility" icon={UserCheck} color="#10b981" label="Eligibility">
              <p>To use IDVault you must:</p>
              <Ul items={[
                "Be at least 13 years of age. If you are under 18, you confirm that a parent or guardian has reviewed and consented to these Terms.",
                "Provide accurate, current, and complete information during registration.",
                "Not be prohibited from using the service under any applicable law or jurisdiction.",
              ]} />
            </SectionBlock>

            {/* ── 3. Accounts ── */}
            <SectionBlock id="accounts" icon={Lock} color="#f59e0b" label="Accounts & Security">
              <p>
                You are fully responsible for your IDVault account. This includes:
              </p>
              <Ul items={[
                "Keeping your password confidential — never share it with anyone.",
                "All activity that occurs under your account, whether or not authorised by you.",
                "Notifying us immediately if you suspect any unauthorised access.",
                "Using a strong, unique password. We recommend enabling a password manager (like the IDVault Vault itself).",
              ]} />
              <p>
                IDVault uses JWT-based authentication. Session tokens are stored in{" "}
                <Highlight>httpOnly</Highlight> cookies and expire after inactivity.
                We are not responsible for losses resulting from your failure to safeguard your credentials.
              </p>
            </SectionBlock>

            {/* ── 4. Digital ID Cards ── */}
            <SectionBlock id="digital-cards" icon={CreditCard} color="#8b5cf6" label="Digital ID Cards">
              <p>
                Each account may hold one Digital ID Card. By creating a card you confirm that:
              </p>
              <Ul items={[
                "All information on the card is truthful and accurate. Impersonating real individuals is strictly prohibited.",
                "You own or have the right to use any profile image you upload.",
                "You understand that making a card Public exposes it to anyone with the link.",
                "You can toggle your card between Public and Private at any time from your dashboard.",
                "Deleting your card is permanent — your public link will stop working immediately.",
              ]} />
              <p>
                Profile images are stored securely on Cloudinary. They are only used to display your card
                and are not used for advertising or sold to third parties.
              </p>
            </SectionBlock>

            {/* ── 5. Password Vault ── */}
            <SectionBlock id="vault" icon={KeyRound} color="#ec4899" label="Password Vault">
              <p>
                The Password Vault stores your credentials using{" "}
                <Highlight>AES-256-GCM</Highlight> encryption with a per-user key derived from
                a server-side secret. Passwords are encrypted before being written to the database
                and decrypted only at the time of retrieval within your authenticated session.
              </p>
              <Ul items={[
                "Never store banking OTPs, government ID numbers, or other highly sensitive information in the Vault without understanding the security model.",
                "If you delete your account, all vault entries are permanently and irreversibly deleted.",
                "The Vault is a personal productivity tool — it is not a certified enterprise password manager. Use accordingly.",
              ]} />
              <p>
                We strongly recommend keeping a separate backup of critical passwords outside IDVault.
              </p>
            </SectionBlock>

            {/* ── 6. Privacy ── */}
            <SectionBlock id="privacy" icon={Eye} color="#14b8a6" label="Data & Privacy">
              <p>We collect and store:</p>
              <Ul items={[
                "Account information: your name, email address, and hashed password.",
                "Card information: everything you enter on your Digital ID Card.",
                "Vault data: your encrypted password entries.",
                "Usage metadata: basic server logs (IP address, request timestamps) for security purposes.",
              ]} />
              <p>We do <strong>not</strong>:</p>
              <Ul items={[
                "Sell, rent, or share your personal data with third parties for marketing.",
                "Store plain-text passwords — all vault data is encrypted at rest.",
                "Use your card or vault data to train AI models.",
                "Serve advertisements or track you across other websites.",
              ]} />
              <p>
                Third-party services used: <strong>MongoDB Atlas</strong> (database),{" "}
                <strong>Cloudinary</strong> (image hosting), <strong>Vercel</strong> (hosting).
                Each has its own privacy policy and data processing terms.
              </p>
            </SectionBlock>

            {/* ── 7. Public Sharing ── */}
            <SectionBlock id="public-sharing" icon={Globe} color="#0ea5e9" label="Public Sharing">
              <p>
                When you set your ID Card to <strong>Public</strong>, it becomes discoverable on
                the IDVault Discover page and accessible to anyone who has your card URL.
              </p>
              <Ul items={[
                "You can revert to Private at any time — the public link will stop resolving immediately.",
                "Do not include private information (national ID, bank account numbers, home address) on a public card.",
                "IDVault may display your public card in community-facing sections of the platform (e.g., the Discover page).",
                "IDVault is not responsible for screenshots or copies of your card made by third parties while it was public.",
              ]} />
            </SectionBlock>

            {/* ── 8. Prohibited Conduct ── */}
            <SectionBlock id="prohibited" icon={AlertTriangle} color="#ef4444" label="Prohibited Conduct">
              <p>You may not use IDVault to:</p>
              <Ul items={[
                "Impersonate any person or organisation, including public figures or IDVault itself.",
                "Upload or share content that is illegal, abusive, defamatory, obscene, or discriminatory.",
                "Attempt to reverse-engineer, probe, scan, or exploit any part of the platform.",
                "Use automated tools (bots, scrapers) to harvest data from IDVault.",
                "Circumvent any security or authentication measure.",
                "Create accounts on behalf of others without their explicit consent.",
                "Use the Vault to store credentials that belong to accounts you do not own.",
              ]} />
              <p>
                Violation of these rules may result in immediate account suspension and deletion without notice.
              </p>
            </SectionBlock>

            {/* ── 9. Intellectual Property ── */}
            <SectionBlock id="ip" icon={FileText} color="#a78bfa" label="Intellectual Property">
              <p>
                All design, code, branding, and copy of the IDVault platform are the intellectual
                property of the creator. You may not copy, reproduce, or distribute them without
                written permission.
              </p>
              <p>
                You retain full ownership of the content you create — your card information, uploaded
                images, and vault entries. By using IDVault, you grant us a limited licence to store
                and display that content solely for the purpose of operating the service.
              </p>
            </SectionBlock>

            {/* ── 10. Termination ── */}
            <SectionBlock id="termination" icon={Trash2} color="#f97316" label="Termination">
              <p>
                <strong>You</strong> may delete your account at any time from the Dashboard → Delete
                Account. This immediately and permanently erases your user record, all vault entries,
                and your ID card.
              </p>
              <p>
                <strong>We</strong> may suspend or terminate your account without notice if you violate
                these Terms, engage in abusive behaviour, or if the platform is discontinued.
              </p>
              <p>
                Deleted accounts and their data cannot be recovered. Export anything important before
                deletion.
              </p>
            </SectionBlock>

            {/* ── 11. Disclaimers ── */}
            <SectionBlock id="disclaimers" icon={Server} color="#64748b" label="Disclaimers">
              <p>
                IDVault is provided <strong>"as is"</strong> without warranties of any kind —
                express or implied. We do not guarantee:
              </p>
              <Ul items={[
                "Uninterrupted or error-free operation of the service.",
                "That the platform will be available at any specific time.",
                "That data stored on the platform will never be lost (always keep backups of critical credentials).",
                "The accuracy of data entered by other users on public cards.",
              ]} />
            </SectionBlock>

            {/* ── 12. Limitation of Liability ── */}
            <SectionBlock id="liability" icon={Scale} color="#06b6d4" label="Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, IDVault and its creator are not
                liable for any indirect, incidental, special, or consequential damages arising from:
              </p>
              <Ul items={[
                "Unauthorised access to your account due to credential compromise on your end.",
                "Loss of data resulting from account deletion or service disruption.",
                "Any actions taken by third parties who view your public ID card.",
                "Reliance on information displayed on other users' public cards.",
              ]} />
              <p>
                Our total liability to you for any claim shall not exceed the amount you paid for the service
                (which is zero, as IDVault is free).
              </p>
            </SectionBlock>

            {/* ── 13. Changes ── */}
            <SectionBlock id="changes" icon={RefreshCw} color="#84cc16" label="Changes to Terms">
              <p>
                We may update these Terms at any time. When we do, we will update the "Last updated"
                date at the top of this page.
              </p>
              <p>
                Continued use of IDVault after changes are posted constitutes your acceptance of the
                revised Terms. If you disagree with a change, stop using the service and delete your account.
              </p>
            </SectionBlock>

            {/* ── 14. Contact ── */}
            <SectionBlock id="contact" icon={Mail} color="#f43f5e" label="Contact Us">
              <p>
                Questions, concerns, or abuse reports? Reach out — we read everything.
              </p>
              <div
                className="mt-4 rounded-xl border border-border-subtle p-4 space-y-3"
                style={{ backgroundColor: "var(--background)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#f43f5e18", border: "1px solid #f43f5e30" }}
                  >
                    <Mail size={13} style={{ color: "#f43f5e" }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-2 uppercase tracking-wider">Email</p>
                    <a
                      href="mailto:farhankhan080304@gmail.com"
                      className="text-sm font-medium text-foreground hover:opacity-80 transition"
                    >
                      farhankhan080304@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#6366f118", border: "1px solid #6366f130" }}
                  >
                    <Globe size={13} style={{ color: "#6366f1" }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-2 uppercase tracking-wider">Platform</p>
                    <a
                      href="https://id-vault.vercel.app"
                      className="text-sm font-medium text-foreground hover:opacity-80 transition"
                    >
                      id-vault.vercel.app
                    </a>
                  </div>
                </div>
              </div>
            </SectionBlock>

            {/* ── Footer note ── */}
            <div
              className="border-t pt-6 mt-6 flex items-center gap-3"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <ShieldCheck size={16} className="text-muted-2 flex-shrink-0" />
              <p className="text-xs text-muted-2 leading-relaxed">
                These Terms are governed by the laws of India. Any disputes arising shall be
                subject to the exclusive jurisdiction of the courts of India. If any provision
                of these Terms is held to be invalid, the remaining provisions continue in full force.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
