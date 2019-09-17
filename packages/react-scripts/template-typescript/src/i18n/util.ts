import { PrimitiveType } from "intl-messageformat";
import { createIntl, createIntlCache } from "react-intl";
import deMessages from "./de";
import enMessages, { IAvailableI18nIds } from "./en";
import { generalStore } from "../components/stores/GeneralStore";
import { ILocales } from "./ILocales";

const DEFAULT_LOCALE = "en";

type IMessages = {
    [locale in ILocales]: {
        [message: string]: string;
    }
}

const intlMessages: IMessages = {
    en: enMessages,
    de: deMessages
};

const cache = createIntlCache()

let intl = createIntl({
    locale: DEFAULT_LOCALE,
    messages: intlMessages[DEFAULT_LOCALE]
}, cache)

type MessageIDS = keyof IAvailableI18nIds;

const setLocale = (locale: ILocales) => {
    intl = createIntl({
        locale: locale,
        messages: intlMessages[locale]
    }, cache);

    generalStore.locale = locale;

    console.log(`%cSet locale to "${locale}".`, "background: #eee; color: #666;");
}

const t = (messageId: MessageIDS, values?: Record<string, PrimitiveType>) => {
    return intl.formatMessage({ id: messageId }, values);
}

export { DEFAULT_LOCALE, intl, intlMessages, setLocale, t };
