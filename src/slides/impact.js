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
                    title: "What we aim to change",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "impact1",
                            left: "65%",
                            top: "35%",
                            label: "Impact on Agriculture",
                            info: "Agrobots is designed to make agriculture more resilient, more observable, and more precise at the terrain level. That means better use of water, nutrients, labor, and interventions, combined with a management model that can respond to local variation instead of treating the whole site as uniform."
                        },
                        {
                            id: "impact2",
                            left: "35%",
                            top: "70%",
                            label: "The Cost of Inaction",
                            info: "The cost of inaction is high. Relying on conventional methods, fossil-fuel machinery, chemical dependency, rigid workflows, and monoculture logic depletes soil, strains water, and leaves producers exposed to climate and market shocks. Without better terrain intelligence and more adaptive operations, agriculture becomes more fragile every year."
                        },
                        {
                            id: "impact3",
                            left: "87%",
                            top: "38%",
                            label: "Impact on the Industry",
                            info: "Agrobots also points toward a different agricultural technology model. Through modular systems and ACES-based interoperability, it supports a move away from locked, monolithic machinery stacks and toward more flexible, multi-provider operational ecosystems. That matters not only for farms, but for how the industry itself evolves."
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
                            info: "Agrobots can help rural communities do more with the land they already know. By reducing operational strain, improving visibility, and coordinating work more effectively, the system gives farmers, land stewards, and rural workers more room to focus on decisions, improvement, and long-term stability."
                        },
                        {
                            id: "human2",
                            left: "40%",
                            top: "20%",
                            label: "Better Work and Better Tools",
                            info: "The system can automate what is dangerous, highly repetitive, too precision-sensitive, or too hard to staff, while also giving human teams better information and better coordination. In places where full automation makes sense, it can be deployed. In places where people remain central, technology helps them work more safely and more effectively."
                        },
                        {
                            id: "human3",
                            left: "65%",
                            top: "35%",
                            label: "Local Prosperity",
                            info: "By freeing time and reducing fragmented manual work, Agrobots can help rural families and entrepreneurs move toward higher-value activity, from specialized production to services, education, and local enterprise. Better-managed land can support stronger local economies instead of draining people and resources away from them."
                        },
                        {
                            id: "human4",
                            left: "80%",
                            top: "22%",
                            label: "Connected Participation",
                            info: "Because the system depends on data, communications, and digital coordination, it can also help bring better connectivity and infrastructure into places that are often left behind. Access to the internet, digital tools, and operational platforms gives rural communities more ways to participate in the wider economy without giving up their connection to the land."
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
                            label: "Regenerative Management",
                            info: "Agrobots supports a terrain model that aims to restore ecological function while keeping the land productive. Better timing, better monitoring, and more precise intervention can reduce unnecessary inputs and help the site recover biological strength over time."
                        },
                        {
                            id: "env2",
                            left: "41%",
                            top: "27%",
                            label: "Climate Adaptation",
                            info: "Because the system observes and responds continuously, it can help land managers adapt faster to heat, drought, rainfall variation, pests, and other environmental shifts. This matters not as a slogan, but as day-to-day operational resilience."
                        },
                        {
                            id: "env3",
                            left: "85%",
                            top: "43%",
                            label: "Biodiversity Conditions",
                            info: "By reducing blanket intervention and improving precision, the system can create better conditions for biodiversity rather than constantly working against it. That is important both ecologically and operationally, because healthier terrain tends to be more stable and more resilient."
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
                    title: "Lo que queremos cambiar",
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight,
                    hotspots: [
                        {
                            id: "impact1",
                            left: "65%",
                            top: "35%",
                            label: "Impacto en la agricultura",
                            info: "Agrobots está diseñado para hacer la agricultura más resiliente, más observable y más precisa a escala del terreno. Eso significa un mejor uso del agua, de los nutrientes, del trabajo y de las intervenciones, junto con un modelo de gestión capaz de responder a la variación local en lugar de tratar todo el sitio como si fuera uniforme.",
                            openOnStart: true
                        },
                        {
                            id: "impact2",
                            left: "35%",
                            top: "70%",
                            label: "El coste de no innovar",
                            info: "El coste de no innovar es alto. Depender de métodos convencionales, maquinaria fósil, dependencia química, flujos de trabajo rígidos y lógica de monocultivo agota el suelo, presiona el agua y deja a los productores expuestos a shocks climáticos y de mercado. Sin mejor inteligencia del terreno y operaciones más adaptativas, la agricultura se vuelve más frágil cada año."
                        },
                        {
                            id: "impact3",
                            left: "87%",
                            top: "38%",
                            label: "Impacto en la industria",
                            info: "Agrobots también apunta hacia un modelo distinto de tecnología agrícola. A través de sistemas modulares e interoperabilidad basada en ACES, apoya una transición desde pilas cerradas y monolíticas de maquinaria hacia ecosistemas operativos más flexibles y con múltiples proveedores. Eso importa no solo para las fincas, sino también para la evolución de la industria en sí."
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
                            info: "Agrobots puede ayudar a las comunidades rurales a hacer más con la tierra que ya conocen. Al reducir la presión operativa, mejorar la visibilidad y coordinar mejor el trabajo, el sistema da a agricultores, gestores del territorio y trabajadores rurales más margen para centrarse en decisiones, mejora y estabilidad de largo plazo.",
                            openOnStart: true
                        },
                        {
                            id: "human2",
                            left: "40%",
                            top: "20%",
                            label: "Mejor trabajo y mejores herramientas",
                            info: "El sistema puede automatizar lo que es peligroso, altamente repetitivo, demasiado sensible a la precisión o demasiado difícil de cubrir con personal, y al mismo tiempo dar a los equipos humanos mejor información y mejor coordinación. En los lugares donde la automatización completa tiene sentido, puede desplegarse. En los lugares donde las personas siguen siendo centrales, la tecnología les ayuda a trabajar con más seguridad y más eficacia."
                        },
                        {
                            id: "human3",
                            left: "65%",
                            top: "35%",
                            label: "Prosperidad local",
                            info: "Al liberar tiempo y reducir el trabajo manual fragmentado, Agrobots puede ayudar a familias rurales y emprendedores a avanzar hacia actividades de mayor valor, desde producción especializada hasta servicios, formación y empresa local. Un terreno mejor gestionado puede sostener economías locales más fuertes en lugar de vaciar de personas y recursos el entorno rural."
                        },
                        {
                            id: "human4",
                            left: "80%",
                            top: "22%",
                            label: "Participación conectada",
                            info: "Como el sistema depende de datos, comunicaciones y coordinación digital, también puede ayudar a llevar mejor conectividad e infraestructura a lugares que a menudo quedan atrás. El acceso a internet, a herramientas digitales y a plataformas operativas da a las comunidades rurales más formas de participar en la economía amplia sin renunciar a su vínculo con la tierra."
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
                            label: "Gestión regenerativa",
                            info: "Agrobots apoya un modelo de terreno que busca restaurar la función ecológica mientras mantiene la productividad. Mejor timing, mejor monitorización y una intervención más precisa pueden reducir insumos innecesarios y ayudar a que el sitio recupere fuerza biológica con el tiempo.",
                            openOnStart: true
                        },
                        {
                            id: "env2",
                            left: "60%",
                            top: "20%",
                            label: "Adaptación climática",
                            info: "Como el sistema observa y responde de forma continua, puede ayudar a los gestores del territorio a adaptarse más rápido al calor, a la sequía, a la variación de lluvias, a las plagas y a otros cambios ambientales. Esto importa no como un eslogan, sino como resiliencia operativa cotidiana."
                        },
                        {
                            id: "env3",
                            left: "85%",
                            top: "43%",
                            label: "Condiciones para la biodiversidad",
                            info: "Al reducir la intervención indiscriminada y mejorar la precisión, el sistema puede crear mejores condiciones para la biodiversidad en lugar de trabajar constantemente contra ella. Eso importa tanto ecológicamente como operativamente, porque un terreno más sano tiende a ser más estable y más resiliente."
                        }
                    ]
                }
            }
        }
    }
};
