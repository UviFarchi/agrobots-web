import colors from "@/assets/colors.js";

export default {
    name: 'vision',
    title: 'Our Vision',
    component: 'ScrollingFullBg',
    content: {
        en: {
            buttonsLegend: "",
            defaultButtonLabel: "Back",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    bgImage: "/img/biorome_1.png",
                    title: "Our Vision",
                    paragraphs: [
                        "We believe agriculture can be regenerative, productive, and resilient—all at once. Our vision is to transform land management by integrating the intelligence of nature with the precision of advanced technology.",
                        "With Agrobots, every hectare becomes a self-optimizing ecosystem—guided by AI, managed through modular robotics, and designed to restore the health of soil, water, and biodiversity.",
                        "Our platform, Land OS, unites real-time environmental data, automated decision-making, and decentralized field operations. By replacing the old model of extractive, input-heavy agriculture, we create systems that adapt and improve with every season—lowering costs, increasing yields, and regenerating the land.",
                        "We are committed to setting a new standard: agriculture that operates in harmony with natural cycles, leverages data to boost efficiency, and leaves a positive legacy for future generations. This is the future we are building—where technology and ecology thrive together."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    textPosition: "right"
                }
            }
        },
        es: {
            buttonsLegend: "",
            defaultButtonLabel: "Volver",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    bgImage: "/img/biorome_1.png",
                    title: "Nuestra Visión",
                    paragraphs: [
                        "Creemos que la agricultura puede ser regenerativa, productiva y resiliente a la vez. Nuestra visión es transformar la gestión de la tierra integrando la inteligencia de la naturaleza con la precisión de la tecnología avanzada.",
                        "Con Agrobots, cada hectárea se convierte en un ecosistema auto-optimizador, guiado por IA, gestionado mediante robótica modular y diseñado para restaurar la salud del suelo, el agua y la biodiversidad.",
                        "Nuestra plataforma, Land OS, unifica datos ambientales en tiempo real, toma de decisiones automatizada y operaciones de campo descentralizadas. Al reemplazar el modelo antiguo de agricultura extractiva y dependiente de insumos, creamos sistemas que se adaptan y mejoran con cada temporada—reduciendo costes, aumentando el rendimiento y regenerando la tierra.",
                        "Nos comprometemos a marcar un nuevo estándar: una agricultura que funciona en armonía con los ciclos naturales, utiliza datos para mejorar la eficiencia y deja un legado positivo para las próximas generaciones. Este es el futuro que construimos—donde la tecnología y la ecología prosperan juntas."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    textPosition: "right"
                }
            }
        }
    }
}
