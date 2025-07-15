<template>
  <div class="app-wrapper" :data-slide="currentSlide">

    <nav class="main-nav">
      <div class="nav-controls">
        <button @click="prevSlide" class="nav-arrow back-arrow"
                :style="{ visibility: currentSlide > 0 ? 'visible' : 'hidden' }">
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
              v-bind="slides[currentSlide].content[currentLang]"
              :currentSlideIndex="currentSlide"
              @contact="toggleContact"
          />
        </div>
      </transition>

      <div class="arrow-right" v-if="currentSlide < slides.length - 1">
        <button @click="nextSlide" class="body-arrow">›</button>
      </div>
    </div>

    <footer class="app-footer">
      <div class="footer-cta-row">
        <button @click="toggleContact" class="footer-cta contact-cta">
          <span class="cta-icon">📨</span>
          {{ $t('footer.contact') }}
        </button>
        <a class="footer-cta quote-cta" href="/quote">
          <span class="cta-icon">💡</span>
          {{ $t('footer.quote') }}
        </a>
      </div>
      <div class="footer-info-row">
        <a class="footer-link" href="/privacy">{{ $t('footer.privacy') }}</a>
        <span class="footer-copyright">© 2025 Agrobots</span>
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

import introSlide from '../slides/intro.js';
import issueSlide from '../slides/issue.js';
import servicesSlide from '../slides/services.js';
import bioromeSlide from '../slides/biorome.js';
import visionSlide from '../slides/vision.js';
import landosSlide from '../slides/landos.js';
import processSlides from '../slides/process.js';
import impactSlide from '../slides/impact.js';
import teamSlide from '../slides/team.js';
import partnerSlide from '../slides/partners.js';
import participateSlide from '../slides/participate.js';

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
    return {
      currentSlide: 0,
      slides: [
        introSlide,
        issueSlide,
        visionSlide,
        bioromeSlide,
        landosSlide,
        servicesSlide,
        processSlides,
        impactSlide,
        teamSlide,
        partnerSlide,
        participateSlide
      ],
      menuOpen: false,
      contactVisible: false,
      currentLang: i18n.global.locale.value,
      showLangMenu: false,
      availableLangs: ['en', 'es']
    };
  },
  watch: {
    currentLang(newLang) {
      if (i18n.global.locale.value !== newLang) {
        i18n.global.locale.value = newLang;
        localStorage.setItem('lang', newLang);
      }
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
  padding: 0;
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
  background: var(--secondary, #237aff);
  color: var(--textLight, #fff);
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(35,122,255,0.16);
  border: 2px solid var(--primary, #0b874b);
}
.nav-link.participate:hover {
  background: var(--primary, #0b874b);
  color: var(--textLight, #fff);
  border-color: var(--secondary, #237aff);
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

/* FOOTER STYLES */
.app-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: var(--backgroundDark);
  border-top: 1px solid var(--primary);
  color: var(--textLight);
  min-height: 64px;
  font-size: 0.97rem;
}

.footer-info-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-cta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto; /* aligns right on desktop */
}

.footer-link {
  background: none;
  border: none;
  color: var(--textLight);
  font-size: 0.97rem;
  text-decoration: underline;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--accent);
}

.footer-copyright {
  color: var(--accent);
  font-size: 0.97rem;
  margin-left: 0.5rem;
}

.footer-cta {
  width: 170px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  background: var(--secondary, #237aff);
  color: var(--textLight, #fff);
  border: 2px solid var(--secondary, #237aff);
  box-shadow: 0 4px 20px 0 rgba(35,122,255,0.10);
  cursor: pointer;
  transition: transform 0.14s, box-shadow 0.15s, background 0.17s, color 0.13s;
  text-decoration: none;
  outline: none;
  gap: 0.5em;
  margin: 0;
}
.footer-cta .cta-icon { font-size: 1.2em; margin-right: 0.5em; }
.footer-cta:hover {
  background: var(--primary, #0b874b);
  color: var(--textLight, #fff);
  border-color: var(--primary, #0b874b);
  transform: scale(1.07);
}

/* Contact form/modal styles */
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

/* Responsive tweaks */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
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

  .app-footer {
    flex-direction: column;
    align-items: stretch;
    padding: 0.8rem 0.1rem;
    min-height: 130px;
    gap: 0.5rem;
  }
  .footer-cta-row {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 0.6rem;
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
  .footer-cta {
    width: 48vw;
    min-width: 120px;
    max-width: 210px;
    height: 48px;
    font-size: 0.97rem;
    margin: 0;
    padding: 0.7rem 0.4rem;
  }
  .footer-info-row {
    width: 100%;
    justify-content: center;
    gap: 0.7rem;
    flex-wrap: wrap;
    font-size: 0.93rem;
  }
  .footer-link, .footer-copyright {
    font-size: 0.93rem;
    padding: 0.4rem 0.3rem;
  }
  .main-nav {
    height: 10vh;
  }
}

</style>