import TaskPage from "./TaskClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: 8 }, (_, index) => ({ id: String(index + 1) }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TaskPage id={Number(id)} />;
}
