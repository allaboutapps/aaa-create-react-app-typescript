import { observable } from "mobx";

class GeneralStore {
    @observable isLoading: boolean = false;
    @observable animalsTableRefetcher: any;
}

const generalStore: GeneralStore = new GeneralStore();

export { generalStore };
