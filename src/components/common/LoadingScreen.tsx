import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1000);
    const t4 = setTimeout(() => onDone(), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#0e0c0a" }}
    >
      <div className="text-center">
        {["SATTVA", "CLOUD", "ANGADI"].map((word, i) => (
          <div
            key={word}
            className="overflow-hidden"
          >
            <div
              className="font-['Fraunces'] text-4xl md:text-6xl tracking-[0.15em] transition-all duration-700"
              style={{
                color: i === 0 ? "#b87333" : i === 1 ? "#d4a843" : "#f0e8d6",
                opacity: phase > i ? 1 : 0,
                transform: phase > i ? "translateY(0)" : "translateY(100%)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {word}
            </div>
          </div>
        ))}

        <div
          className="mt-8 h-px bg-gradient-to-r from-transparent via-[#b87333]/60 to-transparent transition-all duration-1000"
          style={{
            width: phase >= 3 ? "160px" : "0px",
            margin: "2rem auto 0",
          }}
        />

        <div
          className="mt-4 text-[10px] tracking-[0.3em] text-[#7a6a58] transition-opacity duration-700"
          style={{ opacity: phase >= 3 ? 1 : 0 }}
        >
          WHERE HERITAGE BECOMES EVERYDAY
        </div>
      </div>
    </div>
  );
}
