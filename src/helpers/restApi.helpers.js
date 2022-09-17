import axios from "axios";
import { secret } from "./keys";
import { encode as base64_encode } from "base-64";
import jwt_decode from "jwt-decode";


export const fetchData = async (datas, setterFunc, p = 0, size = 50) => {
  const ApiKey = jwt_decode(datas?.ApiKey).id;
  const ApiSecret = jwt_decode(datas?.ApiSecret).id;
  const BasicAuth = base64_encode(ApiKey + ":" + ApiSecret);

  const { data } = await axios.get(
    secret.END_POINT +
      `${datas.merchantID}/products?approved=True&page=${p}&size=${size}&archived=false`,
    {
      "User-Agent": `${datas.merchantID} - SelfIntegration`,
      headers: {
        Authorization: `Basic ${BasicAuth}`,
      },
    }
  );

  setterFunc(data);
};
export const fetchSingleData = async (datas, barcode, set) => {
  const ApiKey = jwt_decode(datas?.ApiKey).id;
  const ApiSecret = jwt_decode(datas?.ApiSecret).id;
  const BasicAuth = base64_encode(ApiKey + ":" + ApiSecret);

  const { data } = await axios.get(
    secret.END_POINT + `${datas.merchantID}/products?barcode=${barcode}`,
    {
      "User-Agent": `${datas.merchantID} - SelfIntegration`,

      headers: {
        Authorization: `Basic ${BasicAuth}`,
      },
    }
  );
  set(data);
};

export const sendData = async (datas, items) => {
  const ApiKey = jwt_decode(datas?.ApiKey).id;
  const ApiSecret = jwt_decode(datas?.ApiSecret).id;
  const BasicAuth = base64_encode(ApiKey + ":" + ApiSecret);

  await axios.post(
    secret.END_POINT + `${datas.merchantID}/products/price-and-inventory`,
    {
      items,
    },
    {
      "User-Agent": `${datas.merchantID} - SelfIntegration`,

      headers: {
        Authorization: `Basic ${BasicAuth}`,
        "Content-Type": "application/json",
      },
    }
  );
};
