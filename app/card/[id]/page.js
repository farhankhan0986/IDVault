import PublicCardClient from "./PublicCardClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(
      `https://id-vault.vercel.app/api/cards/public/${id}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error();

    const data = await res.json();
    const card = data.card;
    const name = card?.name || "IDVault Card";
    const title = card?.title || "";
    const bio = card?.bio || "View this digital ID card on IDVault.";
    const description = title ? `${title} — ${bio}` : bio;

    return {
      title: `${name} | IDVault`,
      description,
      openGraph: {
        title: `${name} | IDVault`,
        description,
        url: `https://id-vault.vercel.app/card/${id}`,
        type: "profile",
      },
      twitter: {
        card: "summary",
        title: `${name} | IDVault`,
        description,
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
