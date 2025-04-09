<template>
    <div class="slide-wrapper">
      <div class="form-container">
        <button class="close-btn" @click="closeForm">Close</button>
        <h2>Let’s talk</h2>
        <p>Send us a message and we’ll get back to you shortly.</p>
        <form
          action="https://formsubmit.co/info@agrobots.ai"
          method="POST"
          class="contact-form"
          @submit.prevent="sendForm"
          v-if="!submitted"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="name" required placeholder="Your name" class="input" />
          <input type="email" name="email" required placeholder="Your email" class="input" />
          <textarea name="message" required placeholder="Your message" class="input h-32"></textarea>
          <button type="submit" class="btn send-btn mt-2">Send</button>
        </form>
        <div v-else>
          ✅ Thank you! Your message has been sent.
        </div>
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
        this.$emit("close");
      },
      sendForm() {
        this.submitted = true;
        this.$emit("sent");
        this.$nextTick(() => {
          this.$el.submit();
        });
      }
    }
  };
  </script>

  <style scoped>
  .slide-wrapper {
    background: var(--backgroundDark);
    width: 100vw;
    min-height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    position: relative;
    width: 100%;
    max-width: 500px;
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--backgroundDark);
    color: var(--accent);
    cursor: pointer;
    font-size: 1rem;
    border: 1px solid var(--accent);
    border-radius: 0.2rem;
    padding: 0.5rem;
  }

  h2 {
    color: var(--textLight);
    margin-top: 3rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--textLight);
    margin-bottom: 1.5rem;
  }

  .contact-form {
    background: var(--backgroundDark);
    border: 1px solid var(--primary);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }

  .input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--secondary);
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
    background: var(--backgroundLight);
    color: var(--textDark);
    margin-bottom: 1rem;
  }

  textarea.input {
    resize: vertical;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .send-btn {
    background: var(--backgroundDark);
    color: var(--primary);
    cursor: pointer;
    font-size: 1rem;
    border: 1px solid var(--primary);
    border-radius: 0.2rem;
    padding: 0.5rem;
  }

  .h-32 {
    height: 8rem;
  }

  .mt-2 {
    margin-top: 0.5rem;
  }
  </style>