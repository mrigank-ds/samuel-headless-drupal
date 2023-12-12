const siteConfig = {
  defaultLocale: "en",
  locales : {
      "en" : {
        name : "English",
        path : '/',
        langcode : 'en'
      },
      "fr" : {
        name : "French",
        path : '/fr',
        langcode : 'fr'
      }
    },
};

/**
 * 
 *   en: {
      name: "English",
      path: "/",
      langcode: "en",
    },
    fr: {
      name: "French",
      path: "/fr",
      langcode: "fr",
    }
 */
module.exports = siteConfig;