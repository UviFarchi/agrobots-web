import colors from "@/assets/colors.js";

export default {
    name: 'impact',
    title: 'Impact',
    component: 'ScrollingFullBg',
    content: {
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
                    "Agrobots isn’t merely a technological upgrade—it’s a reimagining of agriculture from the ground up. In our vision, every field transforms into a living, breathing ecosystem where nature and innovation work together. We convert overworked, barren soils into regenerative landscapes that continuously learn from the rhythms of the earth. Every acre is managed by intelligent systems that not only boost yields but also restore balance, nurture the land back to life, and cut waste, redefining productivity in a sustainable way.",
                    "Yet, the cost of inaction is steep. Relying on conventional methods—fossil-fuel machinery, chemical inputs, and rigid monocultures—drains our soils, strains water resources, and drives up storage and transport costs. Without innovation, supply chains become unpredictable and our food systems vulnerable to climate shocks and market disruptions. This degradation not only jeopardizes the future of agriculture but also inflates expenses and undermines reliable access to fresh produce.",
                    "Now, more than ever, we have a unique opportunity to transform challenges into promise. By embracing the just-in-place and just-in-time principles of Agriculture 4.0, Agrobots ensures that food is produced exactly where and when it’s needed. Our approach creates vibrant ecosystems that preserve biodiversity while delivering high-quality, affordable, and sufficient food for everyone. The choice is clear: a future built on balance, innovation, and respect for nature will nourish both the land and the communities that depend on it."

                ],
                titleColor: colors.primary,
                paragraphsColor: colors.textLight,
            },
            Human: {
                textPosition: "right",
                bgImage: "/img/impact_human.png",
                title: "Human Impact",
                paragraphs: [
                    "At the heart of Agrobots is a profound commitment to uplifting communities. For farmers and rural workers, our technology offers more than increased efficiency—it brings renewed hope and opportunity. By automating laborious tasks and optimizing every aspect of the farming process, we free up time and resources, empowering communities to focus on innovation, education, and local prosperity.",
                    "Imagine a rural landscape where modern technology blends seamlessly with tradition. Agrobots equips people with the tools and knowledge they need to thrive, creating a future where job creation goes hand in hand with sustainable practices. Our system builds stronger, self-reliant communities by ensuring that every stakeholder—from small family farms to large-scale producers—benefits from a healthier, more reliable food supply."
                ],
                titleColor: colors.primary,
                paragraphsColor: colors.textLight,
            },
            Environmental: {
                textPosition: "right",
                bgImage: "/img/impact_environmental.png",
                title: "Environmental Impact",
                paragraphs: [
                    "Our approach to agriculture is as much about healing the planet as it is about feeding it. Agrobots champions a regenerative model that significantly reduces reliance on harmful chemicals and fossil fuels. By carefully orchestrating the interplay of plants, microbes, and robotic interventions, we restore the natural balance of the soil, conserve water resources, and enhance biodiversity. Over time, the land transforms into a vibrant, self-sustaining ecosystem that sequesters carbon and adapts to climate fluctuations. This isn’t just sustainable farming—it’s a blueprint for environmental renewal, where every harvest contributes to rebuilding a healthier planet for generations to come."
                ],
                titleColor: colors.primary,
                paragraphsColor: colors.textLight,
            }
        }
    }
};