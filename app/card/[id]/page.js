import PublicCardClient from "./PublicCardClient";

export default async function PublicCardPage({ params }) {
  const { id } = await params;

  return <PublicCardClient id={id} />;
}
