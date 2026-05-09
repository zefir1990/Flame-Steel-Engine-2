import { localizedStrings } from "./localizedStrings.js";
export class Translator {
    constructor() {
        const userLanguage = navigator.language || navigator.userLanguage;
        this.locale = userLanguage.startsWith("ru") ? "ru" : "en";
        console.log(`Translator: detected locale: ${this.locale} (from: ${userLanguage})`);
    }
    translatedStringForKey(key) {
        if (!(this.locale in localizedStrings)) {
            return `No locale: "${this.locale}" - key: "${key}"`;
        }
        if (!(key in localizedStrings[this.locale])) {
            return `No key: "${key}" - locale: "${this.locale}"`;
        }
        const output = localizedStrings[this.locale][key];
        return output;
    }
}
