<template>
  <div class="video-feature-root">
    <div class="hero-layout">
      <div class="hero-brand-row">
        <img class="hero-logo" :src="imgSource" alt="Logo"/>
        <h1 class="hero-title">{{ introTitle }}</h1>
      </div>

      <div class="hero-content-grid">
        <div class="hero-primary-column">
          <div class="hero-intro-text">
            <section class="hero-media-inline" aria-label="Intro video">
              <div class="video-card" @click="openModal">
                <img :src="thumbnail" alt="Play video" />
                <span class="yt-play-btn"></span>
              </div>
            </section>
            <div class="intro-text-body">
              <p v-for="(text, index) in introText" :key="index">{{ text }}</p>
            </div>
          </div>
        </div>

        <section
            v-if="displayedNewsItems.length"
            class="news-panel"
            aria-label="News feed"
        >
          <div class="news-panel-header">
            <h2 class="news-panel-title">{{ newsTitle }}</h2>
          </div>
          <ul class="news-list">
            <li
                v-for="item in displayedNewsItems"
                :key="item.title + item.date"
                class="news-item"
                role="button"
                tabindex="0"
                @click="openNewsModal(item)"
                @keyup.enter="openNewsModal(item)"
                @keyup.space.prevent="openNewsModal(item)"
            >
              <div class="news-meta">
                <div class="news-meta-left">
                  <span v-if="item.tag" class="news-tag">{{ item.tag }}</span>
                </div>
                <div class="news-meta-right">
                  <span class="news-date">{{ item.date }}</span>
                  <span v-if="item.location" class="news-location">{{ item.location }}</span>
                </div>
              </div>
              <h3 class="news-item-title">
                {{ item.title }}
              </h3>
              <p class="news-item-summary">{{ item.summary }}</p>
              <button
                  class="news-read-more"
                  type="button"
                  @click.stop="openNewsModal(item)"
              >
                Read more
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <NewsArticleModal
        :visible="newsModalOpen"
        :article="activeNewsItem"
        @close="closeNewsModal"
    />

    <!-- Video Modal -->
    <teleport to="body">
    <div v-if="showModal" class="video-modal" @click.self="closeModal">
      <div class="modal-content">
        <!-- Landscape tip for mobile -->
        <div class="landscape-tip" v-if="isMobile && !isLandscape">
          <img src="/img/rotate_device.png" alt="Rotate Device" class="rotate-icon"/>
          <p>Please rotate your device for the best viewing experience.</p>
        </div>
        <iframe
            v-if="!isMobile || isLandscape"
            :src="autoplayUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            ref="videoIframe"
        ></iframe>
        <button class="modal-close" @click="closeModal" aria-label="Close video">×</button>
      </div>
    </div>
    </teleport>
  </div>
</template>

<script>
import NewsArticleModal from './subcomponents/NewsArticleModal.vue';

export default {
  name: "VideoFeature",
  components: {
    NewsArticleModal
  },
  props: {
    introTitle: { type: String, required: true },
    introText: { type: Array, required: true },
    imgSource: { type: String, required: true },
    videoSource: { type: String, required: true },
    thumbnail: { type: String, required: true },
    newsItems: {
      type: Array,
      default: () => []
    },
    newsTitle: {
      type: String,
      default: 'Latest News'
    }
  },
  data() {
    return {
      showModal: false,
      isLandscape: false,
      isMobile: false,
      newsModalOpen: false,
      activeNewsItem: null,
      bodyScrollLocks: 0
    };
  },
  computed: {
    autoplayUrl() {
      // Add autoplay param only when the modal is open
      if (!this.videoSource) return "";
      return this.videoSource.includes("?")
          ? this.videoSource + "&autoplay=1"
          : this.videoSource + "?autoplay=1";
    },
    displayedNewsItems() {
      return this.newsItems;
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
    this.bodyScrollLocks = 0;
    document.body.style.overflow = '';
  },
  methods: {
    openModal() {
      this.showModal = true;
      this.handleResize();
      this.lockBodyScroll();
    },
    closeModal() {
      this.showModal = false;
      this.unlockBodyScroll();
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 900;
      // Check if the device is in landscape mode
      this.isLandscape = window.innerWidth > window.innerHeight;
    },
    openNewsModal(item) {
      this.activeNewsItem = item;
      this.newsModalOpen = true;
      this.lockBodyScroll();
    },
    closeNewsModal() {
      this.newsModalOpen = false;
      this.activeNewsItem = null;
      this.unlockBodyScroll();
    },
    lockBodyScroll() {
      this.bodyScrollLocks += 1;
      document.body.style.overflow = 'hidden';
    },
    unlockBodyScroll() {
      this.bodyScrollLocks = Math.max(0, this.bodyScrollLocks - 1);
      if (!this.bodyScrollLocks && !this.showModal && !this.newsModalOpen) {
        document.body.style.overflow = '';
      }
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
.video-feature-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  overflow-x: hidden;
  height: 100%;
  min-height: 0;
}

.hero-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 2rem 1.5rem 4rem;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
}

.hero-brand-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.85rem;
}

.hero-logo {
  width: clamp(140px, 14vw, 220px);
  min-width: 120px;
}

.hero-title {
  font-size: clamp(1.8rem, 2.6vw, 2.4rem);
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.01em;
  text-align: center;
}

.hero-content-grid {
  display: grid;
  grid-template-columns: minmax(0, 60%) minmax(240px, 40%);
  gap: 1.5rem 2rem;
  align-items: stretch;
  flex: 1;
  min-height: 0;
}

.hero-primary-column {
  display: flex;
  width: 100%;
  align-self: stretch;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.3rem;
}

.hero-intro-text {
  background: var(--backgroundDarkTranslucent, rgba(30, 30, 30, 0.95));
  border-radius: 16px;
  padding: 1.75rem 2rem;
  font-size: 1.08rem;
  line-height: 1.7;
  color: var(--textLight, #eee);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.35);
  width: 100%;
}

.hero-intro-text::after {
  content: '';
  display: block;
  clear: both;
}

.intro-text-body {
  display: block;
}

.hero-intro-text p {
  margin: 0;
}

.intro-text-body p + p {
  margin-top: 1rem;
}

.hero-media-inline {
  float: right;
  width: min(360px, 40%);
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.hero-media-inline .video-card {
  width: 100%;
}

.video-card {
  position: relative;
  aspect-ratio: 16 / 9;
  width: min(500px, 100%);
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.yt-play-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 64px;
  height: 64px;
  background: rgba(255,0,0,0.38);
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 2px 8px #000b;
  transition: filter 0.12s;
}

.video-card:hover .yt-play-btn {
  filter: brightness(1.1) drop-shadow(0 0 10px var(--accent));
}

.yt-play-btn::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-40%, -50%);
  width: 26px;
  height: 32px;
  background: #ffffff;
  border-radius: 18% 45% 45% 18%/25% 50% 50% 25%;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}

.news-panel {
  background: rgba(18, 31, 27, 0.85);
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  border-left: 3px solid var(--primary, #0b874b);
  height: 100%;
  align-self: stretch;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.3rem;
}

.news-panel-header {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}

.news-panel-title {
  margin: 0;
  font-size: 1.35rem;
  letter-spacing: 0.02em;
}

.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  flex: 1;
  padding-right: 0.4rem;
  min-height: 0;
}

.news-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
}

.news-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.news-item:focus-visible {
  outline: 2px solid var(--accent, #36c284);
  outline-offset: 4px;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
}

.news-meta-left {
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 1.2rem;
}

.news-meta-right {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.75);
  flex-shrink: 0;
  text-align: right;
}

.news-date {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.news-location {
  color: rgba(255,255,255,0.65);
  white-space: nowrap;
  font-weight: 500;
}

.news-location::before {
  content: '•';
  margin-right: 0.35rem;
  opacity: 0.65;
}

.news-tag {
  padding: 0.05rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.35);
  font-size: 0.75rem;
}

.news-item-title {
  margin: 0;
  font-size: 1.05rem;
}

.news-item-title a {
  color: var(--textLight, #fff);
  text-decoration: none;
}

.news-item-title a:hover {
  text-decoration: underline;
}

.news-item-summary {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.85);
}

.news-read-more {
  margin-top: 0.35rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--accent, #ffd54f);
  background: transparent;
  color: var(--accent, #ffd54f);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  align-self: flex-start;
}

.news-read-more:hover,
.news-read-more:focus-visible {
  background: var(--accent, #ffd54f);
  color: #1c1c1c;
  transform: translateY(-1px);
  outline: none;
}

/* Modal styles: Use dynamic viewport for mobile browser chrome */
.video-modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100dvh;      /* <-- Use dynamic viewport height */
  max-height: 100dvh;
  background: rgba(24,24,24,0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2100;
  animation: fadeInModal 0.19s cubic-bezier(.44,.23,.58,.85);
  /* fallback for old browsers */
  /* height: 100vh; */
}

@supports not (height: 100dvh) {
  .video-modal {
    height: 100vh;
    max-height: 100vh;
  }
}

@keyframes fadeInModal {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.modal-content {
  position: relative;
  background: transparent;
  border-radius: 16px;
  padding: 0;
  width: 90vw;
  max-width: 900px;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 64px #000a;
  overflow: hidden;

  /* Add top/bottom margin to avoid browser UI overlays */
  margin-top: 3vw;
  margin-bottom: 3vw;
}

.modal-content iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #222;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 2.2rem;
  background: none;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 20;
  filter: drop-shadow(0 1px 1px #000a);
  opacity: 0.9;
}
.modal-close:hover { opacity: 1; }

.landscape-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff9;
  font-size: 1.18rem;
  width: 90vw;
  height: 55vw;
  background: rgba(20,20,20,0.99);
  position: absolute;
  top: 0; left: 0;
  z-index: 22;
  border-radius: 18px;
}
.rotate-icon {
  width: 58px;
  margin-bottom: 1rem;
  opacity: 0.9;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .hero-layout {
    padding: 1.5rem 1rem 3rem;
    gap: 1.5rem;
    height: auto;
  }
  .hero-content-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .hero-logo {
    width: min(240px, 55vw);
    min-width: 120px;
    margin-bottom: 0.5rem;
  }
  .hero-primary-column,
  .news-panel {
    overflow: visible;
    padding-right: 0;
  }
  .hero-media-inline {
    float: none;
    width: 100%;
    margin: 0 0 1rem 0;
  }
  .video-card {
    width: 100%;
  }
  .hero-intro-text,
  .news-panel {
    padding: 1.2rem 1.3rem;
  }
  .modal-content {
    width: 99vw;
    max-width: 99vw;
    min-width: 0;
    aspect-ratio: 16/9;
    border-radius: 13px;
    margin-top: 2vw;
    margin-bottom: 2vw;
  }
  .landscape-tip {
    width: 99vw;
    height: 60vw;
    font-size: 1rem;
    border-radius: 13px;
    text-align: center;
  }
}
</style>
