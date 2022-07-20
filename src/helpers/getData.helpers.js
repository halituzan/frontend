export  const getId = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/info/${id}`);
    setSettingsValue(data);
  };