import { ENV } from "../utils";
import { useMemo } from "react";

const baseApi = ENV.BASE_API;

const TFGUserService = () => {
  const createTempTfgUser = async (accessToken, data) => {
    try {
      const url = `${baseApi}/${ENV.API_ROUTES.CREATETEMP_TFGUSER}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateTempTfgUser = async (accessToken, data) => {
    try {
      const url = `${baseApi}/${ENV.API_ROUTES.UPDATETEMP_TFGUSER}`;
      const params = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  };

  const assignTFG = async (accessToken, data) => {
    try {
      const url = `${baseApi}/${ENV.API_ROUTES.ASSIGN_TFG}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  };

  const getMisTFGS = useMemo(
    () => async (email, accessToken) => {
      try {
        const url = `${baseApi}/${ENV.API_ROUTES.MIS_TFGS}?email=${email}`;
        const params = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await fetch(url, params);
        const result = await response.json();

        if (response.status !== 200) throw result;
        return result;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  const deleteTempTFG = async (idTfgUser, accessToken) => {
    try {
      const url = `${baseApi}/${ENV.API_ROUTES.MIS_TFGS}/${idTfgUser}`;
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
  };

  const closeListTFGs = async (usermail, accessToken) => {
    try {
      const url = `${baseApi}/${ENV.API_ROUTES.CERRAR_LISTA}?email=${usermail}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    createTempTfgUser,
    assignTFG,
    getMisTFGS,
    deleteTempTFG,
    updateTempTfgUser,
    closeListTFGs
  };
};

export default TFGUserService;
