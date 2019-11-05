import { Service } from "@tsed/common";


@Service()
export default class DependencyService {
    private static instance: DependencyService;

    private constructor() {
        if (DependencyService.instance) {

        } else {
            DependencyService.instance = this;
        }
    }

    static createInstance(): DependencyService {
        if (!this.instance) {
            this.instance = new DependencyService();
        }

        return this.instance;
    }

    static get(): DependencyService {
        return this.instance;
    }
}
