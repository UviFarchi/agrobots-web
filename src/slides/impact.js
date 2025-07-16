import colors from "@/assets/colors.js";

export default {
    name: 'impact',
    component: 'ScrollingFullBg',
    content: {
        en: {
            title: 'Impact',
            instructions: "Click the glowing markers on the scene to explore the different types of impact Agrobots delivers, or click on the buttons below to explore other areas of impact.",
            buttonsLegend: "Impacts",
            defaultButtonLabel: "Back",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    textPosition: "right",
                    bgImage: "/img/impact_main.png",
                    title: "What we aim to achieve",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "impact1",
                            left: "65%",
                            top: "35%",
                            label: "Regenerative Ecosystems",
                            info: "Agrobots is more than a technological upgrade—it’s a complete reimagining of agriculture. Every field becomes a living ecosystem where nature and technology work in harmony. We restore overworked soils, turning them into regenerative landscapes managed by intelligent systems that boost yields, restore balance, and reduce waste—redefining productivity sustainably.",
                        },
                        {
                            id: "impact2",
                            left: "35%",
                            top: "70%",
                            label: "The Cost of Inaction",
                            info: "The cost of inaction is high. Relying on conventional methods—fossil-fuel machinery, chemical inputs, monocultures—depletes soils, strains water, and increases storage and transport costs. Without innovation, supply chains become fragile and food systems vulnerable to climate and market shocks."
                        },
                        {
                            id: "impact3",
                            left: "87%",
                            top: "38%",
                            label: "Transformative Opportunity",
                            info: "Now, more than ever, we can turn these challenges into opportunities. With just-in-place and just-in-time Agriculture 4.0 principles, Agrobots produces food exactly where and when it’s needed. We create vibrant ecosystems that preserve biodiversity while delivering affordable, high-quality food for everyone. The choice is clear: innovation and balance will nourish both the land and our communities."
                        }
                    ]
                },
                Human: {
                    textPosition: "right",
                    bgImage: "/img/impact_human.png",
                    title: "Human Impact",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "human1",
                            left: "36%",
                            top: "70%",
                            label: "Empowering Communities",
                            info: "Agrobots is committed to uplifting communities. For farmers and rural workers, our technology brings not just efficiency, but hope and opportunity. Automating laborious tasks and optimizing every aspect of farming frees time and resources, empowering communities to focus on innovation, education, and prosperity.",
                        },
                        {
                            id: "human2",
                            left: "40%",
                            top: "20%",
                            label: "Tools for Thriving",
                            info: "Picture rural landscapes where technology and tradition blend. Agrobots equips people with the tools and knowledge they need to thrive, fostering job creation and sustainable practices. Every stakeholder—from family farms to large producers—benefits from a healthier, more reliable food supply."
                        },
                        {
                            id: "human3",
                            left: "65%",
                            top: "35%",
                            label: "Local Prosperity",
                            info: "By freeing up time and reducing repetitive labor, Agrobots enables local families and rural entrepreneurs to focus on high-value activities, from education to value-added production. This transition supports the emergence of new rural businesses and helps keep younger generations invested in agriculture."
                        }
                    ]
                },
                Environmental: {
                    textPosition: "right",
                    bgImage: "/img/impact_environmental.png",
                    title: "Environmental Impact",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "env1",
                            left: "52%",
                            top: "65%",
                            label: "Regenerative Model",
                            info: "Our approach is about healing the planet as much as feeding it. Agrobots enables a regenerative model that dramatically reduces chemical and fossil fuel use. By orchestrating the interplay of plants, microbes, and robotics, we restore soil balance, save water, and enhance biodiversity. The land evolves into a vibrant, self-sustaining ecosystem that stores carbon and adapts to climate change—a blueprint for environmental renewal and a healthier planet for future generations.",
                        },
                        {
                            id: "env2",
                            left: "41%",
                            top: "27%",
                            label: "Climate Adaptation",
                            info: "Agrobots’ monitoring and adaptive systems enable land managers to respond quickly to environmental shifts—whether it’s rainfall patterns, temperature swings, or emerging pests. This climate resilience ensures agricultural productivity even in the face of unpredictable weather."
                        },
                        {
                            id: "env3",
                            left: "85%",
                            top: "43%",
                            label: "Biodiversity Boost",
                            info: "Through precision management and minimizing chemical inputs, our systems foster pollinator populations and restore native species—helping to rebuild biodiversity from the ground up."
                        }
                    ]
                }
            }
        },
        es: {
            title: 'Impacto',
            instructions: "Haz clic en los marcadores luminosos para descubrir los el impacto que genera Agrobots, o pulsa los botones abajo para ver efectos más específicos.",
            buttonsLegend: "Impactos",
            defaultButtonLabel: "Volver",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    textPosition: "right",
                    bgImage: "/img/impact_main.png",
                    title: "El impacto que queremos tener",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "impact1",
                            left: "65%",
                            top: "35%",
                            label: "Ecosistemas regenerativos",
                            info: "Agrobots es mucho más que una actualización tecnológica: es una reinvención total de la agricultura. Cada parcela se convierte en un ecosistema vivo donde naturaleza y tecnología trabajan en armonía. Recuperamos suelos agotados, transformándolos en paisajes regenerativos gestionados por sistemas inteligentes que aumentan el rendimiento, restauran el equilibrio y reducen el desperdicio—definiendo una nueva productividad sostenible.",
                            openOnStart: true
                        },
                        {
                            id: "impact2",
                            left: "35%",
                            top: "70%",
                            label: "El coste de no innovar",
                            info: "El coste de no innovar es alto. Seguir con métodos convencionales—maquinaria fósil, insumos químicos, monocultivos—empobrece el suelo, presiona los recursos hídricos y encarece el almacenamiento y transporte. Sin innovación, las cadenas de suministro se vuelven frágiles y los sistemas alimentarios son vulnerables al clima y el mercado."
                        },
                        {
                            id: "impact3",
                            left: "87%",
                            top: "38%",
                            label: "Oportunidad transformadora",
                            info: "Hoy más que nunca, podemos convertir estos retos en oportunidades. Con los principios de Agricultura 4.0—just-in-place y just-in-time—Agrobots produce alimentos justo donde y cuando se necesitan. Creamos ecosistemas vibrantes que conservan la biodiversidad y ofrecen alimentos accesibles y de calidad para todos. La elección es clara: innovación y equilibrio nutrirán tanto la tierra como las comunidades."
                        }
                    ]
                },
                Humano: {
                    textPosition: "right",
                    bgImage: "/img/impact_human.png",
                    title: "Impacto social",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "human1",
                            left: "36%",
                            top: "70%",
                            label: "Empoderamiento rural",
                            info: "El compromiso de Agrobots es con las comunidades. Para agricultores y trabajadores rurales, nuestra tecnología aporta no solo eficiencia, sino esperanza y oportunidad. Automatizar tareas pesadas y optimizar cada aspecto agrícola libera tiempo y recursos, empoderando a las comunidades para centrarse en la innovación, la educación y la prosperidad local.",
                            openOnStart: true
                        },
                        {
                            id: "human2",
                            left: "40%",
                            top: "20%",
                            label: "Herramientas para prosperar",
                            info: "Imagina paisajes rurales donde tecnología y tradición conviven. Agrobots brinda herramientas y conocimiento para prosperar, fomentando empleo y sostenibilidad. Todos los actores—desde pequeñas familias hasta grandes productores—se benefician de un suministro más sano y fiable."
                        },
                        {
                            id: "human3",
                            left: "65%",
                            top: "35%",
                            label: "Prosperidad local",
                            info: "Al liberar tiempo y reducir la carga de tareas repetitivas, Agrobots permite que familias y emprendedores rurales se enfoquen en actividades de mayor valor, desde la formación hasta la producción diferenciada. Así surge una economía rural más dinámica y los jóvenes encuentran más motivos para quedarse en el campo."
                        }
                    ]
                },
                Medioambiental: {
                    textPosition: "right",
                    bgImage: "/img/impact_environmental.png",
                    title: "Impacto ambiental",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "env1",
                            left: "52%",
                            top: "65%",
                            label: "Modelo regenerativo",
                            info: "Nuestra visión es sanar el planeta a la vez que lo alimentamos. Agrobots impulsa un modelo regenerativo que reduce drásticamente el uso de químicos y combustibles fósiles. Al coordinar plantas, microbios y robótica, restauramos el equilibrio del suelo, ahorramos agua y mejoramos la biodiversidad. El terreno evoluciona hacia un ecosistema vivo, capaz de almacenar carbono y adaptarse al cambio climático—una hoja de ruta para la renovación ambiental y un planeta más sano para las próximas generaciones.",
                            openOnStart: true
                        },
                        {
                            id: "env2",
                            left: "60%",
                            top: "20%",
                            label: "Adaptación climática",
                            info: "El monitoreo y los sistemas adaptativos de Agrobots permiten responder rápidamente a cambios ambientales—lluvias, sequías, plagas—garantizando la productividad agrícola incluso ante fenómenos climáticos extremos."
                        },
                        {
                            id: "env3",
                            left: "85%",
                            top: "43%",
                            label: "Más biodiversidad",
                            info: "La gestión precisa y la reducción de químicos permiten recuperar polinizadores y especies nativas, reconstruyendo la biodiversidad desde la base del ecosistema."
                        }
                    ]
                }
            }
        }
    }
};
