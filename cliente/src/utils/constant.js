const SERVER_IP = "tfg-nom201sss-lauraparra-bot.vercel.app";

export const ENV = {
    BASE_PATH: `https://${SERVER_IP}`,
    BASE_API: `https://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        USER_ME: "user/me",
        USER: "user",
        USERS: "users",
        SEARCH: "search",
        TFG: "tfg",
        CREATETEMP_TFGUSER: "mistfgs/crear",
        UPDATETEMP_TFGUSER: "mistfgs/actualizar",
        ASSIGN_TFG: "mistfgs/asignar",
        MIS_TFGS: "mistfgs",
        CERRAR_LISTA: "mistfgs/cerrarlistado",
        MENU: "menu",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
    },

};