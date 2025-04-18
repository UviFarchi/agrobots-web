<template>
    <h1 class="slide-title" :style="{ color: slideTitleColor }">
      {{ slideTitle }}
    </h1>
    <p class="slide-intro" :style="{ color: slideIntroColor }">
      {{ slideIntro }}
    </p>
    <div
        class="card-grid"
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(300px, 1fr))` }"
    >
      <div
          v-for="(card, i) in cards"
          :key="i"
          class="flip-card-container"
      >
        <div
            v-if="lockedSet.has(i)"
            class="placeholder"
        ></div>
        <div
            class="flip-card"
            :class="{
            active: lockedSet.has(i) && activeCard !== i,
            initialPosition: activeCard === i
          }"
            :style="activeCard === i ? initialPosition : {}"
            @mouseenter="handleMouseEnter(i)"
            @mouseleave="handleMouseLeave(i)"
            @click="handleClick(i)"
        >
          <div class="flip-card-inner" :class="{ flipped: isFlipped(i) }">
            <div
                class="flip-card-front"
                :style="{
                background: card.frontBg,
                color: card.frontColor,
                border: `1px solid ${card.frontBorder}`
              }"
            >
              <div class="cardIcon">{{ card.icon }}</div>
              <div class="cardTitle">{{ card.title }}</div>
            </div>
            <div
                class="flip-card-back"
                :style="{
                background: card.backBg,
                color: card.backColor,
                border: `1px solid ${card.backBorder}`,
                '--card-bg-color': card.backBg
              }"
            >
              <div class="cardTitle">{{ card.title }}</div>
              <p>{{ card.backText }}</p>
              <span class="read-more">Click to read more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "CardGrid",
  props: {
    currentSlideIndex: {
      type: Number,
      default: 0
    },
    slideTitle: {
      type: String,
      required: true
    },
    slideIntro: {
      type: String,
      required: true
    },
    slideTitleColor: {
      type: String,
      default: "#000000"
    },
    slideIntroColor: {
      type: String,
      default: "#000000"
    },
    columns: {
      type: Number,
      default: 3
    },
    cards: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeCard: null,
      initialPosition: {},
      lockedSet: new Set(),
      hoveredIndex: null
    };
  },
  methods: {
    handleMouseEnter(i) {
      this.hoveredIndex = i;
    },
    handleMouseLeave() {
      this.hoveredIndex = null;
    },
    handleClick(i) {
      // Toggle the card. If already open, remove from lockedSet to close it.
      if (this.lockedSet.has(i)) {
        this.lockedSet.delete(i);
        return;
      }
      const el = document.querySelectorAll('.flip-card')[i];
      const rect = el.getBoundingClientRect();
      this.initialPosition = {
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px'
      };
      this.activeCard = i;
      this.lockedSet.add(i);
      setTimeout(() => {
        this.activeCard = null;
      }, 50);
    },
    isFlipped(i) {
      return this.lockedSet.has(i) || this.hoveredIndex === i;
    }
  }
};
</script>

<style scoped>
.card-grid {
  display: grid;
  gap: 5vh;
  flex: 8;
  position: relative;
  margin: 1.2rem;
}

.flip-card-container {
  position: relative;
  width: 30vh;
  height: 30vh;
  margin: 0 auto;
}

.placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
}

.flip-card {
  perspective: 1000px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transform-origin: center center;
}

@keyframes fadeInText {
  0%, 99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.flip-card.active .flip-card-back p,
.flip-card.active .flip-card-back .read-more {
  animation: fadeInText 0.3s forwards;
}

.flip-card.initialPosition {
  position: fixed;
  transition: none;
  transform: none;
  z-index: 1000;
}

.flip-card.active {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60vh;
  height: 60vh;
  transform: translate(-50%, -50%);
  z-index: 1000;
  transition: all 0.3s ease;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  border-radius: 50%;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
  z-index: 1000;
  position: absolute;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 50%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flip-card-back {
  transform: rotateY(180deg);
  z-index: 12;
}

.cardIcon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.cardTitle {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.flip-card:not(.active) .flip-card-back p {
  line-height: 1.2em;
  max-height: calc(1.2em * 6);
  overflow: hidden;
  position: relative;
  padding: 1rem;
}

.flip-card:not(.active) .flip-card-back p::after {
  content: "\.\.\.";
  position: absolute;
  bottom: 3px;
  right: 1rem;
  background: linear-gradient(to right, transparent, var(--card-bg-color) 80%);
  width: 10rem;
  text-align: right;
  text-indent: 7rem;
  color: var(--card-bg-color);
}

.flip-card:not(.active) .flip-card-back .read-more {
  display: block;
  position: absolute;
  margin-top: calc(1.2em * 9);
  left: 0;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
}

.flip-card.active .flip-card-back p {
  max-height: none;
  overflow: visible;
  padding: 3rem;
  font-weight: lighter;
  overflow: auto;
}

.flip-card.active .flip-card-back .read-more {
  display: none;
}

.slide-title {
  margin: 1rem;
  flex: 1;
}

.slide-intro {
  flex: 1;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(1, minmax(200px, 1fr)) !important;
  }

  .flip-card.active {
    height: 100vh;
    width: 100vh;
    padding-top: 3rem;
  }

  .flip-card.active .flip-card-back p {
    max-width: 100vw;
  }

  .flip-card:not(.active) .flip-card-back p {
    line-height: 1.2em;
    max-height: calc(1.2em * 4);
  }

  .flip-card:not(.active) .flip-card-back .read-more {
    display: block;
    position: absolute;
    margin-top: calc(1.2em * 7);
  }
}
</style>