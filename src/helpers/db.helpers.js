import axios from "axios";

export const setMerchantData = async (merchant) => {
  await axios.put(
    `http://localhost:4000/merchant/${merchant._id}`,
    {
      merchantID: merchant.merchantID,
      ApiKey: merchant.ApiKey,
      ApiSecret: merchant.ApiSecret,
    },
    { withCredentials: true }
  );
};
export const setGroupData = async (id, group) => {
  await axios.put(
    `http://localhost:4000/groups/${id}`,
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
    `http://localhost:4000/update-groups/${values._id}`,
    {
      groups: values.groups,
    },
    { withCredentials: true }
  );
};

export const getData = async (id, set) => {
  const { data } = await axios.get(`http://localhost:4000/info/${id}`);
  set(data);
};
