<template>
  <section class="agrobots-intro">
    <div class="intro-panel">
      <div class="intro-overview">
        <div class="intro-header">
          <span class="intro-label">{{ slideTitle }}</span>
          <span v-if="eyebrow" class="intro-eyebrow">{{ eyebrow }}</span>
        </div>

        <h1 class="intro-headline">{{ resolvedHeadline }}</h1>
        <p v-if="resolvedLead" class="intro-lead">{{ resolvedLead }}</p>

        <div v-if="displayPillars.length" class="intro-pillar-grid">
          <div
            v-for="(pillar, index) in displayPillars"
            :key="`${pillar.title}-${index}`"
            class="intro-pillar-slot"
          >
          <button
            type="button"
            class="intro-pillar"
            :class="{ active: isPillarOpen(index) }"
            :aria-expanded="isPillarOpen(index) ? 'true' : 'false'"
            @click="togglePillar(index)"
          >
            <span class="intro-pillar-topline">
              <span class="intro-pillar-step">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="intro-pillar-toggle-indicator" aria-hidden="true">
                {{ isPillarOpen(index) ? '−' : '+' }}
              </span>
            </span>
            <span class="intro-pillar-title">{{ pillar.title }}</span>
            <p class="intro-pillar-summary">{{ pillar.text }}</p>
            <div v-if="isPillarOpen(index) && pillar.details?.length" class="intro-pillar-details">
              <span
                v-for="(detail, detailIndex) in pillar.details"
                :key="`${pillar.title}-${detailIndex}`"
                class="intro-pillar-detail"
              >
                {{ detail }}
              </span>
            </div>
          </button>
          </div>
        </div>

        <div v-if="!displayPillars.length" class="intro-copy">
          <p v-for="(paragraph, index) in introText" :key="index">{{ paragraph }}</p>
        </div>
      </div>

      <div
        v-if="proofTitle || displayProofChips.length || closing"
        class="intro-detail-stack"
      >
        <div v-if="proofTitle || closing" class="intro-detail-copy">
          <p v-if="proofTitle" class="intro-proof-title">{{ proofTitle }}</p>
          <p v-if="closing" class="intro-closing">{{ closing }}</p>
        </div>

        <div v-if="displayProofChips.length" class="intro-proof">
          <div class="intro-proof-chips">
            <button
              v-for="(chip, index) in displayProofChips"
              :key="`${chip.label}-${index}`"
              type="button"
              class="intro-proof-chip"
              :class="{ active: isProofChipActive(index) }"
              :aria-pressed="isProofChipActive(index) ? 'true' : 'false'"
              @click="selectProofChip(index)"
            >
              {{ chip.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <aside class="intro-images" aria-label="Agrobots visuals">
      <div class="visual-stage" :class="{ 'single-image': !secondaryImage }">
        <div class="visual-guides" aria-hidden="true">
          <span class="guide guide-x"></span>
          <span class="guide guide-y"></span>
          <span class="guide guide-ring"></span>
        </div>
        <img
          v-if="primaryImage"
          :class="secondaryImage ? 'visual-backdrop' : 'visual-primary-art'"
          :src="primaryImage.src"
          :alt="primaryImage.alt"
        />
        <span v-if="resolvedVisualBadge" class="visual-badge">{{ resolvedVisualBadge }}</span>
        <div v-if="resolvedVisualCaption" class="visual-caption">{{ resolvedVisualCaption }}</div>
        <img
          v-if="secondaryImage"
          class="visual-foreground"
          :src="secondaryImage.src"
          :alt="secondaryImage.alt"
        />
      </div>

      <div v-if="resolvedMetrics.length" class="visual-metrics">
        <article
          v-for="(metric, index) in resolvedMetrics"
          :key="`${metric.label}-${index}`"
          class="metric-card"
        >
          <span class="metric-label">{{ metric.label }}</span>
          <strong class="metric-value">{{ metric.value }}</strong>
        </article>
      </div>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'AgrobotsIntro',
  data() {
    return {
      activePillarIndex: null,
      activeProofIndex: null
    };
  },
  props: {
    slideTitle: { type: String, required: true },
    headline: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    lead: { type: String, default: '' },
    introText: { type: Array, default: () => [] },
    pillars: { type: Array, default: () => [] },
    proofTitle: { type: String, default: '' },
    proofChips: { type: Array, default: () => [] },
    closing: { type: String, default: '' },
    metrics: { type: Array, default: () => [] },
    visualBadge: { type: String, default: '' },
    visualCaption: { type: String, default: '' },
    images: { type: Array, default: () => [] }
  },
  watch: {
    pillars: {
      immediate: true,
      handler(newPillars) {
        this.activePillarIndex = Array.isArray(newPillars) && newPillars.length ? 0 : null;
      }
    },
    proofChips: {
      immediate: true,
      handler(newProofChips) {
        this.activeProofIndex = Array.isArray(newProofChips) && newProofChips.length ? 0 : null;
      }
    }
  },
  computed: {
    resolvedHeadline() {
      return this.headline || this.slideTitle;
    },
    resolvedLead() {
      return this.lead || this.introText[0] || '';
    },
    displayPillars() {
      return this.pillars.filter((pillar) => pillar?.title && pillar?.text);
    },
    displayProofChips() {
      return this.proofChips
        .map((chip) => (typeof chip === 'string' ? { label: chip } : chip))
        .filter((chip) => chip?.label);
    },
    activeProofChip() {
      return this.displayProofChips[this.activeProofIndex] || null;
    },
    resolvedMetrics() {
      const sourceMetrics = this.activeProofChip?.metrics?.length ? this.activeProofChip.metrics : this.metrics;
      return sourceMetrics.filter((metric) => metric?.label && metric?.value);
    },
    resolvedVisualBadge() {
      return this.activeProofChip?.visualBadge || this.visualBadge;
    },
    resolvedVisualCaption() {
      return this.activeProofChip?.visualCaption || this.visualCaption;
    },
    primaryImage() {
      return this.images[0] || null;
    },
    secondaryImage() {
      return this.images[1] || null;
    }
  },
  methods: {
    isPillarOpen(index) {
      return this.activePillarIndex === index;
    },
    togglePillar(index) {
      this.activePillarIndex = this.activePillarIndex === index ? null : index;
    },
    isProofChipActive(index) {
      return this.activeProofIndex === index;
    },
    selectProofChip(index) {
      this.activeProofIndex = index;
    }
  }
};
</script>

<style scoped>
.agrobots-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(280px, 0.82fr);
  gap: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  color: var(--textLight, #f7fff7);
}

.intro-panel {
  min-height: 100%;
  padding: 1.45rem 1.8rem 1.35rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.intro-overview {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.intro-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
}

.intro-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(247, 255, 247, 0.64);
}

.intro-eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 0.36rem 0.78rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 213, 79, 0.3);
  background: rgba(255, 213, 79, 0.14);
  color: var(--accent, #ffd54f);
  font-size: 0.8rem;
  font-weight: 600;
}

.intro-headline {
  margin: 0;
  max-width: none;
  font-size: clamp(1.7rem, 2.7vw, 2.75rem);
  line-height: 1.04;
  color: #fff;
}

.intro-lead {
  max-width: 60ch;
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.55;
  color: rgba(247, 255, 247, 0.82);
}

.intro-pillar-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
  position: relative;
  z-index: 4;
}

.intro-pillar-slot {
  position: relative;
  min-height: 8rem;
}

.intro-pillar {
  position: absolute;
  inset: 0 0 auto 0;
  width: 100%;
  min-height: 100%;
  padding: 0.88rem 0.92rem;
  border-radius: 18px 6px 18px 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  appearance: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
  font: inherit;
}

.intro-pillar:hover,
.intro-pillar.active {
  transform: translateY(-2px);
  border-color: rgba(255, 213, 79, 0.42);
  box-shadow: 0 0 0 1px rgba(255, 213, 79, 0.12);
}

.intro-pillar.active {
  z-index: 8;
  background: rgba(10, 10, 10, 0.92);
  box-shadow:
    0 0 0 1px rgba(255, 213, 79, 0.18),
    0 18px 32px rgba(0, 0, 0, 0.28);
}

.intro-pillar::after {
  content: '';
  position: absolute;
  left: -1px;
  right: 28%;
  top: -1px;
  border-top: 1px solid rgba(255, 213, 79, 0.52);
}

.intro-pillar-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.intro-pillar-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid rgba(35, 122, 255, 0.45);
  color: var(--secondary, #237aff);
  font-size: 0.74rem;
  font-weight: 700;
  background: rgba(35, 122, 255, 0.05);
}

.intro-pillar-toggle-indicator {
  font-size: 1.25rem;
  line-height: 1;
  color: var(--accent, #ffd54f);
}

.intro-pillar-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent, #ffd54f);
}

.intro-pillar-summary {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(247, 255, 247, 0.82);
  line-height: 1.42;
}

.intro-pillar-details {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding-top: 0.7rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.16);
}

.intro-pillar-detail {
  position: relative;
  padding-left: 1rem;
  font-size: 0.86rem;
  line-height: 1.4;
  color: rgba(247, 255, 247, 0.74);
}

.intro-pillar-detail::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 0.45rem;
  border-top: 1px solid rgba(35, 122, 255, 0.54);
}

.intro-copy {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  line-height: 1.6;
}

.intro-copy p {
  margin: 0;
}

.intro-proof {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.intro-detail-copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.intro-detail-stack {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.15rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
}

.intro-proof-title {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: rgba(247, 255, 247, 0.76);
}

.intro-proof-chips {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.intro-proof-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 58px;
  padding: 0.85rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(11, 135, 75, 0.38);
  background: none;
  color: #e6fff0;
  font-size: 0.88rem;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
  font: inherit;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

.intro-proof-chip.active {
  border-color: rgba(255, 213, 79, 0.52);
  background: rgba(255, 213, 79, 0.1);
  box-shadow: 0 0 0 1px rgba(255, 213, 79, 0.14);
}

.intro-closing {
  margin: 0;
  color: #fff;
  font-size: 0.92rem;
  line-height: 1.45;
}

.intro-images {
  display: grid;
  gap: 1rem;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 0;
  padding-left: 1.8rem;
  border-left: 1px solid rgba(255, 255, 255, 0.16);
}

.visual-stage {
  position: relative;
  overflow: hidden;
  min-height: 0;
  background: none;
}

.visual-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.08) brightness(0.76);
}

.visual-primary-art {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: min(88%, 460px);
  max-height: 76%;
  object-fit: contain;
  transform: translate(-50%, -48%);
  filter:
    drop-shadow(0 28px 42px rgba(0, 0, 0, 0.4))
    drop-shadow(0 0 24px rgba(255, 213, 79, 0.18));
}

.visual-badge,
.visual-caption,
.visual-foreground {
  position: absolute;
  z-index: 2;
}

.visual-guides {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.guide {
  position: absolute;
}

.guide-x {
  left: 12%;
  right: 12%;
  top: 50%;
  border-top: 1px dashed rgba(35, 122, 255, 0.28);
}

.guide-y {
  top: 12%;
  bottom: 12%;
  left: 50%;
  border-left: 1px dashed rgba(255, 213, 79, 0.24);
}

.guide-ring {
  left: 50%;
  top: 50%;
  width: min(52%, 270px);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 0 0 20px rgba(35, 122, 255, 0.05),
    0 0 0 40px rgba(255, 213, 79, 0.035);
}

.visual-badge {
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  padding: 0.42rem 0.82rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: none;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}

.visual-caption {
  left: 1rem;
  bottom: 1rem;
  max-width: 58%;
  padding: 0.95rem 1rem;
  border-radius: 16px 4px 16px 4px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: none;
  color: #fff;
  line-height: 1.45;
}

.visual-foreground {
  right: -2%;
  bottom: -1%;
  width: min(56%, 340px);
  filter:
    drop-shadow(0 28px 36px rgba(0, 0, 0, 0.42))
    drop-shadow(0 0 24px rgba(255, 213, 79, 0.24));
}

.visual-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

.metric-card {
  position: relative;
  min-height: 94px;
  padding: 0.88rem 0.92rem;
  border-radius: 16px 4px 16px 4px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-card::before {
  content: '';
  position: absolute;
  left: -1px;
  top: -1px;
  width: 46px;
  border-top: 1px solid rgba(255, 213, 79, 0.52);
}

.metric-label {
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(247, 255, 247, 0.58);
}

.metric-value {
  color: #fff;
  line-height: 1.3;
  font-size: 0.94rem;
}

@media (max-width: 1200px) {
  .agrobots-intro {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .intro-headline {
    max-width: none;
  }

  .intro-images {
    grid-template-rows: minmax(320px, 42vh) auto;
    padding-left: 0;
    padding-top: 1.25rem;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
  }

  .intro-detail-stack {
    margin-top: 1.25rem;
  }
}

@media (max-width: 860px) {
  .intro-pillar-grid,
  .visual-metrics,
  .intro-proof-chips {
    grid-template-columns: 1fr;
  }

  .intro-pillar-slot {
    min-height: auto;
  }

  .intro-pillar {
    position: relative;
    inset: auto;
    min-height: 8rem;
  }

  .intro-pillar:hover,
  .intro-pillar.active {
    transform: none;
  }
}

@media (max-width: 720px) {
  .agrobots-intro {
    padding: 1rem;
  }

  .intro-panel {
    padding: 1.2rem 0 1rem 0;
  }

  .visual-caption {
    max-width: 72%;
  }

  .visual-foreground {
    width: min(58%, 260px);
  }
}
</style>
