<template>
  <section class="agrobots-intro">
    <div class="intro-panel">
      <h1>{{ slideTitle }}</h1>
      <div class="intro-copy">
        <p v-for="(paragraph, index) in introText" :key="index">{{ paragraph }}</p>
      </div>
    </div>

    <aside class="intro-images" aria-label="Agrobots visuals">
      <img v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt" />
    </aside>
  </section>
</template>

<script>
export default {
  name: 'AgrobotsIntro',
  props: {
    slideTitle: { type: String, required: true },
    introText: { type: Array, required: true },
    images: { type: Array, default: () => [] }
  }
};
</script>

<style scoped>
.agrobots-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, .7fr);
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
}
.intro-panel {
  background: var(--backgroundDarkTranslucent, rgba(18, 18, 18, .9));
  border-radius: 16px;
  padding: 1.5rem 1.8rem;
  overflow-y: auto;
}
.intro-panel h1 { margin-top: 0; }
.intro-copy { display: flex; flex-direction: column; gap: .85rem; line-height: 1.6; }
.intro-copy p { margin: 0; }
.intro-images {
  display: grid;
  gap: 1rem;
  grid-auto-rows: minmax(160px, 1fr);
}
.intro-images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, .2);
}
@media (max-width: 980px) {
  .agrobots-intro { grid-template-columns: 1fr; }
  .intro-images { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
