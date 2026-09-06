import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) navigate("/account");
    else setError("Invalid email or password.");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#0e0c0a" }}>
      {/* Left visual */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1652960018678-1f19799996c5?w=1000&h=1400&fit=crop&auto=format"
          alt="Heritage objects"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.6)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, #0e0c0a 100%)" }} />
        <div className="absolute bottom-16 left-16 max-w-xs">
          <p className="font-['Fraunces'] italic text-2xl text-[#f0e8d6] leading-relaxed mb-4">
            "A login is not a transaction. It is a beginning."
          </p>
          <p className="text-xs text-[#7a6a58] tracking-widest">— SATTVA CLOUD ANGADI</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
        <div className="w-full max-w-sm">
          <Link to="/" className="block mb-12">
            <p className="font-['Fraunces'] text-2xl" style={{ color: "#b87333" }}>SATTVA</p>
            <p className="text-[9px] tracking-[0.3em] text-[#7a6a58]">CLOUD ANGADI</p>
          </Link>

          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-3">WELCOME BACK</p>
          <h1 className="font-['Fraunces'] text-4xl text-[#f0e8d6] mb-10">Sign in</h1>

          {/* Demo hint */}
          <div className="p-4 border mb-8 text-xs text-[#7a6a58]" style={{ borderColor: "#2e2820" }}>
            <p className="text-[#b87333] mb-1 tracking-widest text-[10px]">DEMO CREDENTIALS</p>
            <p>Email: arjun@example.com</p>
            <p>Password: password</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-[10px] tracking-[0.25em] text-[#7a6a58] block mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-3 placeholder-[#4a3f34] focus:outline-none focus:border-[#b87333] transition-colors"
                style={{ borderColor: "#2e2820" }}
                required
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.25em] text-[#7a6a58] block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-3 placeholder-[#4a3f34] focus:outline-none focus:border-[#b87333] transition-colors"
                style={{ borderColor: "#2e2820" }}
                required
              />
            </div>

            {error && <p className="text-sm" style={{ color: "#c0522a" }}>{error}</p>}

            <button
              type="submit"
              className="w-full py-4 text-xs tracking-[0.2em] font-medium mt-2 transition-opacity hover:opacity-90"
              style={{ background: "#b87333", color: "#0e0c0a" }}
            >
              SIGN IN
            </button>
          </form>

          <p className="text-sm text-[#7a6a58] text-center mt-8">
            New to Sattva?{" "}
            <Link to="/register" className="text-[#b87333] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
