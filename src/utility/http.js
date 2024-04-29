import axios from "axios";

function useApi() {
  return axios.create({
    baseURL: import.meta.env.VITE_API,
  });
}

export const fetchInventory = async()=> {
    const response = await axios.get("/inventory.php");
    return response.data;
};

export default useApi;
