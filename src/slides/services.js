// src/slides/services.js
import colors from "@/assets/colors.js";

export default {
  name: 'services',
  title: 'On the ground',
  component: 'CardGrid',
  content: {
    slideTitle: 'What can bioromes do?',
    slideIntro: 'Our system can be adapted to many uses.',
    slideTitleColor: colors.secondary,
    slideIntroColor: colors.textLight,
    columns: 3,
    cards: [
      {
        icon: '🌍',
        title: 'Agricultural Automation',
        backText: 'With Land OS, we transform conventional farms into self-sustaining, autonomous ecosystems that take care of themselves. Imagine a system where every aspect of farming—from planting to harvesting—is seamlessly managed by a blend of smart robotics and intuitive AI. This technology is tailored to the unique character of each landscape, ensuring that the land is cared for with precision and that crops thrive naturally. It’s about working with nature to create productive, resilient farms that adapt to their environment.',
        frontBg: colors.primary,
        frontColor: colors.textDark,
        frontBorder: colors.accent,
        backBg: colors.secondary,
        backColor: colors.textDark,
        backBorder: colors.accent
      },
      {
        icon: '🧠',
        title: 'Brownfield Remediation',
        backText: 'For areas where the land has been forgotten or damaged, Land OS offers a vision of renewal. Our approach turns degraded or contaminated sites into vibrant, productive spaces by nurturing natural recovery. By deploying our bioromes, we help the land heal itself—restoring soil health, boosting biodiversity, and transforming once-buried fields into eco-friendly, thriving landscapes. It’s a fresh start for land that deserves a second chance.',
        frontBg: colors.primary,
        frontColor: colors.textDark,
        frontBorder: colors.accent,
        backBg: colors.secondary,
        backColor: colors.textDark,
        backBorder: colors.accent
      },
      {
        icon: '🌾',
        title: 'Ecological Monitoring',
        backText: 'Land OS also brings peace of mind to those who cherish nature. Our systems serve as a watchful guardian over delicate ecosystems, constantly keeping track of environmental health—from water quality to the balance of plant and animal life. This ongoing care ensures that our natural surroundings remain robust and resilient, protecting the beauty and balance of the land for everyone now and for future generations.',
        frontBg: colors.primary,
        frontColor: colors.textDark,
        frontBorder: colors.accent,
        backBg: colors.secondary,
        backColor: colors.textDark,
        backBorder: colors.accent
      }
    ]
  }
};