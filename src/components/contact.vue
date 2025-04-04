<template>
  <div class="slide-wrapper">
    <button class="close-btn" @click="closeForm">Close</button>
    <h2>Let’s talk</h2>
    <p >Send us a message and we’ll get back to you shortly.</p>
    <form
        action="https://formsubmit.co/info@agrobots.ai"
        method="POST"
        class="space-y-4 w-full"
        @submit.prevent="sendForm"
        v-if="!submitted"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="name" required placeholder="Your name" class="input" />
      <input type="email" name="email" required placeholder="Your email" class="input" />
      <textarea name="message" required placeholder="Your message" class="input h-32"></textarea>
      <button type="submit" class="btn btn-accent mt-2">Send</button>
    </form>
    <div v-else>
      ✅ Thank you! Your message has been sent.
    </div>
  </div>
</template>

<script>
export default {
  name: "contact",
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    closeForm() {
      this.$emit('close');
    },
    sendForm() {
      this.submitted = true;
      this.$emit('sent');
      // Actually submitting the form after emitting the event can be done by:
      this.$nextTick(() => {
        this.$el.submit();
      });
    }
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  background: #fff;
  color: #1e1e1e;
}
textarea.input {
  resize: vertical;
}
.close-btn {
  background: transparent;
  border: none;
  color: #ffeb3b;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>