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
            <div class="intro-kicker">{{ title }}</div>
            <h2 class="welcome-title">{{ introTitle }}</h2>
            <p class="welcome-text">{{ welcomeText }}</p>
            <p v-if="welcomeHint" class="welcome-hint">{{ welcomeHint }}</p>

            <section class="hero-media-inline" aria-label="Intro video">
              <div class="video-card" @click="openModal">
                <img :src="thumbnail" alt="Play video" />
                <span class="yt-play-btn"></span>
              </div>
            </section>

            <div class="hero-actions">
              <button type="button" class="primary-action" @click="$emit('next')">
                {{ nextLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div v-if="showModal" class="video-modal" @click.self="closeModal">
        <div class="modal-content">
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
          ></iframe>
          <button class="modal-close" @click="closeModal" aria-label="Close video">×</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: "VideoFeature",
  emits: ['next'],
  props: {
    title: { type: String, default: '' },
    introTitle: { type: String, required: true },
    welcomeText: { type: String, default: '' },
    welcomeHint: { type: String, default: '' },
    nextLabel: { type: String, default: 'Continue to Agrobots' },
    imgSource: { type: String, required: true },
    videoSource: { type: String, required: true },
    thumbnail: { type: String, required: true }
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
          ? this.videoSource + "&autoplay=1"
          : this.videoSource + "?autoplay=1";
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
.video-feature-root { width: 100%; height: 100%; overflow-x: hidden; }
.hero-layout { width: 100%; padding: 2rem 1.5rem 4rem; box-sizing: border-box; }
.hero-brand-row { display: flex; flex-direction: column; align-items: center; gap: .85rem; text-align: center; }
.hero-logo { width: clamp(140px, 14vw, 220px); }
.hero-title { font-size: clamp(1.8rem, 2.6vw, 2.4rem); margin: 0; }
.hero-content-grid { display: grid; grid-template-columns: 1fr; }
.hero-primary-column { width: 100%; }
.hero-intro-text {
  background: var(--backgroundDarkTranslucent, rgba(30,30,30,.95));
  border-radius: 16px; padding: 1.5rem; max-width: 960px; margin: 0 auto;
}
.intro-kicker { text-transform: uppercase; letter-spacing: .16em; color: var(--accent, #ffd54f); font-size: .78rem; }
.welcome-title { margin: .35rem 0 0; font-size: clamp(1.35rem, 2vw, 2rem); }
.welcome-text { margin: .75rem 0 0; font-size: 1.05rem; line-height: 1.5; }
.welcome-hint { margin: .65rem 0 0; opacity: .86; }
.hero-media-inline { margin-top: 1rem; }
.video-card { position: relative; cursor: pointer; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,.2); }
.video-card img { width: 100%; display: block; }
.yt-play-btn {
  position: absolute; inset: 50% auto auto 50%; transform: translate(-50%, -50%);
  width: 64px; height: 46px; background: rgba(255,0,0,.88); border-radius: 12px;
}
.yt-play-btn::before {
  content: ''; position: absolute; left: 24px; top: 13px; width: 0; height: 0;
  border-left: 16px solid #fff; border-top: 10px solid transparent; border-bottom: 10px solid transparent;
}
.hero-actions { margin-top: 1rem; display: flex; justify-content: flex-end; }
.primary-action { border: none; border-radius: 999px; padding: .7rem 1.2rem; cursor: pointer; background: var(--primary, #0b874b); color: #fff; }
.video-modal { position: fixed; inset: 0; background: rgba(0,0,0,.82); display: flex; align-items: center; justify-content: center; z-index: 3000; }
.modal-content { width: min(92vw, 1020px); height: min(84vh, 620px); position: relative; background: #000; border-radius: 14px; overflow: hidden; }
.modal-content iframe { width: 100%; height: 100%; }
.modal-close { position: absolute; top: 10px; right: 12px; background: rgba(0,0,0,.6); color: #fff; border: none; font-size: 2rem; cursor: pointer; }
.landscape-tip { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #fff; }
.rotate-icon { width: 72px; margin-bottom: .8rem; }
</style>
