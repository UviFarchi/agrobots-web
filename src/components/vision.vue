<template>
  <div class="slide-wrapper">
    <div class="pan-bg-slide" :style="{ 'background-image': bgImage }">

      <div class="panner-content">
        <h1 class="panner-title">Our Vision</h1>
        <p class="panner-text">
          We believe a different future for agriculture is possible—one where we nurture the land instead of depleting
          it,
          and where food production is woven gently into local ecosystems. Instead of fighting nature with chemicals and
          massive machinery, we let ecological interactions guide our designs.
        </p>
        <p class="panner-text">
          By merging modular robotics, data intelligence, and time-tested biological principles, we can create a living
          tapestry that continuously renews itself. Our vision is to see thriving, resilient farmlands
          everywhere—cutting
          waste, sequestering carbon, and feeding communities in a way that’s both profitable and kind to the Earth.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vision",
  data() {
    return {
      bgImage: `url(${new URL("../assets/img/biorome_1.png", import.meta.url)})`
    };
  }
};
</script>

<style scoped>

</style>