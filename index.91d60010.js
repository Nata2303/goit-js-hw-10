var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){r[e]=n},e.parcelRequired7c6=t),t.register("gXocT",(function(e,n){var r,t,o,i;function f(e){return fetch(`https://restcountries.com/v3.1/name/${e}?fields=name,capital,population,flags,languages`).then((e=>{if(!e.ok)throw new Error("Country not found");return e.json()})).then((e=>e)).catch((e=>{throw new Error("Failed to fetch countries")}))}r=e.exports,t="fetchCountries",o=function(){return f},Object.defineProperty(r,t,{get:o,set:i,enumerable:!0,configurable:!0})})),t("gXocT");
//# sourceMappingURL=index.91d60010.js.map
