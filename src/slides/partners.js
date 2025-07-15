import colors from "@/assets/colors.js";

export default {
  name: 'partners',
  component: 'CardGrid',
  content: {
    en: {
      title: 'Partners',
      slideTitle: 'Partners & Consortium',
      slideIntro:
          "Agrobots is building an open, collaborative ecosystem for the future of land management. Through the ACES protocol and our growing consortium, we unite leading partners in robotics, sensors, regenerative agriculture, and digital infrastructure. Together, we accelerate innovation and ensure seamless compatibility across the TMaaS platform.",
      slideTitleColor: colors.secondary,
      slideIntroColor: colors.textLight,
      columns: 3,
      cards: [
        {
          icon: '🤖',
          title: 'Dronak',
          backText:
              "Dronak develops high-tech robotics and drone solutions for agriculture, water management, and environmental monitoring. As our OEM partner, Dronak brings expertise in autonomous platforms, advanced sensors, and IoT connectivity—helping us deliver modular, intelligent bioromes.",
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Learn more",
          buttonLink: "https://dronak.com/"
        },
        {
          icon: '🌱',
          title: 'Sintropia',
          backText:
              "Sintropia specializes in ecological regeneration and productive agroforestry. With a holistic approach to landscape design, Sintropia brings deep expertise in syntropic agriculture, soil health, and biodiversity—making them a natural partner for scaling bioromic solutions across diverse regions.",
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Learn more",
          buttonLink: "https://sintropia.pro/"
        }
      ]
    },
    es: {
      title: 'Asociados',
      slideTitle: 'Partners y Consorcio',
      slideIntro:
          "Agrobots está construyendo un ecosistema abierto y colaborativo para el futuro de la gestión del terreno. A través del protocolo ACES y nuestro consorcio en expansión, unimos a los principales socios en robótica, sensores, agricultura regenerativa e infraestructura digital. Juntos aceleramos la innovación y garantizamos compatibilidad total en la plataforma TMaaS.",
      slideTitleColor: colors.secondary,
      slideIntroColor: colors.textLight,
      columns: 3,
      cards: [
        {
          icon: '🤖',
          title: 'Dronak',
          backText:
              "Dronak desarrolla soluciones robóticas y de drones de alta tecnología para agricultura, gestión del agua y monitoreo ambiental. Como nuestro socio OEM, aporta experiencia en plataformas autónomas, sensores avanzados y conectividad IoT—ayudándonos a ofrecer bioromes modulares e inteligentes.",
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Saber más",
          buttonLink: "https://dronak.com/"
        },
        {
          icon: '🌱',
          title: 'Sintropia',
          backText:
              "Sintropia está especializada en regeneración ecológica y agroforestería productiva. Con un enfoque holístico en el diseño de paisajes, aporta amplia experiencia en agricultura sintrópica, salud del suelo y biodiversidad—siendo el aliado natural para escalar soluciones biorómicas en distintas regiones.",
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Saber más",
          buttonLink: "https://sintropia.pro/"
        }
      ]
    }
  }
};
