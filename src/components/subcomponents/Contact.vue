<template>
      <div class="form-container">
        <button class="close-btn" @click="closeForm">{{ $t('contact.close') }}</button>
        <h1>{{ $t('contact.title') }}</h1>
        <p>{{ $t('contact.description') }}</p>
        <form @submit.prevent="sendForm" v-if="!submitted">
          <input type="text" v-model="form.name" required :placeholder="$t('contact.name')" class="input" />
          <input type="email" v-model="form.email" required :placeholder="$t('contact.email')" class="input" />
          <textarea v-model="form.message" required :placeholder="$t('contact.message')" class="input h-32"></textarea>
          <button type="submit" class="btn send-btn mt-2">{{ $t('contact.send') }}</button>
        </form>
        <div v-else>
          {{ $t('contact.sent') }}
        </div>
      </div>
  </template>

  <script>
  export default {
    name: "contact",
    data() {
      return {
        submitted: false,
        form: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      closeForm() {
        this.$emit("close");
      },
      async sendForm() {
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.form)
          });
          if (!res.ok) throw new Error('Request failed');
          this.submitted = true;
          this.$emit("sent");
        } catch (err) {
          console.error(err);
          alert(this.$t('contact.error'));
        }
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

  h1 {
    color: var(--secondary);
    margin-top: 3rem;
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
    border: 1px solid var(--primary);
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
    background: var(--backgroundDark);
    color: var(--primary);
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
    background: var(--accent);
    color: var(--textDark);
    cursor: pointer;
    font-size: 1rem;
    border: 1px solid var(--accent);
    border-radius: 0.2rem;
    padding: 0.5rem;
  }

  .h-32 {
    height: 8rem;
  }

  .mt-2 {
    margin-top: 0.5rem;
  }


  .contact-container > div {
    width: 100%;

    margin: auto;
    background-color: var(--backgroundDark);
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  /* Mobile specific adjustments */
  @media (max-width: 768px) {
    .contact-container {
      padding: 0.5rem;
    }

    .contact-container > div {
      width: 95%;
      max-height: 90vh;
      overflow-y: auto;
    }
  }
  </style>