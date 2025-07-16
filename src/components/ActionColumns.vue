<script>
import Socials from './subcomponents/Socials.vue';

export default {
  name: 'ActionColumns',
  emits: ['contact'],
  components: { Socials },
  props: {
    title: {type: String, required: true},
    columns: { type: Array, required: true },
    general: {
      type: Object,
      default: () => ({
        slideTitle: '',
        slideTitleColor: '',
        slideIntro: '',
        slideIntroColor: '',
        columnsPerRow: Number
      })
    },
    currentSlideIndex: { type: Number, default: 0 }
  },
  data() {
    return { activeSocialsColumn: null };
  },
  computed: {
    rows() {
      const out = [];
      for (let i = 0; i < this.columns.length; i += this.general.columnsPerRow)
        out.push(this.columns.slice(i, i + this.general.columnsPerRow));
      return out;
    }
  },
  methods: {
    toggleSocials(index) {
      this.activeSocialsColumn = this.activeSocialsColumn === index ? null : index;
    },
    contactButtonClicked() {
      this.$emit('contact');
    }
  }
};
</script>

<template>
  <h1 class="slide-title" :style="{ color: general.slideTitleColor }">
    {{ general.slideTitle }}
  </h1>
  <p class="slide-intro" :style="{ color: general.slideIntroColor }">
    {{ general.slideIntro }}
  </p>
  <div class="columnsContainer">
    <div
        class="columnsRow"
        v-for="(row, rowIndex) in rows"
        :key="'row-' + rowIndex"
    >
      <div
          class="actionColumns"
          v-for="(column, colIndex) in row"
          :key="column.columnTitle"
          :style="{
          backgroundColor: column.columnsBgColor,
          color: column.textColor,
          borderColor: column.borderColor,
          borderStyle: 'solid',
          borderWidth: column.borderWidth ? column.borderWidth + 'px' : '1px'
        }"
      >
        <div class="columnIcon">
          <img
              v-if="column.columnIconImg"
              :src="column.columnIconImg"
              :alt="column.columnTitle + ' icon'"
              class="icon-image"
          />
          <span v-else>{{ column.columnIcon }}</span>
        </div>
        <h2 class="columnTitle">{{ column.columnTitle }}</h2>
        <p class="columnText">{{ column.columnText }}</p>
        <socials v-if="activeSocialsColumn === (rowIndex * general.columnsPerRow + colIndex)"></socials>
        <a
            v-if="column.buttonLink === 'share'"
            href="javascript:;"
            class="buttonLink"
            :style="{
            backgroundColor: column.buttonBgColor,
            color: column.buttonTextColor,
            borderColor: column.buttonBorderColor,
            borderStyle: 'solid'
          }"
            @click="toggleSocials(rowIndex * general.columnsPerRow + colIndex)"
        >
          {{ column.buttonText }}
        </a>
        <a
            v-else-if="column.buttonLink === 'contact'"
            href="javascript:;"
            class="buttonLink"
            :style="{
            backgroundColor: column.buttonBgColor,
            color: column.buttonTextColor,
            borderColor: column.buttonBorderColor,
            borderStyle: 'solid'
          }"
            @click="contactButtonClicked"
        >
          {{ column.buttonText }}
        </a>
        <a
            v-else
            :href="column.buttonLink"
            class="buttonLink"
            target="_blank"
            :style="{
            backgroundColor: column.buttonBgColor,
            color: column.buttonTextColor,
            borderColor: column.buttonBorderColor,
            borderStyle: 'solid'
          }"
        >
          {{ column.buttonText }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.columnsContainer {
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  width: 100%;
  gap: 1.5rem;
  align-items: center;
}

.columnsRow {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
}

.actionColumns {
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 0px;
  min-width: 240px;
  max-width: 340px;
  position: relative;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 0.5rem;
}

.columnTitle {
  text-align: center;
  margin: 1.2rem 0 0.5rem 0;
}

.columnText {
  margin: 1rem;
  justify-self: start;
}

.buttonLink {
  width: 55%;
  height: 44px;
  margin-top: auto;
  margin-bottom: 14px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  font-size: 1.04rem;
}

.slide-title {
  text-align: center;
  margin-top: 1.2rem;
}
.slide-intro {
  text-align: center;
  margin: 1.2rem;
}

.columnIcon {
  text-align: center;
  margin: 1.2rem 0 0.2rem 0;
  font-size: 4rem;
  min-height: 70px;
  min-width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  background: #222;
  box-shadow: 0 2px 12px #0003;
  display: inline-block;
  max-width: 100px;
}

@media (max-width: 1100px) {
  .columnsRow {
    flex-wrap: wrap;
    gap: 1rem;
  }
  .actionColumns {
    min-width: 220px;
    max-width: 45vw;
  }
}
@media (max-width: 768px) {
  .columnsContainer {
    flex-direction: column;
    gap: 0.8rem;
  }
  .columnsRow {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
  }
  .actionColumns {
    width: 92vw;
    min-width: 0;
    max-width: 100vw;
    margin: 0.3rem 0;
  }
}
</style>
