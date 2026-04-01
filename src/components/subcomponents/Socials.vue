<script setup>
import {ShareNetwork} from "vue3-social-sharing";

const networks = [
  {
    network: 'email',
    name: 'Email',
    icon: 'far fa-lg fa-envelope',
    color: '#333333'
  },
  {
    network: 'facebook',
    name: 'Facebook',
    icon: 'fab fa-lg fa-facebook-f',
    color: '#1877f2'
  },
  {
    network: 'linkedin',
    name: 'LinkedIn',
    icon: 'fab fa-lg fa-linkedin',
    color: '#007bb5'
  },
  {
    network: 'messenger',
    name: 'Messenger',
    icon: 'fab fa-lg fa-facebook-messenger',
    color: '#0084ff'
  },
  {
    network: 'quora',
    name: 'Quora',
    icon: 'fab fa-lg fa-quora',
    color: '#a82400'
  },
  {
    network: 'reddit',
    name: 'Reddit',
    icon: 'fab fa-lg fa-reddit-alien',
    color: '#ff4500'
  },
  {
    network: 'threads',
    name: 'Threads',
    icon: 'fab fa-lg fa-threads',
    color: '#2b2b2b'
  },
  {
    network: 'telegram',
    name: 'Telegram',
    icon: 'fab fa-lg fa-telegram-plane',
    color: '#0088cc'
  },
  {
    network: 'tumblr',
    name: 'Tumblr',
    icon: 'fab fa-lg fa-tumblr',
    color: '#35465c'
  },
  {
    network: 'x',
    name: 'X',
    icon: 'fab fa-lg fa-x-twitter',
    color: '#1da1f2'
  },
  {
    network: 'whatsapp',
    name: 'Whatsapp',
    icon: 'fab fa-lg fa-whatsapp',
    color: '#25d366'
  },
  {
    network: 'bluesky',
    name: 'Bluesky',
    icon: 'fab fa-lg fa-bluesky',
    color: '#123456'
  }
];
const sharingInfo = {
  title: 'Agrobots',
  url: 'https://agrobots.ai',
  description: 'Terrain Management as a Service'
};
</script>

<template>
  <div>
    <div class="social-list">
      <share-network
          v-for="network in networks"
          :key="network.network"
          v-slot="{ share }"
          :network="network.network"
          :title="sharingInfo.title"
          :url="sharingInfo.url"
          :description="sharingInfo.description"
      >
        <div
            class="social-network-button"
            @click="share"
            :style="{ backgroundColor: network.color }"
        >
          <i :class="network.icon"></i>
        </div>
      </share-network>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.social-list {
  max-width: 900px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 items per row */
  gap: 0.6rem;
  padding: 10px;
}

.social-network-button {
  aspect-ratio: 1/1; /* Make buttons square */
  color: var(--textLight);
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 3rem;
}

.social-network-button i {


}

.social-network-button span {
  font-weight: 700;
  padding: 0.7rem;
}


@media (max-width: 768px) {
  .social-list {
    grid-template-columns: repeat(3, 1fr);
  }
}


@media (max-width: 480px) {
  .social-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
