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
        v-if="proofSectionTitle || proofTitle || displayProofChips.length || closing"
        class="intro-detail-stack"
      >
        <div v-if="proofSectionTitle || proofTitle || closing" class="intro-detail-copy">
          <h2 v-if="proofSectionTitle" class="intro-proof-heading">{{ proofSectionTitle }}</h2>
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
      <div class="visual-stage">
        <span v-if="resolvedVisualBadge" class="visual-badge">{{ resolvedVisualBadge }}</span>
        <img
          v-if="resolvedPrimaryImage"
          class="visual-inline-image"
          :src="resolvedPrimaryImage.src"
          :alt="resolvedPrimaryImage.alt"
        />
        <h3 v-if="resolvedVisualTitle" class="visual-panel-title">{{ resolvedVisualTitle }}</h3>
        <div v-if="resolvedVisualCopy.length" class="visual-body">
          <div class="visual-body-copy">
            <p
              v-for="(paragraph, index) in resolvedVisualCopy"
              :key="`visual-copy-${index}`"
              class="visual-body-text"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div v-else-if="resolvedVisualTitle || resolvedVisualCopy.length" class="visual-body visual-body-empty">
          <h3 v-if="resolvedVisualTitle" class="visual-caption-title">{{ resolvedVisualTitle }}</h3>
        </div>
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
  name: 'ColumnsAndPanels',
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
    proofSectionTitle: { type: String, default: '' },
    proofTitle: { type: String, default: '' },
    proofChips: { type: Array, default: () => [] },
    closing: { type: String, default: '' },
    metrics: { type: Array, default: () => [] },
    visualBadge: { type: String, default: '' },
    visualTitle: { type: String, default: '' },
    visualCaption: { type: String, default: '' },
    images: { type: Array, default: () => [] }
  },
  watch: {
    pillars: {
      immediate: true,
      handler(newPillars) {
        this.activePillarIndex = null;
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
      return this.activeProofChip?.visualBadge || this.activeProofChip?.label || this.visualBadge;
    },
    resolvedVisualTitle() {
      return this.activeProofChip?.panelTitle || this.activeProofChip?.visualTitle || this.visualTitle;
    },
    resolvedVisualCopy() {
      const source = this.activeProofChip?.panelText || this.activeProofChip?.visualCaption || this.visualCaption;
      if (Array.isArray(source)) {
        return source.filter(Boolean);
      }
      return source ? [source] : [];
    },
    resolvedPrimaryImage() {
      return this.normalizeImage(this.activeProofChip?.image) || this.normalizeImage(this.images[0]);
    },
    resolvedSecondaryImage() {
      return this.normalizeImage(this.images[1]);
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
    },
    normalizeImage(image) {
      if (!image) return null;
      if (typeof image === 'string') {
        return {
          src: image,
          alt: this.slideTitle
        };
      }
      if (!image.src) return null;
      return {
        src: image.src,
        alt: image.alt || this.slideTitle
      };
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
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.15rem;
}

.intro-overview {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 0;
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
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(247, 255, 247, 0.86);
  font-size: 0.8rem;
  font-weight: 600;
}

.intro-headline {
  margin: 0;
  max-width: none;
  font-size: clamp(1.68rem, 2.55vw, 2.62rem);
  line-height: 1.05;
  color: #fff;
}

.intro-lead {
  width: 100%;
  max-width: none;
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
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    var(--backgroundDarkTranslucent, rgba(33, 33, 33, 0.93));
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
  appearance: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
  font: inherit;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16);
}

.intro-pillar:hover,
.intro-pillar.active {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
}

.intro-pillar.active {
  z-index: 8;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02)),
    rgba(16, 20, 20, 0.96);
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
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(247, 255, 247, 0.78);
  font-size: 0.74rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.04);
}

.intro-pillar-toggle-indicator {
  font-size: 1.12rem;
  line-height: 1;
  color: var(--accent, #ffd54f);
}

.intro-pillar-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
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
  border-top: 1px solid rgba(255, 255, 255, 0.12);
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
  left: 0.08rem;
  top: 0.45rem;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 999px;
  background: rgba(11, 135, 75, 0.8);
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
  flex: 1 1 auto;
  min-height: 0;
}

.intro-detail-copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.intro-proof-heading {
  margin: 0;
  font-size: 1.14rem;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
}

.intro-detail-stack {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 1rem;
  padding-top: 1.15rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  min-height: 0;
}

.intro-proof-title {
  margin: 0;
  width: 100%;
  max-width: none;
  font-size: 0.92rem;
  line-height: 1.45;
  color: rgba(247, 255, 247, 0.76);
}

.intro-proof-chips {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
  gap: 0.8rem;
  height: 100%;
}

.intro-proof-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  height: 100%;
  padding: 0.85rem 1rem;
  border-radius: 18px;
  border: 1px solid rgba(11, 135, 75, 0.38);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    rgba(20, 30, 30, 0.46);
  color: #e6fff0;
  font-size: 0.88rem;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
  font: inherit;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
}

.intro-proof-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.intro-proof-chip.active {
  border-color: rgba(255, 255, 255, 0.2);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02)),
    rgba(16, 20, 20, 0.96);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

.intro-closing {
  margin: 0;
  width: 100%;
  max-width: none;
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
  border-left: 1px solid rgba(255, 255, 255, 0.14);
}

.visual-stage {
  position: relative;
  min-height: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    var(--backgroundDarkTranslucent, rgba(20, 30, 30, 0.96));
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto minmax(0, 1fr);
  padding: 1.15rem;
  gap: 0.85rem;
}

.visual-badge {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  justify-self: start;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 0.88rem;
  font-weight: 600;
}

.visual-inline-image {
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  justify-self: center;
  align-self: start;
  border-radius: 14px;
  object-fit: contain;
  background: rgba(8, 8, 8, 0.3);
  padding: 0.35rem;
}

.visual-panel-title {
  margin: 0.15rem 0 0;
  font-size: clamp(1.15rem, 1.6vw, 1.65rem);
  line-height: 1.12;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.visual-body {
  min-height: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.visual-body-copy {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  padding-top: 0.15rem;
}

.visual-body-empty,
.visual-caption-title {
  margin: 0;
  color: #fff;
}

.visual-body-text {
  margin: 0;
  width: 100%;
  font-size: 0.96rem;
  line-height: 1.62;
  color: rgba(247, 255, 247, 0.86);
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
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    rgba(20, 30, 30, 0.56);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.metric-card::before {
  display: none;
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
    height: auto;
    min-height: 100%;
    overflow-y: auto;
  }

  .intro-panel {
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
    min-height: 0;
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
    grid-template-rows: auto auto;
  }
}

@media (max-width: 860px) {
  .agrobots-intro {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: auto;
  }

  .intro-panel,
  .intro-images,
  .intro-overview,
  .intro-detail-stack,
  .intro-proof {
    min-height: auto;
  }

  .intro-pillar-grid,
  .visual-metrics,
  .intro-proof-chips {
    grid-template-columns: 1fr;
  }

  .intro-pillar-slot {
    min-height: 0;
  }

  .intro-pillar {
    position: relative;
    inset: auto;
    min-height: 0;
    height: auto;
  }

  .intro-pillar:hover,
  .intro-pillar.active {
    transform: none;
  }

  .intro-detail-stack {
    margin-top: 0.85rem;
    padding-top: 0.95rem;
    gap: 0.9rem;
  }

  .intro-proof {
    flex: 0 0 auto;
  }

  .intro-proof-chips {
    height: auto;
    grid-auto-rows: auto;
  }

  .intro-images {
    grid-template-rows: auto auto;
    gap: 0.85rem;
  }

  .visual-stage {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    min-height: auto;
  }

  .visual-inline-image {
    width: min(100%, 28rem);
    max-width: 100%;
    height: auto;
    max-height: none;
  }

  .visual-panel-title {
    margin-top: 0;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }

  .visual-body,
  .visual-body-copy {
    min-height: auto;
  }

  .intro-proof-chip {
    min-height: 3.5rem;
    height: auto;
  }
}

@media (max-width: 720px) {
  .agrobots-intro {
    padding: 1rem;
    overflow: visible;
  }

  .intro-panel {
    padding: 1rem 0 0.85rem 0;
  }

  .visual-stage {
    padding: 0.95rem;
  }

  .intro-images {
    padding-left: 0;
    padding-top: 0.9rem;
  }

  .intro-header {
    gap: 0.55rem;
  }

  .intro-headline {
    font-size: clamp(1.5rem, 7vw, 2rem);
  }

  .intro-pillar {
    padding: 0.82rem 0.85rem;
  }
}
</style>
