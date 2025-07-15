import colors from "@/assets/colors.js";

export default {
    name: 'biorome',
    title: 'The Biorome',
    component: 'ScrollingFullBg',
    content: {
        en: {
            buttonsLegend: "Life in a Biorome",
            defaultButtonLabel: "Back",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    bgImage: "/img/biorome_2.png",
                    title: "Bio-Robotic Modular Ecosystems (bioromes)",
                    paragraphs: [
                        "Bio-Robotic Modular Ecosystems, or bioromes, are at the core of our approach to agriculture. Rather than depending on massive, single-purpose machines and uniform fields, we deploy a network of modular, specialized robotic units—each dedicated to a specific function like seeding, monitoring, feeding, or harvesting. This flexible, task-based approach ensures every action is precise and adaptable, minimizing waste and resource use.",
                        "Our advanced AI coordinates all modules in real time, continuously integrating sensor data, weather, and even market signals to guide the system toward optimal performance. Each biorome becomes a living, self-optimizing ecosystem that balances plants, animals, and microbes. The result is higher productivity with drastically fewer chemical inputs and ongoing regeneration of soil and biodiversity.",
                        "Bioromes evolve as living systems, adapting to local conditions and serving the communities around them. By leveraging diversity and natural cycles, they deliver resilient agriculture, reduced environmental impact, and a steady supply of fresh food—even as climate and market conditions shift."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight
                },
                Day: {
                    bgImage: "/img/biorome_day.png",
                    title: "A day in the biorome",
                    paragraphs: [
                        "As dawn breaks, the biorome comes alive. Birds sing, small animals stir, and sensors hidden in the landscape begin collecting real-time data on moisture, soil health, and plant growth.",
                        "Drones rise quietly to scan the fields; a robotic module adjusts water valves based on the night’s absorption patterns, ensuring efficient use of resources. Meanwhile, another module redirects irrigation to drier sectors, guided by real-time AI analysis.",
                        "When the system detects unusual animal behavior, a drone inspects and, if needed, triggers a targeted intervention—such as isolating a sick hen and adapting its feed. All adjustments are seamless, guided by the central optimization engine.",
                        "Midday rain is anticipated hours ahead, so irrigation is paused. A feeding module dispenses a precise mix for livestock based on up-to-the-minute nutritional data. The ecosystem continually adapts, optimizing every resource with minimal human input."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight
                },
                Night: {
                    bgImage: "/img/biorome_night.png",
                    title: "A night in the biorome",
                    paragraphs: [
                        "As dusk settles, the biorome shifts into night mode. Nocturnal pollinators emerge, and the system adapts strategies for cooler temperatures, updating models in real time.",
                        "Night is optimal for some tasks—like precision irrigation, which minimizes evaporation, or targeted nutrient application. Delicate crops may be harvested under dew-laden air, ensuring freshness and quality.",
                        "Drones conduct infrared scans to verify the presence and health of all monitored species. Micro-disturbances, like a rodent digging, are logged as signs of healthy biodiversity.",
                        "Throughout the night, resources are redistributed, and robotic modules reposition for upcoming tasks. By dawn, the biorome is ready to begin the adaptive cycle anew—optimizing, regenerating, and maintaining balance."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight
                }
            }
        },
        es: {
            buttonsLegend: "Vida en un Biorome",
            defaultButtonLabel: "Volver",
            buttonBgColor: colors.accent,
            buttonTextColor: colors.textDark,
            modes: {
                default: {
                    bgImage: "/img/biorome_2.png",
                    title: "Ecosistemas Bio-Robóticos Modulares (bioromes)",
                    paragraphs: [
                        "Los Ecosistemas Bio-Robóticos Modulares, o bioromes, están en el corazón de nuestra propuesta agrícola. En lugar de depender de grandes máquinas de un solo uso y monocultivos, desplegamos una red de unidades robóticas modulares, cada una especializada en una función: siembra, monitorización, alimentación o cosecha. Esta arquitectura flexible y basada en tareas permite una acción precisa y adaptable, minimizando el desperdicio y el uso de recursos.",
                        "Nuestra IA avanzada coordina todos los módulos en tiempo real, integrando datos de sensores, previsiones climáticas e incluso señales de mercado para guiar el sistema hacia el rendimiento óptimo. Cada biorome se convierte en un ecosistema vivo y auto-optimizador que equilibra plantas, animales y microbios. El resultado es una mayor productividad con muchos menos insumos químicos y una regeneración continua del suelo y la biodiversidad.",
                        "Con el tiempo, los bioromes evolucionan como sistemas vivos, adaptándose a las condiciones locales y sirviendo a las comunidades. Al aprovechar la diversidad y los ciclos naturales, ofrecen una agricultura resiliente, menor impacto ambiental y un suministro estable de alimentos frescos—adaptándose tanto al clima como a las condiciones del mercado."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight
                },
                "Día": {
                    bgImage: "/img/biorome_day.png",
                    title: "Un día en el biorome",
                    paragraphs: [
                        "Al amanecer, el biorome cobra vida. Cantan los pájaros, se mueven pequeños animales y sensores ocultos en el paisaje recopilan datos en tiempo real sobre humedad, salud del suelo y crecimiento de las plantas.",
                        "Drones despegan en silencio para escanear los campos; un módulo robótico ajusta las válvulas de agua según la absorción nocturna, optimizando el uso de recursos. Otro módulo redirige el riego hacia sectores más secos, guiado por el análisis de IA en tiempo real.",
                        "Cuando el sistema detecta un comportamiento animal inusual, un dron inspecciona y, si es necesario, activa una intervención precisa, como aislar una gallina enferma y ajustar su alimentación. Todos los ajustes se realizan de forma fluida, dirigidos por el motor central de optimización.",
                        "La lluvia de mediodía se anticipa con horas de antelación, por lo que el riego se detiene. Un módulo de alimentación distribuye una mezcla precisa al ganado, basada en datos nutricionales actualizados. El ecosistema se adapta de manera continua, optimizando cada recurso con mínima intervención humana."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight
                },
                Noche: {
                    bgImage: "/img/biorome_night.png",
                    title: "Una noche en el biorome",
                    paragraphs: [
                        "Al anochecer, el biorome entra en modo nocturno. Surgen polinizadores nocturnos y el sistema adapta sus estrategias para las temperaturas más frescas, actualizando los modelos en tiempo real.",
                        "La noche es óptima para ciertas tareas—como el riego de precisión, que minimiza la evaporación, o la aplicación selectiva de nutrientes. Los cultivos delicados pueden cosecharse bajo el rocío, garantizando frescura y calidad.",
                        "Drones realizan escaneos infrarrojos para verificar la presencia y salud de todas las especies monitoreadas. Las micro-perturbaciones, como el excavar de un roedor, se registran como señales de biodiversidad saludable.",
                        "Durante la noche se redistribuyen recursos y los módulos robóticos se reposicionan para las tareas del nuevo día. Al amanecer, el biorome está listo para reiniciar el ciclo adaptativo—optimizando, regenerando y manteniendo el equilibrio."
                    ],
                    titleColor: colors.primary,
                    paragraphsColor: colors.textLight
                }
            }
        }
    }
};