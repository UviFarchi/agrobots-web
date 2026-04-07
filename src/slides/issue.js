import colors from "@/assets/colors.js";

export default {
    name: "issue",
    component: "CardGrid",
    content: {
        en: {
            title: "Trouble in Paradise",
            expandText: "Click to read more",
            slideTitle: "What’s Wrong with Farming?",
            slideIntro:
                "Modern agriculture produces more food than ever, but at a serious cost: degraded soils, water stress, rising emissions, fragile supply chains, and growing waste. Too many current systems depend on chemicals, heavy machinery, and rigid routines that treat the land as uniform and predictable. To secure food production without exhausting the terrain that sustains it, we need a more adaptive and regenerative model. Here is what we are up against:",
            columns: 2,
            slideTitleColor: colors.secondary,
            slideIntroColor: colors.textLight,
            cards: [
                {
                    icon: "🌍",
                    title: "Ecological Damage",
                    backText: "Intensive agriculture often relies on monocultures, synthetic inputs, and repeated mechanical stress that degrade soil structure, pollute water, and reduce biodiversity. The same land that is pushed hardest often becomes less resilient over time, needing more intervention just to maintain output. This is not only an ecological problem. It is an operational one, because damaged terrain becomes harder and more expensive to manage well.",
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
                    backText: "Large machines and uniform treatment plans are efficient only when the land behaves uniformly, which real terrain never does. Different zones need different timing, different care, and different responses to weather, biology, and market pressure. When management lacks precision, operators either over-apply resources or react too late. A modular, data-driven system makes it possible to respond locally instead of treating the whole site as one flat average.",
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
                    backText: "A significant share of food is lost before it is consumed, not only because of transport and storage, but also because production, timing, and logistics are poorly matched. Systems that overproduce, move products long distances, or respond too slowly to real demand waste land, water, labor, and energy. Smarter terrain management can reduce waste by improving timing, coordination, and local operational visibility.",
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
                    backText: "Many agricultural systems are optimized for immediate output rather than long-term resilience. That can mean exhausting soil, locking in dependency on expensive inputs, and increasing exposure to drought, disease, pests, and market shocks. A short-term approach may look efficient for a season, but it often makes the next season harder. More adaptive management is necessary if agriculture is to stay productive under changing conditions.",
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
            title: "Problemas en el paraiso",
            expandText: "Pulsa para expandir",
            slideTitle: "¿Qué está mal en la agricultura?",
            slideIntro:
                "La agricultura moderna produce más alimentos que nunca, pero a un coste muy serio: suelos degradados, presión sobre el agua, emisiones crecientes, cadenas de suministro frágiles y un gran desperdicio. Demasiados sistemas actuales dependen de químicos, maquinaria pesada y rutinas rígidas que tratan la tierra como si fuera uniforme y predecible. Para asegurar la producción alimentaria sin agotar el terreno que la sostiene, necesitamos un modelo más adaptativo y regenerativo. Estos son algunos de los problemas de fondo:",
            columns: 2,
            slideTitleColor: colors.secondary,
            slideIntroColor: colors.textLight,
            cards: [
                {
                    icon: "🌍",
                    title: "Daño ecológico",
                    backText: "La agricultura intensiva suele depender de monocultivos, insumos sintéticos y estrés mecánico repetido que degradan la estructura del suelo, contaminan el agua y reducen la biodiversidad. La misma tierra que se fuerza más termina siendo menos resiliente con el tiempo y necesita más intervención solo para mantener el rendimiento. No es solo un problema ecológico. También es un problema operativo, porque un terreno dañado es más difícil y más caro de gestionar bien.",
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
                    backText: "Las grandes máquinas y los planes uniformes solo son eficientes cuando el terreno se comporta de forma uniforme, y el terreno real nunca funciona así. Distintas zonas necesitan distintos tiempos, distintos cuidados y distintas respuestas al clima, a la biología y a la presión del mercado. Cuando la gestión carece de precisión, los operadores o aplican recursos de más o reaccionan demasiado tarde. Un sistema modular y guiado por datos permite responder localmente en lugar de tratar todo el sitio como un promedio plano.",
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
                    backText: "Una parte importante de los alimentos se pierde antes de ser consumida, no solo por transporte y almacenamiento, sino también porque producción, calendario y logística están mal alineados. Los sistemas que sobreproducen, mueven producto a largas distancias o reaccionan demasiado despacio a la demanda real desperdician tierra, agua, trabajo y energía. Una gestión más inteligente del terreno puede reducir ese desperdicio mejorando el momento de actuación, la coordinación y la visibilidad operativa local.",
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
                    backText: "Muchos sistemas agrícolas están optimizados para el rendimiento inmediato y no para la resiliencia de largo plazo. Eso puede agotar el suelo, fijar dependencia de insumos caros y aumentar la exposición a sequías, enfermedades, plagas y shocks de mercado. Un enfoque cortoplacista puede parecer eficiente durante una temporada, pero a menudo hace más difícil la siguiente. Hace falta una gestión más adaptativa si la agricultura quiere seguir siendo productiva bajo condiciones cambiantes.",
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
