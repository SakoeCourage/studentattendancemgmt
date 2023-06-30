import Api from "./Api";
import getCookie from "./getCookie";

export default {
    async register(form) {
        await getCookie();
        return Api.post("/register", form);
    },

    async login(form) {
        await getCookie();
        return Api.post("/login", form);
    },
    async logout() {
        await getCookie();
        return Api.post("/logout");
    },

    async auth() {
        await getCookie();
        return Api.get("/user");
    }

};