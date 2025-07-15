import colors from "@/assets/colors.js";

export default{
    name: 'impact',

    component: 'ScrollingFullBg',
    content: {
        en: {
            title: 'Impact',
            buttonsLegend: "Impacts",
            defaultButtonLabel: "Back",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    textPosition: "right",
                    bgImage: "/img/impact_main.png",
                    title: "What we aim to achieve",
                    paragraphs: [
                        "Agrobots is more than a technological upgrade—it’s a complete reimagining of agriculture. Every field becomes a living ecosystem where nature and technology work in harmony. We restore overworked soils, turning them into regenerative landscapes managed by intelligent systems that boost yields, restore balance, and reduce waste—redefining productivity sustainably.",
                        "The cost of inaction is high. Relying on conventional methods—fossil-fuel machinery, chemical inputs, monocultures—depletes soils, strains water, and increases storage and transport costs. Without innovation, supply chains become fragile and food systems vulnerable to climate and market shocks.",
                        "Now, more than ever, we can turn these challenges into opportunities. With just-in-place and just-in-time Agriculture 4.0 principles, Agrobots produces food exactly where and when it’s needed. We create vibrant ecosystems that preserve biodiversity while delivering affordable, high-quality food for everyone. The choice is clear: innovation and balance will nourish both the land and our communities."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                },
                Human: {
                    textPosition: "right",
                    bgImage: "/img/impact_human.png",
                    title: "Human Impact",
                    paragraphs: [
                        "Agrobots is committed to uplifting communities. For farmers and rural workers, our technology brings not just efficiency, but hope and opportunity. Automating laborious tasks and optimizing every aspect of farming frees time and resources, empowering communities to focus on innovation, education, and prosperity.",
                        "Picture rural landscapes where technology and tradition blend. Agrobots equips people with the tools and knowledge they need to thrive, fostering job creation and sustainable practices. Every stakeholder—from family farms to large producers—benefits from a healthier, more reliable food supply."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                },
                Environmental: {
                    textPosition: "right",
                    bgImage: "/img/impact_environmental.png",
                    title: "Environmental Impact",
                    paragraphs: [
                        "Our approach is about healing the planet as much as feeding it. Agrobots enables a regenerative model that dramatically reduces chemical and fossil fuel use. By orchestrating the interplay of plants, microbes, and robotics, we restore soil balance, save water, and enhance biodiversity. The land evolves into a vibrant, self-sustaining ecosystem that stores carbon and adapts to climate change—a blueprint for environmental renewal and a healthier planet for future generations."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                }
            }
        },
        es: {
            title: 'Impacto',
            buttonsLegend: "Impactos",
            defaultButtonLabel: "Volver",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    textPosition: "right",
                    bgImage: "/img/impact_main.png",
                    title: "Nuestro impacto esperado",
                    paragraphs: [
                        "Agrobots es mucho más que una actualización tecnológica: es una reinvención total de la agricultura. Cada parcela se convierte en un ecosistema vivo donde naturaleza y tecnología trabajan en armonía. Recuperamos suelos agotados, transformándolos en paisajes regenerativos gestionados por sistemas inteligentes que aumentan el rendimiento, restauran el equilibrio y reducen el desperdicio—definiendo una nueva productividad sostenible.",
                        "El coste de no innovar es alto. Seguir con métodos convencionales—maquinaria fósil, insumos químicos, monocultivos—empobrece el suelo, presiona los recursos hídricos y encarece el almacenamiento y transporte. Sin innovación, las cadenas de suministro se vuelven frágiles y los sistemas alimentarios son vulnerables al clima y el mercado.",
                        "Hoy más que nunca, podemos convertir estos retos en oportunidades. Con los principios de Agricultura 4.0—just-in-place y just-in-time—Agrobots produce alimentos justo donde y cuando se necesitan. Creamos ecosistemas vibrantes que conservan la biodiversidad y ofrecen alimentos accesibles y de calidad para todos. La elección es clara: innovación y equilibrio nutrirán tanto la tierra como las comunidades."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                },
                Humano: {
                    textPosition: "right",
                    bgImage: "/img/impact_human.png",
                    title: "Impacto social",
                    paragraphs: [
                        "El compromiso de Agrobots es con las comunidades. Para agricultores y trabajadores rurales, nuestra tecnología aporta no solo eficiencia, sino esperanza y oportunidad. Automatizar tareas pesadas y optimizar cada aspecto agrícola libera tiempo y recursos, empoderando a las comunidades para centrarse en la innovación, la educación y la prosperidad local.",
                        "Imagina paisajes rurales donde tecnología y tradición conviven. Agrobots brinda herramientas y conocimiento para prosperar, fomentando empleo y sostenibilidad. Todos los actores—desde pequeñas familias hasta grandes productores—se benefician de un suministro más sano y fiable."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                },
                Medioambiental: {
                    textPosition: "right",
                    bgImage: "/img/impact_environmental.png",
                    title: "Impacto ambiental",
                    paragraphs: [
                        "Nuestra visión es sanar el planeta a la vez que lo alimentamos. Agrobots impulsa un modelo regenerativo que reduce drásticamente el uso de químicos y combustibles fósiles. Al coordinar plantas, microbios y robótica, restauramos el equilibrio del suelo, ahorramos agua y mejoramos la biodiversidad. El terreno evoluciona hacia un ecosistema vivo, capaz de almacenar carbono y adaptarse al cambio climático—una hoja de ruta para la renovación ambiental y un planeta más sano para las próximas generaciones."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                }
            }
        }
    }
}
;