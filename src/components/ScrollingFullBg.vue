<template>
  <div class="panner-wrapper">
    <div v-if="showTitleBox" class="title-instructions">
      <button class="close-title-box" @click="showTitleBox = false" aria-label="Hide info">×</button>
      <h1 :style="currentTitleStyle">{{ modes[mode].title }}</h1>
      <div v-if="instructions" class="instructions-text">{{ instructions }}</div>
      <!-- Mode switcher now here -->
      <div
          v-if="availableModes.length > 0 || mode !== 'default'"
          class="mode-switcher"
      >
        <h2 v-if="buttonsLegend" class="buttons-legend">{{ buttonsLegend }}</h2>
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
    <button
        v-if="!showTitleBox"
        class="show-titlebox-btn"
        @click="showTitleBox = true"
        aria-label="Show info"
    >?</button>

    <div class="hotspot-dock">
      <div
          v-for="hotspot in modes[mode]?.hotspots || []"
          :key="hotspot.id"
          class="scene-hotspot"
          :style="{ left: hotspot.left, top: hotspot.top }"
          @click="showHotspotInfo(hotspot)"
          :class="{ active: activeHotspot && activeHotspot.id === hotspot.id }"
          tabindex="0"
          :aria-label="hotspot.label"
          @keyup.enter="showHotspotInfo(hotspot)"
      ></div>
    </div>
    <div
        v-if="activeHotspot"
        class="hotspot-popover"
        :class="'popover-' + popoverDirection"
        :style="{ left: activeHotspot.left, top: activeHotspot.top }"
    >
      <h3>{{ activeHotspot.label }}</h3>
      <p>{{ activeHotspot.info }}</p>
      <button @click="activeHotspot = null" aria-label="Close">×</button>
    </div>
    <div class="pan-bg-slide" :style="{ 'background-image': currentBgImage }"></div>
  </div>
</template>

<script>
export default {
  name: "ScrollingFullBg",
  props: {
    title: {type: String, required: true},
    instructions: {type: String, default: ""},
    currentSlideIndex: {type: Number, default: 0},
    modes: {type: Object, required: true},
    buttonsLegend: {type: String, required: true},
    defaultButtonLabel: {type: String, default: "Back"},
    buttonBgColor: {type: String, default: "#cccccc"},
    buttonTextColor: {type: String, default: "#1e1e1e"},
    buttonOrder: Number
  },
  data() {
    return {
      mode: "default",
      activeHotspot: null,
      showTitleBox: true,
    };
  },
  mounted() {
    const firstHotspot =
        (this.modes[this.mode]?.hotspots || []).find(hs => hs.openOnStart);
    if (firstHotspot) this.activeHotspot = firstHotspot;
  },
  watch: {
    mode(newMode) {
      const firstHotspot =
          (this.modes[newMode]?.hotspots || []).find(hs => hs.openOnStart);
      this.activeHotspot = firstHotspot || null;
    }
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
        return `url(${this.modes[this.mode].bgImage})`;
      } else if (this.modes.default) {
        return `url(${this.modes.default.bgImage})`;
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
    popoverDirection() {
      if (!this.activeHotspot || !this.activeHotspot.top) return 'down';
      let t = this.activeHotspot.top;
      if (typeof t === "string" && t.endsWith("%")) t = parseFloat(t);
      else if (typeof t === "string" && t.endsWith("px")) t = (parseFloat(t) / window.innerHeight) * 100;
      return t >= 50 ? "up" : "down";
    }
  },
  methods: {
    setMode(newMode) {
      this.mode = newMode;
      const firstHotspot =
          (this.modes[newMode]?.hotspots || []).find(hs => hs.openOnStart);
      this.activeHotspot = firstHotspot || null;
    },
    showHotspotInfo(hotspot) {
      this.activeHotspot = hotspot;
    }
  }
};
</script>

<style scoped>
.panner-wrapper {
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: flex-start;
  position: relative;
  height: 100%;
  flex: 1;
  overflow: hidden;
}

.title-instructions {
  position: absolute;
  left: 5vw;
  top: 2vw;
  z-index: 12;
  background: var(--backgroundDarkTranslucent, rgba(30, 30, 30, 0.9));
  border-radius: 14px;
  padding: 1.5rem 2.2rem 1.1rem 2.2rem;
  box-shadow: 0 8px 32px #0004;
  min-width: 230px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.mode-switcher {
  margin-top: 1.1rem;
  margin-bottom: 0.1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.buttons-container {
  display: flex;
  gap: 10px;
  margin-top: 0.2em;
}
.panner-button {
  font-size: 1.15rem;
  padding: 0.47em 1.25em;
  border: none;
  border-radius: 5px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  cursor: pointer;
  transition: filter 0.3s ease;
  z-index: 3;
  font-weight: 500;
}
.panner-button:hover {
  filter: brightness(0.92);
}
.panner-reset-button {
  background-color: var(--button-text-color);
  color: var(--button-bg-color);
}

.close-title-box {
  position: absolute;
  right: 12px;
  top: 12px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 13;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.close-title-box:hover { opacity: 1; }

.show-titlebox-btn {
  position: absolute;
  left: 2vw;
  top: 2vw;
  z-index: 13;
  background: var(--accent, #ffe75a);
  color: var(--backgroundDark, #222);
  font-weight: bold;
  font-size: 1.45rem;
  border: none;
  border-radius: 50%;
  width: 2.4em;
  height: 2.4em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0004;
  cursor: pointer;
  opacity: 0.88;
  transition: opacity 0.15s;
}
.show-titlebox-btn:hover { opacity: 1; }

.instructions-text {
  font-size: 1.08rem;
  color: #e0e0e0bb;
  font-style: italic;
  margin: 0.2em 0 0 0;
  letter-spacing: 0.01em;
  padding: 0;
}

.scene-hotspot {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: radial-gradient(circle, #fffbe2 60%, #ffe75a 90%, #f3c80040 100%);
  box-shadow: 0 0 16px 4px #ffe75a80, 0 0 0 2px #fff;
  cursor: pointer;
  z-index: 10;
  animation: pulse-hotspot 1.2s infinite alternate;
  transform: translate(-50%, -50%);
  border: 2.2px solid #fff3;
  outline: none;
}

.scene-hotspot.active, .scene-hotspot:focus {
  box-shadow: 0 0 32px 10px #ffe75acc, 0 0 0 4px #fff8;
  border-color: #ffe75a;
  filter: brightness(1.22) drop-shadow(0 0 10px #ffeb3b);
}

@keyframes pulse-hotspot {
  from {
    box-shadow: 0 0 12px 2px #ffe75a60, 0 0 0 1px #fff;
  }
  to {
    box-shadow: 0 0 24px 8px #ffe75a99, 0 0 0 3px #fff;
  }
}

.hotspot-popover {
  position: absolute;
  z-index: 20;
  width: 30vw;
  min-width: 220px;
  max-width: 450px;
  background: rgba(30, 30, 30, 0.94);
  color: #fff;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  box-shadow: 0 8px 32px #0006;
  font-size: 1.04rem;
  animation: popIn 0.25s cubic-bezier(.42, 0, .58, 1.11);
  left: var(--left, 50%);
  top: var(--top, 50%);
  /* default up */
  transform: translate(-50%, 0%) translateY(-120%);
}
.hotspot-popover.popover-up {
  transform: translate(-50%, 0%) translateY(-120%);
}
.hotspot-popover.popover-down {
  transform: translate(-50%, 0%) translateY(30%);
}
@keyframes popIn {
  0% {
    transform: translate(-50%, 0%) scale(0.7);
  }
  80% {
    transform: translate(-50%, 0%) scale(1.07);
  }
  100% {
    transform: translate(-50%, 0%) scale(1);
  }
}
.hotspot-popover button {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.4em;
  float: right;
  cursor: pointer;
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
  0% { background-position: 0% 50%; }
  10% { background-position: 0% 50%; }
  20% { background-position: 50% 50%; }
  30% { background-position: 50% 50%; }
  40% { background-position: 100% 50%; }
  60% { background-position: 100% 50%; }
  70% { background-position: 50% 50%; }
  80% { background-position: 50% 50%; }
  90% { background-position: 0% 50%; }
  100% { background-position: 0% 50%; }
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .panner-wrapper {
    flex-direction: column;
    height: 100vh;
    position: relative;
    justify-content: flex-start;
    padding-bottom: 0;
    overflow: scroll;
    display: flex;
  }
  .title-instructions {
    position: static;
    left: unset;
    top: unset;
    max-width: 97vw;
    width: 97vw;
    margin: 1.2rem auto 0 auto;
    padding: 1.2rem 0.6rem 0.7rem 0.6rem;
  }
  .show-titlebox-btn {
    left: 8px !important;
    top: 8px !important;
    width: 2.1em;
    height: 2.1em;
    font-size: 1.18rem;
  }
  .mode-switcher, .buttons-container {
    flex-direction: row !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    margin-top: 0.8em;
    margin-bottom: 0.2em;
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
  .scene-hotspot {
    position: static !important;
    margin: 0 12px;
    transform: none !important;
    z-index: 50;
    width: 40px;
    height: 40px;
  }
  .hotspot-dock {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 20vh;
    width: 100vw;
    z-index: 50;
    background: none;
    pointer-events: none;
  }
  .hotspot-dock .scene-hotspot {
    pointer-events: auto;
  }
  .scene-hotspot:not(.hotspot-dock .scene-hotspot) {
    display: none !important;
  }
  .hotspot-popover {
    position: fixed !important;
    left: 50vw !important;
    bottom: 30vh !important;
    top: unset !important;
    right: unset !important;
    transform: translateX(-50%) !important;
    width: 90vw;
    min-width: 0;
    max-width: 97vw;
    z-index: 99;
    border-radius: 14px;
    padding: 1.1rem 1.2rem;
  }
  .hotspot-popover.popover-up {
    transform: translate(-50%, 0%) translateY(-110%);
  }
  .hotspot-popover.popover-down {
    transform: translate(-50%, 0%) translateY(36%);
  }
  .close-title-box {
    right: 20px;
    top: 20px;
  }
}
</style>
