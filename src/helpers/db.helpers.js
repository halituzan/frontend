import axios from "axios";

export const getData = async (settingsValue) => {
    await axios.put(
      `http://localhost:4000/merchant/${settingsValue.id}`,
      {
        merchantID: settingsValue.merchantID,
        ApiKey: settingsValue.ApiKey,
        ApiSecret: settingsValue.ApiSecret,
      },
      { withCredentials: true }
    );
    console.log(settingsValue);
  };