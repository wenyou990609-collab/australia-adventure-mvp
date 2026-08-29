import FreeExplorePage from "./FreeClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: 7 }, (_, index) => ({ day: String(index + 1) }));
}

export default async function Page({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  return <FreeExplorePage day={Number(day)} />;
}
