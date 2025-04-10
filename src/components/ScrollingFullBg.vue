<template>
  <div class="contact-wrapper">
    <!-- Apply dynamic order using inline styles -->
    <div class="panner-content" :style="{ order: contentOrder }">
      <template v-if="modes && modes[mode]">
        <h1 :style="currentTitleStyle">{{ modes[mode].title }}</h1>
        <div v-for="(paragraph, index) in modes[mode].paragraphs" :key="index">
          <p :style="currentParagraphStyle">{{ paragraph }}</p>
        </div>
      </template>
    </div>

    <div class="panner-button-panel" v-if="availableModes.length > 0 || mode !== 'default'" :style="{ order: buttonOrder }">
      <h2 class="buttons-legend">{{ buttonsLegend }}</h2>
      <div class="buttons-container">
        <button
            v-for="modeName in availableModes"
            :key="modeName"
            @click="setMode(modeName)"
            class="panner-button"
            :style="buttonStyle"
        >
          {{ modeName }}
        </button>

        <button
            v-if="mode !== 'default'"
            @click="setMode('default')"
            class="panner-button panner-reset-button"
            :style="buttonStyle"
        >
          {{ defaultButtonLabel }}
        </button>
      </div>
    </div>
  </div>
  <div class="pan-bg-slide" :style="{ 'background-image': currentBgImage }"></div>
</template>

<script>
export default {
  name: "ScrollingFullBg",
  props: {
    currentSlideIndex: {
      type: Number,
      default: 0
    },
    modes: {
      type: Object,
      required: true
    },
    buttonsLegend: {
      type: String,
      required: true
    },
    defaultButtonLabel: {
      type: String,
      default: "Back"
    },
    buttonBgColor: {
      type: String,
      default: "#cccccc"
    },
    buttonTextColor: {
      type: String,
      default: "#1e1e1e"
    }
  },
  data() {
    return {
      mode: "default"
    };
  },
  created() {
    console.log('Modes received:', this.modes);
    console.log('Current mode:', this.mode);
    console.log('Default mode content:', this.modes?.default);
  },
  computed: {
    buttonStyle() {
      return {
        '--button-bg-color': this.buttonBgColor,
        '--button-text-color': this.buttonTextColor
      };
    },
    currentBgImage() {
      if (!this.modes) return "";
      if (this.mode && this.modes[this.mode]) {
        return `url(${new URL(this.modes[this.mode].bgImage, import.meta.url)})`;
      } else if (this.modes.default) {
        return `url(${new URL(this.modes.default.bgImage, import.meta.url)})`;
      }
      return "";
    },
    availableModes() {
      if (!this.modes) return [];
      return Object.keys(this.modes).filter(name =>
          name !== this.mode && name !== 'default'
      );
    },
    currentTitleStyle() {
      const modeContent = this.modes[this.mode] || this.modes.default;
      return {
        color: modeContent && modeContent.titleColor ? modeContent.titleColor : "#000000"
      };
    },
    currentParagraphStyle() {
      const modeContent = this.modes[this.mode] || this.modes.default;
      return {
        color: modeContent && modeContent.paragraphsColor ? modeContent.paragraphsColor : "#000000"
      };
    },
    // Set content panel order based on desired text position
    contentOrder() {
      // Default to left if textPosition is not defined
      const textPos = this.modes[this.mode]?.textPosition || 'left';
      return textPos === 'left' ? 0 : 1;
    },
    // Set button panel order accordingly
    buttonOrder() {
      // When textPosition is left, buttons appear on the right (order 1)
      const textPos = this.modes[this.mode]?.textPosition || 'left';
      return textPos === 'left' ? 1 : 0;
    }
  },
  methods: {
    setMode(newMode) {
      console.log('Setting mode to:', newMode);
      this.mode = newMode;
    }
  }
};
</script>

<style scoped>
.contact-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 2.4rem;
}

.panner-content {
  background: var(--backgroundDarkTranslucent);
  padding: 1.2rem;
  padding-top: 5%;          /* Top buffer */
  box-sizing: border-box;
  flex: 0.4;
  overflow: auto;
  align-self: flex-start;   /* Align to top */
}

.panner-button-panel {
  flex: 0.15;
  background: var(--backgroundDarkTranslucent);
  padding: 1.2rem;
  box-sizing: border-box;
  align-self: flex-start;   /* Align to top */
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h1, h2 {
  margin: 1.2rem;
  text-align: center;
}

.pan-bg-slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100vw;
  animation: panBackground 30s linear infinite;
}

@keyframes panBackground {
  0% {
    background-position: 0% 50%;
  }
  10% {
    background-position: 0% 50%;
  }
  20% {
    background-position: 50% 50%;
  }
  30% {
    background-position: 50% 50%;
  }
  40% {
    background-position: 100% 50%;
  }
  60% {
    background-position: 100% 50%;
  }
  70% {
    background-position: 50% 50%;
  }
  80% {
    background-position: 50% 50%;
  }
  90% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.panner-content p {
  font-size: large;
  margin-bottom: 1.2rem;
}

.panner-button {
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  cursor: pointer;
  transition: filter 0.3s ease;
  z-index: 3;
}

.panner-button:hover {
  filter: brightness(0.9);
}

.panner-reset-button {
  background-color: var(--button-text-color);
  color: var(--button-bg-color);
}

@media (max-width: 768px) {
  .contact-wrapper {
    flex-direction: column;
    height: 100vh;
    position: relative;
    justify-content: flex-start;
    padding-bottom: 0;
  }

  .panner-content {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
    order: unset !important;
  }

  .panner-button-panel {
    width: 100%;
    background: var(--backgroundDarkTranslucent);
    padding: 0.8rem;
    order: unset !important;
  }

  .buttons-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }

  .panner-button {
    flex-grow: 1;
    max-width: 45%;
    font-size: 1rem;
    padding: 8px 12px;
  }

  .buttons-legend {
    margin: 0.5rem 0;
  }
}
</style>