export const getUserFilter = (search: string) => {
  return `email CONTAINS "${search}"`;
};
