import axios from "axios";
import { parseSecrets } from "./jwt.helpers";
import { secret } from "./keys";
import { decode as base64_decode, encode as base64_encode } from "base-64";

export const fetchData = async (datas, setterFunc, p = 0, size = 50) => {
  const { data } = await axios.get(
    secret.END_POINT +
      `${datas.merchantID}/products?approved=True&page=${p}&size=${size}&archived=false`,
    {
      "User-Agent": `${datas.merchantID} - SelfIntegration`,

      headers: {
        Authorization: `Basic ${base64_encode(
          parseSecrets(datas.ApiKey).id + ":" + parseSecrets(datas.ApiSecret).id
        )}`,
      },
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      // },
      // proxy: "http://localhost:3000",
    }
  );
  setterFunc(data);
};

export const sendData = async (values, items) => {
  console.log({
    items,
  });
  await axios.post(
    secret.END_POINT + `${values.merchantID}/products/price-and-inventory`,
    {
      items,
    },
    {
      "User-Agent": `${values.merchantID} - SelfIntegration`,

      headers: {
        Authorization: `Basic ${base64_encode(
          parseSecrets(values.ApiKey).id +
            ":" +
            parseSecrets(values.ApiSecret).id
        )}`,
        "Content-Type": "application/json",
      },
    }
  );
};
