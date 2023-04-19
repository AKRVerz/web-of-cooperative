export const getUserFilter = (search: string) => {
  return `username CONTAINS "${search}"`;
};
