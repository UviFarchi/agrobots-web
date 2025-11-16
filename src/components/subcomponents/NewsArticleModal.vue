<template>
  <teleport to="body">
    <div
        v-if="visible && article"
        class="news-modal"
        @click.self="$emit('close')"
    >
      <div class="news-modal-content">
        <button class="news-modal-close" @click="$emit('close')" aria-label="Close article">×</button>
        <div class="news-modal-meta" v-if="article.tag || article.date || article.location">
          <div class="news-modal-tag-row">
            <span v-if="article.tag" class="news-modal-tag">{{ article.tag }}</span>
          </div>
          <div class="news-modal-date-row">
            <span class="news-modal-date">{{ article.date }}</span>
            <span v-if="article.location" class="news-modal-location">{{ article.location }}</span>
          </div>
        </div>
        <h2 class="news-modal-title">{{ article.title }}</h2>
        <div
            v-if="article.summary"
            class="news-modal-summary"
            v-html="article.summary"
        ></div>
        <div class="news-modal-body">
          <div
              v-for="(paragraph, index) in paragraphs"
              :key="index"
              class="news-modal-body-block"
              v-html="paragraph"
          ></div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'NewsArticleModal',
  props: {
    visible: { type: Boolean, default: false },
    article: { type: Object, default: null }
  },
  computed: {
    paragraphs() {
      if (!this.article || !this.article.body)
        return [];
      if (Array.isArray(this.article.body))
        return this.article.body;
      if (typeof this.article.body === 'string' && this.article.body.trim().length)
        return [this.article.body];
      return [];
    }
  }
};
</script>

<style scoped>
.news-modal {
  position: fixed;
  inset: 0;
  background: rgba(10, 12, 14, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2050;
  padding: 1.5rem;
}

.news-modal-content {
  background: var(--backgroundDarkTranslucent, rgba(18,18,18,0.95));
  border-radius: 18px;
  max-width: 720px;
  width: min(90vw, 720px);
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(11, 135, 75, 0.4);
}

.news-modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 2rem;
  background: none;
  color: var(--textLight, #fff);
  border: none;
  cursor: pointer;
}

.news-modal-meta {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.35rem;
  margin: 0 0 0.85rem 0;
  padding-right: 2.4rem; /* keep clear of close button */
}

.news-modal-tag-row {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.news-modal-date-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
}

.news-modal-date {
  font-size: 0.95rem;
  margin: 0;
  color: var(--accent, #ffd54f);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.news-modal-tag {
  font-size: 0.95rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--secondary, #237aff);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid rgba(35, 122, 255, 0.55);
  background: rgba(35, 122, 255, 0.12);
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
}

.news-modal-location {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.85);
  white-space: nowrap;
  letter-spacing: 0.03em;
}

.news-modal-location::before {
  content: '•';
  margin-right: 0.4rem;
  color: rgba(255,255,255,0.55);
}

.news-modal-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.8rem;
  color: var(--primary, #0b874b);
  letter-spacing: 0.01em;
}

.news-modal-summary {
  margin: 0 0 1rem 0;
  font-size: 1.05rem;
  color: var(--alt, #ff8a2b);
  border-left: 4px solid currentColor;
  padding-left: 0.85rem;
  background: rgba(255, 138, 43, 0.08);
  border-radius: 0 8px 8px 0;
}

.news-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  font-size: 1rem;
  color: rgba(255,255,255,0.86);
}

.news-modal-body-block {
  margin: 0;
}
</style>
