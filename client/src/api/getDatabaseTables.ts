import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function getDatabasesTables(url: string) {
  try {
    const res = await axios.post(`${BASE_URL}/quick/connect`, {
      connection_url: url,
    });

    if (res.status == 200) {
      return { tables: res.data.tables, data: res.data.data };
    }
  } catch (error) {
    console.error(error);
  }
}
