import { observable } from "mobx";

class GeneralStore {
    @observable isLoading: boolean = false;
}

const generalStore: GeneralStore = new GeneralStore();

export { generalStore };
