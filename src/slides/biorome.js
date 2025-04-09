import colors from "@/assets/colors.js";

export default {
    name: 'biorome',
    title: 'The Biorome',
    component: 'ScrollingFullBg',
    content: {
        buttonsLegend: "Life in a Biorome",
        defaultButtonLabel: "Back",
        buttonBgColor: colors.accent,
        buttonTextColor: colors.textDark,
        modes: {
            default: {
                bgImage: "../assets/img/biorome_2.png",
                title: "Bio-Robotic Modular Ecosystems (bioromes)",
                paragraphs: [
                    "Bio-Robotic Modular Ecosystems, or bioromes, are at the heart of our vision for a new kind of agriculture. Instead of relying on enormous, single-purpose machines that enforce rigid, single-crop systems, we deploy a network of simple, specialized modules—each designed to perform one task, whether it's seeding, feeding, monitoring, or harvesting. This modular approach ensures that every action is precise and adaptable, reducing waste and energy consumption.",
                    "An advanced AI engine orchestrates these modules in real time, continuously monitoring and responding to the needs of the ecosystem. It integrates data from local environmental sensors, weather forecasts, and even market trends to guide the system towards optimal performance. As a result, each biorome becomes a self-optimizing ecosystem, dynamically balancing plants, animals, and microbes. This harmonious integration drastically reduces the need for chemical inputs, allowing the land to regenerate itself while producing food more efficiently.",
                    "Over time, a biorome evolves into a living, responsive system that is perfectly attuned to the needs of both the land and the community it serves. By continuously adapting to local conditions and leveraging the inherent diversity of nature, bioromes offer a sustainable path forward—one that supports resilient agriculture, minimizes environmental impacts, and secures a steady supply of nutritious produce even in the face of changing climatic and economic conditions."
                   ],
                titleColor: colors.primary,
                paragraphsColor: colors.textLight,
            },
            Day: {
                bgImage: "../assets/img/biorome_day.png",
                title: "A day in the biorome",
                paragraphs: [
                    "As dawn breaks over the biorome, the landscape comes alive with the near-invisible presence of technology. Birds begin their morning calls, small animals stir, and the air is thick with the scent of damp earth and growing plants.",
                    "Hidden in the undergrowth, sensors begin their daily reports, registering moisture levels, soil composition, and plant health. Drones lift off from their charging stations, scanning the terrain with quiet precision. A patch of crops has absorbed more water than expected overnight—no need for irrigation in that sector. Meanwhile, a robotic module adjusts a water valve nearby, redirecting resources to drier zones.",
                    "Deep in the vegetation, a monitoring unit detects an animal behaving unusually. The system flags it, analyzing past movement patterns to determine if intervention is needed. A drone glides overhead, zooming in to confirm—one hen shows signs of illness. The data flows seamlessly into Athena’s model, which recommends isolating the bird. A simple adjustment to the feed dispenser ensures the affected animal receives a tailored treatment, without disrupting the entire ecosystem.",
                    "At midday, a light rain rolls in, anticipated hours before by the system. No need to activate irrigation. A feeding module dispenses a carefully balanced mix for the livestock, based on real-time nutritional tracking. The land adapts fluidly, responding to the needs of plants, animals, and microbes alike, without human intervention."
                ],
                titleColor: colors.primary,
                paragraphsColor: colors.textLight,
            },
            Night: {
                bgImage: "../assets/img/biorome_night.png",
                title: "A night in the biorome",
                paragraphs: [
                    "As dusk settles, the biorome transitions into night mode. The last rays of sunlight fade, but the system remains fully operational. Nocturnal pollinators emerge, guided by natural patterns rather than artificial interference. The temperature drops, and Athena updates its models in real time, adjusting growth strategies for the coming day.",
                    "This is the ideal time for certain tasks. Cooler air reduces plant stress, making it the perfect window for precision irrigation. Water is directed exactly where it’s needed, minimizing evaporation. Some robotic modules move to apply slow-release nutrients where Athena has detected deficiencies, ensuring optimal absorption by morning. Others handle delicate harvesting operations—some crops are best collected under the dew-laden air to retain freshness.",
                    "A slow-moving drone glides silently through the canopy, performing infrared scans to ensure all monitored species are where they should be. Its faint red navigation lights flicker momentarily against the foliage. Nearby, a small rodent disturbs a patch of soil, prompting the sensors to log the micro-disturbance, an indicator of healthy underground biodiversity.",
                    "A soft hum of activity persists: water is redirected, micro-adjustments are made, and a few robotic modules shift position for their next task.",
                    "By dawn, the cycle begins anew—seamlessly adjusting, growing, and optimizing, without ever disrupting the balance of the land."
                ],
                titleColor: colors.primary,
                paragraphsColor: colors.textLight,
            }
        }
    }
};