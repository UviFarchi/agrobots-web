export default {
  name: 'agrobots',
  component: 'AgrobotsIntro',
  content: {
    en: {
      title: 'Who Are We?',
      slideTitle: 'Who Are We?',
      eyebrow: 'Terrain Management as a Service',
      headline: 'We turn underused land into autonomous, regenerative production systems.',
      lead: 'Agrobots combines Land OS, field sensors, drones, and modular robotics to manage terrain as a living, data-driven system.',
      pillars: [
        {
          title: 'Sense every hectare',
          text: 'Soil, crop, and climate signals become continuous field intelligence.',
          details: [
            'Sensor meshes track moisture, microclimate, and plant stress in real time.',
            'Land OS turns raw field signals into operational recommendations.',
            'Each hectare is monitored continuously instead of only at inspection time.'
          ]
        },
        {
          title: 'Automate field action',
          text: 'Land OS coordinates drones and robotics so operations adapt with less manual oversight.',
          details: [
            'Drones handle mapping, inspection, and targeted interventions.',
            'Robotic modules can be deployed gradually as the site evolves.',
            'Operations adapt to conditions instead of fixed seasonal routines.'
          ]
        },
        {
          title: 'Restore while producing',
          text: 'Deployments improve yields, reduce inputs, and rebuild soil and water health.',
          details: [
            'Regeneration is measured alongside output, not treated as a side effect.',
            'The system aims to reduce water, chemical, and labor intensity over time.',
            'Each season creates a healthier baseline for the next one.'
          ]
        }
      ],
      proofTitle: 'For landowners, institutions, and cooperatives that need productivity with ecological accountability.',
      proofChips: [
        {
          label: 'AI + robotics',
          visualBadge: 'AI + robotics',
          visualCaption: 'Field sensing, aerial mapping, and robotic action are coordinated through a single operational layer.',
          metrics: [
            { label: 'Signal', value: 'Sensors + AI' },
            { label: 'Action', value: 'Drones + robotics' },
            { label: 'Loop', value: 'Continuous adaptation' }
          ]
        },
        {
          label: 'Fixed annual TMaaS fee',
          visualBadge: 'Fixed annual TMaaS',
          visualCaption: 'Deployment, monitoring, optimization, and service are bundled into one recurring operating model.',
          metrics: [
            { label: 'Commercial model', value: 'Annual service fee' },
            { label: 'Delivery', value: 'Managed operations' },
            { label: 'Planning', value: 'Predictable cost envelope' }
          ]
        },
        {
          label: 'Modular deployment',
          visualBadge: 'Modular rollout',
          visualCaption: 'Sites can start with the right stack today and add modules as terrain, crops, and priorities evolve.',
          metrics: [
            { label: 'Rollout', value: 'Phased by site' },
            { label: 'Expansion', value: 'Add capabilities over time' },
            { label: 'Fit', value: 'Context-specific stack' }
          ]
        },
        {
          label: 'Yield + restoration',
          visualBadge: 'Yield + restoration',
          visualCaption: 'Productive output and land recovery are treated as linked outcomes instead of a tradeoff.',
          metrics: [
            { label: 'Output', value: 'Higher productivity' },
            { label: 'Inputs', value: 'Lower intensity' },
            { label: 'Land effect', value: 'Healthier soil and water' }
          ]
        }
      ],
      closing: 'We operate terrain as an intelligent service that improves each season.',
      metrics: [
        { label: 'Model', value: 'TMaaS' },
        { label: 'Platform', value: 'Land OS' },
        { label: 'Outcome', value: 'Productivity + regeneration' }
      ],
      visualBadge: 'Land OS in the field',
      visualCaption: 'Autonomous field intelligence for degraded and underused land.',
      images: [
        { src: '/img/mechanoflower_field.jpg', alt: 'Mechanized Agrobots flower field system' }
      ]
    },
    es: {
      title: '¿Quiénes somos?',
      slideTitle: '¿Quiénes somos?',
      eyebrow: 'Gestión de Terreno como Servicio',
      headline: 'Convertimos terrenos infrautilizados en sistemas productivos, autónomos y regenerativos.',
      lead: 'Agrobots combina Land OS, sensores de campo, drones y robótica modular para gestionar el terreno como un sistema vivo y guiado por datos.',
      pillars: [
        {
          title: 'Leer cada hectárea',
          text: 'Las señales de suelo, cultivo y clima se convierten en inteligencia continua de campo.',
          details: [
            'Mallas de sensores siguen humedad, microclima y estrés vegetal en tiempo real.',
            'Land OS convierte señales de campo en decisiones operativas.',
            'Cada hectárea se monitoriza de forma continua, no solo en inspecciones puntuales.'
          ]
        },
        {
          title: 'Automatizar la operación',
          text: 'Land OS coordina drones y robótica para adaptar la operación con menos supervisión manual.',
          details: [
            'Los drones cubren mapeo, inspección e intervenciones dirigidas.',
            'Los módulos robóticos pueden desplegarse por fases según evoluciona el sitio.',
            'La operación se adapta a las condiciones y no a calendarios fijos.'
          ]
        },
        {
          title: 'Restaurar mientras produce',
          text: 'Los despliegues mejoran rendimientos, reducen insumos y recuperan suelo y agua.',
          details: [
            'La regeneración se mide junto con la producción, no como efecto secundario.',
            'El sistema busca reducir agua, químicos y carga operativa con el tiempo.',
            'Cada temporada deja una base más sana para la siguiente.'
          ]
        }
      ],
      proofTitle: 'Para propietarios de tierra, instituciones y cooperativas que necesitan productividad con responsabilidad ecológica.',
      proofChips: [
        {
          label: 'IA + robótica',
          visualBadge: 'IA + robótica',
          visualCaption: 'La lectura del campo, el mapeo aéreo y la acción robótica se coordinan en una sola capa operativa.',
          metrics: [
            { label: 'Señal', value: 'Sensores + IA' },
            { label: 'Acción', value: 'Drones + robótica' },
            { label: 'Bucle', value: 'Adaptación continua' }
          ]
        },
        {
          label: 'Tarifa anual fija TMaaS',
          visualBadge: 'TMaaS anual fijo',
          visualCaption: 'Despliegue, monitorización, optimización y servicio se integran en un solo modelo operativo recurrente.',
          metrics: [
            { label: 'Modelo comercial', value: 'Tarifa anual' },
            { label: 'Entrega', value: 'Operación gestionada' },
            { label: 'Planificación', value: 'Coste predecible' }
          ]
        },
        {
          label: 'Despliegue modular',
          visualBadge: 'Despliegue modular',
          visualCaption: 'El sitio puede arrancar con la configuración adecuada hoy y sumar módulos a medida que evoluciona.',
          metrics: [
            { label: 'Despliegue', value: 'Por fases' },
            { label: 'Expansión', value: 'Capacidades añadibles' },
            { label: 'Ajuste', value: 'Stack específico por contexto' }
          ]
        },
        {
          label: 'Productividad + restauración',
          visualBadge: 'Productividad + restauración',
          visualCaption: 'La producción y la recuperación del terreno se tratan como resultados vinculados, no como una compensación.',
          metrics: [
            { label: 'Salida', value: 'Más productividad' },
            { label: 'Insumos', value: 'Menor intensidad' },
            { label: 'Terreno', value: 'Suelo y agua más sanos' }
          ]
        }
      ],
      closing: 'Operamos el terreno como un servicio inteligente que mejora con cada temporada.',
      metrics: [
        { label: 'Modelo', value: 'TMaaS' },
        { label: 'Plataforma', value: 'Land OS' },
        { label: 'Resultado', value: 'Productividad + regeneración' }
      ],
      visualBadge: 'Land OS en campo',
      visualCaption: 'Inteligencia de campo autónoma para terrenos degradados o infrautilizados.',
      images: [
        { src: '/img/mechanoflower_field.jpg', alt: 'Sistema Agrobots de campo con mecanoflor' }
      ]
    }
  }
};
