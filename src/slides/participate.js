import colors from "@/assets/colors.js";

export default {
    name: 'participate',
    component: 'ActionColumns',
    content: {
        en: {
            title: 'Get Involved',
            general: {
                slideTitle: 'Get Involved',
                slideTitleColor: colors.primary,
                slideIntro: 'Help us bring regenerative, autonomous agriculture to life.',
                slideIntroColor: colors.secondary,
            },
            columns: [
                {
                    columnIcon: "📣",
                    columnTitle: "Spread the Word",
                    columnText: "Help amplify our mission by sharing Agrobots with friends, family, and anyone passionate about sustainable technology. Your voice can spark change and build awareness for a future where agriculture and nature thrive together.",
                    buttonText: "Share with Friends",
                    buttonLink: "share",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIcon: "🌱",
                    columnTitle: "Become a Customer",
                    columnText: "Are you ready to regenerate your land, boost productivity, or pilot a biorome? Let’s talk. Discover how Terrain Management as a Service can transform your property and guarantee measurable results—with zero upfront investment. Start by requesting a quote or pilot today.",
                    buttonText: "Request a Quote",
                    buttonLink: "quote",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIcon: "🤝",
                    columnTitle: "Partner with Us",
                    columnText: "We're eager to collaborate with investors, local partners, OEM suppliers, and policy leaders. Join us in building a resilient, sustainable agricultural ecosystem—and be part of the next leap in land management.",
                    buttonText: "Talk to Us",
                    buttonLink: "contact",
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
            title: 'Toma Parte',
            general: {
                slideTitle: 'Involúcrate',
                slideTitleColor: colors.primary,
                slideIntro: 'Ayúdanos a hacer realidad una agricultura regenerativa y autónoma.',
                slideIntroColor: colors.secondary,
            },
            columns: [
                {
                    columnIcon: "📣",
                    columnTitle: "Difunde la misión",
                    columnText: "Ayúdanos a amplificar nuestra misión compartiendo Agrobots con amigos, familiares y toda persona apasionada por la tecnología sostenible. Tu voz puede inspirar el cambio y dar visibilidad a un futuro donde agricultura y naturaleza prosperan en armonía.",
                    buttonText: "Compartir con amigos",
                    buttonLink: "share",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIcon: "🌱",
                    columnTitle: "Hazte cliente",
                    columnText: "¿Quieres regenerar tu terreno, aumentar la productividad o pilotar un biorome? Hablemos. Descubre cómo la Gestión del Terreno como Servicio puede transformar tu propiedad y garantizar resultados medibles—sin inversión inicial. Solicita tu presupuesto o piloto hoy mismo.",
                    buttonText: "Solicita presupuesto",
                    buttonLink: "quote",
                    buttonBgColor: colors.accent,
                    buttonTextColor: colors.textDark,
                    buttonBorderColor: colors.accent,
                    columnsBgColor: colors.backgroundDark,
                    textColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    columnIcon: "🤝",
                    columnTitle: "Colabora con nosotros",
                    columnText: "Buscamos colaborar con inversores, aliados locales, proveedores OEM y líderes en políticas públicas. Únete para construir un ecosistema agrícola resiliente y sostenible—y forma parte del salto tecnológico en la gestión del terreno.",
                    buttonText: "Habla con nosotros",
                    buttonLink: "contact",
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
};