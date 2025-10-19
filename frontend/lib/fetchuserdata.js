// utils/fetchUserData.js
import axios from "axios";

export const fetchUserData = async (token) => {
  try {
    const { data } = await axios.get("https://your-api.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    // throw err;
    return null;
  }
};
