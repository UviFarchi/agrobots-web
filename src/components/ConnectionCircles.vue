<template>
  <div class="slide-wrapper">
    <div
        v-for="(circle, idx) in circles"
        :key="idx"
        :id="circle.id || `circle-${idx}`"
        class="action-circle"
        :class="{ active: expanded[idx] }"
        :style="circleStyle(idx, circle)"
        @click="toggleExpand(idx)"
    >
      <img v-if="circle.img" :src="getImageUrl(circle.img)" alt="" class="circle-image"/>
      <h2 class="circle-title" v-html="circle.title"></h2>
      <p v-html="circle.text"></p>
      <button
          v-if="expanded[idx] && circle.buttonText"
          @click.stop="connect(idx)"
          :style="buttonStyle(circle)"
      >
        {{ circle.buttonText }}
      </button>
    </div>

    <!-- Connection messages -->
    <div
        v-for="(arrow, index) in arrows.filter(a => a && a.connectionText)"
        :key="`arrow-message-${index}`"
        class="connect-message"
        :style="getConnectionTextStyle(arrow)"
    >
      {{ arrow.connectionText }}
    </div>

    <svg class="svg-overlay">
      <path
          v-for="(arrow, idx) in arrows"
          :key="idx"
          :d="`M${arrow.x1},${arrow.y1} Q${arrow.cx},${arrow.cy} ${arrow.x2},${arrow.y2}`"
          :stroke="arrow.color || '#00bcd4'"
          stroke-width="8"
          fill="none"
          :marker-end="`url(#arrowhead-${idx})`"
          class="animated-arrow"
      />
      <defs>
        <marker
            v-for="(arrow, idx) in arrows"
            :key="idx"
            :id="`arrowhead-${idx}`"
            markerWidth="8"
            markerHeight="8"
            refX="0"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
        >
          <polygon
              points="0 0, 8 4, 0 8"
              :fill="arrow.color || '#00bcd4'"
              class="fade-in-marker"
          />
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "ConnectionCircles",
  props: {
    circles: {
      type: Array,
      required: true
    },
    connectMessageBgColor: {
      type: String,
      default: "white"
    },
    connectMessageTextColor: {
      type: String,
      default: "#000"
    },
    connectButtonBgColor: {
      type: String,
      default: "black"
    },
    connectButtonTextColor: {
      type: String,
      default: "white"
    },
    circlesClosedDiameter: {
      type: String,
      default: "35vh"
    },
    circlesOpenDiameter: {
      type: String,
      default: "60vh"
    }
  },
  data() {
    return {
      expanded: {},
      connectionText: {},
      arrows: [],

    };
  },
  created() {
    this.initState();
  },
  watch: {
    circles: {
      handler() {
        this.initState();
      },
      deep: true
    }
  },
  computed: {
    activeConnections() {
      return this.circles
          .map((circle, idx) => ({circle, idx}))
          .filter(item => item.circle.connectionText && this.connectionText[item.idx]);
    }
  },
  methods: {
    initState() {
      const expandedStates = {};
      const textStates = {};
      this.circles.forEach((circleProps, idx) => {
        expandedStates[idx] = circleProps.activeOnStart;
        textStates[idx] = false;
      });
      this.expanded = expandedStates;
      this.connectionText = textStates;
    },
    getImageUrl(img) {
      if (!img) return '';
      return new URL(img, import.meta.url).href;
    },
    getPositionStyle(position) {
      const positions = {
        'top-left': 'top: 5vh; left: 5vw;',
        'top-middle': 'top: 5vh; left: 50%; transform: translateX(-50%);',
        'top-right': 'top: 5vh; right: 5vw;',
        'center-left': 'top: 50%; left: 5vw; transform: translateY(-50%);',
        'center-middle': 'top: 50%; left: 50%; transform: translate(-50%, -50%);',
        'center-right': 'top: 50%; right: 5vw; transform: translateY(-50%);',
        'bottom-left': 'bottom: 5vh; left: 5vw;',
        'bottom-middle': 'bottom: 5vh; left: 50%; transform: translateX(-50%);',
        'bottom-right': 'bottom: 5vh; right: 5vw;'
      };
      return positions[position] || positions['center-middle'];
    },
    circleStyle(idx, circle) {
      let style = this.getPositionStyle(circle.position);
      if (this.expanded[idx]) {
        style += ' height:' + this.circlesOpenDiameter + '; width:' + this.circlesOpenDiameter + ';  z-index:100;';
      } else {
        style += ' height:' + this.circlesClosedDiameter + '; width:' + this.circlesClosedDiameter + ';';
      }
      if (circle.bgColor) {
        style += ` background-color: ${circle.bgColor};`;
      }
      if (circle.borderColor && circle.borderWidth) {
        style += ` outline-color: ${circle.borderColor}; outline-width: ${circle.borderWidth}px; outline-style: solid;`;
      }
      if (circle.textColor) {
        style += ` color: ${circle.textColor};`;
      }
      return style;
    },
    buttonStyle(circle) {
      const bgColor = circle.buttonBgColor || this.connectButtonBgColor;
      const textColor = circle.buttonTextColor || this.connectButtonTextColor;
      return `background-color: ${bgColor}; color: ${textColor};`;
    },
    getConnectionTextStyle(arrow) {
      if (!arrow || !arrow.textPosition) {
        return {display: 'none'};
      }
      return {
        left: arrow.textPosition.x + 'px',
        top: arrow.textPosition.y + 'px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: this.connectMessageBgColor,
        color: this.connectMessageTextColor
      };
    },
    toggleExpand(idx) {
      if (this.expanded[idx]) {
        const newExpanded = {...this.expanded};
        newExpanded[idx] = false;
        this.expanded = newExpanded;
      } else {
        const newExpanded = {...this.expanded};
        Object.keys(newExpanded).forEach(key => {
          newExpanded[key] = false;
        });
        newExpanded[idx] = true;
        this.expanded = newExpanded;
      }
    },
    connect(idx) {
      const circle = this.circles[idx];
      if (!circle.target) return;
      const targetIdx = this.circles.findIndex(c =>
          c.id === circle.target || c.title === circle.target
      );
      if (targetIdx === -1) return;
      const newExpanded = {...this.expanded};
      newExpanded[idx] = false;
      this.expanded = newExpanded;
      this.$nextTick(() => {
        setTimeout(() => {
          this.drawArrow(idx, targetIdx, circle.arrowColor);
        }, 300);
      });
    },
    drawArrow(fromIdx, toIdx, arrowColor) {
      const fromId = this.circles[fromIdx].id || `circle-${fromIdx}`;
      const toId = this.circles[toIdx].id || `circle-${toIdx}`;
      const fromEl = this.$el.querySelector(`#${fromId}`);
      const toEl = this.$el.querySelector(`#${toId}`);
      if (!fromEl || !toEl || window.innerWidth <= 768) return;
      const svgElement = this.$el.querySelector(".svg-overlay");
      const svgRect = svgElement.getBoundingClientRect();
      const reverseConnection = this.arrows.some(arrow => {
        return this.circles[toIdx].target === this.circles[fromIdx].id ||
            this.circles[toIdx].target === this.circles[fromIdx].title;
      });
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const fromCenterX = fromRect.left + fromRect.width / 2;
      const fromCenterY = fromRect.top + fromRect.height / 2;
      const toCenterX = toRect.left + toRect.width / 2;
      const toCenterY = toRect.top + toRect.height / 2;
      const dx = toCenterX - fromCenterX;
      const dy = toCenterY - fromCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const radius = fromRect.width / 2;
      const curvatureCoefficient = -0.1;
      let startX, startY, endX, endY, curveStrength;
      if (reverseConnection) {
        const startOffsetAngle = angle + Math.PI / 5;
        const endOffsetAngle = angle + Math.PI / 1.25;
        let initialStartX = fromCenterX + Math.cos(startOffsetAngle);
        let initialStartY = fromCenterY + Math.sin(startOffsetAngle);
        let initialEndX = toCenterX + Math.cos(endOffsetAngle);
        let initialEndY = toCenterY + Math.sin(endOffsetAngle);
        const fromRadius = fromRect.width / 2;
        const fromRadialDist = Math.sqrt(Math.pow(initialStartX - fromCenterX, 2) + Math.pow(initialStartY - fromCenterY, 2));
        const fromScale = fromRadius / fromRadialDist;
        startX = fromCenterX + (initialStartX - fromCenterX) * fromScale;
        startY = fromCenterY + (initialStartY - fromCenterY) * fromScale;
        const toRadius = toRect.width / 2;
        const toRadialDist = Math.sqrt(Math.pow(initialEndX - toCenterX, 2) + Math.pow(initialEndY - toCenterY, 2));
        const toScale = toRadius / toRadialDist;
        endX = toCenterX + (initialEndX - toCenterX) * toScale;
        endY = toCenterY + (initialEndY - toCenterY) * toScale;
        curveStrength = distance * -curvatureCoefficient;
      } else {
        startX = fromCenterX + (dx / distance) * radius;
        startY = fromCenterY + (dy / distance) * radius;
        endX = toCenterX - (dx / distance) * radius;
        endY = toCenterY - (dy / distance) * radius;
        curveStrength = distance * curvatureCoefficient;
      }
      const adjustedStartX = startX - svgRect.left;
      const adjustedStartY = startY - svgRect.top;
      const adjustedEndX = endX - svgRect.left;
      const adjustedEndY = endY - svgRect.top;
      const midX = (adjustedStartX + adjustedEndX) / 2;
      const midY = (adjustedStartY + adjustedEndY) / 2;
      const perpAngle = angle + Math.PI / 2;
      const controlX = midX + Math.cos(perpAngle) * curveStrength;
      const controlY = midY + Math.sin(perpAngle) * curveStrength;
      this.arrows.push({
        x1: adjustedStartX,
        y1: adjustedStartY,
        x2: adjustedEndX,
        y2: adjustedEndY,
        cx: controlX,
        cy: controlY,
        color: arrowColor,
        connectionText: this.circles[fromIdx].connectionText,
        textPosition: {
          x: midX + Math.cos(perpAngle) * (curveStrength / 2),
          y: midY + Math.sin(perpAngle) * (curveStrength / 2)
        }
      });
    }
  }
};
</script>

<style scoped>
.action-circle {
  position: absolute;
  background: none;
  color: white;
  padding: 1.2rem;
  border-radius: 100%;
  text-align: center;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-sizing: border-box;
  z-index: 12;
  outline-offset: -15px;
  outline-style: none;
}

.action-circle img {
  height: auto;
  width: 100%;
}

.action-circle p {
  display: none;
  margin-top: 1.2rem;
}

@keyframes fadeInText {
  0%, 99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.action-circle.active p {
  display: block;
  animation: fadeInText 0.3s forwards;
  padding: 1.2rem;
}

.action-circle button {
  margin-top: 2rem;
  height: 2rem;
  width: 50%;
  border-radius: 0.5rem;
}

.connect-message {
  position: absolute;
  padding: 0.75rem;
  border-radius: 0.5rem;
  z-index: 90;
  width: 15vw;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
}

.svg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
  overflow: hidden;
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
  .action-circle {
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
    font-size: 1.2rem;
  }

  .svg-overlay {
    display: none;
  }
}

.circle-title {
  margin-top: 1.2rem;
}
</style>