<template>
  <div class="slide-wrapper">
    <h1>What can bioromes do?</h1>
    <p>
      Our system can be adapted to many uses.
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
          title: 'Agricultural Automation',
          backText:
              'Make it grow food on it\'s own. It can be used to grow food in a controlled environment, reducing the need for human labor and increasing efficiency. When aliens get here millions of years in the future, they will find the bioromes faithfully keeping the land, millions of years after their creators had been turned to dust.'
        },
        {
          icon: '🧠',
          title: 'Brownfield Remediation',
          backText:
              'The same way we can instruct the AI to achieve productivity goals, we can instruct it to achieve remediation goals. The biorome can be used to clean up contaminated land, restoring it to a healthy state. Using natural processes to implement bioremediation solutions, along-side physical means of decontamination performed by the bots.'
        },
        {
          icon: '🌾',
          title: 'Ecological Monitoring',
          backText:
              'Delicate areas of the world can be monitored and protected. The biorome can be used to monitor and protect delicate ecosystems, such as wetlands or coral reefs. By using AI to analyze data from sensors and cameras, we can identify threats to these ecosystems and take action to protect them. This includes monitoring for invasive species, wildfire prevention, and climate change impacts.'
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
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 20px; /* Adjust the gap as needed */
}

</style>
