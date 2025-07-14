import { createI18n } from 'vue-i18n';
import quoteMessages from './quote';
import countriesAndRegions from "@/i18n/countriesAndRegions.js";
const locale = localStorage.getItem('locale') || 'en';
const messages = {
    en: {
        ...quoteMessages.en,
        ...countriesAndRegions.en
    },
    es: {
        ...quoteMessages.es,
        ...countriesAndRegions.es
    }
};

export default createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages
});
