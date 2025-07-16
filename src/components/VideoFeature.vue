<template>
  <div class="video-feature-root">
    <img class="video-hero-logo" :src="imgSource" alt="Logo"/>
    <h1 class="video-hero-title">{{ introTitle }}</h1>
    <div class="video-flex-row">
      <div class="video-scrollable-text">
        <p v-for="(text, index) in introText" :key="index">{{ text }}</p>
      </div>
      <div class="video-thumbnail-block">
        <div class="video-thumbnail" @click="openModal">
          <img :src="thumbnail" alt="Play video" />
          <span class="yt-play-btn"></span>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
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
  </div>
</template>

<script>
export default {
  name: "VideoFeature",
  props: {
    introTitle: { type: String, required: true },
    introText: { type: Array, required: true },
    imgSource: { type: String, required: true },
    videoSource: { type: String, required: true },
    thumbnail: { type: String, required: true } // Thumbnail image path
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
      // Add autoplay param only when the modal is open
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
  },
  methods: {
    openModal() {
      this.showModal = true;
      this.handleResize();
      // Prevent scroll when modal is open
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = '';
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 900;
      // Check if the device is in landscape mode
      this.isLandscape = window.innerWidth > window.innerHeight;
    }
  }
};
</script>

<style scoped>
.video-feature-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 0;
}

.video-hero-logo {
  margin: 3vw auto 1.6vw auto;
  display: block;
  height: auto;
  width: 22vw;
  max-width: 320px;
  min-width: 120px;
}

.video-hero-title {
  text-align: center;
  margin: 2vw auto 3vw auto;
  font-size: 2.3rem;
  font-weight: bold;
  letter-spacing: 0.01em;
}

.video-flex-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  align-items: flex-start;
  gap: 2vw;
  justify-content: center;
}

.video-scrollable-text {
  flex: 2 2 0;
  min-width: 340px;
  max-width: 750px;
  background: var(--backgroundDarkTranslucent, rgba(30, 30, 30, 0.95));
  border-radius: 14px;
  padding: 2rem 2.2rem;
  overflow-y: auto;
  max-height: 60vh;
  font-size: 1.14rem;
  color: var(--textLight, #eee);
  line-height: 1.7;
  scrollbar-width: thin;
  scrollbar-color: #444 #181818;
}

.video-scrollable-text::-webkit-scrollbar {
  width: 7px;
  background: #181818;
}
.video-scrollable-text::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 6px;
}
.video-scrollable-text::-webkit-scrollbar-thumb:hover {
  background: #444;
}

.video-thumbnail-block {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 340px;
  max-width: 600px;
  flex: 1 1 0;
}
.video-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  width: 400px;
  max-width: 45vw;
  min-width: 200px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 6px 24px #0004;
  overflow: hidden;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-thumbnail img {
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
.yt-play-btn {
  box-shadow: 0 2px 8px #000b;
  transition: filter 0.12s;
}
.video-thumbnail:hover .yt-play-btn {
  filter: brightness(1.1) drop-shadow(0 0 10px var(--accent));
}

/* Modal styles */
.video-modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(24,24,24,0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2100;
  animation: fadeInModal 0.19s cubic-bezier(.44,.23,.58,.85);
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
  .video-flex-row {
    align-items: stretch;
    max-width: 99vw;
    display: flex;
    flex-direction: column-reverse;
  }
  .video-scrollable-text {
    max-width: 99vw;
    width: 99vw;
    min-width: 0;
    min-height: 80vh;
    padding: 0.5vw 3vw 2vw 3vw;
    font-size: 1.12rem;
    border-radius: 10px;
  }
  .video-thumbnail-block {
    max-width: 100vw;
    min-width: 0;
    margin: 0 auto 1.5rem auto;
    border-radius: 10px;
  }
  .video-thumbnail {
    width: 99vw;
    max-width: 99vw;
    min-width: 0;
    aspect-ratio: 16/9;
    border-radius: 10px;
  }
  .modal-content {
    width: 99vw;
    max-width: 99vw;
    min-width: 0;
    aspect-ratio: 16/9;
    border-radius: 13px;
  }
  .landscape-tip {
    width: 99vw;
    height: 60vw;
    font-size: 1rem;
    border-radius: 13px;
  }
}
</style>
