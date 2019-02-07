import { observable } from "mobx";
import { TranslatorFunction } from "../../i18n/util";

class UIHelpers {
    @observable __!: TranslatorFunction;
}

export const ui = new UIHelpers();
