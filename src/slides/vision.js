import colors from "@/assets/colors.js";

export default {
    name: 'vision',
    component: 'ScrollingFullBg',
    content: {
        en: {
            title: 'Our Vision',
            instructions: 'Click the glowing markers on the scene to learn how we envision the future of agriculture.',
            buttonsLegend: "",
            defaultButtonLabel: "Back",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    bgImage: "/img/biorome_1.png",
                    title: "Our Vision",
                    titleColor: colors.primary,
                    textPosition: "right",
                    hotspots: [
                        {
                            id: "hotspot_main",
                            left: "52%",
                            top: "10%",
                            label: "How farming should be",
                            info: "We believe agriculture can be regenerative, productive, and resilient—all at once.",
                            openOnStart: true
                        },
                        {
                            id: "hotspot1",
                            left: "63%",
                            top: "75%",
                            label: "Self-Optimizing Ecosystem",
                            info: "With Agrobots, every hectare becomes a self-optimizing ecosystem—guided by AI, managed through modular robotics, and designed to restore the health of soil, water, and biodiversity."
                        },
                        {
                            id: "hotspot2",
                            left: "50%",
                            top: "49%",
                            label: "Land OS Platform",
                            info: "Our platform, Land OS, unites real-time environmental data, automated decision-making, and decentralized field operations. By replacing the old model of extractive, input-heavy agriculture, we create systems that adapt and improve with every season—lowering costs, increasing yields, and regenerating the land."
                        },
                        {
                            id: "hotspot3",
                            left: "35%",
                            top: "75%",
                            label: "Harmony for Future Generations",
                            info: "We are committed to setting a new standard: agriculture that operates in harmony with natural cycles, leverages data to boost efficiency, and leaves a positive legacy for future generations. This is the future we are building—where technology and ecology thrive together."
                        }
                    ]
                }
            }
        },
        es: {
            title: 'Nuestra Visión',
            instructions: 'Haz clic en los marcadores luminosos de la escena para descubrir cómo vemos el futuro de la agricultura.',
            buttonsLegend: "",
            defaultButtonLabel: "Volver",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    bgImage: "/img/biorome_1.png",
                    title: "Nuestra Visión",
                    titleColor: colors.primary,
                    textPosition: "right",
                    hotspots: [
                        {
                            id: "hotspot_main",
                            left: "52%",
                            top: "10%",
                            label: "Visión",
                            info: "Creemos que la agricultura puede ser regenerativa, productiva y resiliente a la vez.",
                            openOnStart: true
                        },
                        {
                            id: "hotspot1",
                            left: "63%",
                            top: "75%",
                            label: "Ecosistema auto-optimizador",
                            info: "Con Agrobots, cada hectárea se convierte en un ecosistema auto-optimizador, guiado por IA, gestionado mediante robótica modular y diseñado para restaurar la salud del suelo, el agua y la biodiversidad."
                        },
                        {
                            id: "hotspot2",
                            left: "50%",
                            top: "49%",
                            label: "Plataforma Land OS",
                            info: "Nuestra plataforma, Land OS, unifica datos ambientales en tiempo real, toma de decisiones automatizada y operaciones de campo descentralizadas. Al reemplazar el modelo antiguo de agricultura extractiva y dependiente de insumos, creamos sistemas que se adaptan y mejoran con cada temporada—reduciendo costes, aumentando el rendimiento y regenerando la tierra."
                        },
                        {
                            id: "hotspot3",
                            left: "35%",
                            top: "75%",
                            label: "Armonía para las próximas generaciones",
                            info: "Nos comprometemos a marcar un nuevo estándar: una agricultura que funciona en armonía con los ciclos naturales, utiliza datos para mejorar la eficiencia y deja un legado positivo para las próximas generaciones. Este es el futuro que construimos—donde la tecnología y la ecología prosperan juntas."
                        }
                    ]
                }
            }
        }
    }
}
