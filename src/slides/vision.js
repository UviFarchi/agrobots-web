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
                            info: "We believe agriculture can be productive, regenerative, and resilient at the same time. The goal is not simply to produce more, but to manage land in a way that strengthens the systems that keep it alive.",
                            openOnStart: true
                        },
                        {
                            id: "hotspot1",
                            left: "63%",
                            top: "75%",
                            label: "Self-Optimizing Ecosystem",
                            info: "In our vision, each site becomes a managed ecosystem where biological processes, field operations, and long-term goals are coordinated instead of treated as separate problems. Productivity comes from understanding interactions on the land and responding precisely, not from forcing uniformity everywhere."
                        },
                        {
                            id: "hotspot2",
                            left: "50%",
                            top: "49%",
                            label: "LandOS Platform",
                            info: "LandOS makes this practical by bringing together real-time field data, analytics, optimization, and operations. It helps determine what is happening, what should happen next, and how people and machines should respond. That turns terrain management into a continuous operational loop rather than a series of isolated decisions."
                        },
                        {
                            id: "hotspot3",
                            left: "35%",
                            top: "75%",
                            label: "Harmony for Future Generations",
                            info: "We want agriculture to remain viable for the people who live from it and for the land that sustains it. That means systems that reduce waste, preserve options for future generations, and let human communities benefit from technology without being pushed off the land they know."
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
                            info: "Creemos que la agricultura puede ser productiva, regenerativa y resiliente al mismo tiempo. El objetivo no es solo producir más, sino gestionar la tierra de una forma que refuerce los sistemas que la mantienen viva.",
                            openOnStart: true
                        },
                        {
                            id: "hotspot1",
                            left: "63%",
                            top: "75%",
                            label: "Ecosistema auto-optimizador",
                            info: "En nuestra visión, cada sitio se convierte en un ecosistema gestionado donde los procesos biológicos, las operaciones de campo y los objetivos de largo plazo se coordinan en lugar de tratarse como problemas separados. La productividad surge de entender las interacciones del terreno y responder con precisión, no de imponer uniformidad en todas partes."
                        },
                        {
                            id: "hotspot2",
                            left: "50%",
                            top: "49%",
                            label: "Plataforma LandOS",
                            info: "LandOS vuelve esto práctico al reunir datos de campo en tiempo real, analítica, optimización y operaciones. Ayuda a determinar qué está ocurriendo, qué debería ocurrir a continuación y cómo deben responder personas y máquinas. Así, la gestión del terreno pasa a ser un bucle operativo continuo y no una serie de decisiones aisladas."
                        },
                        {
                            id: "hotspot3",
                            left: "35%",
                            top: "75%",
                            label: "Armonía para las próximas generaciones",
                            info: "Queremos que la agricultura siga siendo viable para quienes viven de ella y para la tierra que la sostiene. Eso significa sistemas que reduzcan desperdicio, preserven opciones para las próximas generaciones y permitan que las comunidades humanas se beneficien de la tecnología sin verse expulsadas de la tierra que conocen."
                        }
                    ]
                }
            }
        }
    }
}
