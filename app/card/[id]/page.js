import PublicCardClient from "./PublicCardClient";

const SITE = "https://id-vault.vercel.app";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(
      `${SITE}/api/cards/public/${id}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error();

    const data = await res.json();
    const card = data.card;
    const name = card?.fullName || "IDVault Card";
    const title = card?.title || "";
    const bio = card?.bio || "View this digital ID card on IDVault.";
    const description = title ? `${title} — ${bio}` : bio;
    const image = card?.profileImage || `${SITE}/default-avatar.png`;

    return {
      title: `${name} | IDVault`,
      description,
      openGraph: {
        title: `${name} | IDVault`,
        description,
        url: `${SITE}/card/${id}`,
        type: "profile",
        images: [
          {
            url: image,
            width: 400,
            height: 400,
            alt: name,
          },
        ],
      },
      twitter: {
        card: "summary",
        title: `${name} | IDVault`,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Digital ID Card | IDVault",
      description: "View this digital ID card on IDVault.",
    };
  }
}

export default async function PublicCardPage({ params }) {
  const { id } = await params;
  return <PublicCardClient id={id} />;
}
