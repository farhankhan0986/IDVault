export const metadata = {
  title: "Terms & Conditions | IDVault",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Last updated: January 2026
          </p>
        </header>

        {/* Content Card */}
        <div className="card p-8 md:p-10">
          <section className="space-y-8 text-sm leading-relaxed text-foreground/80">

            <p>
              Welcome to <strong>IDVault</strong> (
              <a
                href="https://id-vault.vercel.app"
                className="text-primary underline hover:opacity-80"
              >
                id-vault.vercel.app
              </a>
              ). By accessing or using our platform, you agree to be bound by
              these Terms & Conditions. If you do not agree, please discontinue
              use of the service.
            </p>

            <Term title="1. About IDVault">
              IDVault is a digital identity platform that allows users to
              create, manage, and share digital identity cards containing
              professional and contact information.
            </Term>

            <Term title="2. Eligibility">
              You must be at least 13 years old to use IDVault. By using the
              service, you confirm that the information you provide is accurate
              and lawful.
            </Term>

            <Term title="3. User Accounts">
              <ul className="list-disc pl-5 space-y-1">
                <li>You are responsible for maintaining account security.</li>
                <li>You are responsible for all activity under your account.</li>
                <li>
                  IDVault is not liable for unauthorized access caused by user
                  negligence.
                </li>
              </ul>
            </Term>

            <Term title="4. Digital Card Content">
              <ul className="list-disc pl-5 space-y-1">
                <li>You own or have rights to the content you upload.</li>
                <li>
                  Cards may become publicly accessible if you share the link.
                </li>
                <li>You are solely responsible for your card content.</li>
              </ul>
            </Term>

            <Term title="5. Public Sharing">
              Shared public card links can be viewed by anyone with access.
              You may delete your card at any time to disable public access.
            </Term>

            <Term title="6. Prohibited Use">
              <ul className="list-disc pl-5 space-y-1">
                <li>Uploading false or impersonating information</li>
                <li>Sharing illegal, abusive, or harmful content</li>
                <li>Attempting to exploit or disrupt the platform</li>
              </ul>
            </Term>

            <Term title="7. Data & Privacy">
              We store user data securely and do not sell personal data.
              Profile images and card information are stored according to
              our internal security practices.
            </Term>

            <Term title="8. Account & Card Deletion">
              Users may delete their cards or accounts at any time. Deleted
              data cannot be recovered, and public links will become invalid.
            </Term>

            <Term title="9. Service Availability">
              IDVault is provided “as is” without warranties. We do not
              guarantee uninterrupted or error-free service.
            </Term>

            <Term title="10. Limitation of Liability">
              IDVault is not liable for data loss, unauthorized access, or
              damages arising from public sharing of cards.
            </Term>

            <Term title="11. Changes to Terms">
              We may update these Terms at any time. Continued use of IDVault
              constitutes acceptance of the updated Terms.
            </Term>

            <Term title="12. Contact">
              <p>If you have any questions regarding these Terms:</p>
              <div className="mt-2 space-y-1">
                <p>
                  📧 <strong>Email:</strong>{" "}
                  <span className="text-primary">
                    farhankhan080304@gmail.com
                  </span>
                </p>
                <p>
                  🌐 <strong>Website:</strong>{" "}
                  <a
                    href="https://id-vault.vercel.app"
                    className="text-primary underline"
                  >
                    id-vault.vercel.app
                  </a>
                </p>
              </div>
            </Term>

          </section>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Helper Component ---------------- */

function Term({ title, children }) {
  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold text-foreground">
        {title}
      </h2>
      <div className="text-foreground/70">
        {children}
      </div>
    </div>
  );
}
