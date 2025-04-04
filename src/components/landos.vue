<template>
  <div class="slide-wrapper">
    <img src="../assets/img/landos_logo_glow.png" alt="Land OS logo" class="landos-logo"/>

    <div
        id="optimizationEngine"
        class="landos-circle"
        :class="{ active: engines.optimizationEngine }"
        :style="engineStyle('optimizationEngine', top)"
        @click="toggleEngine('optimizationEngine')"
    >
      <h2>Optimization Engine</h2>
      <p>
        Analyzes all interactions within the biorome and builds a predictive model to optimize operations.
      </p>
      <button v-if="engines.optimizationEngine" @click.stop="connect('optimizationEngine')">Connect</button>
    </div>
    <!-- Connection message for Optimization Engine -->
    <div v-if="connectionText.optimizationEngine" class="connect-message optimization">
      Operational parameters for automated field execution
    </div>

    <div
        id="operationsEngine"
        class="landos-circle"
        :class="{ active: engines.operationsEngine }"
        :style="engineStyle('operationsEngine', right)"
        @click="toggleEngine('operationsEngine')"
    >
      <h2>Operations Engine</h2>
      <p>
        Executes field operations by managing robotic modules and implementing the AI’s parameters.
      </p>
      <button v-if="engines.operationsEngine" @click.stop="connect('operationsEngine')">Connect</button>
    </div>
    <!-- Connection message for Operations Engine -->
    <div v-if="connectionText.operationsEngine" class="connect-message operations">
      System status and field data
    </div>

    <div
        id="analyticsEngine"
        class="landos-circle"
        :class="{ active: engines.analyticsEngine }"
        :style="engineStyle('analyticsEngine', left)"
        @click="toggleEngine('analyticsEngine')"
    >
      <h2>Analytics Engine</h2>
      <p>
        Aggregates and normalizes data from biorome sensors, external sources (market, weather, regulations), and
        ecosystem engineers&apos; inputs.
      </p>
      <button v-if="engines.analyticsEngine" @click.stop="connect('analyticsEngine')">Connect</button>
    </div>
    <!-- Connection message for Analytics Engine -->
    <div v-if="connectionText.analyticsEngine" class="connect-message analytics">
      Processed data and expert inputs
    </div>

    <svg class="svg-overlay">
      <path
          v-for="(arrow, index) in arrows"
          :key="index"
          :d="`M${arrow.x1},${arrow.y1} Q${arrow.cx},${arrow.cy} ${arrow.x2},${arrow.y2}`"
          stroke="#00bcd4"
          stroke-width="8"
          fill="none"
          :marker-end="`url(#arrowhead-${index})`"
          class="animated-arrow"
      />
      <defs>
        <marker
            v-for="(arrow, index) in arrows"
            :key="index"
            :id="`arrowhead-${index}`"
            markerWidth="8"
            markerHeight="8"
            refX="0"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
        >
          <polygon
              points="0 0, 8 4, 0 8"
              fill="#00bcd4"
              class="fade-in-marker"
          />
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "LandOS",
  data() {
    return {
      top: "top: 5vh;",
      left: "left: 5vw; bottom: 5vh;",
      right: "right: 5vw; bottom: 5vh;",
      engines: {
        optimizationEngine: false,
        operationsEngine: false,
        analyticsEngine: false
      },
      connectionText: {
        optimizationEngine: false,
        operationsEngine: false,
        analyticsEngine: false
      },
      arrows: []  // Array to store arrow objects
    };
  },
  methods: {
    // Toggle the given engine without clearing others.
    toggleEngine(engine) {
      this.engines[engine] = !this.engines[engine];
    },
    engineStyle(engine, defaultStyle) {
      if (this.engines[engine]) {
        return `${defaultStyle} height:50vh; width:50vh;`;
      }
      return defaultStyle;
    },
    connect(engine) {
      console.log(engine);
      const fromEl = this.$el.querySelector(`#${engine}`);
      const nextEngineMap = {
        optimizationEngine: "operationsEngine",
        operationsEngine: "analyticsEngine",
        analyticsEngine: "optimizationEngine"
      };
      const nextEngine = nextEngineMap[engine];
      const toEl = this.$el.querySelector(`#${nextEngine}`);
      console.log(fromEl, toEl);

      // Set connection message on so it persists
      this.connectionText[engine] = true;
      // Collapse engine immediately
      this.engines[engine] = false;

      // Wait for the transition to complete
      this.$nextTick(() => {
        // ...
        setTimeout(() => {
          if (fromEl && toEl && window.innerWidth > 768) {
            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();
            // Calculate centers for endpoints
            const fromCenterX = fromRect.left + fromRect.width / 2;
            const fromCenterY = fromRect.top + fromRect.height / 2;
            const toCenterX = toRect.left + toRect.width / 2;
            const toCenterY = toRect.top + toRect.height / 2;
            const dx = toCenterX - fromCenterX;
            const dy = toCenterY - fromCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Define the radius and margin for shortening the line
            const radius = fromRect.width / 2;
            const margin = 10;
            const startX = fromCenterX + (dx / distance) * (radius + margin);
            const startY = fromCenterY + (dy / distance) * (radius + margin);
            const endX = toCenterX - (dx / distance) * (radius + margin);
            const endY = toCenterY - (dy / distance) * (radius + margin);
            const svgElement = this.$el.querySelector(".svg-overlay");
            const svgRect = svgElement.getBoundingClientRect();
            // Adjust coordinates relative to the SVG element
            const adjustedStartX = startX - svgRect.left;
            const adjustedStartY = startY - svgRect.top;
            const adjustedEndX = endX - svgRect.left;
            const adjustedEndY = endY - svgRect.top;

            // Calculate the control point for a quadratic curve.
            const midX = (adjustedStartX + adjustedEndX) / 2;
            const midY = (adjustedStartY + adjustedEndY) / 2;
            // Perpendicular vector normalized
            const normX = -(adjustedEndY - adjustedStartY) / distance;
            const normY = (adjustedEndX - adjustedStartX) / distance;
            const offset = -60; // Adjust this value for curve strength
            const controlX = midX + normX * offset;
            const controlY = midY + normY * offset;

            // Store the calculated arrow coordinates and control point
            this.arrows.push({
              x1: adjustedStartX,
              y1: adjustedStartY,
              x2: adjustedEndX,
              y2: adjustedEndY,
              cx: controlX,
              cy: controlY
            });
          }
        }, 300);
      });
    }


  }
};
</script>

<style scoped>
.landos-logo {
  margin: 0 auto;
  max-width: 300px;
}

.landos-circle {
  position: absolute;
  background: green;
  color: white;
  padding: 10px;
  border-radius: 50vh;
  height: 25vh;
  width: 25vh;
  text-align: center;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 12;
}

.landos-circle p {
  display: none;
}

.landos-circle.active p {
  display: block;
}

.landos-circle button {
  margin-top: 0.5rem;
}

.connect-message {
  position: absolute;
  background-color: #fff;
  color: #000;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  z-index: 100;
  width: 150px;
}

.connect-message.optimization {
  top: auto;
  right: 0;
}

.connect-message.operations {
  bottom: 5%;
  left: auto;
}

.connect-message.analytics {
  top: auto;
  left: 0;
}

.svg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
}

@keyframes drawLine {
  from {
    stroke-dasharray: 0, 100%;

  }
  to {
    stroke-dasharray: 100%, 0;

  }
}

.animated-arrow {
  animation: drawLine 5s ease-out forwards;
}

/* Define fadeIn animation for marker polygon */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in-marker {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: 1s;
}

@media (max-width: 768px) {
  .landos-logo {
    margin: 2rem auto 1rem auto;
  }

  .landos-circle {
    position: static !important;
    margin: 1rem 0;
    max-width: 90vw !important;
  }

  .connect-message {
    position: static;
    margin-top: 1rem;
    transform: none;
    width: 100%;
    box-sizing: border-box;
  }

  .svg-overlay {
    display: none;
  }
}
</style>