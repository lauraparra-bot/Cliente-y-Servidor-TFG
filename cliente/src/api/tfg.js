import { ENV } from "../utils";
import { uploadAvatar } from "../firebase/config";

export class Tfg {
  baseApi = ENV.BASE_API;

  async createTfg(accessToken, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "file" && key !== "miniature") {
          formData.append(key, data[key]);
        }
      });

      if (data.file != null) {
        const url = await uploadAvatar(data.file, "tfg");
        formData.append("miniature", url);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.TFG}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTfgs(params) {
    try {
      const { user } = params;
      const pageFilter = `page=${params?.page || 1}`;
      const limitFilter = `limit=${params?.limit || 10}`;
      const usuario = `user=${user?.email || ""}`;
      const url = `${this.baseApi}/${ENV.API_ROUTES.TFG}?${pageFilter}&${limitFilter}&${usuario}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTfg(accessToken, idTfg, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "file" && key !== "miniature") {
          formData.append(key, data[key]);
        }
      });

      if (data.file != null) {
        const url = await uploadAvatar(data.file, "tfg");
        formData.append("miniature", url);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.TFG}/${idTfg}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteTfg(accessToken, idTfg) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.TFG}/${idTfg}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
    } catch (error) {
      throw error;
    }
  }
}
