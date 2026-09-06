import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ background: "#0e0c0a" }}>
      <p className="font-['Fraunces'] text-8xl md:text-[12rem] text-[#1a1614] select-none mb-4">404</p>
      <p className="font-['Fraunces'] text-3xl text-[#f0e8d6] mb-3">This path is uncharted.</p>
      <p className="text-sm text-[#7a6a58] mb-10 text-center max-w-xs">
        The object or page you're looking for doesn't exist. Perhaps it has found a new home.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="px-8 py-4 text-xs tracking-[0.2em]"
          style={{ background: "#b87333", color: "#0e0c0a" }}
        >
          RETURN HOME
        </Link>
        <Link
          to="/materials"
          className="px-8 py-4 text-xs tracking-[0.2em] border"
          style={{ borderColor: "#2e2820", color: "#c8b89a" }}
        >
          EXPLORE MATERIALS
        </Link>
      </div>
    </div>
  );
}
