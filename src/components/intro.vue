<template>
  <div class="slide-wrapper">
    <h1 class="intro_title">Welcome to Agrobots</h1>
    <p class="">
      Agrobots is rethinking agriculture from the ground up. We use robotics, AI, and ecological design to transform land into autonomous, productive ecosystems that are both economically viable and ecologically sound.
    </p>
    <p class="">
      Our mission is to help landowners and institutions take care of their land in smarter ways—combining the power of nature with the precision of machines. Instead of depleting the soil, our approach restores it. Instead of relying on chemicals and diesel, we use sensors, data, and modular automation.
    </p>
    <p class="">
      Watch this short video to see how we’re building a more resilient, sustainable future for farming.
    </p>
    <div class="video-wrapper">
      <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/NLG7D5_fcNk"
          title="Agrobots Explainer"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "intro"
};
</script>

<style scoped>

.video-wrapper {
  width: 100%;
  max-width: 720px;
  aspect-ratio: 16 / 9;
}

.intro_title {
  margin-top:4em;
  margin-bottom: 1em;
}
</style>
