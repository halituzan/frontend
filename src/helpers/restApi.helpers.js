import axios from "axios";
import { parseSecrets } from "./jwt.helpers";
import { secret } from "./keys";
import { decode as base64_decode, encode as base64_encode } from "base-64";

export const fetchData = async (datas, setterFunc, p=0) => {
  console.log(p);
  const { data } = await axios.get(
    secret.END_POINT +
      `${datas.merchantID}/products?approved=True&page=${p}&size=50&archived=false`,
    {
      "User-Agent": `${datas.merchantID} - SelfIntegration`,
      headers: {
        Authorization: `Basic ${base64_encode(
          parseSecrets(datas.ApiKey).id + ":" + parseSecrets(datas.ApiSecret).id
        )}`,
        "access-control-allow-origin": "*",
      },
    }
  );
  setterFunc(data);
};
