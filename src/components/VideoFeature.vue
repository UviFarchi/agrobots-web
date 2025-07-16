<template>
  <div class="video-feature-root">
    <img class="video-hero-logo" :src="imgSource" alt="Logo"/>
    <h1 class="video-hero-title">{{ introTitle }}</h1>
    <div class="video-flex-row">
      <div class="video-scrollable-text">
        <p v-for="(text, index) in introText" :key="index">{{ text }}</p>
      </div>
      <div class="video-wrapper">
        <iframe
            width="100%"
            height="100%"
            :src="videoSource"
            :title="videoTitle"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
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
    videoTitle: { type: String, required: true }
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
  max-width: 1250px;      /* a bit wider container */
  margin: 0 auto;
  align-items: flex-start;
  gap: 2vw;
  justify-content: center;
}

.video-scrollable-text {
  flex: 2 2 0;                 /* makes it take more space than the video */
  min-width: 300px;
  max-width: 750px;              /* wider max width */
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

.video-wrapper {
  flex: 1 1 0;
  min-width: 340px;
  max-width: 600px;
  aspect-ratio: 16 / 9;
  background: #222;
  border-radius: 12px;
  box-shadow: 0 6px 24px #0004;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
  min-height: 220px;
  display: block;
}

/* Responsive: Stack on mobile */
@media (max-width: 900px) {
  .video-flex-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    max-width: 97vw;
  }
  .video-scrollable-text, .video-wrapper {
    max-width: 100vw;
    min-width: 0;
    border-radius: 8px;
    box-shadow: none;
    padding: 1.3rem 0.5rem;
  }
  .video-scrollable-text {
    max-height: unset;
    font-size: 1.06rem;
  }
}
</style>
