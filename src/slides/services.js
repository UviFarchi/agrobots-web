import colors from "@/assets/colors.js";

export default {
    name: 'services',
    component: 'CardGrid',
    content: {
        en: {
            title: 'On the Ground',
            expandText: "Click to read more",
            slideTitle: 'What we do on the ground',
            slideIntro: 'Agrobots applies the same terrain intelligence platform to three practical service lines: agricultural automation and optimization, ecological monitoring, and brownfield remediation. Each one combines LandOS, field data, ecosystem design, and operational coordination, but each serves a different kind of terrain and a different kind of stakeholder.',
            slideTitleColor: colors.secondary,
            slideIntroColor: colors.textLight,
            columns: 3,
            cards: [
                {
                    icon: '🌍',
                    title: 'Agricultural Automation and Optimization',
                    backText: 'For operators, cooperatives, and land managers, Agrobots helps run terrain with more precision, continuity, and adaptability. LandOS can coordinate robotic modules, infrastructure, workflows, and human teams as one operational system. Where full automation makes sense, we can deploy it. Where people remain central, we help them work better with stronger visibility, better timing, and less fragmentation. The goal is not automation for its own sake, but better land performance and better operational control.',
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.accent,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.accent
                },
                {
                    icon: '🌾',
                    title: 'Ecological Monitoring',
                    backText: 'For public institutions, land stewards, conservation programs, and resilience projects, Agrobots can provide continuous ecological monitoring as an operational service. LandOS helps organize terrain data, observe change over time, and support better decisions about water, biodiversity, environmental stress, and land condition. Instead of isolated surveys and disconnected reporting, this creates a living intelligence layer for stewardship.',
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.accent,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.accent
                },
                {
                    icon: '🧠',
                    title: 'Brownfield Remediation',
                    backText: 'For degraded, contaminated, abandoned, or underused terrain, Agrobots can support a structured path toward recovery. Using monitoring, ecosystem design, phased intervention, and long-term operational oversight, LandOS helps turn difficult land into land that can once again be understood, managed, and improved. Depending on the site, that may mean ecological restoration, productive reuse, or a staged transition from damaged terrain to viable terrain.',
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.accent,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.accent
                }
            ]
        },
        es: {
            title: 'Sobre el terreno',
            expandText: "Pulsa para expandir",
            slideTitle: 'Qué hacemos sobre el terreno',
            slideIntro: 'Agrobots aplica la misma plataforma de inteligencia del terreno a tres líneas de servicio prácticas: automatización y optimización agrícola, monitorización ecológica y recuperación de brownfields. Cada una combina LandOS, datos de campo, diseño ecológico y coordinación operativa, pero cada una responde a un tipo distinto de terreno y a un tipo distinto de actor.',
            slideTitleColor: colors.secondary,
            slideIntroColor: colors.textLight,
            columns: 3,
            cards: [
                {
                    icon: '🌍',
                    title: 'Automatización y optimización agrícola',
                    backText: 'Para operadores, cooperativas y gestores del terreno, Agrobots ayuda a operar la tierra con más precisión, continuidad y capacidad de adaptación. LandOS puede coordinar módulos robóticos, infraestructura, flujos de trabajo y equipos humanos como un solo sistema operativo. Donde la automatización completa tiene sentido, podemos desplegarla. Donde las personas siguen siendo centrales, las ayudamos a trabajar mejor con más visibilidad, mejor timing y menos fragmentación. El objetivo no es automatizar por automatizar, sino mejorar el rendimiento del terreno y el control operativo.',
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.accent,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.accent
                },
                {
                    icon: '🌾',
                    title: 'Monitorización ecológica',
                    backText: 'Para instituciones públicas, custodios del territorio, programas de conservación y proyectos de resiliencia, Agrobots puede ofrecer monitorización ecológica continua como un servicio operativo. LandOS ayuda a organizar datos del terreno, observar cambios a lo largo del tiempo y apoyar mejores decisiones sobre agua, biodiversidad, estrés ambiental y estado del paisaje. En lugar de estudios aislados e informes desconectados, esto crea una capa viva de inteligencia para la gestión y la custodia.',
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.accent,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.accent
                },
                {
                    icon: '🧠',
                    title: 'Recuperación de brownfields',
                    backText: 'Para terrenos degradados, contaminados, abandonados o infrautilizados, Agrobots puede apoyar un camino estructurado hacia la recuperación. Mediante monitorización, diseño ecológico, intervención por fases y supervisión operativa de largo plazo, LandOS ayuda a convertir terrenos difíciles en terrenos que vuelven a poder entenderse, gestionarse y mejorarse. Según el sitio, eso puede significar restauración ecológica, reutilización productiva o una transición por etapas desde terreno dañado hasta terreno viable.',
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.accent,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.accent
                }
            ]
        }
    }
}
;
