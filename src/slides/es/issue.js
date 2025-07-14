import colors from "@/assets/colors.js";

export default {
    name: "issue",
    title: "Trouble in Paradise",
    component: "CardGrid",
    content: {
        slideTitle: "What’s Wrong with Farming?",
        slideIntro:
            "Modern agriculture has undeniably transformed the way we produce food, making it faster, more scalable, and capable of feeding billions. However, this efficiency has come at a steep cost to our environment, biodiversity, and long-term sustainability. The relentless push for higher yields through monocropping, chemical inputs, and heavy machinery has led to soil degradation, water pollution, and loss of resilience against climate change. We must rethink the way we approach farming—not by abandoning technology, but by advancing it responsibly. The path forward lies in integrating cutting-edge automation with nature-friendly practices, creating systems that work with the land, not against it. To understand why this transformation is so essential, let’s examine the key challenges modern agriculture faces.",
        columns: 2,
        slideTitleColor: colors.secondary,
        slideIntroColor: colors.textLight,
        cards: [
            {
                icon: "🌍",
                title: "Less Damage",
                backText: "Despite producing more food than ever before, modern farming methods are taking a devastating toll on our ecosystems. Intensive agriculture often relies on synthetic fertilizers, pesticides, and heavy machinery, which can contaminate water sources, degrade soil health, emit greenhouse gases, and reduce biodiversity. Runoff from agricultural fields carries chemicals into rivers and groundwater, causing eutrophication and harming aquatic life. Monocropping and chemical-heavy practices deplete essential nutrients, reducing soil fertility and leading to erosion. The production and application of fertilizers release carbon dioxide, methane, and nitrous oxide, contributing significantly to climate change. Clearing land for monoculture crops destroys habitats and disrupts the natural balance. To mitigate these impacts, we must transition to practices that reduce inputs, encourage biodiversity, and restore soil health. This means integrating regenerative farming methods with intelligent automation, enabling the land to heal while remaining productive.",
                frontBg: colors.primary,
                frontColor: colors.textDark,
                frontBorder: colors.secondary,
                backBg: colors.backgroundLight,
                backColor: colors.textDark,
                backBorder: colors.primary
            },
            {
                icon: "🧠",
                title: "Smarter Systems",
                backText: "The agricultural industry has traditionally approached productivity by scaling up—bigger tractors, more powerful machines, and intensive mechanization. However, this approach is fundamentally flawed because it ignores ecological complexity, lacks flexibility, drives over-reliance on fossil fuels, and misses the potential of automation. Bigger machines can’t adapt to small-scale environmental variations, often damaging the soil structure and compacting it. Large, single-purpose machines are not adaptable to changing conditions or diverse crops. Heavy machinery requires significant energy, which contradicts sustainability goals. Instead of centralized, monolithic solutions, we need modular, decentralized systems that can adapt in real time. By deploying interconnected robotic modules, each performing specific tasks like planting, weeding, or monitoring, we create a dynamic system that adapts to changing conditions. AI-driven decision-making allows for precision farming, minimizing waste and maximizing efficiency.",
                frontBg: colors.primary,
                frontColor: colors.textDark,
                frontBorder: colors.secondary,
                backBg: colors.backgroundLight,
                backColor: colors.textDark,
                backBorder: colors.primary
            },
            {
                icon: "🌾",
                title: "More Food, Less Waste",
                backText: "Global food production needs to increase to meet the demands of a growing population, but simply increasing output is not enough. We must also address inefficiencies that lead to food loss and waste. Post-harvest losses due to poor storage and transportation infrastructure cause significant spoilage, especially in developing regions. Inefficient supply chains and long distribution networks increase the risk of contamination and waste. Farmers may grow more than the market needs, leading to surplus disposal, while resource mismanagement such as water and fertilizer overuse can result in wasted inputs and environmental damage. Smart systems that monitor crop health, predict optimal harvest times, and streamline logistics can drastically reduce waste. Additionally, localized, automated farming units can decrease the distance between production and consumption, reducing food miles and ensuring freshness.",
                frontBg: colors.primary,
                frontColor: colors.textDark,
                frontBorder: colors.secondary,
                backBg: colors.backgroundLight,
                backColor: colors.textDark,
                backBorder: colors.primary
            },
            {
                icon: "🕰️",
                title: "Long-Term Thinking",
                backText: "Agriculture must evolve to withstand environmental pressures such as climate change, resource depletion, and shifting ecosystems. However, the current model often lacks foresight and flexibility. Intensive practices yield high outputs initially but degrade the land, making it less productive over time. Monoculture systems are more susceptible to disease, drought, and temperature shifts. Traditional practices often fail to leverage data to predict and mitigate risks, while farming practices that disregard local knowledge and biodiversity are less sustainable. By designing systems that are inherently adaptive, we can build farms that evolve with changing conditions. Integrating data from sensors, weather predictions, and ecosystem health indicators into an intelligent management platform ensures that farming practices remain resilient and responsive.",
                frontBg: colors.primary,
                frontColor: colors.textDark,
                frontBorder: colors.secondary,
                backBg: colors.backgroundLight,
                backColor: colors.textDark,
                backBorder: colors.primary
            }
        ]
    }
};