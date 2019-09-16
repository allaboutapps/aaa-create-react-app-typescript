import { observable } from "mobx";

class GeneralStore {
    @observable isLoading = false;
}

const generalStore: GeneralStore = new GeneralStore();

export { generalStore };
