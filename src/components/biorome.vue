<template>
  <div class="slide-wrapper">
    <div class="pan-bg-slide" :style="{ 'background-image': currentBgImage }">
      <div class="panner-content">
        <!-- Intro text only visible when no mode is selected -->
        <div v-if="mode === ''" class="panner-text" id="intro">
          <h1>Bio-Robotic Modular Ecosystems (bioromes)</h1>
          <p>
            We call our core concept a biorome—a Bio-Robotic Modular Ecosystem that combines nature’s inherent diversity
            with advanced AI. Instead of forcing single\-crop fields through massive machinery, we deploy multiple
            simple
            modules—each performing a single task: seeding, feeding, monitoring, or harvesting.
          </p>
          <p>
            An AI engine orchestrates these modules in real time, shaping a living system that continually adapts to
            local
            conditions. Plants, animals, and microbes are balanced so that chemical inputs drop dramatically, and the
            land
            regenerates itself. Over time, a biorome becomes a self\-optimizing ecosystem—alive, responsive, and
            perfectly
            attuned to what the land and community need.
          </p>
          <h2 class="panner-title">Life in a Biorome</h2>
        </div>
        <!-- Day story text -->
        <div v-if="mode === 'day'" class="panner-text" id="dayText">
          <h2>A day in the biorome</h2>
          <p>The first light filters through the canopy, illuminating a landscape that seems untouched, except for the
            near-invisible presence of technology. Birds begin their morning calls, small animals stir, and the air is
            thick with the scent of damp earth and growing plants.</p>
          <p>Hidden in the undergrowth, sensors begin their daily reports, registering moisture levels, soil
            composition, and plant health. Drones lift off from their charging stations, scanning the terrain with quiet
            precision. A patch of crops has absorbed more water than expected overnight—no need for irrigation in that
            sector. Meanwhile, a robotic module adjusts a water valve nearby, redirecting resources to drier zones.</p>
          <p>Deep in the vegetation, a monitoring unit detects an animal behaving unusually. The system flags it,
            analyzing past movement patterns to determine if intervention is needed. A drone glides overhead, zooming in
            to confirm—one hen shows signs of illness. The data flows seamlessly into Athena’s model, which recommends
            isolating the bird. A simple adjustment to the feed dispenser ensures the affected animal receives a
            tailored treatment, without disrupting the entire ecosystem.</p>
          <p>At midday, a light rain rolls in, anticipated hours before by the system. No need to activate irrigation. A
            feeding module dispenses a carefully balanced mix for the livestock, based on real-time nutritional
            tracking. The land adapts fluidly, responding to the needs of plants, animals, and microbes alike, without
            human intervention.</p>
        </div>
        <!-- Night story text -->
        <div v-if="mode === 'night'" class="panner-text" id="nightText">
          <h2>A night in the biorome</h2>
          <p> As dusk settles, the biorome transitions into night mode. The last rays of sunlight fade, but the system
            remains fully operational. Nocturnal pollinators emerge, guided by natural patterns rather than artificial
            interference. The temperature drops, and Athena updates its models in real time, adjusting growth strategies
            for the coming day.</p>
          <p> This is the ideal time for certain tasks. Cooler air reduces plant stress, making it the perfect window
            for
            precision irrigation. Water is directed exactly where it’s needed, minimizing evaporation. Some robotic
            modules move to apply slow-release nutrients where Athena has detected deficiencies, ensuring optimal
            absorption by morning. Others handle delicate harvesting operations—some crops are best collected under the
            dew-laden air to retain freshness.</p>
          <p> A slow-moving drone glides silently through the canopy, performing infrared scans to ensure all monitored
            species are where they should be. Its faint red navigation lights flicker momentarily against the foliage.
            Nearby, a small rodent disturbs a patch of soil, prompting the sensors to log the micro-disturbance, an
            indicator of healthy underground biodiversity.</p>
          <p> A soft hum of activity persists: water is redirected, micro-adjustments are made, and a few robotic
            modules
            shift position for their next task.</p>
          <p> By dawn, the cycle begins anew—seamlessly adjusting, growing, and optimizing, without ever disrupting the
            balance of the land.</p>
        </div>

        <div class="panner-buttons">
          <button v-if="!mode" @click="setMode('day')" class="panner-mode-button">Day</button>
          <button v-if="!mode" @click="setMode('night')" class="panner-mode-button">Night</button>
          <button v-if="mode" @click="setMode('')" class="panner-mode-button panner-reset-button">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "biorome",
  data() {
    return {
      mode: "",
      defaultBgImage: `url(${new URL("../assets/img/biorome_2.png", import.meta.url)})`,
      dayBgImage: `url(${new URL("../assets/img/biorome_day.png", import.meta.url)})`,
      nightBgImage: `url(${new URL("../assets/img/biorome_night.png", import.meta.url)})`
    };
  },
  computed: {
    currentBgImage() {
      if (this.mode === "day") {
        return this.dayBgImage;
      } else if (this.mode === "night") {
        return this.nightBgImage;
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
.panner-content {
  position: relative;
  z-index: 2; /* Ensure content is above background */
  width: 40%;
  background: rgba(0, 0, 0, 0.5);
  margin: 10%;
}
.panner-title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 10px;
}
.panner-text {
  color: #fff;
  line-height: 1.5;
  margin-top: 20px;
}
.panner-buttons {
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
@media (max-width: 768px) {
  .panner-content {
    width: 90%;
    height: 90%;
    margin: 5%;
  }
}
</style>