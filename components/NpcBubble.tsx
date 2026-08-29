import { Character } from "./Character";

export function NpcBubble({ children }: { children: React.ReactNode }) {
  return (
    <section className="npcBubble" aria-label="NPC 对话">
      <Character compact />
      <p>{children}</p>
    </section>
  );
}
