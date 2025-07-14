<template>
  <div class="app-wrapper" :data-slide="currentSlide">

    <nav class="main-nav">
      <div class="nav-controls">
        <button @click="prevSlide" class="nav-arrow back-arrow" :style="{ visibility: currentSlide > 0 ? 'visible' : 'hidden' }">
          Back
        </button>
        <button class="menu-toggle" @click="toggleMenu">
          <img src="/img/single_flower_logo.png" alt="menu" class="toggle-menu-img"/>
        </button>
        <button
            @click="nextSlide"
            class="nav-arrow next-arrow"
            :style="{ visibility: currentSlide < slides.length - 1 ? 'visible' : 'hidden' }"
        >
          Next
        </button>
      </div>

      <ul :class="['nav-menu', { 'active': menuOpen }]">
        <li v-for="(slide, index) in slides" :key="slide.name">
          <button
              :class="['nav-link', slide.name, { active: currentSlide === index }]"
              @click="navigateTo(index)"
          >
            {{ slide.title }}
          </button>
        </li>
        <li>
          <div class="lang-dropdown" @click="showLangMenu = !showLangMenu" @blur="showLangMenu = false" tabindex="0">
            <img
                :src="`/img/${currentLang}.png`"
                :alt="currentLang.toUpperCase()"
                class="lang-flag"
            />
            <div v-if="showLangMenu" class="lang-menu">
              <img
                  v-for="lang in availableLangs"
                  :key="lang"
                  :src="`/img/${lang}.png`"
                  :alt="lang.toUpperCase()"
                  class="lang-flag"
                  :class="{ active: currentLang === lang }"
                  @click.stop="selectLang(lang)"
              />
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <div class="main-stage">
      <div class="arrow-left" v-if="currentSlide > 0">
        <button @click="prevSlide" class="body-arrow">‹</button>
      </div>

      <transition name="slide-fade" mode="out-in">
        <div
            :key="currentSlide"
            class="slide-component"
        >

          <component
              :is="slides[currentSlide].component"
              v-bind="slides[currentSlide].content"
              :currentSlideIndex="currentSlide"
          />
        </div>
      </transition>

      <div class="arrow-right" v-if="currentSlide < slides.length - 1">
        <button @click="nextSlide" class="body-arrow">›</button>
      </div>
    </div>

    <footer class="app-footer">
      <div class="footer-left">
        <a class="footer-button footer-link" href="/privacy">Privacy Policy</a>
        <a class="footer-button footer-link" href="/quote">Get A Quote</a>
      </div>
      <div class="footer-center">
        <p>© 2025 Agrobots</p>
      </div>
      <div class="footer-right">
        <button @click="toggleContact" class="footer-button">Contact</button>
      </div>
    </footer>

    <div v-if="contactVisible" class="contact-container">
      <Contact
          @close="toggleContact"
          @sent="toggleContact"
      />
    </div>
  </div>
</template>

<script>
import VideoFeature from './VideoFeature.vue';
import CardGrid from './CardGrid.vue';
import ScrollingFullBg from './ScrollingFullBg.vue';
import ConnectionCircles from './ConnectionCircles.vue';
import Contact from './subcomponents/Contact.vue';
import ActionColumns from "@/components/ActionColumns.vue";
import i18n from '@/i18n/index.js';

import introSlideEn from '../slides/en/intro.js';
import issueSlideEn from '../slides/en/issue.js';
import servicesSlideEn from '../slides/en/services.js';
import bioromeSlideEn from '../slides/en/biorome.js';
import visionSlideEn from '../slides/en/vision.js';
import landosSlideEn from '../slides/en/landos.js';
import processSlidesEn from '../slides/en/process.js';
import impactSlideEn from '../slides/en/impact.js';
import participateSlideEn from '../slides/en/participate.js';

import introSlideEs from '../slides/es/intro.js';
import issueSlideEs from '../slides/es/issue.js';
import servicesSlideEs from '../slides/es/services.js';
import bioromeSlideEs from '../slides/es/biorome.js';
import visionSlideEs from '../slides/es/vision.js';
import landosSlideEs from '../slides/es/landos.js';
import processSlidesEs from '../slides/es/process.js';
import impactSlideEs from '../slides/es/impact.js';
import participateSlideEs from '../slides/es/participate.js';

const slideSets = {
  en: [
    introSlideEn,
    issueSlideEn,
    visionSlideEn,
    bioromeSlideEn,
    landosSlideEn,
    servicesSlideEn,
    processSlidesEn,
    impactSlideEn,
    participateSlideEn
  ],
  es: [
    introSlideEs,
    issueSlideEs,
    visionSlideEs,
    bioromeSlideEs,
    landosSlideEs,
    servicesSlideEs,
    processSlidesEs,
    impactSlideEs,
    participateSlideEs
  ]
};

export default {
  name: 'AgrobotsMiniSite',
  components: {
    VideoFeature,
    CardGrid,
    ScrollingFullBg,
    ConnectionCircles,
    ActionColumns,
    Contact
  },
  data() {
    const lang = i18n.global.locale.value;
    return {
      currentSlide: 0,
      slides: slideSets[lang],
      menuOpen: false,
      contactVisible: false,
      currentLang: lang,
      showLangMenu: false,
      availableLangs: ['en', 'es']
    };
  },
  watch: {
    currentLang(newLang) {
      if (i18n.global.locale.value !== newLang) {
        i18n.global.locale.value = newLang;
        localStorage.setItem('locale', newLang);
      }
      this.slides = slideSets[newLang];
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1)
        this.currentSlide++;
    },
    prevSlide() {
      if (this.currentSlide > 0)
        this.currentSlide--;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    navigateTo(index) {
      this.currentSlide = index;
      this.menuOpen = false;
    },
    toggleContact() {
      this.contactVisible = !this.contactVisible;
    },
    selectLang(lang) {
      this.currentLang = lang;
      this.showLangMenu = false;
    }
  }
};
</script>

<style scoped>
.lang-dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
}
.lang-menu {
  position: absolute;
  top: 120%;
  right: 0;
  background: var(--backgroundDark, #222);
  z-index: 100;
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin: 0;
  background: none;
  padding:0;
}
.lang-flag {
  width: 26px;
  height: 26px;
  opacity: 0.8;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: opacity .11s, box-shadow .12s;
}
.lang-flag.active {
  opacity: 1;
  border-color: var(--primary);
  box-shadow: 0 0 4px var(--accent);
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.main-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 100%;
  height: 90vh;
  margin: 0 auto;
  position: relative;
  z-index: 0;
  flex-grow: 1;
  background-color: var(--backgroundDark);
  color: var(--textLight);
  overflow: auto;
}

/* Navigation styles */
.main-nav {
  background-color: var(--backgroundDark);
  border-bottom: 1px solid var(--primary);
  z-index: 20;
  height: 5vh;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  width: 100%;
}

.nav-arrow {
  font-size: 1.2rem;
  background-color: transparent;
  color: var(--textLight);
  border: none;
  padding: 0;
  margin: 0 2rem;
  border-radius: 0;
  font-weight: bold;
  cursor: pointer;
  width: 2rem;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 1px 1px 2px black;
}

.back-arrow::before {
  content: "‹";
  color: var(--textLight);
  margin: 0 1rem;
  font-size: 2rem;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  line-height: 1;
  position: relative;
  top: -0.2rem;
}

.next-arrow::after {
  content: "›";
  color: var(--textLight);
  margin: 0 1rem;
  font-size: 2rem;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  line-height: 1;
  position: relative;
  top: -0.2rem;
}

.menu-toggle {
  display: none;
}


.nav-menu {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.75rem;
  list-style: none;
}

.nav-link {
  background: transparent;
  border: none;
  color: var(--textLight);
  font-weight: 500;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
}

.nav-link.active {
  background-color: var(--primary);
  color: var(--textDark);
}

.nav-link.participate {
  background-color: var(--accent);
  color: var(--textDark);
  font-weight: bold;
}

/* Arrow navigation */
.arrow-left,
.arrow-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
}

.arrow-left {
  left: 0;
}

.arrow-right {
  right: 0;
}

.body-arrow {
  font-size: 20rem;
  background-color: transparent;
  color: var(--textLight);
  border: none;
  border-radius: 0;
  cursor: pointer;
  display: inline-block;
  transform: scale(0.4, 1.2);
  text-shadow: 1px 1px 2px black;
}

.nav-controls {
  display: none;
  gap: 1rem;
  width: 100%;
}

/* Footer styles */
.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 1rem;
  background-color: var(--backgroundDark);
  border-top: 1px solid var(--primary);
  font-size: 0.9rem;
  color: var(--textLight);
  height: 5vh;
}

.app-footer p {
  color: var(--accent);
  flex: 1;
  margin: 0 auto;
}

.app-footer .footer-button {
  background-color: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
  height: 4vh;
  font-size: large;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius: 5px;
  margin: 0 25%;
}

.app-footer .footer-button:hover {
  background-color: var(--accent);
  color: var(--textDark);
}

.app-footer .footer-left {
  flex: 1;
  text-align: left;
  justify-items: start;
}

.app-footer .footer-center {
  flex: 1;
  text-align: center;
}

.app-footer .footer-right {
  flex: 1;
  text-align: right;
  justify-items: end;
}

.app-footer .footer-button {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

.app-footer .footer-link {
  font-size: 0.9rem;
  text-decoration: none;
}

.contact-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--backgroundDarkTranslucent);
  padding: 1rem;
  z-index: 1000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}




@media (max-width: 768px) {
  .menu-toggle {
    display: flex  ;
    height: 6vh;
    z-index: 2002;
    padding: 2vw;
    background: radial-gradient(circle at center, darkslategray 0%, black 100%);
    border-radius: 50%;
    border: 1px solid var(--primary);
  }


  .nav-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--backgroundDark);
    flex-direction: column;
    align-items: center;
    padding: 60px 0 20px;
    transform: translateY(-100%);
    z-index: 10;
    border-bottom: 2px solid var(--primary);
  }

  .nav-menu.active {
    transform: translateY(0);
    z-index: 20;
  }

  .nav-controls {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .arrow-left,
  .arrow-right {
    display: none;
  }

  .app-footer{
    height: 10vh;
  }

  .app-footer .footer-link, .app-footer .footer-button {
    display: flex;
    flex:1;
    margin: 0px;
    padding: 10px;
  }

  .main-nav {
    height: 10vh;
  }
}

</style>