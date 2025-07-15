import colors from "@/assets/colors.js";

export default {
    name: "issue",
    title: "Trouble in Paradise",
    component: "CardGrid",
    content: {
        en: {
            slideTitle: "What’s Wrong with Farming?",
            slideIntro:
                "Modern agriculture delivers more food than ever, but at a serious cost: degraded soils, dwindling water, rising emissions, and growing waste. Current models push for maximum yield using chemicals and heavy machinery, leaving ecosystems fragile and farmers exposed to risk. To ensure food security and restore the land, we need a smarter, regenerative approach—one that uses advanced technology to work with nature, not against it. Here’s what we’re up against:",
            columns: 2,
            slideTitleColor: colors.secondary,
            slideIntroColor: colors.textLight,
            cards: [
                {
                    icon: "🌍",
                    title: "Ecological Damage",
                    backText: "Intensive farming practices—monocultures, pesticides, synthetic fertilizers—degrade soil, pollute water, and reduce biodiversity. Over 70% of freshwater is used for agriculture, much of it wasted or contaminated. We need systems that heal the land while producing more with less.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                },
                {
                    icon: "🧠",
                    title: "Lack of Precision",
                    backText: "Bigger machines and uniform methods can't adapt to local needs or sudden change. Heavy mechanization compacts soil, burns fossil fuels, and is blind to the complexity of real ecosystems. Modular, data-driven robotics are the next step.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                },
                {
                    icon: "🌾",
                    title: "Food Waste & Inefficiency",
                    backText: "One-third of food produced globally is lost before it reaches the plate. Inefficient logistics, overproduction, and poor management waste resources and damage the environment. Smart, local, and automated systems can slash waste and boost freshness.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                },
                {
                    icon: "🕰️",
                    title: "Short-Term Focus",
                    backText: "Conventional agriculture prioritizes quick gains over long-term resilience. Monocultures and input-heavy models increase vulnerability to disease, drought, and climate shocks. Only adaptive, data-driven management can future-proof our food supply.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                }
            ]
        },
        es: {
            slideTitle: "¿Qué está mal en la agricultura?",
            slideIntro:
                "La agricultura moderna produce más alimentos que nunca, pero a un coste grave: suelos degradados, agua cada vez más escasa, emisiones crecientes y desperdicio alimentario. El modelo actual prioriza el rendimiento máximo usando insumos químicos y maquinaria pesada, dejando los ecosistemas frágiles y a los agricultores expuestos. Para garantizar la seguridad alimentaria y restaurar el suelo, necesitamos un enfoque más inteligente y regenerativo, apoyado en tecnología avanzada que trabaje con la naturaleza. Estos son los grandes retos:",
            columns: 2,
            slideTitleColor: colors.secondary,
            slideIntroColor: colors.textLight,
            cards: [
                {
                    icon: "🌍",
                    title: "Daño ecológico",
                    backText: "Las prácticas intensivas—monocultivos, pesticidas, fertilizantes sintéticos—degradan el suelo, contaminan el agua y reducen la biodiversidad. Más del 70% del agua dulce se destina a la agricultura, gran parte desperdiciada o contaminada. Necesitamos sistemas que regeneren la tierra y produzcan más con menos.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                },
                {
                    icon: "🧠",
                    title: "Falta de precisión",
                    backText: "Las grandes máquinas y métodos uniformes no se adaptan a las condiciones locales ni a cambios repentinos. La mecanización pesada compacta el suelo, consume combustibles fósiles y no ve la complejidad real de los ecosistemas. La robótica modular y el análisis de datos son el siguiente paso.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                },
                {
                    icon: "🌾",
                    title: "Desperdicio e ineficiencia",
                    backText: "Un tercio de los alimentos producidos se pierde antes de llegar al plato. La logística ineficiente, la sobreproducción y la mala gestión desperdician recursos y dañan el entorno. Sistemas inteligentes, automatizados y locales pueden reducir drásticamente el desperdicio y mejorar la frescura.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                },
                {
                    icon: "🕰️",
                    title: "Enfoque cortoplacista",
                    backText: "La agricultura convencional prioriza la ganancia inmediata sobre la resiliencia a largo plazo. Los monocultivos y modelos dependientes de insumos incrementan la vulnerabilidad ante enfermedades, sequías y cambios climáticos. Solo la gestión adaptativa y basada en datos puede asegurar el futuro alimentario.",
                    frontBg: colors.primary,
                    frontColor: colors.textDark,
                    frontBorder: colors.secondary,
                    backBg: colors.backgroundLight,
                    backColor: colors.textDark,
                    backBorder: colors.primary
                }
            ]
        }
    }
};