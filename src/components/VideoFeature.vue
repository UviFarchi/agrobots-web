<template>
  <section class="video-feature-root">
    <div class="intro-shell">
      <div class="intro-copy-panel">
        <img class="intro-logo" :src="imgSource" alt="Agrobots logo" />

        <div class="intro-copy-body">
          <div class="intro-copy-block">
            <h1 class="hero-title">{{ introTitle }}</h1>
            <p class="welcome-text">{{ welcomeText }}</p>
          </div>

        <div v-if="introText.length" class="intro-copy">
          <p
            v-for="(paragraph, index) in introText"
            :key="index"
            class="intro-paragraph"
          >
            {{ paragraph }}
          </p>
        </div>

          <div class="guidance-primary">
            <p class="guidance-text guidance-primary-text">{{ welcomeHint }}</p>
          </div>
          <div class="guidance-nav">
            <h2 class="guidance-heading">{{ navigationHeading }}</h2>
            <p class="guidance-text guidance-secondary">{{ navigationHint }}</p>
          </div>
        </div>

        <div class="hero-actions">
          <button type="button" class="primary-action" @click="$emit('next')">
            <span>{{ nextLabel }}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div class="hero-media-panel">
        <button type="button" class="video-card" @click="openModal">
          <img :src="thumbnail" alt="Play video" />
          <div class="video-overlay">
            <span class="video-chip">{{ videoTitle || 'Intro video' }}</span>
            <div class="video-callout">
              <span class="yt-play-btn" aria-hidden="true"></span>
              <span class="video-label">Watch video</span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <teleport to="body">
      <div v-if="showModal" class="video-modal" @click.self="closeModal">
        <div class="modal-content">
          <div class="landscape-tip" v-if="isMobile && !isLandscape">
            <img src="/img/rotate_device.png" alt="Rotate Device" class="rotate-icon" />
            <p>Please rotate your device for the best viewing experience.</p>
          </div>
          <iframe
            v-if="!isMobile || isLandscape"
            :src="autoplayUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
          <button class="modal-close" @click="closeModal" aria-label="Close video">×</button>
        </div>
      </div>
    </teleport>
  </section>
</template>

<script>
export default {
  name: "VideoFeature",
  emits: ['next'],
  props: {
    title: { type: String, default: '' },
    introTitle: { type: String, required: true },
    welcomeText: { type: String, default: '' },
    introText: { type: Array, default: () => [] },
    welcomeHint: { type: String, default: '' },
    navigationHeading: { type: String, default: 'Navigation' },
    navigationHint: {
      type: String,
      default: 'Use the arrows on the edges of the screen to move through the site, or the tabs at the top to jump to a specific topic.'
    },
    nextLabel: { type: String, default: 'Continue to Agrobots' },
    imgSource: { type: String, required: true },
    videoSource: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videoTitle: { type: String, default: '' }
  },
  data() {
    return {
      showModal: false,
      isLandscape: false,
      isMobile: false
    };
  },
  computed: {
    autoplayUrl() {
      if (!this.videoSource) return "";
      return this.videoSource.includes("?")
        ? `${this.videoSource}&autoplay=1`
        : `${this.videoSource}?autoplay=1`;
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
    document.body.style.overflow = '';
  },
  methods: {
    openModal() {
      this.showModal = true;
      this.handleResize();
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = '';
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 900;
      this.isLandscape = window.innerWidth > window.innerHeight;
    }
  }
};
</script>

<style scoped>
.video-feature-root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.intro-shell {
  width: 100%;
  height: 100%;
  padding: 1.2rem 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(210px, 0.6fr) minmax(0, 1.4fr);
  gap: 1rem;
  align-items: stretch;
}

.hero-media-panel {
  position: relative;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    var(--backgroundDarkTranslucent, rgba(33, 33, 33, 0.93));
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16);
}

.intro-copy-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  min-height: 100%;
  padding: 0.4rem 0.35rem 0.4rem 0;
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.hero-media-panel::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  border-radius: 22px 0 0 22px;
  background: linear-gradient(180deg, var(--primary, #0b874b), transparent 78%);
  opacity: 0.95;
}

.intro-logo {
  width: clamp(118px, 14vw, 190px);
  height: auto;
  align-self: flex-start;
}

.intro-copy-body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 0.45rem;
  width: 100%;
}

.intro-copy-block {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
}

.hero-title {
  margin: 0;
  width: 100%;
  max-width: none;
  font-size: clamp(1.9rem, 2.55vw, 2.7rem);
  line-height: 1.04;
  color: #fff;
}

.welcome-text {
  margin: 0;
  width: 100%;
  max-width: none;
  font-size: 0.98rem;
  line-height: 1.62;
  color: rgba(247, 255, 247, 0.9);
}

.intro-copy {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.intro-paragraph {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.6;
  color: rgba(247, 255, 247, 0.82);
}

.guidance-primary,
.guidance-nav {
  width: 100%;
}

.guidance-primary-text {
  width: 100%;
}

.guidance-heading {
  margin: 0 0 0.28rem;
  color: var(--primary, #0b874b);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.guidance-text {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(247, 255, 247, 0.8);
}

.guidance-secondary {
  color: var(--primary, #0b874b);
}

.hero-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-start;
}

.primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
  min-width: 11rem;
  min-height: 3rem;
  padding: 0.74rem 0.95rem;
  border-radius: 999px;
  border: 1px solid var(--secondary, #237aff);
  background: var(--secondary, #237aff);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 600;
}

.primary-action:hover {
  background: color-mix(in srgb, var(--secondary, #237aff) 86%, white 14%);
}

.hero-media-panel {
  display: flex;
  align-items: stretch;
  padding: 0.85rem;
}

.video-card {
  position: relative;
  width: 100%;
  border: none;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 0;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.video-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.9rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.48));
}

.video-chip {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 0.34rem 0.72rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.video-callout {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.9rem;
  padding: 0.68rem 0.84rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.46);
  color: #fff;
}

.yt-play-btn {
  position: relative;
  width: 50px;
  height: 34px;
  background: rgba(255, 0, 0, 0.88);
  border-radius: 10px;
  flex-shrink: 0;
}

.yt-play-btn::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 9px;
  width: 0;
  height: 0;
  border-left: 12px solid #fff;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.video-label {
  font-size: 0.92rem;
  font-weight: 600;
}

.video-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.modal-content {
  width: min(92vw, 1020px);
  height: min(84vh, 620px);
  position: relative;
  background: #000;
  border-radius: 14px;
  overflow: hidden;
}

.modal-content iframe {
  width: 100%;
  height: 100%;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.landscape-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

.rotate-icon {
  width: 72px;
  margin-bottom: 0.8rem;
}

@media (max-width: 980px) {
  .intro-shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(280px, 1fr);
  }

  .hero-media-panel {
    order: -1;
    min-height: 18rem;
  }

  .intro-copy-panel {
    padding: 0.25rem 0 0;
  }

  .intro-copy-body {
    justify-content: flex-start;
    gap: 0.95rem;
    margin-top: 1rem;
  }
}

@media (max-width: 720px) {
  .video-feature-root {
    overflow: auto;
  }

  .intro-shell {
    padding-top: 1rem;
  }

  .intro-copy-panel,
  .hero-media-panel {
    padding: 1rem;
  }

  .intro-copy-panel {
    padding: 0.25rem 0 1rem;
  }

  .intro-copy-body {
    gap: 0.85rem;
    margin-top: 0.85rem;
  }

  .video-callout {
    gap: 0.7rem;
    padding: 0.65rem 0.78rem;
  }
}
</style>
