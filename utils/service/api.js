import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { objectToFormData } from "../helpers/formDataHelpers";
import { showErrorToast, showSuccessToast } from "../toast/toast";

export const API = {
  getSession: async () => {
    let headers = {};
    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = token;
    }
    try {
      let res = await fetch("https://api.surecarebenefits.com/session", {
        method: "GET",
        headers,
      });
      res = res.json();
      console.log(res);

      return res;
    } catch (error) {
      console.log(error);
    }
  },

  getData: async (resource) => {
    try {
      const res = await fetch("https://api.surecarebenefits.com/" + resource, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  postData: async (resource, data) => {
    let headers = {};

    data = objectToFormData(data);

    if (!data.has("icon")) {
      data = new URLSearchParams(data).toString();
      headers = { "Content-Type": "application/x-www-form-urlencoded" };
    }

    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = token;
    }

    try {
      const res = await fetch("https://api.surecarebenefits.com/" + resource, {
        method: "POST",
        headers,
        body: data,
      });

      let response = await res.json();

      if (response.error) {
        showErrorToast(response.error);
      } else {
        showSuccessToast(`Success: Data stored to ${resource}`);
        return response.data;
      }
    } catch (error) {
      showErrorToast(error);
    }
  },
  putData: async (resource, id, data) => {
    let headers = {};

    data = objectToFormData(data);

    if (!data.has("icon")) {
      data = new URLSearchParams(data).toString();
      headers = { "Content-Type": "application/x-www-form-urlencoded" };
    }

    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = token;
    }

    try {
      const res = await fetch(
        "https://api.surecarebenefits.com/" + resource + "/" + id,
        {
          method: "PUT",
          headers,
          body: data,
        }
      );
      let response = await res.json();

      if (response.error) {
        showErrorToast(response.error);
      } else {
        showSuccessToast(`Success: Data updated in ${resource}`);
        return response.data;
      }
    } catch (error) {
      showErrorToast(error);
    }
  },
  deleteData: async (resource, id) => {
    let headers = {};

    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = token;
    }

    try {
      const res = await fetch(
        "https://api.surecarebenefits.com/" + resource + "/" + id,
        {
          method: "DELETE",
          headers,
        }
      );

      let response = await res.json();

      if (response.error) {
        showErrorToast(response.error);
      } else {
        showSuccessToast(
          `Success: ${response?.data[0]} rows deleted from ${resource}`
        );
        return response;
      }
    } catch (error) {
      showErrorToast(error);
    }
  },
};
