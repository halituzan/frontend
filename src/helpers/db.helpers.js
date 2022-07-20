import axios from "axios";

export const getData = async (settingsValue) => {
  await axios.put(
    `http://localhost:4000/merchant/${settingsValue._id}`,
    {
      merchantID: settingsValue.merchantID,
      ApiKey: settingsValue.ApiKey,
      ApiSecret: settingsValue.ApiSecret,
    },
    { withCredentials: true }
  );
};

export const getId = async (id,set) => {
  const { data } = await axios.get(`http://localhost:4000/info/${id}`);
  set(data);
};
