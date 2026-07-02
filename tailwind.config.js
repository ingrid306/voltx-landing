/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1120",
        surface: "#131B2E",
        surface2: "#1A2438",
        volt: "#F4C430",
        voltdim: "#B8860B",
        circuit: "#3DDC97",
        line: "#26314A",
        ink2: "#08101F",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(244,196,48,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(244,196,48,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
        },
        traceIn: {
          from: { strokeDashoffset: "400" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        traceIn: "traceIn 1.2s ease forwards",
      },
    },
  },
  plugins: [],
}

