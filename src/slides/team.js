import colors from "@/assets/colors.js";

export default {
    name: 'team',
    component: 'ActionColumns',
    content: {
        en: {
            title: 'Our Team',
            general: {
                slideTitle: 'Team',
                slideTitleColor: colors.primary,
                slideIntro: 'The humans behind the tech',
                slideIntroColor: colors.secondary,
                columnsPerRow: 2
            },
            columns: [
                {
                    columnIconImg: "/img/reuven.jpeg",
                    columnTitle: "Reuven Farchi – Founder and CEO",
                    columnText: "Solutions architect raised in a farming family, with deep expertise in SaaS, AI, IoT, and geospatial systems. Founded Agrobots to reconnect technology and land.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/reuven-farchi-44764221/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIconImg: "/img/carolina.jpeg",
                    columnTitle: "Carolina Salazar – Head of Business Development",
                    columnText: "Experienced Technology Strategist with 15+ years in emerging tech, AI, and sustainability. Expert in strategy for technology-driven social impact.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/carohedman/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIconImg: "/img/daniel.jpeg",
                    columnTitle: "Daniel Hedman – Marketing & Analytics Lead",
                    columnText: "Marketing & Analytics Lead. 10 years of experience driving digital growth and performance marketing in high-impact sectors.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/hedman/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIconImg: "/img/polett.jpeg",
                    columnTitle: "Polett Sarmiento – Client Relations & Tenders",
                    columnText: "Specialist in content strategy, public-private bids, and institutional partnerships.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/ana-polett-sarmiento-reyes-20779944/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                }
            ]
        },
        es: {
            title: 'El Equipo',
            general: {
                slideTitle: 'Equipo',
                slideTitleColor: colors.primary,
                slideIntro: 'Las personas detrás de la tecnología',
                slideIntroColor: colors.secondary,
                columnsPerRow: 2,
            },
            columns: [
                {
                    columnIconImg: "/img/reuven.jpeg",
                    columnTitle: "Reuven Farchi – CEO Fundador",
                    columnText: "Arquitecto de soluciones criado en familia agrícola, con experiencia en SaaS, IA, IoT y sistemas geoespaciales. Fundador de Agrobots para reconectar tecnología y tierra.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/reuven-farchi-44764221/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.secondary,
                    borderColor: colors.secondary,
                },
                {
                    columnIconImg: "/img/carolina.jpeg",
                    columnTitle: "Carolina Salazar – Jefe de Desarrollo Empresarial",
                    columnText: "Experta en estratégia empresarial con más de 15 años en tecnologías emergentes, IA y sostenibilidad. Especialista en estrategia para impacto social basado en tecnología.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/carohedman/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIconImg: "/img/daniel.jpeg",
                    columnTitle: "Daniel Hedman – Líder de Marketing y Analítica",
                    columnText: "10 años de experiencia impulsando crecimiento digital y marketing de alto impacto.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/hedman/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIconImg: "/img/polett.jpeg",
                    columnTitle: "Polett Sarmiento – Relaciones y Licitaciones",
                    columnText: "Especialista en estrategia de contenidos, licitaciones público-privadas y alianzas institucionales.",
                    buttonText: "LinkedIn",
                    buttonLink: "https://www.linkedin.com/in/ana-polett-sarmiento-reyes-20779944/",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                }
            ]
        }
    }
}
;