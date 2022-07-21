export const sortAz = (a, b) => {
    return a.groupName - b.groupName  ||  a.name.localeCompare(b.name);
};
