// Catálogo de productos VoltX.
// Las imágenes usan picsum.photos con un seed fijo por producto para que
// cada card tenga una imagen consistente sin depender de assets propios.

export const categories = [
  { id: "all", label: "Todos" },
  { id: "audio", label: "Audio" },
  { id: "computo", label: "Cómputo" },
  { id: "gaming", label: "Gaming" },
  { id: "wearables", label: "Wearables" },
  { id: "hogar", label: "Hogar inteligente" },
];

export const products = [
  {
    id: "vx-001",
    name: "Auriculares VoltX Aero ANC",
    category: "audio",
    price: 89999,
    stock: 14,
    rating: 4.7,
    image: "https://picsum.photos/seed/volt-aero/640/480",
    shortDescription: "Cancelación activa de ruido y 38h de batería en un diseño liviano.",
    description:
      "Los Aero ANC combinan drivers de 40mm con un sistema de cancelación de ruido adaptativo que se ajusta al entorno cada 200ms. Pensados para jornadas largas de estudio, trabajo o viaje, con almohadillas de espuma viscoelástica y carga rápida USB-C (10 min = 5h de uso).",
    specs: ["Bluetooth 5.3", "38h de batería", "ANC adaptativo", "Carga rápida USB-C", "180g"],
  },
  {
    id: "vx-002",
    name: "Parlante VoltX Orbit 360",
    category: "audio",
    price: 54999,
    stock: 22,
    rating: 4.5,
    image: "https://picsum.photos/seed/volt-orbit/640/480",
    shortDescription: "Sonido envolvente 360° con resistencia IP67 para exteriores.",
    description:
      "El Orbit 360 proyecta sonido en todas direcciones gracias a su arquitectura de doble tweeter y radiador pasivo. Resistente a agua y polvo (IP67), flota en el agua y suma 18 horas de autonomía para llevarlo a cualquier lado.",
    specs: ["IP67", "18h de batería", "Sonido 360°", "Modo TWS (doble parlante)", "Flota en agua"],
  },
  {
    id: "vx-003",
    name: "Notebook VoltX Forge 14",
    category: "computo",
    price: 1249999,
    stock: 7,
    rating: 4.8,
    image: "https://picsum.photos/seed/volt-forge/640/480",
    shortDescription: "Chasis de aluminio, pantalla 2.8K 120Hz y autonomía de 16h.",
    description:
      "La Forge 14 está pensada para desarrollo, diseño y multitarea pesada sin sacrificar portabilidad. Pantalla OLED 2.8K a 120Hz, teclado retroiluminado de carrera completa y un chasis de aluminio mecanizado que mantiene la temperatura bajo control incluso en cargas sostenidas.",
    specs: ['14" OLED 2.8K 120Hz', "16h de batería", "1.3kg", "Teclado retroiluminado", "2x USB-C Thunderbolt"],
  },
  {
    id: "vx-004",
    name: "Teclado mecánico VoltX Pulse TKL",
    category: "gaming",
    price: 79999,
    stock: 18,
    rating: 4.6,
    image: "https://picsum.photos/seed/volt-pulse/640/480",
    shortDescription: "Switches hot-swap, sonido 'thocky' y RGB por tecla.",
    description:
      "Diseñado junto a la comunidad gamer, el Pulse TKL usa switches hot-swap pre-lubricados y una placa de aluminio con espuma interna para un sonido grave y consistente. Formato TKL para liberar espacio en el escritorio sin perder teclas de función.",
    specs: ["Hot-swap", "RGB por tecla", "Formato TKL", "Cable trenzado desmontable", "Software de macros"],
  },
  {
    id: "vx-005",
    name: "Mouse gamer VoltX Sting Lite",
    category: "gaming",
    price: 39999,
    stock: 30,
    rating: 4.4,
    image: "https://picsum.photos/seed/volt-sting/640/480",
    shortDescription: "62 gramos, sensor de 26.000 DPI y switches ópticos.",
    description:
      "El Sting Lite apuesta por un chasis perforado de 62g sin resignar resistencia. Sensor óptico de 26.000 DPI, switches ópticos con 0 debounce y receptor 2.4GHz de baja latencia para juegos competitivos.",
    specs: ["62g", "26.000 DPI", "Switches ópticos", "2.4GHz + Bluetooth", "Batería 70h"],
  },
  {
    id: "vx-006",
    name: "Monitor VoltX Frame 27 QHD",
    category: "computo",
    price: 459999,
    stock: 9,
    rating: 4.6,
    image: "https://picsum.photos/seed/volt-frame/640/480",
    shortDescription: "27 pulgadas QHD 165Hz con panel IPS calibrado de fábrica.",
    description:
      "Pensado tanto para diseño como para gaming, el Frame 27 ofrece panel IPS QHD a 165Hz con cobertura 99% sRGB calibrada de fábrica. Bordes ultrafinos en tres lados y soporte ajustable en altura, inclinación y rotación.",
    specs: ['27" QHD IPS', "165Hz", "99% sRGB", "Soporte ergonómico", "HDMI 2.1 + DP 1.4"],
  },
  {
    id: "vx-007",
    name: "Smartwatch VoltX Pulse Watch",
    category: "wearables",
    price: 129999,
    stock: 16,
    rating: 4.3,
    image: "https://picsum.photos/seed/volt-watch/640/480",
    shortDescription: "GPS integrado, oxímetro y 12 días de batería.",
    description:
      "El Pulse Watch acompaña entrenamientos y rutinas diarias con GPS integrado, oxímetro, monitor de sueño y más de 40 modos deportivos. La batería rinde hasta 12 días en uso normal y la pantalla AMOLED se ve nítida incluso bajo sol directo.",
    specs: ["Pantalla AMOLED", "GPS integrado", "12 días de batería", "5ATM resistencia al agua", "40+ modos deportivos"],
  },
  {
    id: "vx-008",
    name: "Pulsera VoltX Band Fit",
    category: "wearables",
    price: 49999,
    stock: 25,
    rating: 4.2,
    image: "https://picsum.photos/seed/volt-band/640/480",
    shortDescription: "Liviana, con seguimiento de sueño y notificaciones.",
    description:
      "La Band Fit ofrece lo esencial sin complicarse: seguimiento de pasos, frecuencia cardíaca, sueño y notificaciones del celular, todo en un cuerpo de 22 gramos con 14 días de autonomía.",
    specs: ["22g", "14 días de batería", "Resistencia al agua 5ATM", "Notificaciones", "Pantalla táctil"],
  },
  {
    id: "vx-009",
    name: "Lámpara inteligente VoltX Glow",
    category: "hogar",
    price: 34999,
    stock: 40,
    rating: 4.1,
    image: "https://picsum.photos/seed/volt-glow/640/480",
    shortDescription: "16 millones de colores y control por app o voz.",
    description:
      "La Glow se integra con asistentes de voz y permite programar escenas, rutinas y sincronización con música. Más de 16 millones de colores y temperaturas de blanco cálido a frío, controlable desde cualquier lugar vía app.",
    specs: ["16M de colores", "Control por voz", "Programación de escenas", "Wi-Fi 2.4GHz", "Sin necesidad de hub"],
  },
  {
    id: "vx-010",
    name: "Enchufe inteligente VoltX Plug",
    category: "hogar",
    price: 19999,
    stock: 50,
    rating: 4.0,
    image: "https://picsum.photos/seed/volt-plug/640/480",
    shortDescription: "Medición de consumo en tiempo real y programación horaria.",
    description:
      "Convertí cualquier electrodoméstico en inteligente: programá horarios, medí el consumo eléctrico en tiempo real y controlalo de forma remota desde la app VoltX Home.",
    specs: ["Medición de consumo", "Control remoto", "Programación horaria", "Compatible con asistentes de voz", "Instalación sin herramientas"],
  },
  {
    id: "vx-011",
    name: "Auriculares gamer VoltX Recon",
    category: "gaming",
    price: 64999,
    stock: 20,
    rating: 4.5,
    image: "https://picsum.photos/seed/volt-recon/640/480",
    shortDescription: "Audio espacial 7.1 y micrófono con cancelación de ruido.",
    description:
      "Diseñados para sesiones competitivas largas, los Recon ofrecen audio espacial 7.1 para ubicar pasos y disparos con precisión, micrófono desmontable con cancelación de ruido y almohadillas de malla transpirable.",
    specs: ["Audio espacial 7.1", "Micrófono desmontable", "Almohadillas transpirables", "Compatible PC/consola", "Diadema ajustable"],
  },
  {
    id: "vx-012",
    name: "Hub USB-C VoltX Dock 8 en 1",
    category: "computo",
    price: 44999,
    stock: 35,
    rating: 4.4,
    image: "https://picsum.photos/seed/volt-dock/640/480",
    shortDescription: "HDMI 4K, lector SD, Ethernet y carga pass-through 100W.",
    description:
      "El Dock 8 en 1 resuelve la conectividad de cualquier notebook moderna: salida HDMI 4K@60Hz, Ethernet Gigabit, lector de tarjetas SD/microSD y carga pass-through de hasta 100W, todo en un cuerpo de aluminio compacto.",
    specs: ["HDMI 4K@60Hz", "Ethernet Gigabit", "Carga PD 100W", "Lector SD/microSD", "Aluminio compacto"],
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
