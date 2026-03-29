import introSlide from './intro';

export default {
  name: 'agrobots',
  component: 'AgrobotsIntro',
  content: {
    en: {
      title: 'Agrobots',
      slideTitle: 'Agrobots',
      introText: introSlide.content.en.introText,
      images: [
        { src: '/img/impact_main.png', alt: 'Agrobots impact overview' },
        { src: '/img/biorome_day.png', alt: 'Biorome daytime view' },
        { src: '/img/biorome_night.png', alt: 'Biorome nighttime view' }
      ]
    },
    es: {
      title: 'Agrobots',
      slideTitle: 'Agrobots',
      introText: introSlide.content.es.introText,
      images: [
        { src: '/img/impact_main.png', alt: 'Resumen de impacto de Agrobots' },
        { src: '/img/biorome_day.png', alt: 'Vista diurna del biorome' },
        { src: '/img/biorome_night.png', alt: 'Vista nocturna del biorome' }
      ]
    }
  }
};
