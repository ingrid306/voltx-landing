const team = [
  { name: "Mara Quintana", role: "Fundadora & Hardware Lead", seed: "team-mara" },
  { name: "Tomás Linares", role: "Curaduría de producto", seed: "team-tomas" },
  { name: "Naia Cordero", role: "Experiencia de cliente", seed: "team-naia" },
];

const timeline = [
  { year: "2021", text: "Arrancamos probando auriculares en un placard convertido en banco de pruebas." },
  { year: "2023", text: "Sumamos la línea de cómputo tras 400 horas de testeo de notebooks." },
  { year: "2025", text: "Abrimos la categoría hogar inteligente, la más pedida por la comunidad." },
  { year: "2026", text: "Catálogo de más de 100 productos verificados con specs reales." },
];

export default function About() {
  return (
    <>
      <section className="border-b border-line bg-grid bg-[length:32px_32px]">
        <div className="container-x py-20 sm:py-24">
          <p className="eyebrow mb-4">Sobre nosotros</p>
          <h1 className="font-display max-w-2xl text-4xl sm:text-5xl font-bold text-white leading-tight">
            Medimos lo que las cajas no dicen.
          </h1>
          <p className="mt-6 max-w-xl text-slate-400 leading-relaxed">
            VoltX es un equipo chico que prueba cada producto antes de subirlo al catálogo.
            Nada de specs copiadas del fabricante: autonomía, peso y rendimiento medidos por
            nosotros, en uso real.
          </p>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="card-surface p-6">
            <p className="eyebrow mb-3">Misión</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ayudar a decidir con datos reales, no con folletos. Cada ficha técnica que
              publicamos sale de nuestro propio banco de pruebas.
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="eyebrow mb-3">Visión</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ser la referencia regional en tecnología de consumo verificada, donde cada
              especificación publicada se pueda comprobar.
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="eyebrow mb-3">Valores</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transparencia en specs, soporte post-venta real y un catálogo curado, no
              inflado por volumen.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <p className="eyebrow mb-3">Recorrido</p>
        <h2 className="font-display text-3xl font-bold text-white mb-10">Cómo llegamos hasta acá</h2>
        <div className="relative border-l border-line pl-8 space-y-10">
          {timeline.map((t) => (
            <div key={t.year} className="relative">
              <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-volt bg-ink" />
              <p className="font-mono text-xs text-volt mb-1">{t.year}</p>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <p className="eyebrow mb-3">Equipo</p>
        <h2 className="font-display text-3xl font-bold text-white mb-10">Quiénes lo hacen posible</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="card-surface p-6 text-center">
              <img
                src={`https://picsum.photos/seed/${m.seed}/200/200`}
                alt={m.name}
                className="mx-auto h-20 w-20 rounded-full object-cover border border-line"
              />
              <p className="mt-4 font-display font-semibold text-white">{m.name}</p>
              <p className="mt-1 font-mono text-xs text-slate-500">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
