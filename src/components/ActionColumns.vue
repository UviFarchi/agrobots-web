<script>
import Socials from './subcomponents/Socials.vue';

export default {
  name: 'ActionColumns',
  emits: ['contact'],
  components: { Socials },
  props: {
    title: { type: String, required: true },
    columns: { type: Array, required: true },
    general: {
      type: Object,
      default: () => ({
        slideTitle: '',
        slideTitleColor: '',
        slideIntro: '',
        slideIntroColor: '',
        columnsPerRow: 3
      })
    },
    currentSlideIndex: { type: Number, default: 0 }
  },
  data() {
    return {
      activeSocialsColumn: null
    };
  },
  watch: {
    currentSlideIndex() {
      this.activeSocialsColumn = null;
    }
  },
  computed: {
    gridColumns() {
      return Math.max(this.general.columnsPerRow || 3, 1);
    },
    usesPortraitLayout() {
      return this.gridColumns <= 2 && this.columns.every((column) => !!column.columnIconImg);
    }
  },
  methods: {
    toggleSocials(index) {
      this.activeSocialsColumn = this.activeSocialsColumn === index ? null : index;
    },
    normalizedPath(path) {
      if (!path) return '/';
      return path.startsWith('/') ? path : `/${path}`;
    },
    isExternalLink(link) {
      return /^(https?:)?\/\//.test(link || '') || String(link || '').startsWith('mailto:');
    },
    handleAction(column, index) {
      if (column.buttonLink === 'share') {
        this.toggleSocials(index);
        return;
      }

      if (column.buttonLink === 'contact') {
        this.$emit('contact');
        return;
      }

      if (column.buttonLink === 'quote') {
        const path = this.normalizedPath(column.buttonLink);
        if (this.$router) {
          this.$router.push(path);
          return;
        }
        window.location.assign(path);
      }
    },
    columnStyle(column) {
      return {
        '--column-accent': column.borderColor || column.buttonBgColor || 'var(--primary, #0b874b)',
        '--column-surface': column.columnsBgColor || 'var(--backgroundDarkTranslucent, rgba(33, 33, 33, 0.93))',
        '--column-title': column.textColor || '#ffffff',
        '--column-visual-tint': column.buttonBgColor || column.borderColor || 'rgba(255, 255, 255, 0.08)'
      };
    }
  }
};
</script>

<template>
  <section class="action-columns-shell">
    <h1 class="slide-title" :style="{ color: general.slideTitleColor }">
      {{ general.slideTitle }}
    </h1>
    <p class="slide-intro" :style="{ color: general.slideIntroColor }">
      {{ general.slideIntro }}
    </p>

    <div
      class="columns-grid"
      :class="{ 'portrait-grid': usesPortraitLayout }"
      :style="{ gridTemplateColumns: `repeat(${gridColumns}, minmax(240px, 1fr))` }"
    >
      <article
        v-for="(column, index) in columns"
        :key="`${column.columnTitle}-${index}`"
        class="actionColumns"
        :class="{ 'portrait-card': usesPortraitLayout && column.columnIconImg }"
        :style="columnStyle(column)"
      >
        <div class="columnHeader" :class="{ 'portrait-header': usesPortraitLayout && column.columnIconImg }">
          <div class="columnVisual" :class="{ 'has-image': column.columnIconImg, 'portrait-visual': usesPortraitLayout && column.columnIconImg }">
            <img
              v-if="column.columnIconImg"
              :src="column.columnIconImg"
              :alt="column.columnTitle"
              class="icon-image"
            />
            <span v-else class="icon-symbol">{{ column.columnIcon }}</span>
          </div>

          <div class="columnContent">
            <h2 class="columnTitle">{{ column.columnTitle }}</h2>
            <p class="columnText">{{ column.columnText }}</p>
          </div>
        </div>

        <div class="columnFooter">
          <div
            v-if="activeSocialsColumn === index"
            class="columnSocials"
          >
            <socials></socials>
          </div>

          <button
            v-if="['share', 'contact', 'quote'].includes(column.buttonLink)"
            type="button"
            class="buttonLink"
            @click="handleAction(column, index)"
          >
            <span>{{ column.buttonText }}</span>
            <span class="buttonArrow" aria-hidden="true">↗</span>
          </button>

          <a
            v-else-if="isExternalLink(column.buttonLink)"
            :href="column.buttonLink"
            class="buttonLink"
            target="_blank"
            rel="noreferrer"
          >
            <span>{{ column.buttonText }}</span>
            <span class="buttonArrow" aria-hidden="true">↗</span>
          </a>

          <a
            v-else
            :href="normalizedPath(column.buttonLink)"
            class="buttonLink"
          >
            <span>{{ column.buttonText }}</span>
            <span class="buttonArrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.action-columns-shell {
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
  margin: 0;
  max-width: 72ch;
  font-size: 1rem;
  line-height: 1.58;
}

.columns-grid {
  display: grid;
  gap: 1rem;
  width: 100%;
  align-items: stretch;
  margin-top: 0.35rem;
}

.columns-grid.portrait-grid {
  gap: 1.15rem;
}

.actionColumns {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100%;
  padding: 1rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    var(--column-surface);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.actionColumns::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: linear-gradient(90deg, var(--column-accent), transparent 72%);
  opacity: 0.95;
}

.columnHeader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 auto;
}

.portrait-header {
  display: grid;
  grid-template-columns: clamp(5.9rem, 10vw, 7rem) minmax(0, 1fr);
  align-items: start;
  gap: 1rem;
}

.columnVisual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 10.5rem;
  aspect-ratio: 5 / 4;
  border-radius: 18px;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 62%),
    rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.columnVisual.has-image {
  background: rgba(255, 255, 255, 0.04);
}

.columnVisual.portrait-visual {
  min-height: auto;
  aspect-ratio: 1 / 1;
  align-self: start;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    rgba(255, 255, 255, 0.025);
}

.icon-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  image-rendering: auto;
}

.icon-symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5.75rem;
  height: 5.75rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--column-accent);
  font-size: clamp(2.2rem, 4.2vw, 3.4rem);
  line-height: 1;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.columnContent {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1 1 auto;
}

.portrait-header .columnContent {
  gap: 0.65rem;
  padding-top: 0.1rem;
}

.columnTitle {
  margin: 0;
  font-size: clamp(1.08rem, 1.45vw, 1.34rem);
  line-height: 1.22;
  color: var(--column-title);
}

.portrait-card .columnTitle {
  font-size: clamp(1.04rem, 1.32vw, 1.24rem);
  line-height: 1.18;
}

.columnText {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.62;
  color: rgba(247, 255, 247, 0.84);
}

.columnFooter {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.columnSocials {
  padding-top: 0.2rem;
}

.columnSocials :deep(.social-list) {
  margin: 0;
  max-width: none;
  padding: 0;
}

.buttonLink {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.78rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  text-decoration: none;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.buttonLink:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.05);
}

.buttonArrow {
  color: var(--column-accent);
  font-size: 1rem;
  line-height: 1;
}

@media (max-width: 960px) {
  .columns-grid {
    grid-template-columns: repeat(2, minmax(240px, 1fr)) !important;
  }

  .portrait-header {
    grid-template-columns: 5.8rem minmax(0, 1fr);
  }
}

@media (max-width: 720px) {
  .columns-grid {
    grid-template-columns: 1fr !important;
  }

  .action-columns-shell {
    padding-top: 1rem;
  }

  .portrait-header {
    grid-template-columns: 1fr;
  }

  .columnVisual.portrait-visual {
    width: min(7rem, 100%);
  }
}
</style>
