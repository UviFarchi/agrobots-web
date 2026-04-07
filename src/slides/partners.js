import colors from "@/assets/colors.js";

export default {
  name: 'partners',
  component: 'CardGrid',
  content: {
    en: {
      title: 'Partners',
      expandText: "Click to read more",
      slideTitle: 'Partners & Consortium',
      slideIntro:
          "Agrobots is building an open, collaborative ecosystem for the future of land management and modular automation. Through the ACES protocol and our growing consortium, we are uniting leading partners in robotics, sensing, and ecological engineering to define a shared standard for interoperable machines. This joint effort allows drones, sensors, robotic platforms, and tools from different manufacturers to connect through a common physical interface and a structured digital protocol. With Smart Farm Robotix, Dronak, Sintropia, and other contributors, we are shaping a foundation where modular automation becomes accessible, scalable, and compatible across environments. Together, we accelerate innovation, reduce integration barriers, and help ensure that every component in the TMaaS ecosystem can work reliably as part of a larger intelligent whole.",
      slideTitleColor: colors.secondary,
      slideIntroColor: colors.textLight,
      columns: 2,
      cards: [
        {
          icon: '<img src="/img/dronak_logo.png" alt="dronak" height="100">',
          title: 'Dronak',
          backText:
              "Dronak develops high-tech robotics and drone solutions for agriculture, water management, and environmental monitoring. As our OEM partner, Dronak brings expertise in autonomous platforms, advanced sensors, and IoT connectivity—helping us deliver modular, intelligent bioromes. <br/><a href='https://dronak.com/'>https://dronak.com/</a>",
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Learn more"
        },
        {
          icon: '<img src="/img/sintropia_logo.png" alt="dronak" height="100">',
          title: 'Sintropia',
          backText:
              "Sintropia specializes in ecological regeneration and productive agroforestry. With a holistic approach to landscape design, Sintropia brings deep expertise in syntropic agriculture, soil health, and biodiversity—making them a natural partner for scaling bioromic solutions across diverse regions.<br/><a href='https://sintropia.pro/'>https://sintropia.pro/</a>",
          frontBg: colors.secondary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Learn more",
        },
        {
          icon: '<img src="/img/smartfarmrobotix_logo.png" alt="smart farm robotix" height="50">',
          title: 'Smart Farm Robotix',
          backText:
              "Smart Farm Robotix develops advanced robotics and automation systems designed to support next-generation agriculture. Their solutions focus on autonomous field operations, precision cultivation, and modular robotic platforms that enhance efficiency and sustainability. As an ACES partner, they bring engineering excellence and hands-on experience in practical farm automation.<br/><a href='https://smartfarmrobotix.eu/'>https://smartfarmrobotix.eu/</a>",
          frontBg: colors.secondary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Learn more"
        },
      ]
    },
    es: {
      title: 'Asociados',
      expandText: "Pulsa para expandir",
      slideTitle: 'Partners y Consorcio',
      slideIntro:
          "Agrobots está construyendo un ecosistema abierto y colaborativo para el futuro de la gestión del terreno y la automatización modular. A través del protocolo ACES y de nuestro consorcio en crecimiento, unimos a líderes en robótica, sensorización e ingeniería ecológica para definir un estándar común de interoperabilidad entre máquinas. Este esfuerzo conjunto permite que drones, sensores, plataformas robóticas y herramientas de distintos fabricantes se conecten mediante una interfaz física común y un protocolo digital estructurado. Con Smart Farm Robotix, Dronak, Sintropia y otros colaboradores, estamos creando una base donde la automatización modular sea accesible, escalable y compatible entre distintos entornos. Juntos aceleramos la innovación, reducimos barreras de integración y ayudamos a garantizar que cada componente del ecosistema TMaaS pueda funcionar de forma fiable como parte de un sistema inteligente mayor.",
      slideTitleColor: colors.secondary,
      slideIntroColor: colors.textLight,
      columns: 2,
      cards: [
        {
          icon: '<img src="/img/dronak_logo.png" alt="dronak" height="100">',
          title: 'Dronak',
          backText:
              "Dronak desarrolla soluciones robóticas y de drones de alta tecnología para agricultura, gestión del agua y monitoreo ambiental. Como nuestro socio OEM, aporta experiencia en plataformas autónomas, sensores avanzados y conectividad IoT—ayudándonos a ofrecer bioromes modulares e inteligentes.<br/><a href='https://dronak.com/'>https://dronak.com/</a>",
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Leer Más"
        },
        {
          icon: '<img src="/img/sintropia_logo.png" alt="dronak" height="100">',
          title: 'Sintropia',
          backText:
              "Sintropia está especializada en regeneración ecológica y agroforestería productiva. Con un enfoque holístico en el diseño de paisajes, aporta amplia experiencia en agricultura sintrópica, salud del suelo y biodiversidad—siendo el aliado natural para escalar soluciones biorómicas en distintas regiones. <br/><a href='https://sintropia.pro/'>https://sintropia.pro/</a>",
          frontBg: colors.secondary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Leer Más"
        },
        {
          icon: '<img src="/img/smartfarmrobotix_logo.png" alt="smart farm robotix" height="50">',
          title: 'Smart Farm Robotix',
          backText:
              "Smart Farm Robotix desarrolla sistemas avanzados de robótica y automatización para la agricultura de nueva generación. Sus soluciones se centran en operaciones autónomas, cultivo de precisión y plataformas robóticas modulares que mejoran la eficiencia y la sostenibilidad. Como socio de ACES, aporta excelencia en ingeniería y experiencia práctica en automatización agrícola real.<br/><a href='https://smartfarmrobotix.eu/'>https://smartfarmrobotix.eu/</a>",
          frontBg: colors.secondary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent,
          buttonText: "Leer Más"
        },
      ]
    }
  }
};
