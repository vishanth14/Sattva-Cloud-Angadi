import HeritageCursor from "./HeritageCursor";

export default function CustomCursor({ hideTrail = false }: { hideTrail?: boolean }) {
  return <HeritageCursor hideTrail={hideTrail} />;
}
