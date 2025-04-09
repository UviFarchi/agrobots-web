<template>
  <div class="slide-wrapper">
    <h1 class="video-title">{{ introTitle }}</h1>
    <!-- First paragraph before the video -->
    <div class="pre-video-text" v-if="introText && introText.length">
      <p>{{ introText[0] }}</p>
    </div>
    <div class="video-container">
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
      <!-- Remaining paragraphs after the video -->
      <div class="post-video-text" v-if="introText && introText.length &gt; 1">
        <p v-for="(text, index) in introText.slice(1)" :key="index">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoFeature",
  props: {
    introTitle: {
      type: String,
      required: true
    },
    introText: {
      type: Array,
      required: true
    },
    videoSource: {
      type: String,
      required: true
    },
    videoTitle: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.video-wrapper {
  width: 45%;
  max-width: 720px;
  aspect-ratio: 16 / 9;
  float: right;
  margin: 0 10px 0 10px;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
}

.pre-video-text p,
.post-video-text p {
  margin-bottom: 1rem;
}

.video-title {
  margin-top: 25vh;
  margin-bottom: 1em;
  clear: both;
}

@media (max-width: 768px) {
  .video-wrapper {
    float: none;
    width: 100%;
    margin: 0 auto 1rem auto;
  }

  .pre-video-text,
  .post-video-text {
    margin-top: 0;
  }
}
</style>