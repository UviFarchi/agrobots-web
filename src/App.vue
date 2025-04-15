<template>
  <div class="app-wrapper" :data-slide="currentSlide">
    <img
        :key="'main-logo'"
        src="../public/img/agrobots_logo_white_glow.png"
        alt="Agrobots Logo"
        class="agrobots-logo"
        @click="toggleMenu"
    />

    <nav class="main-nav">
        <div class="nav-controls">
          <button @click="prevSlide" class="nav-arrow back-arrow" :style="{ visibility: currentSlide > 0 ? 'visible' : 'hidden' }">
            Back
          </button>
          <button class="menu-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
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
import VideoFeature from './components/VideoFeature.vue';
import CardGrid from './components/CardGrid.vue';
import ScrollingFullBg from './components/ScrollingFullBg.vue';
import ConnectionCircles from './components/ConnectionCircles.vue';
import Contact from './components/subcomponents/Contact.vue';
import ActionColumns from "@/components/ActionColumns.vue";


import introSlide from './slides/intro.js';
import issueSlide from './slides/issue.js';
import servicesSlide from './slides/services.js';
import bioromeSlide from './slides/biorome.js';
import visionSlide from './slides/vision.js';
import landosSlide from './slides/landos.js';
import processSlides from './slides/process.js';
import impactSlide from './slides/impact.js';
import participateSlide from './slides/participate.js';


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
        participateSlide
      ],
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

</style>