/**
 * i18n setup for testing without having to mock i18n
 */

import i18n from 'i18next';

i18n
    .use('en')
    .init({
        fallbackLng: 'cimode',
        debug: false,
        saveMissing: false,

        interpolation: {
            escapeValue: false,
        },

        react: {
            wait: false,
            nsMode: 'fallback',
        },
    });

export default i18n;
