import axios from "axios";
import { secret } from "./keys";

export const setMerchantData = async (merchant) => {
  await axios.put(
    `${secret.END_POINT_SELF}/merchant/${merchant._id}`,
    {
      merchantID: merchant.merchantID,
      ApiKey: merchant.ApiKey,
      ApiSecret: merchant.ApiSecret,
    },
    { withCredentials: true }
  );
};
export const setProfileImage = async (merchant, images, isActive) => {
  await axios.put(
    `${secret.END_POINT_SELF}/profile-image/${merchant._id}`,
    {
      profileImage: images,
      profileActive: isActive
    },
    { withCredentials: true }
  );
};
export const setGroupData = async (id, group) => {
  await axios.put(
    `${secret.END_POINT_SELF}/groups/${id}`,
    {
      groups: {
        id: group.id,
        groupName: group.groupName,
        groupBarcode: group.groupBarcode.split(","),
        listPrice: group.listPrice,
        salePrice: group.salePrice,
        quantity: group.quantity,
      },
    },
    { withCredentials: true }
  );
};
export const updateGroupItems = async (values) => {
  await axios.put(
    `${secret.END_POINT_SELF}/update-groups/${values._id}`,
    {
      groups: values.groups,
    },
    { withCredentials: true }
  );
};

export const getData = async (id, set) => {
  const { data } = await axios.get(`${secret.END_POINT_SELF}/info/${id}`);
  set(data);
};
