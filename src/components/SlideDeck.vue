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
        <li v-for="(slide, index) in slides" :key="slide.name" class="nav-item">
          <button
              :class="['nav-link', slide.name, { active: currentSlide === index }]"
              @click="navigateTo(index)"
          >
            {{ slide.content[currentLang].title }}
          </button>
        </li>
      </ul>

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
              v-on="componentEventMap"
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

          {{ $t('footer.contact') }}
        </button>
        <a class="footer-cta quote-cta" href="/quote">

          {{ $t('footer.quote') }}
        </a>
      </div>
      <div class="footer-news-wrap">
        <button
          class="footer-news-ticker"
          @click="toggleNewsModal"
          :aria-label="footerNewsTitle"
        >
          <span class="news-button-label">{{ footerNewsTitle }}</span>
          <span class="news-button-marquee">
            <span
              class="news-button-track"
              :class="{ 'is-static': !tickerShouldAnimate }"
            >
              <span
                v-for="(sequence, sequenceIndex) in tickerSequences"
                :key="`ticker-sequence-${sequenceIndex}`"
                class="news-button-sequence"
                :aria-hidden="sequenceIndex > 0 ? 'true' : undefined"
              >
                <span
                  v-for="(item, itemIndex) in sequence"
                  :key="`${item.title}-${item.date}-${sequenceIndex}-${itemIndex}`"
                  class="news-ticker-item"
                >
                  <span v-if="item.tag" class="news-ticker-tag">{{ item.tag }}</span>
                  <span class="news-button-headline">{{ item.title }}</span>
                </span>
              </span>
            </span>
          </span>
        </button>
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

    <teleport to="body">
      <div v-if="newsModalVisible" class="news-list-modal" @click.self="toggleNewsModal">
        <div class="news-list-content">
          <button class="news-list-close" @click="toggleNewsModal" aria-label="Close news">×</button>
          <h2 class="news-list-title">{{ footerNewsTitle }}</h2>
          <ul class="news-list-items">
            <li v-for="item in footerNewsItems" :key="item.title + item.date">
              <button class="news-list-item-btn" @click="openNewsArticle(item)">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-meta">{{ item.date }} · {{ item.location }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </teleport>

    <NewsArticleModal
        :visible="newsArticleModalVisible"
        :article="activeNewsItem"
        @close="closeNewsArticle"
    />
  </div>
</template>

<script>
import VideoFeature from './VideoFeature.vue';
import ColumnsAndPanels from './ColumnsAndPanels.vue';
import CardGrid from './CardGrid.vue';
import ScrollingFullBg from './ScrollingFullBg.vue';
import ConnectionCircles from './ConnectionCircles.vue';
import Contact from './subcomponents/Contact.vue';
import NewsArticleModal from './subcomponents/NewsArticleModal.vue';
import ActionColumns from "@/components/ActionColumns.vue";
import i18n from '@/i18n/index.js';

import introSlide from '../slides/intro.js';
import agrobotsSlide from '../slides/agrobots.js';
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
    ColumnsAndPanels,
    CardGrid,
    ScrollingFullBg,
    ConnectionCircles,
    ActionColumns,
    Contact,
    NewsArticleModal
  },
  data() {
    return {
      currentSlide: 0,
      slides: [
        introSlide,
        agrobotsSlide,
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
      newsModalVisible: false,
      newsArticleModalVisible: false,
      activeNewsItem: null,
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
  computed: {
    componentEventMap() {
      if (this.slides[this.currentSlide].name === 'intro') {
        return { next: this.nextSlide };
      }
      if (this.slides[this.currentSlide].name === 'participate') {
        return { contact: this.toggleContact };
      }
      return {};
    },
    footerNewsItems() {
      return introSlide.content[this.currentLang]?.newsItems || [];
    },
    footerNewsTitle() {
      return introSlide.content[this.currentLang]?.newsTitle || 'Agrobots News';
    },
    tickerShouldAnimate() {
      return this.footerNewsItems.length > 1;
    },
    tickerSequences() {
      if (!this.footerNewsItems.length) {
        return [[{ title: this.footerNewsTitle }]];
      }

      if (!this.tickerShouldAnimate) {
        return [this.footerNewsItems];
      }

      return [this.footerNewsItems, this.footerNewsItems];
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
    toggleNewsModal() {
      this.newsModalVisible = !this.newsModalVisible;
    },
    openNewsArticle(item) {
      this.activeNewsItem = item;
      this.newsArticleModalVisible = true;
    },
    closeNewsArticle() {
      this.newsArticleModalVisible = false;
      this.activeNewsItem = null;
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
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  z-index: 30;
}

.lang-menu {
  position: absolute;
  top: 120%;
  right: 0;
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
  border-color: var(--color-primary);
  box-shadow: 0 0 4px var(--color-accent);
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.footer-news-wrap {
  grid-area: ticker;
  min-width: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.footer-news-ticker {
  width: min(100%, 760px);
  min-width: min(260px, 100%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: rgba(8, 8, 8, 0.4);
  color: #fff;
  overflow: hidden;
  height: 42px;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0 1rem;
  text-align: left;
}

.news-button-label {
  flex: 0 0 auto;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.news-button-marquee {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.news-button-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: footer-news-marquee 30s linear infinite;
}

.news-button-track.is-static {
  animation: none;
}

.news-button-sequence {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
  flex: 0 0 auto;
}

.news-ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  white-space: nowrap;
}

.news-ticker-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0.15rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 213, 79, 0.18);
  border: 1px solid rgba(255, 213, 79, 0.5);
  color: var(--color-accent);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.news-button-headline {
  font-size: 0.84rem;
  white-space: nowrap;
}

.footer-news-ticker:hover .news-button-track,
.footer-news-ticker:focus-visible .news-button-track {
  animation-play-state: paused;
}

@keyframes footer-news-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.news-list-modal {
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 8, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2020;
  padding: 1rem;
}

.news-list-content {
  width: min(90vw, 900px);
  max-height: 85vh;
  overflow-y: auto;
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  border: 1px solid var(--color-border);
  position: relative;
}

.news-list-close {
  position: absolute;
  right: 14px;
  top: 10px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
}

.news-list-title {
  margin: 0 0 1rem 0;
  color: #fff;
}
.news-list-items { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .65rem; }
.news-list-item-btn {
  width: 100%;
  text-align: left;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 10px;
  padding: .75rem .8rem;
  background: rgba(255,255,255,.04);
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
.item-title {
  color: #fff;
  font-weight: 600;
}
.item-meta { font-size: .78rem; opacity: .76; }

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
  background-color: var(--color-background);
  color: var(--color-text);
  overflow: auto;
  scrollbar-gutter: stable both-edges;
}

.slide-component {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.slide-component > * {
  width: 100%;
}

/* Navigation styles */
.main-nav {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-primary);
  z-index: 20;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  position: relative;
  padding: 0.5rem 4.5rem 0.5rem 1.5rem;
  box-sizing: border-box;
}

.nav-arrow {
  font-size: 1.2rem;
  background-color: transparent;
  color: var(--color-text);
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
  color: var(--color-text);
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
  color: var(--color-text);
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
  margin: 0;
  padding: 0 4.5rem 0 0;
  width: 100%;
}

.nav-link {
  background: transparent;
  border: none;
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
}

.nav-link.active {
  background-color: var(--color-primary);
  color: var(--color-text-strong);
}

.nav-link.participate {
  background: var(--color-secondary);
  color: var(--color-text);
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(35,122,255,0.16);
  border: 2px solid var(--color-primary);
}
.nav-link.participate:hover {
  background: var(--color-primary);
  color: var(--color-text);
  border-color: var(--color-secondary);
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
  color: var(--color-text);
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
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  grid-template-areas: "cta ticker info";
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 1rem 1.5rem;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-primary);
  color: var(--color-text);
  min-height: 64px;
  font-size: 0.97rem;
}

.footer-info-row {
  grid-area: info;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-self: end;
}

.footer-cta-row {
  grid-area: cta;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  justify-self: start;
}

.footer-link {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 0.97rem;
  text-decoration: underline;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--color-accent);
}

.footer-copyright {
  color: var(--color-accent);
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
  background: var(--color-primary);
  color: var(--color-text-strong);
  border: 2px solid var(--color-accent);
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
  background: var(--color-primary);
  color: var(--color-text);
  border-color: var(--color-primary);
  transform: scale(1.07);
}

/* Contact form/modal styles */
.contact-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--color-background-soft);
  padding: 1rem;
  z-index: 1000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}
.nav-item {
  display: flex;
}
/* Responsive tweaks */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
    height: 6vh;
    width:6vh;
    z-index: 2002;
    box-sizing: border-box;
    padding: 1vh;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, darkslategray 0%, black 100%);
    border-radius: 50%;
    border: 1px solid var(--color-primary);
  }
  .toggle-menu-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .nav-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--color-background);
    flex-direction: column;
    align-items: center;
    padding: 60px 0 20px;
    transform: translateY(-100%);
    z-index: 10;
    border-bottom: 2px solid var(--color-primary);
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
    grid-template-columns: 1fr;
    grid-template-areas:
      "cta"
      "ticker"
      "info";
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
  .footer-news-ticker {
    width: min(92vw, 520px);
    max-width: 520px;
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
