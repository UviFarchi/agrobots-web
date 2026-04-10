<template>
  <section class="card-grid-shell">
    <h1
      v-if="!usesDiamondLayout()"
      class="slide-title"
      :style="{ color: slideTitleColor }"
    >
      {{ slideTitle }}
    </h1>
    <p
      v-if="!usesDiamondLayout()"
      class="slide-intro"
      :style="{ color: slideIntroColor }"
    >
      {{ slideIntro }}
    </p>

    <div class="card-stage" :class="{ 'diamond-layout': usesDiamondLayout() }">
      <div
        class="card-grid"
        :class="{ 'has-active': activeCard !== null }"
        :style="{ gridTemplateColumns: `repeat(${layoutColumns()}, minmax(240px, 1fr))` }"
      >
        <div
          v-if="usesDiamondLayout()"
          class="grid-intro-slot"
          :class="{ expandable: introNeedsClamp() }"
          :style="introSlotStyle()"
        >
          <div
            class="grid-intro-panel"
            :tabindex="introNeedsClamp() ? 0 : undefined"
          >
            <h1 class="grid-floating-title" :style="{ color: slideTitleColor }">
              {{ slideTitle }}
            </h1>
            <p class="grid-intro" :style="{ color: slideIntroColor }">
              {{ slideIntro }}
            </p>
          </div>
        </div>

        <div
          v-for="(card, index) in cards"
          :key="`${card.title}-${index}`"
          class="grid-card-slot"
          :class="{ active: isCardActive(index) }"
          :style="slotStyle(index)"
        >
          <article
            class="grid-card"
            :class="{ active: isCardActive(index) }"
            :style="cardStyle(card, index)"
          >
            <div class="grid-card-topline">
              <button
                type="button"
                class="grid-card-toggle"
                :aria-expanded="isCardActive(index) ? 'true' : 'false'"
                :aria-label="isCardActive(index) ? 'Collapse card' : expandText"
                @click="toggleCard(index)"
              >
                <span class="sr-only">{{ isCardActive(index) ? 'Collapse card' : expandText }}</span>
                <span class="grid-card-toggle-indicator" aria-hidden="true">
                  {{ isCardActive(index) ? '−' : '+' }}
                </span>
              </button>
              <div
                v-if="card.icon"
                class="grid-card-icon"
                :class="{ 'has-image': iconHasImage(card.icon) }"
                v-html="card.icon"
              ></div>
            </div>

            <h2 class="grid-card-title">{{ card.title }}</h2>

            <p v-if="!isCardActive(index)" class="grid-card-summary">
              {{ cardPreviewText(card) }}
            </p>

            <div
              v-else-if="card.backText"
              class="grid-card-body"
              v-html="card.backText"
            ></div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CardGrid",
  props: {
    title: { type: String, required: true },
    currentSlideIndex: {
      type: Number,
      default: 0
    },
    expandText: {
      type: String,
      required: true
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
      viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1440
    };
  },
  mounted() {
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
    document.addEventListener('keydown', this.handleDocumentKeydown);
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
    document.removeEventListener('keydown', this.handleDocumentKeydown);
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    currentSlideIndex() {
      this.activeCard = null;
    }
  },
  methods: {
    isCardActive(index) {
      return this.activeCard === index;
    },
    toggleCard(index) {
      this.activeCard = this.activeCard === index ? null : index;
    },
    handleDocumentPointerDown(event) {
      if (this.activeCard === null) return;
      if (event.target.closest('.grid-card-slot.active')) return;
      this.activeCard = null;
    },
    handleDocumentKeydown(event) {
      if (event.key === 'Escape' && this.activeCard !== null) {
        this.activeCard = null;
      }
    },
    handleResize() {
      this.viewportWidth = window.innerWidth;
    },
    iconHasImage(icon) {
      return /<img[\s>]/i.test(icon || "");
    },
    plainText(html) {
      return String(html || "")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    },
    introNeedsClamp() {
      return this.usesDiamondLayout() && this.plainText(this.slideIntro).length > 160;
    },
    cardPreviewText(card) {
      const text = this.plainText(card?.backText);
      const limit = this.usesDiamondLayout() ? 112 : 180;
      if (text.length <= limit) return text;
      return `${text.slice(0, limit - 3).trimEnd()}...`;
    },
    usesDiamondLayout() {
      return this.viewportWidth > 980 && (this.cards.length === 3 || this.cards.length === 4);
    },
    layoutColumns() {
      return this.usesDiamondLayout() ? 3 : this.columns;
    },
    slotStyle(index) {
      if (!this.usesDiamondLayout()) {
        return {};
      }

      if (this.cards.length === 3) {
        if (index === 0) {
          return {
            gridColumn: '2 / span 1',
            gridRow: '1',
            justifySelf: 'center'
          };
        }
        if (index === 1) {
          return {
            gridColumn: '1 / span 1',
            gridRow: '2',
            justifySelf: 'start'
          };
        }
        if (index === 2) {
          return {
            gridColumn: '3 / span 1',
            gridRow: '2',
            justifySelf: 'end'
          };
        }
      }

      if (this.cards.length === 4) {
        if (index === 0) {
          return {
            gridColumn: '2 / span 1',
            gridRow: '1',
            justifySelf: 'center'
          };
        }
        if (index === 1) {
          return {
            gridColumn: '1 / span 1',
            gridRow: '2',
            justifySelf: 'start'
          };
        }
        if (index === 2) {
          return {
            gridColumn: '3 / span 1',
            gridRow: '2',
            justifySelf: 'end'
          };
        }
        if (index === 3) {
          return {
            gridColumn: '2 / span 1',
            gridRow: '3',
            justifySelf: 'center'
          };
        }
      }

      return {};
    },
    introSlotStyle() {
      if (!this.usesDiamondLayout()) {
        return {};
      }

      return {
        gridColumn: '2 / span 1',
        gridRow: '2',
        justifySelf: 'center',
        alignSelf: 'center'
      };
    },
    basePlacement(index) {
      if (!this.usesDiamondLayout()) {
        return {};
      }

      if (index === 0) {
        return {
          "--card-left": "calc((100% - var(--card-width, 100%)) / 2)",
          "--card-right": "auto",
          "--card-top": "0",
          "--card-bottom": "auto",
          "--card-translate-x": "0",
          "--card-translate-y": "0"
        };
      }

      if (this.cards.length === 4 && index === 3) {
        return {
          "--card-left": "calc((100% - var(--card-width, 100%)) / 2)",
          "--card-right": "auto",
          "--card-top": "auto",
          "--card-bottom": "0",
          "--card-translate-x": "0",
          "--card-translate-y": "0"
        };
      }

      return {};
    },
    activePlacement(index) {
      if (this.usesDiamondLayout() && this.cards.length === 3) {
        if (index === 0) {
          return {
            "--card-width": "min(23.5rem, calc(100vw - 7rem))",
            "--card-height": "auto",
            "--card-min-height": "18rem",
            "--card-left": "calc((100% - var(--card-width)) / 2)",
            "--card-right": "auto",
            "--card-top": "0",
            "--card-bottom": "auto",
            "--card-translate-x": "0",
            "--card-translate-y": "0"
          };
        }
        if (index === 1) {
          return {
            "--card-width": "min(23.5rem, calc(100vw - 7rem))",
            "--card-height": "auto",
            "--card-min-height": "18rem",
            "--card-left": "0",
            "--card-right": "auto",
            "--card-top": "50%",
            "--card-bottom": "auto",
            "--card-translate-x": "0",
            "--card-translate-y": "-50%"
          };
        }
        if (index === 2) {
          return {
            "--card-width": "min(23.5rem, calc(100vw - 7rem))",
            "--card-height": "auto",
            "--card-min-height": "18rem",
            "--card-left": "auto",
            "--card-right": "0",
            "--card-top": "50%",
            "--card-bottom": "auto",
            "--card-translate-x": "0",
            "--card-translate-y": "-50%"
          };
        }
      }

      if (this.usesDiamondLayout() && this.cards.length === 4) {
        if (index === 0) {
          return {
            "--card-width": "min(23.5rem, calc(100vw - 7rem))",
            "--card-height": "auto",
            "--card-min-height": "18rem",
            "--card-left": "calc((100% - var(--card-width)) / 2)",
            "--card-right": "auto",
            "--card-top": "0",
            "--card-bottom": "auto",
            "--card-translate-x": "0",
            "--card-translate-y": "0"
          };
        }
        if (index === 1) {
          return {
            "--card-width": "min(23.5rem, calc(100vw - 7rem))",
            "--card-height": "auto",
            "--card-min-height": "18rem",
            "--card-left": "0",
            "--card-right": "auto",
            "--card-top": "50%",
            "--card-bottom": "auto",
            "--card-translate-x": "0",
            "--card-translate-y": "-50%"
          };
        }
        if (index === 2) {
          return {
            "--card-width": "min(23.5rem, calc(100vw - 7rem))",
            "--card-height": "auto",
            "--card-min-height": "18rem",
            "--card-left": "auto",
            "--card-right": "0",
            "--card-top": "50%",
            "--card-bottom": "auto",
            "--card-translate-x": "0",
            "--card-translate-y": "-50%"
          };
        }
        if (index === 3) {
          return {
            "--card-width": "min(23.5rem, calc(100vw - 7rem))",
            "--card-height": "auto",
            "--card-min-height": "18rem",
            "--card-left": "calc((100% - var(--card-width)) / 2)",
            "--card-right": "auto",
            "--card-top": "auto",
            "--card-bottom": "0",
            "--card-translate-x": "0",
            "--card-translate-y": "0"
          };
        }
      }

      const columnIndex = index % this.columns;
      const rowIndex = Math.floor(index / this.columns);
      const rowCount = Math.max(Math.ceil(this.cards.length / this.columns), 1);
      const style = {
        "--card-width": "min(22rem, calc(100vw - 7rem))",
        "--card-height": "auto",
        "--card-min-height": "min(24rem, 62vh)",
        "--card-left": "0",
        "--card-right": "auto",
        "--card-top": "0",
        "--card-bottom": "auto",
        "--card-translate-x": "0",
        "--card-translate-y": "0"
      };

      if (this.columns === 1) {
        style["--card-left"] = "50%";
        style["--card-translate-x"] = "-50%";
      } else if (columnIndex > (this.columns - 1) / 2) {
        style["--card-left"] = "auto";
        style["--card-right"] = "0";
      } else if (columnIndex === Math.floor((this.columns - 1) / 2) && this.columns % 2 === 1) {
        style["--card-left"] = "50%";
        style["--card-translate-x"] = "-50%";
      }

      if (rowCount === 1) {
        style["--card-top"] = "50%";
        style["--card-bottom"] = "auto";
        style["--card-translate-y"] = "-50%";
      } else if (rowIndex > (rowCount - 1) / 2) {
        style["--card-top"] = "auto";
        style["--card-bottom"] = "0";
      } else if (rowIndex === Math.floor((rowCount - 1) / 2) && rowCount % 2 === 1) {
        style["--card-top"] = "50%";
        style["--card-bottom"] = "auto";
        style["--card-translate-y"] = "-50%";
      }

      return style;
    },
    cardStyle(card, index) {
      const accent = card.frontBorder || card.backBorder || card.frontBg || card.backBg || "var(--accent, #f2b544)";
      const iconBg = card.frontBg || card.backBg || "rgba(255, 255, 255, 0.08)";
      const style = {
        "--card-accent": accent,
        "--card-icon-bg": iconBg
      };

      if (this.usesDiamondLayout()) {
        Object.assign(style, this.basePlacement(index));
      }

      if (this.activeCard === index) {
        return { ...style, ...this.activePlacement(index) };
      }

      return style;
    }
  }
};
</script>

<style scoped>
.card-grid-shell {
  --diamond-row-height: 13.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-height: 100%;
  padding: 1.2rem 0;
  box-sizing: border-box;
}

.slide-title {
  margin: 0;
  font-size: clamp(1.9rem, 2.7vw, 2.9rem);
  line-height: 1.04;
}

.slide-intro {
  margin: 0 auto;
  width: min(100%, 60%);
  max-width: 68ch;
  font-size: 1rem;
  line-height: 1.62;
}

.card-stage {
  width: 100%;
  margin-top: 0.45rem;
}

.grid-intro-slot {
  position: relative;
  width: min(39rem, calc(100vw - 8rem));
  max-width: 39rem;
  min-height: var(--diamond-row-height);
  z-index: 12;
}

.grid-intro-panel {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.72rem;
  overflow: hidden;
  max-height: var(--diamond-row-height);
  transition: max-height 0.24s ease, background-color 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease, padding 0.24s ease;
}

.grid-intro-slot.expandable:hover,
.grid-intro-slot.expandable:focus-within {
  z-index: 32;
}

.grid-intro-slot.expandable:hover .grid-intro-panel,
.grid-intro-slot.expandable:focus-within .grid-intro-panel {
  max-height: min(34rem, 72vh);
  padding: 0.18rem 0.75rem 0.9rem;
  border-radius: 16px;
  border: 1px solid rgba(223, 239, 241, 0.14);
  background: rgba(18, 28, 29, 0.92);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
}

.grid-floating-title {
  margin: 0;
  width: 100%;
  font-size: clamp(1.9rem, 2.7vw, 2.9rem);
  line-height: 1.04;
}

.grid-intro {
  margin: 0;
  width: 100%;
  font-size: 0.98rem;
  line-height: 1.62;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.grid-intro-slot.expandable:hover .grid-intro,
.grid-intro-slot.expandable:focus-within .grid-intro {
  display: block;
  overflow: visible;
  -webkit-line-clamp: unset;
}

.card-grid {
  display: grid;
  gap: 1.7rem 2rem;
  width: 100%;
  align-items: start;
  overflow: visible;
  justify-items: center;
}

.card-grid.has-active .grid-card-slot:not(.active) .grid-card {
  opacity: 0.46;
  filter: saturate(0.82) brightness(0.96);
  --card-hover-y: 0px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card-grid.has-active .grid-card-slot:not(.active):hover .grid-card {
  border-color: rgba(255, 255, 255, 0.12);
  --card-hover-y: 0px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.grid-card-slot {
  position: relative;
  width: min(100%, 305px);
  min-height: var(--diamond-row-height);
  overflow: visible;
}

.grid-card-slot.active {
  z-index: 30;
}

.grid-card {
  position: absolute;
  left: var(--card-left, 0);
  right: var(--card-right, auto);
  top: var(--card-top, 0);
  bottom: var(--card-bottom, auto);
  width: var(--card-width, 100%);
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 0.88rem;
  min-height: var(--card-min-height, var(--diamond-row-height));
  height: var(--card-height, 100%);
  padding: 1.05rem 1.08rem 1.08rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(23, 34, 35, 0.92);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  transform: translate(
    var(--card-translate-x, 0),
    calc(var(--card-translate-y, 0) + var(--card-hover-y, 0px))
  );
  transition: transform 0.22s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, filter 0.2s ease, width 0.22s ease, height 0.22s ease, left 0.22s ease, right 0.22s ease, top 0.22s ease, bottom 0.22s ease;
}

.grid-card::before {
  display: none;
}

.grid-card:hover,
.grid-card-slot:hover .grid-card {
  --card-hover-y: -2px;
  border-color: rgba(223, 239, 241, 0.22);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18);
}

.grid-card.active {
  --card-hover-y: 0px;
  background: rgba(27, 39, 40, 0.96);
  border-color: rgba(223, 239, 241, 0.24);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
}

.grid-card-topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.9rem;
}

.grid-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.7rem;
  min-height: 2.7rem;
  max-width: 5rem;
  padding: 0.42rem;
  border-radius: 14px;
  background: color-mix(in srgb, var(--card-icon-bg) 18%, rgba(255, 255, 255, 0.07));
  color: rgba(255, 255, 255, 0.96);
  font-size: 1.5rem;
  line-height: 1;
  filter: grayscale(1) brightness(1.18);
}

.grid-card-icon.has-image {
  background: rgba(255, 255, 255, 0.08);
}

.grid-card-icon :deep(img) {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 2.25rem;
  object-fit: contain;
  margin: 0 auto;
  filter: brightness(0) invert(1) opacity(0.96);
}

.grid-card-title {
  margin: 0;
  font-size: clamp(1.01rem, 1.28vw, 1.2rem);
  line-height: 1.24;
  color: #fff;
}

.grid-card-summary {
  margin: 0;
  width: min(100%, 27ch);
  font-size: 0.9rem;
  line-height: 1.62;
  color: rgba(236, 246, 245, 0.84);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.grid-card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-height: 0;
  overflow: visible;
  padding-right: 0;
  font-size: 0.9rem;
  line-height: 1.62;
  color: rgba(236, 246, 245, 0.86);
}

.grid-card-body :deep(p) {
  margin: 0;
}

.grid-card-body :deep(a) {
  color: var(--card-accent);
  text-decoration: none;
  font-weight: 600;
}

.grid-card-body :deep(a:hover) {
  text-decoration: underline;
}

.grid-card-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.55rem;
  height: 2.55rem;
  padding: 0;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--card-accent) 48%, rgba(255, 255, 255, 0.12));
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.grid-card-toggle:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.06);
}

.grid-card-toggle-indicator {
  font-size: 1.2rem;
  line-height: 1;
  color: var(--card-accent);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 980px) {
  .card-stage {
    overflow: visible;
  }

  .card-grid {
    grid-template-columns: repeat(2, minmax(220px, 1fr)) !important;
    gap: 1rem;
  }

  .slide-intro {
    width: min(100%, 78%);
  }

  .grid-card-slot {
    width: 100%;
    min-height: 0;
  }

  .grid-card {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    width: 100%;
    min-height: 15rem;
    height: auto;
    transform: none !important;
  }

  .grid-card.active {
    --card-width: 100%;
    --card-height: auto;
    --card-min-height: 15rem;
    --card-left: auto;
    --card-right: auto;
    --card-top: auto;
    --card-bottom: auto;
    --card-translate-x: 0;
    --card-translate-y: 0;
  }
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr !important;
  }

  .slide-intro {
    width: 100%;
  }

  .grid-card-slot {
    width: 100%;
  }

  .grid-card {
    min-height: 15rem;
  }

  .grid-card-summary,
  .grid-card-body {
    width: 100%;
    max-width: none;
  }

  .grid-card-toggle {
    width: 2.7rem;
  }
}
</style>
