<template>
  <div class="slide-wrapper">
    <h1 class="slide-title">What’s Wrong with Farming?</h1>
    <p>
      Modern agriculture has grown incredibly efficient—but at a cost to our soil, water, and ecosystems.
      Here are four key challenges we face today:
    </p>
    <div class="card-grid">
      <div
          v-for="(card, i) in cards"
          :key="i"
          class="flip-card"
          @mouseenter="handleMouseEnter(i)"
          @mouseleave="handleMouseLeave(i)"
          @click="handleClick(i)"
      >
        <div class="flip-card-inner" :class="{ flipped: isFlipped(i) }">
          <!-- FRONT SIDE -->
          <div class="flip-card-front">
            <div class="cardIcon">{{ card.icon }}</div>
            <div class="cardTitle">{{ card.title }}</div>
          </div>

          <!-- BACK SIDE -->
          <div class="flip-card-back">
            <div class="cardTitle">{{ card.title }}</div>
            <p>{{ card.backText }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'issue',
  data() {
    return {
      hoveredIndex: -1,         // The card currently hovered, -1 if none
      lockedSet: new Set(),     // Which cards are locked (persist flipped)
      cards: [
        {
          icon: '🌍',
          title: 'Less Damage',
          backText:
              'Farming must reduce runoff, emissions, and long-term harm to soil and water.Farming must reduce runoff, emissions, and long-term harm to soil and water.Farming must reduce runoff, emissions, and long-term harm to soil and water.Farming must reduce runoff, emissions, and long-term harm to soil and water.Farming must reduce runoff, emissions, and long-term harm to soil and water.'
        },
        {
          icon: '🧠',
          title: 'Smarter Systems',
          backText:
              'We need adaptive, AI-driven ecosystems, not just bigger machinery.'
        },
        {
          icon: '🌾',
          title: 'More Food, Less Waste',
          backText:
              'Yields must increase, but we must also cut waste in transport, storage, and distribution.'
        },
        {
          icon: '🕰️',
          title: 'Long-Term Thinking',
          backText:
              'Farms must be resilient and regenerative, ready for a changing climate.'
        }
      ]
    };
  },
  methods: {
    handleMouseEnter(i) {
      // If this card isn't locked, set hovered
      if (!this.lockedSet.has(i)) {
        this.hoveredIndex = i;
      }
    },
    handleMouseLeave(i) {
      // If hovered card is the same and it's not locked, reset hover
      if (this.hoveredIndex === i && !this.lockedSet.has(i)) {
        this.hoveredIndex = -1;
      }
    },
    handleClick(i) {
      // Toggle the card's locked state
      if (this.lockedSet.has(i)) {
        // If it's already locked, unlock it
        this.lockedSet.delete(i);
        // If user was hovering, keep hoveredIndex = i so it stays flipped until mouse leaves
      } else {
        // Lock it (keep it flipped)
        this.lockedSet.add(i);
      }
    },
    isFlipped(i) {
      // A card is flipped if it's locked OR currently hovered
      return this.lockedSet.has(i) || this.hoveredIndex === i;
    }
  }
};
</script>

<style scoped>


</style>
