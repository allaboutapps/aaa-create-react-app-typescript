import { observable } from "mobx";
import { DEFAULT_LOCALE } from "../../i18n/util";
import { ILocales } from "../../i18n/ILocales";

class GeneralStore {
    @observable locale: ILocales = DEFAULT_LOCALE;
    @observable isLoading = false;
}

const generalStore = new GeneralStore();

export { generalStore };
