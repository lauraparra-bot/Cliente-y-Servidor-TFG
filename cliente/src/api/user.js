import { ENV } from "../utils";
import { uploadAvatar } from "../firebase/config";

export class User {
  baseApi = ENV.BASE_API;

  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(accessToken, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if(key !== 'avatar' && key !== 'fileAvatar'){
          formData.append(key, data[key]);
        }
      });

      if (data.fileAvatar != null) {
        const url = await uploadAvatar(data.fileAvatar, 'avatar');
        formData.append("avatar", url);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
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

  async getUsers(accessToken, active = undefined) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSearchUser(accessToken, search) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.SEARCH}?name=${search}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(accessToken, idUser, userData) {
    try {
      const data = userData;
      if (!data.password) {
        delete data.password;
      }
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if(key !== 'avatar' && key !== 'fileAvatar'){
          formData.append(key, data[key]);
        }
      });
      if (userData.fileAvatar != null) {
        const url = await uploadAvatar(data.fileAvatar, 'avatar');
        formData.append("avatar", url);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
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

  async deleteUser(accessToken, idUser) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${idUser}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
