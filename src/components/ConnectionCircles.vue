<template>
  <section class="connection-shell">
    <h1 v-if="title && hubIndex === -1" class="system-title">{{ title }}</h1>

    <div class="system-stage">
      <article
        v-for="(circle, idx) in circles"
        :key="circle.id || idx"
        :id="circle.id || `circle-${idx}`"
        class="action-circle"
        :class="{ active: expanded[idx], connected: isCircleConnected(idx), hub: isHubCircle(idx), 'has-image': !!circle.img }"
        :style="circleStyle(idx, circle)"
        :role="isHubCircle(idx) ? undefined : 'button'"
        :tabindex="isHubCircle(idx) ? undefined : 0"
        :aria-expanded="isHubCircle(idx) ? undefined : (expanded[idx] ? 'true' : 'false')"
        @click="handleCircleSelect(idx)"
        @keydown.enter.prevent="handleCircleSelect(idx)"
        @keydown.space.prevent="handleCircleSelect(idx)"
      >
        <div v-if="circle.img" class="circle-image-wrap">
          <img :src="getImageUrl(circle.img)" alt="" class="circle-image" />
        </div>

        <h2 class="circle-title" v-html="circle.title"></h2>

        <p
          v-if="circle.text"
          class="circle-text"
          :class="{ visible: expanded[idx] || isHubCircle(idx) }"
          v-html="circle.text"
        ></p>

        <button
          v-if="expanded[idx] && circle.buttonText && canConnect(circle) && !isHubCircle(idx)"
          type="button"
          class="circle-button"
          @click.stop="connect(idx)"
        >
          <span>{{ circle.buttonText }}</span>
          <span aria-hidden="true">→</span>
        </button>
      </article>

      <div
        v-for="(arrow, index) in connectionMessages"
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
          pathLength="100"
          :stroke="arrow.color || '#00bcd4'"
          stroke-width="3.5"
          stroke-linecap="round"
          fill="none"
          class="animated-arrow"
        />
      </svg>
    </div>
  </section>
</template>

<script>
const POSITION_STYLES = {
  'top-left': { top: '6%', left: '4%' },
  'top-middle': { top: '6%', left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: '6%', right: '4%' },
  'center-left': { top: '50%', left: '4%', transform: 'translateY(-50%)' },
  'center-middle': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  'center-right': { top: '50%', right: '4%', transform: 'translateY(-50%)' },
  'center-bottom': { top: '72%', left: '50%', transform: 'translate(-50%, -50%)' },
  'bottom-left': { bottom: '6%', left: '4%' },
  'bottom-middle': { bottom: '6%', left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: '6%', right: '4%' }
};

const POSITION_ANCHORS = {
  'top-left': { x: 0.04, y: 0.06 },
  'top-middle': { x: 0.5, y: 0.06 },
  'top-right': { x: 0.96, y: 0.06 },
  'center-left': { x: 0.04, y: 0.5 },
  'center-middle': { x: 0.5, y: 0.5 },
  'center-right': { x: 0.96, y: 0.5 },
  'center-bottom': { x: 0.5, y: 0.72 },
  'bottom-left': { x: 0.04, y: 0.94 },
  'bottom-middle': { x: 0.5, y: 0.94 },
  'bottom-right': { x: 0.96, y: 0.94 }
};

export default {
  name: "ConnectionCircles",
  props: {
    title: { type: String, required: true },
    currentSlideIndex: {
      type: Number,
      default: 0
    },
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
      connected: {},
      arrows: [],
      connections: []
    };
  },
  created() {
    this.initState();
  },
  mounted() {
    window.addEventListener('resize', this.resetVisualConnections);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resetVisualConnections);
  },
  watch: {
    circles: {
      handler() {
        this.initState();
      },
      deep: true
    },
    currentSlideIndex() {
      this.initState();
    }
  },
  computed: {
    hubIndex() {
      return this.circles.findIndex((circle) =>
        circle.position === 'center-middle' || circle.position === 'center-bottom'
      );
    },
    connectionMessages() {
      return this.arrows.filter((arrow) => arrow && arrow.connectionText);
    }
  },
  methods: {
    initState() {
      const expandedStates = {};
      const connectedStates = {};
      this.circles.forEach((circleProps, idx) => {
        const isHub = idx === this.hubIndex;
        expandedStates[idx] = isHub ? false : !!circleProps.activeOnStart;
        connectedStates[idx] = isHub ? false : !!circleProps.activeOnStart;
      });
      this.expanded = expandedStates;
      this.connected = connectedStates;
      this.connections = [];
      this.arrows = [];
    },
    isHubCircle(idx) {
      return idx === this.hubIndex;
    },
    canConnect(circle) {
      return !!(circle.target || circle.closeAllOnConnect);
    },
    collapseAllCircles() {
      const next = {};
      this.circles.forEach((circle, index) => {
        next[index] = false;
      });
      return next;
    },
    resetVisualConnections() {
      if (window.innerWidth <= 900) {
        this.arrows = [];
        return;
      }
      this.$nextTick(() => {
        this.rebuildArrows();
      });
    },
    getImageUrl(img) {
      if (!img) return '';
      return new URL(img, import.meta.url).href;
    },
    getPositionStyle(position) {
      return POSITION_STYLES[position] || POSITION_STYLES['center-middle'];
    },
    getPositionAnchor(position, stageRect) {
      const anchor = POSITION_ANCHORS[position] || POSITION_ANCHORS['center-middle'];
      return {
        x: stageRect.width * anchor.x,
        y: stageRect.height * anchor.y
      };
    },
    circleStyle(idx, circle) {
      const isActive = !!this.expanded[idx];
      const isConnected = !!this.connected[idx];
      const isHub = this.isHubCircle(idx);

      if (isHub) {
        return {
          ...this.getPositionStyle(circle.position),
          width: 'min(28rem, 44vw)',
          minHeight: '0',
          height: 'auto',
          zIndex: 10,
          background: 'transparent',
          borderColor: 'transparent',
          color: circle.textColor || '#ffffff',
          '--circle-accent': circle.arrowColor || circle.borderColor || 'var(--primary, #0b874b)',
          '--circle-button-bg': circle.buttonBgColor || this.connectButtonBgColor,
          '--circle-button-text': circle.buttonTextColor || this.connectButtonTextColor,
          '--circle-state-lift': '0px'
        };
      }

      const size = isActive
        ? `min(${this.circlesOpenDiameter}, 30rem)`
        : `min(${this.circlesClosedDiameter}, 16rem)`;

      return {
        ...this.getPositionStyle(circle.position),
        width: size,
        height: size,
        minHeight: size,
        zIndex: isActive ? 34 : isConnected ? 20 : 12,
        background: circle.bgColor || (isHub ? 'rgba(18, 27, 28, 0.96)' : 'var(--backgroundDarkTranslucent, rgba(33,33,33,0.93))'),
        borderColor: isActive || isConnected
          ? (circle.borderColor || 'rgba(255,255,255,0.28)')
          : (circle.borderColor || 'rgba(255,255,255,0.14)'),
        color: circle.textColor || '#ffffff',
        '--circle-accent': circle.arrowColor || circle.borderColor || 'var(--primary, #0b874b)',
        '--circle-button-bg': circle.buttonBgColor || this.connectButtonBgColor,
        '--circle-button-text': circle.buttonTextColor || this.connectButtonTextColor,
        '--circle-state-lift': isActive ? '-4px' : isConnected ? '-2px' : '0px'
      };
    },
    isCircleConnected(idx) {
      return !this.isHubCircle(idx) && !!this.connected[idx];
    },
    handleCircleSelect(idx) {
      if (this.isHubCircle(idx)) return;
      this.toggleExpand(idx);
    },
    toggleExpand(idx) {
      const next = this.collapseAllCircles();
      next[idx] = !this.expanded[idx];
      this.expanded = next;
    },
    findTargetIndex(circle) {
      return this.circles.findIndex((candidate) =>
        candidate.id === circle.target || candidate.title === circle.target
      );
    },
    connect(idx) {
      const circle = this.circles[idx];
      const targetIdx = this.findTargetIndex(circle);
      if (targetIdx === -1 && !circle.closeAllOnConnect) return;

      const autoCollapseOnArrival = !!this.circles[targetIdx]?.autoCollapseOnArrival;
      const next = this.collapseAllCircles();

      if (targetIdx !== -1) {
        const closesLoop = this.isCircleConnected(targetIdx);
        if (!closesLoop && !autoCollapseOnArrival && !circle.closeAllOnConnect) {
          next[targetIdx] = true;
        }
      }

      this.expanded = next;
      this.connected = {
        ...this.connected,
        [idx]: true,
        ...(targetIdx !== -1 ? { [targetIdx]: true } : {})
      };

      if (targetIdx !== -1) {
        this.registerConnection(idx, targetIdx, circle.arrowColor);
      }

      this.$nextTick(() => {
        setTimeout(() => {
          this.rebuildArrows();
        }, 140);
      });
    },
    registerConnection(fromIdx, toIdx, arrowColor) {
      const exists = this.connections.some((item) => item.fromIdx === fromIdx && item.toIdx === toIdx);
      if (exists) return;
      this.connections = [
        ...this.connections,
        {
          fromIdx,
          toIdx,
          color: arrowColor || '#00bcd4'
        }
      ];
    },
    edgePoint(rect, dx, dy) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const absDx = Math.abs(dx) || 1;
      const absDy = Math.abs(dy) || 1;
      const scale = 1 / Math.max(absDx / (rect.width / 2), absDy / (rect.height / 2));

      return {
        x: cx + dx * scale,
        y: cy + dy * scale
      };
    },
    offsetPoint(point, dx, dy, distance) {
      if (!distance) return point;
      return {
        x: point.x + (dx / distance),
        y: point.y + (dy / distance)
      };
    },
    getConnectionTextStyle(arrow) {
      const labelPosition = arrow.labelPosition || arrow.textPosition;
      return {
        left: `${labelPosition.x}px`,
        top: `${labelPosition.y}px`,
        transform: 'translate(-50%, -50%)',
        backgroundColor: this.connectMessageBgColor,
        color: this.connectMessageTextColor
      };
    },
    rebuildArrows() {
      if (window.innerWidth <= 900) {
        this.arrows = [];
        return;
      }

      this.arrows = this.connections
        .map((connection) => this.buildArrow(connection.fromIdx, connection.toIdx, connection.color))
        .filter(Boolean);
    },
    buildArrow(fromIdx, toIdx, arrowColor) {
      const fromId = this.circles[fromIdx].id || `circle-${fromIdx}`;
      const toId = this.circles[toIdx].id || `circle-${toIdx}`;
      const fromEl = this.$el.querySelector(`#${fromId}`);
      const toEl = this.$el.querySelector(`#${toId}`);
      const stageEl = this.$el.querySelector('.system-stage');

      if (!fromEl || !toEl || !stageEl || window.innerWidth <= 900) return null;

      const stageRect = stageEl.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const fromCenterX = fromRect.left + fromRect.width / 2;
      const fromCenterY = fromRect.top + fromRect.height / 2;
      const toCenterX = toRect.left + toRect.width / 2;
      const toCenterY = toRect.top + toRect.height / 2;
      const dx = toCenterX - fromCenterX;
      const dy = toCenterY - fromCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const angle = Math.atan2(dy, dx);
      const curveStrengthMultiplier = this.circles[fromIdx].curveStrengthMultiplier || 1;
      const curveStrength = Math.min(distance * 0.12 * curveStrengthMultiplier, 140);
      const overlap = this.circles[fromIdx].endpointOverlap ?? 4;
      const rawStart = this.edgePoint(fromRect, dx, dy);
      const rawEnd = this.edgePoint(toRect, -dx, -dy);
      const start = this.offsetPoint(rawStart, -dx * overlap, -dy * overlap, distance);
      const end = this.offsetPoint(rawEnd, dx * overlap, dy * overlap, distance);

      const adjustedStartX = start.x - stageRect.left;
      const adjustedStartY = start.y - stageRect.top;
      const adjustedEndX = end.x - stageRect.left;
      const adjustedEndY = end.y - stageRect.top;
      const midX = (adjustedStartX + adjustedEndX) / 2;
      const midY = (adjustedStartY + adjustedEndY) / 2;
      const perpAngle = angle + Math.PI / 2;
      const normalX = Math.cos(perpAngle);
      const normalY = Math.sin(perpAngle);
      const messagePosition = this.circles[fromIdx].messagePosition;
      const labelOffsetX = this.circles[fromIdx].labelOffsetX || 0;
      const labelOffsetY = this.circles[fromIdx].labelOffsetY || 0;
      const curveDirection = this.circles[fromIdx].curveDirection || (messagePosition ? 'auto' : 'positive');
      const controlCandidates = [
        {
          x: midX + normalX * curveStrength,
          y: midY + normalY * curveStrength
        },
        {
          x: midX - normalX * curveStrength,
          y: midY - normalY * curveStrength
        }
      ];
      let controlX = controlCandidates[0].x;
      let controlY = controlCandidates[0].y;

      if (curveDirection === 'negative') {
        controlX = controlCandidates[1].x;
        controlY = controlCandidates[1].y;
      } else if (curveDirection === 'auto' && messagePosition) {
        const anchor = this.getPositionAnchor(messagePosition, stageRect);
        const bestCandidate = controlCandidates.reduce((best, candidate) => {
          const bestDistance = Math.hypot(best.x - anchor.x, best.y - anchor.y);
          const candidateDistance = Math.hypot(candidate.x - anchor.x, candidate.y - anchor.y);
          return candidateDistance < bestDistance ? candidate : best;
        });
        controlX = bestCandidate.x;
        controlY = bestCandidate.y;
      }
      const textBias = messagePosition ? 0.58 : 0.42;

      return {
        x1: adjustedStartX,
        y1: adjustedStartY,
        x2: adjustedEndX,
        y2: adjustedEndY,
        cx: controlX,
        cy: controlY,
        color: arrowColor || '#00bcd4',
        connectionText: this.circles[fromIdx].connectionText,
        messagePosition,
        labelPosition: {
          x: midX + ((controlX - midX) * textBias) + labelOffsetX,
          y: midY + ((controlY - midY) * textBias) + labelOffsetY
        },
        textPosition: {
          x: midX + ((controlX - midX) * 0.42),
          y: midY + ((controlY - midY) * 0.42)
        }
      };
    }
  }
};
</script>

<style scoped>
.connection-shell {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-height: 100%;
  padding: 1.2rem 0;
  box-sizing: border-box;
}

.system-title {
  margin: 0;
  font-size: clamp(1.9rem, 2.7vw, 2.9rem);
  line-height: 1.04;
  color: var(--textLight, #f7fff7);
}

.system-stage {
  position: relative;
  flex: 1 1 auto;
  min-height: 42rem;
  overflow: hidden;
}

.action-circle {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.72rem;
  padding: 1.15rem 1.2rem;
  border-radius: 999px;
  border: 1px solid;
  background: rgba(23, 34, 35, 0.92);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  overflow: hidden;
}

.action-circle.hub {
  gap: 0.72rem;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent !important;
  box-shadow: none !important;
  overflow: visible;
  cursor: default;
}

.action-circle.active:not(.hub) {
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding: 1.5rem 1.2rem 1.35rem;
  gap: 0.66rem;
}

.action-circle:hover,
.action-circle.connected,
.action-circle.active {
  transform: translateY(var(--circle-state-lift, -2px));
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
}

.action-circle.connected,
.action-circle.active {
  border-color: rgba(255, 255, 255, 0.22);
}

.action-circle.hub:hover,
.action-circle.hub.connected,
.action-circle.hub.active {
  transform: none;
}

.action-circle::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid color-mix(in srgb, var(--circle-accent) 75%, rgba(255,255,255,0.12));
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.action-circle.connected::after,
.action-circle.active::after {
  opacity: 0.82;
}

.action-circle.hub::after {
  display: none;
}

.circle-image-wrap {
  width: 100%;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-image {
  display: block;
  width: auto;
  max-width: 72%;
  max-height: 3.8rem;
  object-fit: contain;
}

.circle-title {
  margin: 0;
  width: 100%;
  font-size: clamp(1rem, 1.34vw, 1.22rem);
  line-height: 1.22;
  color: inherit;
  overflow-wrap: break-word;
}

.action-circle.hub .circle-title {
  font-size: clamp(1.24rem, 1.9vw, 1.58rem);
  width: min(100%, 25.5rem);
  margin-inline: auto;
}

.action-circle.hub .circle-text {
  width: min(100%, 25.5rem);
  max-width: min(100%, 25.5rem);
}

.action-circle.active:not(.hub) .circle-title {
  width: min(76%, 16rem);
  margin-inline: auto;
}

.circle-text {
  display: none;
  margin: 0;
  width: min(78%, 17rem);
  max-width: min(78%, 17rem);
  min-width: 0;
  flex: 1 1 auto;
  min-height: 0;
  font-size: 0.91rem;
  line-height: 1.54;
  color: rgba(247, 255, 247, 0.8);
  overflow-y: auto;
  overflow-x: hidden;
  overflow-wrap: break-word;
  word-break: normal;
  text-align: center;
  margin-inline: auto;
  padding-right: 0.2rem;
}

.action-circle.active .circle-text,
.circle-text.visible {
  display: block;
}

.action-circle.active:not(.hub) .circle-button {
  align-self: center;
}

.circle-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  margin-top: auto;
  min-width: 9.25rem;
  min-height: 2.5rem;
  padding: 0.64rem 0.88rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
}

.circle-button:hover {
  background: rgba(255, 255, 255, 0.08);
}

.connect-message {
  position: absolute;
  z-index: 25;
  max-width: 14rem;
  padding: 0.46rem 0.62rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  font-size: 0.78rem;
  line-height: 1.32;
  text-align: center;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);
}

.svg-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 18;
  overflow: visible;
}

@keyframes drawLine {
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.animated-arrow {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawLine 1.5s ease-out forwards;
}

@media (max-width: 1100px) {
  .system-stage {
    min-height: 38rem;
  }
}

@media (max-width: 900px) {
  .system-stage {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    min-height: 0;
    overflow: visible;
  }

  .action-circle {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    transform: none !important;
    width: 100% !important;
    min-height: auto !important;
    height: auto !important;
    border-radius: 28px;
    cursor: default;
  }

  .circle-text {
    display: block;
  }

  .circle-button,
  .svg-overlay,
  .connect-message {
    display: none;
  }
}
</style>
