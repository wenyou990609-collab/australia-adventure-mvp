export function Character({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "cat catCompact" : "cat"} aria-label="背着小包的原创新手村小猫" role="img">
      <div className="catTail" />
      <div className="catBody">
        <div className="catEar left" />
        <div className="catEar right" />
        <div className="catFace">
          <span className="eye left" />
          <span className="eye right" />
          <span className="nose" />
          <span className="muzzle" />
        </div>
        <div className="catBelly" />
        <div className="backpack" />
      </div>
      <div className="suitcase" />
    </div>
  );
}
