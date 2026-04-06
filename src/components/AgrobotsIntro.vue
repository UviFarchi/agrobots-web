<template>
  <section class="agrobots-intro">
    <div class="intro-panel">
      <div class="intro-header">
        <span class="intro-label">{{ slideTitle }}</span>
        <span v-if="eyebrow" class="intro-eyebrow">{{ eyebrow }}</span>
      </div>

      <h1 class="intro-headline">{{ resolvedHeadline }}</h1>
      <p v-if="resolvedLead" class="intro-lead">{{ resolvedLead }}</p>

      <div v-if="displayPillars.length" class="intro-pillar-grid">
        <article
          v-for="(pillar, index) in displayPillars"
          :key="`${pillar.title}-${index}`"
          class="intro-pillar"
        >
          <span class="intro-pillar-title">{{ pillar.title }}</span>
          <p>{{ pillar.text }}</p>
        </article>
      </div>

      <div v-else class="intro-copy">
        <p v-for="(paragraph, index) in introText" :key="index">{{ paragraph }}</p>
      </div>

      <div v-if="proofTitle || displayProofChips.length" class="intro-proof">
        <p v-if="proofTitle" class="intro-proof-title">{{ proofTitle }}</p>
        <div v-if="displayProofChips.length" class="intro-proof-chips">
          <span
            v-for="(chip, index) in displayProofChips"
            :key="`${chip}-${index}`"
            class="intro-proof-chip"
          >
            {{ chip }}
          </span>
        </div>
      </div>

      <p v-if="closing" class="intro-closing">{{ closing }}</p>
    </div>

    <aside class="intro-images" aria-label="Agrobots visuals">
      <div class="visual-stage" :class="{ 'single-image': !secondaryImage }">
        <img
          v-if="primaryImage"
          :class="secondaryImage ? 'visual-backdrop' : 'visual-primary-art'"
          :src="primaryImage.src"
          :alt="primaryImage.alt"
        />
        <span v-if="visualBadge" class="visual-badge">{{ visualBadge }}</span>
        <div v-if="visualCaption" class="visual-caption">{{ visualCaption }}</div>
        <img
          v-if="secondaryImage"
          class="visual-foreground"
          :src="secondaryImage.src"
          :alt="secondaryImage.alt"
        />
      </div>

      <div v-if="displayMetrics.length" class="visual-metrics">
        <article
          v-for="(metric, index) in displayMetrics"
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
      return this.proofChips.filter(Boolean);
    },
    displayMetrics() {
      return this.metrics.filter((metric) => metric?.label && metric?.value);
    },
    primaryImage() {
      return this.images[0] || null;
    },
    secondaryImage() {
      return this.images[1] || null;
    }
  }
};
</script>

<style scoped>
.agrobots-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(280px, 0.82fr);
  gap: 1.15rem;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  color: var(--textLight, #f7fff7);
}

.intro-panel {
  background:
    radial-gradient(circle at top left, rgba(35, 122, 255, 0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(255, 213, 79, 0.14), transparent 34%),
    linear-gradient(155deg, rgba(8, 24, 15, 0.96), rgba(18, 18, 18, 0.94));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 1.45rem 1.55rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
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
}

.intro-pillar {
  min-height: 8rem;
  padding: 0.88rem 0.92rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.intro-pillar-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent, #ffd54f);
}

.intro-pillar p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(247, 255, 247, 0.82);
  line-height: 1.42;
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
  padding-top: 0.15rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.intro-proof-title {
  margin: 0;
  max-width: 62ch;
  font-size: 0.92rem;
  line-height: 1.45;
  color: rgba(247, 255, 247, 0.76);
}

.intro-proof-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.intro-proof-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.48rem 0.76rem;
  border-radius: 999px;
  border: 1px solid rgba(11, 135, 75, 0.38);
  background: rgba(11, 135, 75, 0.18);
  color: #e6fff0;
  font-size: 0.82rem;
}

.intro-closing {
  margin: 0;
  max-width: 56ch;
  color: #fff;
  font-size: 0.92rem;
  line-height: 1.45;
}

.intro-images {
  display: grid;
  gap: 1rem;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 0;
}

.visual-stage {
  position: relative;
  overflow: hidden;
  min-height: 0;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(7, 22, 13, 0.96), rgba(14, 14, 14, 0.94));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.visual-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(7, 14, 10, 0.18), rgba(7, 14, 10, 0.78)),
    radial-gradient(circle at 18% 24%, rgba(35, 122, 255, 0.24), transparent 28%),
    radial-gradient(circle at 78% 70%, rgba(255, 213, 79, 0.18), transparent 22%);
}

.visual-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.08) brightness(0.76);
}

.visual-stage.single-image {
  background:
    radial-gradient(circle at 22% 18%, rgba(35, 122, 255, 0.2), transparent 26%),
    radial-gradient(circle at 76% 72%, rgba(255, 213, 79, 0.16), transparent 24%),
    linear-gradient(180deg, rgba(7, 22, 13, 0.98), rgba(14, 14, 14, 0.94));
}

.visual-stage.single-image::after {
  background:
    linear-gradient(180deg, rgba(7, 14, 10, 0.08), rgba(7, 14, 10, 0.42)),
    radial-gradient(circle at 18% 24%, rgba(35, 122, 255, 0.18), transparent 28%),
    radial-gradient(circle at 78% 70%, rgba(255, 213, 79, 0.12), transparent 22%);
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
  z-index: 1;
}

.visual-badge {
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  padding: 0.42rem 0.82rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(7, 14, 10, 0.55);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}

.visual-caption {
  left: 1rem;
  bottom: 1rem;
  max-width: 58%;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(7, 14, 10, 0.62);
  backdrop-filter: blur(10px);
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
  min-height: 94px;
  padding: 0.88rem 0.92rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)),
    rgba(18, 18, 18, 0.92);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  }
}

@media (max-width: 860px) {
  .intro-pillar-grid,
  .visual-metrics {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .agrobots-intro {
    padding: 1rem;
  }

  .intro-panel {
    padding: 1.2rem;
    border-radius: 24px;
  }

  .visual-stage {
    border-radius: 24px;
  }

  .visual-caption {
    max-width: 72%;
  }

  .visual-foreground {
    width: min(58%, 260px);
  }
}
</style>
