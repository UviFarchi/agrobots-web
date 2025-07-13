import { createI18n } from 'vue-i18n';
import quoteMessages from './quote';
import countriesAndRegions from "@/i18n/countriesAndRegions.js";

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
    locale: 'en',
    fallbackLocale: 'en',
    messages
});
