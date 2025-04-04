<template>
  <div class="slide-wrapper">
    <!-- Circle 1: Top -->
    <div
        v-if="currentStep >= 1"
        class="circle-base circle-top"
        :class="{ 'circle-expanded': activeStep === 1 }"
        @click="expandCircle(1)"
        ref="circle1"
    >
      <h2 class="circle-title">Design</h2>
      <p v-if="activeStep === 1" class="circle-content">
        We study the terrain in detail, analyzing soil health, climate data, and local biodiversity.
      </p>
      <div
          v-if="activeStep === 1 && currentStep < 4"
          class="circle-next"
          @click.stop="showNext"
      >
        Next Step
      </div>
    </div>

    <!-- Circle 2: Right -->
    <div
        v-if="currentStep >= 2"
        class="circle-base circle-right"
        :class="{ 'circle-expanded': activeStep === 2 }"
        @click="expandCircle(2)"
        ref="circle2"
    >
      <h2 class="circle-title">Deployment</h2>
      <p v-if="activeStep === 2" class="circle-content">
        We install sensors and modular robotics, then introduce seeds and beneficial insects.
      </p>
      <div
          v-if="activeStep === 2 && currentStep < 4"
          class="circle-next"
          @click.stop="showNext"
      >
        Next Step
      </div>
    </div>

    <!-- Circle 3: Bottom -->
    <div
        v-if="currentStep >= 3"
        class="circle-base circle-bottom"
        :class="{ 'circle-expanded': activeStep === 3 }"
        @click="expandCircle(3)"
        ref="circle3"
    >
      <h2 class="circle-title">Operations</h2>
      <p v-if="activeStep === 3" class="circle-content">
        Land OS coordinates daily tasks—irrigation, feeding, pest control—using real-time data.
      </p>
      <div
          v-if="activeStep === 3 && currentStep < 4"
          class="circle-next"
          @click.stop="showNext"
      >
        Next Step
      </div>
    </div>

    <!-- Circle 4: Left -->
    <div
        v-if="currentStep >= 4"
        class="circle-base circle-left"
        :class="{ 'circle-expanded': activeStep === 4 }"
        @click="expandCircle(4)"
        ref="circle4"
    >
      <h2 class="circle-title">Optimization</h2>
      <p v-if="activeStep === 4" class="circle-content">
        Over time, the system grows smarter. AI refines its parameters every day.
      </p>
      <div
          v-if="activeStep === 4 && !showMessage"
          class="circle-next"
          @click.stop="showFeedback"
      >
        Next Step
      </div>
    </div>

    <!-- Final text box outside the last circle -->
    <div
        v-if="showMessage"
        class="feedback-loop"
    >
      <p>
        <strong>Operations & Optimization</strong> form a continuous feedback loop.
      </p>
    </div>

    <!-- SVG Overlay for Arrows -->
    <svg class="svg-overlay" v-if="showMessage">
      <defs>
        <marker
            id="arrowhead"
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
      <path
          v-if="arrow1"
          :d="arrow1.path"
          class="animated-arrow"
          stroke="#00bcd4"
          stroke-width="2"
          marker-end="url(#arrowhead)"
          fill="none"
      />
      <path
          v-if="arrow2"
          :d="arrow2.path"
          class="animated-arrow"
          stroke="#00bcd4"
          stroke-width="2"
          marker-end="url(#arrowhead)"
          fill="none"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Process',
  data() {
    return {
      currentStep: 1,
      activeStep: 1,
      showMessage: false,
      arrow1: null,
      arrow2: null
    }
  },
  methods: {
    showNext() {
      if (this.currentStep < 4) {
        this.currentStep++
        this.activeStep = this.currentStep
      }
    },
    expandCircle(step) {
      if (step <= this.currentStep) {
        this.activeStep = step
      }
    },
    showFeedback() {
      this.showMessage = true
      this.activeStep = null
      // Delay the arrow calculation to after the circle collapses
      setTimeout(() => {
        this.calculateArrows();
      }, 500); // Adjust the delay as needed
    },
    calculateArrows() {
      this.calculateArrow1();
      this.calculateArrow2();
    },
    calculateArrow1() {
      const fromEl = this.$refs.circle4; // Optimization
      const toEl = this.$refs.circle3;   // Operations
      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        // Define corners
        const fromCorner = {
          x: fromRect.left + fromRect.width, // middle right
          y: fromRect.top + fromRect.height / 2 // middle
        };
        const toCorner = {
          x: toRect.left + toRect.width / 2, // middle
          y: toRect.top // top
        };

        const svgElement = this.$el.querySelector(".svg-overlay");
        const svgRect = svgElement.getBoundingClientRect();

        let adjustedStartX = fromCorner.x - svgRect.left;
        let adjustedStartY = fromCorner.y - svgRect.top;
        let adjustedEndX = toCorner.x - svgRect.left;
        let adjustedEndY = toCorner.y - svgRect.top;

        // Shorten the line
        const margin = 20; // Adjust as needed
        const dx = adjustedEndX - adjustedStartX;
        const dy = adjustedEndY - adjustedStartY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        adjustedStartX += (dx / distance) * margin;
        adjustedStartY += (dy / distance) * margin;
        adjustedEndX -= (dx / distance) * margin;
        adjustedEndY -= (dy / distance) * margin;

        const dx2 = adjustedEndX - adjustedStartX;
        const dy2 = adjustedEndY - adjustedStartY;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const midX = (adjustedStartX + adjustedEndX) / 2;
        const midY = (adjustedStartY + adjustedEndY) / 2;
        const normX = -(adjustedEndY - adjustedStartY) / distance2;
        const normY = (adjustedEndX - adjustedStartX) / distance2;
        const offset = -60;
        const controlX = midX + normX * offset;
        const controlY = midY + normY * offset;

        const path = `M${adjustedStartX},${adjustedStartY} Q${controlX},${controlY} ${adjustedEndX},${adjustedEndY}`;
        this.arrow1 = {
          path: path
        };
      }
    },
    calculateArrow2() {
      const fromEl = this.$refs.circle3; // Operations
      const toEl = this.$refs.circle4;   // Optimization
      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        // Define corners
        const fromCorner = {
          x: fromRect.left, // left
          y: fromRect.top + fromRect.height / 2  // middle
        };
        const toCorner = {
          x: toRect.left + toRect.width / 2, // middle
          y: toRect.top + toRect.height  // bottom
        };

        const svgElement = this.$el.querySelector(".svg-overlay");
        const svgRect = svgElement.getBoundingClientRect();

        let adjustedStartX = fromCorner.x - svgRect.left;
        let adjustedStartY = fromCorner.y - svgRect.top;
        let adjustedEndX = toCorner.x - svgRect.left;
        let adjustedEndY = toCorner.y - svgRect.top;

        // Shorten the line
        const margin = 20; // Adjust as needed
        const dx = adjustedEndX - adjustedStartX;
        const dy = adjustedEndY - adjustedStartY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        adjustedStartX += (dx / distance) * margin;
        adjustedStartY += (dy / distance) * margin;
        adjustedEndX -= (dx / distance) * margin;
        adjustedEndY -= (dy / distance) * margin;

        const dx2 = adjustedEndX - adjustedStartX;
        const dy2 = adjustedEndY - adjustedStartY;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const midX = (adjustedStartX + adjustedEndX) / 2;
        const midY = (adjustedStartY + adjustedEndY) / 2;
        const normX = -(adjustedEndY - adjustedStartY) / distance2;
        const normY = (adjustedEndX - adjustedStartX) / distance2;
        const offset = -60;
        const controlX = midX + normX * offset;
        const controlY = midY + normY * offset;

        const path = `M${adjustedStartX},${adjustedStartY} Q${controlX},${controlY} ${adjustedEndX},${adjustedEndY}`;
        this.arrow2 = {
          path: path
        };
      }
    }
  }
}
</script>

<style scoped>
.circle-base {
  position: absolute;
  width: 25vh;
  height: 25vh;
  border-radius: 50%;
  background: #00bcd4;
  color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s ease;
  text-align: center;
  padding: 0.5rem;
  flex-direction: column;
}

.circle-top {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.circle-right {
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}

.circle-bottom {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.circle-left {
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
}

.circle-expanded {
  width: 50vh;
  height: 50vh;
  border-radius: 50%;
  padding: 1rem;
}

.circle-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.circle-content {
  font-size: 0.9rem;
  line-height: 1.4;
}

.circle-next {
  margin-top: 1rem;
  display: inline-block;
  background: #ffeb3b;
  color: #1e1e1e;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.feedback-loop {
  background: rgba(0, 0, 0, 0.2);
  color: #e0e0e0;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.feedback-loop p {
  margin: 0;
}

.svg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  animation: drawLine 2s ease-out forwards;
}

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
</style>