import { createRouter, createWebHistory } from 'vue-router';
import SlideDeck from '../components/SlideDeck.vue';
import QuoteBuilder from '../components/QuoteBuilder.vue';

const routes = [
    { path: '/', component: SlideDeck },
    { path: '/quote', component: QuoteBuilder }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
