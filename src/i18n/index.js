import {createI18n} from 'vue-i18n';
import quoteMessages from './quote';
import countriesAndRegions from "@/i18n/countriesAndRegions.js";
import contact from "@/i18n/contact.js";
import footer from "@/i18n/footer.js";

const locale = localStorage.getItem('lang') || 'en';
const messages = {
    en: {
        ...quoteMessages.en,
        ...countriesAndRegions.en,
        ...contact.en,
        ...footer.en,
    },
    es: {
        ...quoteMessages.es,
        ...countriesAndRegions.es,
        ...contact.es,
        ...footer.es
    }
};

export default createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages
});
