import { ENV } from "../utils";

export class Menu {
    baseApi = ENV.BASE_API;

    async getMenu(active = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}?active=${active}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}