import colors from "@/assets/colors.js";

export default {
  name: 'services',
  title: 'On the ground',
  component: 'CardGrid',
  content: {
    en: {
      slideTitle: 'What can bioromes do?',
      slideIntro: 'Our system can be adapted to many uses.',
      slideTitleColor: colors.secondary,
      slideIntroColor: colors.textLight,
      columns: 3,
      cards: [
        {
          icon: '🌍',
          title: 'Agricultural Automation',
          backText: 'With Land OS, we transform conventional farms into self-sustaining, autonomous ecosystems. Imagine a system where every aspect of farming—from planting to harvest—is seamlessly managed by smart robotics and adaptive AI. This approach is tailored to the unique character of each landscape, ensuring precise care for the land and thriving crops. The result: productive, resilient farms that work in harmony with nature.',
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent
        },
        {
          icon: '🧠',
          title: 'Brownfield Remediation',
          backText: 'For neglected or damaged land, Land OS offers renewal. Our approach turns degraded or contaminated sites into productive spaces by enabling natural recovery. Deploying bioromes helps heal the land—restoring soil health, increasing biodiversity, and turning forgotten fields into thriving, eco-friendly landscapes. It’s a fresh start for land that deserves a second chance.',
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent
        },
        {
          icon: '🌾',
          title: 'Ecological Monitoring',
          backText: 'Land OS also brings peace of mind to those who cherish nature. Our systems act as a watchful guardian over delicate ecosystems, continuously monitoring environmental health—from water quality to the balance of plant and animal life. This ongoing care helps keep natural surroundings robust and resilient, protecting the land for current and future generations.',
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent
        }
      ]
    },
    es: {
      slideTitle: '¿Qué pueden hacer los bioromes?',
      slideIntro: 'Nuestro sistema se adapta a muchos usos.',
      slideTitleColor: colors.secondary,
      slideIntroColor: colors.textLight,
      columns: 3,
      cards: [
        {
          icon: '🌍',
          title: 'Automatización Agrícola',
          backText: 'Con Land OS, transformamos fincas convencionales en ecosistemas autosuficientes y autónomos. Imagina un sistema donde cada aspecto agrícola—de la siembra a la cosecha—es gestionado de forma fluida por robótica inteligente e IA adaptativa. Este enfoque se adapta al carácter único de cada terreno, asegurando un cuidado preciso y cultivos saludables. El resultado: fincas productivas y resilientes que trabajan en armonía con la naturaleza.',
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent
        },
        {
          icon: '🧠',
          title: 'Recuperación de Terrenos',
          backText: 'Para tierras olvidadas o dañadas, Land OS ofrece renovación. Nuestra propuesta convierte suelos degradados o contaminados en espacios productivos fomentando la recuperación natural. El despliegue de bioromes ayuda a sanar la tierra—restaurando la salud del suelo, aumentando la biodiversidad y convirtiendo campos olvidados en paisajes prósperos y sostenibles. Es un nuevo comienzo para tierras que merecen una segunda oportunidad.',
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent
        },
        {
          icon: '🌾',
          title: 'Monitorización Ecológica',
          backText: 'Land OS también da tranquilidad a quienes valoran la naturaleza. Nuestros sistemas actúan como guardianes de ecosistemas frágiles, monitorizando continuamente la salud ambiental—desde la calidad del agua hasta el equilibrio de flora y fauna. Este cuidado constante mantiene el entorno natural fuerte y resiliente, protegiendo la tierra para las generaciones presentes y futuras.',
          frontBg: colors.primary,
          frontColor: colors.textDark,
          frontBorder: colors.accent,
          backBg: colors.backgroundLight,
          backColor: colors.textDark,
          backBorder: colors.accent
        }
      ]
    }
  }
}
;