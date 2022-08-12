import axios from "axios";
import { secret } from "./keys";
import { encode as base64_encode } from "base-64";
import jwt_decode from 'jwt-decode'
export const fetchData = async (datas, setterFunc, p = 0, size = 50) => {
  const { data } = await axios.get(
    secret.END_POINT +
    `${datas.merchantID}/products?approved=True&page=${p}&size=${size}&archived=false`,
    {
      "User-Agent": `${datas.merchantID} - SelfIntegration`,
      headers: {
        Authorization: `Basic ${base64_encode(
          jwt_decode(datas?.ApiKey).id + ":" + jwt_decode(datas?.ApiSecret).id
        )}`,
      },
    }
  );

  setterFunc(data);
};
export const fetchSingleData = async (datas, barcode, set) => {
  const { data } = await axios.get(
    secret.END_POINT +
    `${datas.merchantID}/products?barcode=${barcode}`,
    {
      "User-Agent": `${datas.merchantID} - SelfIntegration`,

      headers: {
        Authorization: `Basic ${base64_encode(
          jwt_decode(datas?.ApiKey).id + ":" + jwt_decode(datas?.ApiSecret).id
        )}`,
      },
    }
  );
  set(data);
};

export const sendData = async (values, items) => {
  await axios.post(
    secret.END_POINT + `${values.merchantID}/products/price-and-inventory`,
    {
      items,
    },
    {
      "User-Agent": `${values.merchantID} - SelfIntegration`,

      headers: {
        Authorization: `Basic ${base64_encode(
          jwt_decode(values?.ApiKey).id +
          ":" +
          jwt_decode(values?.ApiSecret).id
        )}`,
        "Content-Type": "application/json",
      },
    }
  );
};
