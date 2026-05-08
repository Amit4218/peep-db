import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function getDatabases() {
  try {
    const res = await axios.get(`${BASE_URL}/get-saved-dbs`);

    if (res.status == 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
  }
}
