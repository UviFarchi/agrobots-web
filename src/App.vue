<template>
  <div class="app-wrapper" :data-slide="currentSlide">
    <img
        :key="'main-logo'"
        src="./assets/img/agrobots_logo_white_glow.png"
        alt="Agrobots Logo"
        class="agrobots-logo"
        @click="toggleMenu"
    />

    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-controls">
          <button @click="prevSlide" class="nav-arrow" :style="{ visibility: currentSlide > 0 ? 'visible' : 'hidden' }">
            ‹
          </button>
          <button class="menu-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button
              @click="nextSlide"
              class="nav-arrow"
              :style="{ visibility: currentSlide < slides.length - 1 ? 'visible' : 'hidden' }"
          >
            ›
          </button>
        </div>
      </div>

      <ul :class="['nav-menu', { 'active': menuOpen }]">
        <li v-for="(slide, index) in slides" :key="slide">
          <button
            :class="['nav-link', slide, { active: currentSlide === index }]"
              @click="navigateTo(index)"
          >
            {{ slideTitles[slide] || slide }}
          </button>
        </li>
      </ul>
    </nav>

    <div class="main-stage bg-dark text-light">
      <div class="arrow-left" v-if="currentSlide > 0">
        <button @click="prevSlide" class="body-arrow">‹</button>
      </div>
        <transition name="slide-fade" mode="out-in">
          <div
              :key="currentSlide"
              class="slide-component"
          >
            <component
                :is="slides[currentSlide]"
                :currentSlideIndex="currentSlide"
            />
          </div>
        </transition>

      <div class="arrow-right" v-if="currentSlide < slides.length - 1">
        <button @click="nextSlide" class="body-arrow">›</button>
      </div>
    </div>

    <footer>
      <p>© 2025 Agrobots — All rights reserved</p>
      <button @click="toggleContact" class="footer-contact-button">
        Contact
      </button>
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
/*TODO -> Refactor individual slide components to with generic components with configurations. There are 5 types:
  1. Top image + text with embedded video. intro and participate use this.
  2. Text with scrolling image background, with optional controls for different texts and backgrounds. vision, biorome and impact use this.
  3. Grid of circles on a grid that flip to show text. issue and services use this.
  4. Prepositioned circles that expand and have an action button inside them. landos and process use this.
  5. Text with a form. contact uses this.

  Contact needs to be reformatted to cover the entire main stage.
*/
import Intro from './components/intro.vue';
import Issue from './components/issue.vue';
import Vision from './components/vision.vue';
import Biorome from './components/biorome.vue';
import Landos from './components/landos.vue';
import Process from './components/process.vue';
import Services from './components/services.vue';
import Impact from './components/impact.vue';
import Participate from './components/participate.vue';
import Contact from './components/contact.vue';

export default {
  name: 'AgrobotsMiniSite',
  components: {
    Intro,
    Issue,
    Vision,
    Biorome,
    Landos,
    Process,
    Services,
    Impact,
    Participate,
    Contact
  },
  data() {
    return {
      currentSlide: 0,
      slides: ['intro', 'issue', 'vision', 'biorome', 'landos', 'services','process',   'participate'],//'impact'],
      slideTitles: {
        intro: 'Welcome',
        issue: 'Trouble in Paradise',
        vision: 'A Different Future',
        biorome: 'The Biorome',
        landos: 'Land OS',
        services: 'On the ground',
        process: 'From zero to hero',
       // impact: 'The impact',
        participate: 'Join the Mission'
      },
      menuOpen: false,
      contactVisible: false
    };
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
    }
  }
};
</script>

<style scoped>
/* src/App.vue */

/* Slide transition animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease; /* Slower slide transition */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Menu transition */
.nav-menu {
  transition: transform 0.3s ease;
}
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure it covers the full viewport height */
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.main-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
  flex-grow: 1;
}
.slide-component {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
</style>