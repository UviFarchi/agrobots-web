import { createRouter, createWebHistory } from 'vue-router';
import SlideDeck from '../components/SlideDeck.vue';
import QuoteBuilder from '../components/QuoteBuilder.vue';

const redirectToDemo = () => {
    if (typeof window !== 'undefined') {
        window.location.replace('/demo/index.html');
    }
    return false;
};

const routes = [
    { path: '/', component: SlideDeck },
    { path: '/quote', component: QuoteBuilder },
    {
        path: '/:pathMatch(.*)*',
        beforeEnter: (to) => {
            if (to.path === '/demo' || to.path === '/demo/' || to.path.startsWith('/demo/')) {
                return redirectToDemo();
            }
            return { path: '/' };
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
