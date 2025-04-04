<template>

    <div class="pan-bg-slide" :style="{ 'background-image': currentBgImage }">
      <div class="slide-wrapper">
      <div class="impact-content">

        <div v-if="mode === ''" class="impact-text" id="intro">
          <h1>What we aim to achieve</h1>
          <p>Agrobots isn’t merely a technological upgrade—it’s a reimagining of agriculture from the ground up. In our
            vision, every field transforms into a living, breathing ecosystem where nature and innovation work in
            perfect
            harmony. We convert overworked, barren soils into regenerative landscapes that continuously learn from the
            rhythms of the earth. Imagine every acre managed by intelligent systems that not only boost yields but also
            nurture the land back to life, redefining productivity by restoring balance and cutting waste.</p>

          <p>Yet, the cost of inaction is steep. Clinging to conventional methods—relying on fossil-fuel machinery,
            chemical inputs, and rigid monocultures—threatens to drain our soils, strain water resources, and inflate
            warehousing and transport costs. Without innovation, supply chains become unpredictable and our food systems
            vulnerable to climate shocks and market disruptions. The very foundations of agriculture risk degradation,
            leading to higher expenses and less reliable access to fresh produce.</p>

          <p>Now, more than ever, we have a unique opportunity to turn challenges into promise. By embracing the
            just-in-place and just-in-time principles of Agriculture 4.0, Agrobots ensures food is produced exactly
            where
            and when it’s needed—creating vibrant ecosystems to preserve biodiversity while growing high quality, cheap,
            and sufficient food for everyone. The choice is clear: a future built on balance, innovation, and respect
            for
            nature will nourish both the land and the communities that depend on it.</p>
          <h2 class="impact-title">Impact</h2>
        </div>

        <div v-if="mode === 'human'" class="impact-text story" id="dayText">
          <h2>Human impact</h2>
          <p>At the heart of Agrobots is a profound commitment to uplifting communities. For farmers and rural workers,
            our technology offers more than increased efficiency—it brings renewed hope and opportunity. By automating
            laborious tasks and optimizing every aspect of the farming process, we free up time and resources, allowing
            communities to focus on innovation, education, and local prosperity. Picture a rural landscape where modern
            technology blends seamlessly with tradition, empowering people with the tools and knowledge to thrive. Our
            system fosters job creation, supports sustainable practices, and builds stronger, self-reliant communities
            where every stakeholder benefits from a healthier, more reliable food supply.</p>
        </div>

        <div v-if="mode === 'environmental'" class="impact-text story" id="nightText">
          <h2>Environmental impact</h2>
          <p>Our approach to agriculture is as much about healing the planet as it is about feeding it. Agrobots
            champions
            a regenerative model that significantly reduces reliance on harmful chemicals and fossil fuels. By carefully
            orchestrating the interplay of plants, microbes, and robotic interventions, we restore the natural balance
            of
            the soil, conserve precious water resources, and enhance biodiversity. Over time, the land transforms into a
            vibrant, self-sustaining ecosystem that sequesters carbon and adapts to climate fluctuations. This isn’t
            just
            sustainable farming—it’s a blueprint for environmental renewal, where every harvest helps rebuild a
            healthier
            planet for generations to come.</p>
        </div>

        <div class="impact-buttons">
          <button v-if="!mode" @click="setMode('human')" class="panner-mode-button">Human</button>
          <button v-if="!mode" @click="setMode('environmental')" class="panner-mode-button">Environmental</button>
          <button v-if="mode" @click="setMode('')" class="panner-mode-button panner-reset-button">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Impact",
  data() {
    return {
      mode: "",
      defaultBgImage: `url(${new URL("../assets/img/impact_main.png", import.meta.url)})`,
      humanBgImage: `url(${new URL("../assets/img/impact_human.png", import.meta.url)})`,
      environmentalBgImage: `url(${new URL("../assets/img/impact_environmental.png", import.meta.url)})`
    };
  },
  computed: {
    currentBgImage() {
      if (this.mode === "human") {
        return this.humanBgImage;
      } else if (this.mode === "environmental") {
        return this.environmentalBgImage;
      } else {
        return this.defaultBgImage;
      }
    }
  },
  methods: {
    setMode(newMode) {
      console.log(newMode);
      this.mode = newMode;
    }
  }
};
</script>

<style scoped>
.impact-content {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  margin: 0 auto;
}

.impact-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  text-align: center;
  margin-top: 20px;
  position: relative;
  z-index: 200000;
  pointer-events: auto;
}

.panner-mode-button {
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ffeb3b;
  color: #1e1e1e;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.panner-mode-button:hover {
  background-color: #fdd835;
}

.panner-reset-button {
  position: absolute;
}
</style>