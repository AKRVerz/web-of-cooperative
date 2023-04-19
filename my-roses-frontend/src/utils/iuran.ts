export const getIuranFilter = (search: string) => {
  const filters = `filters=username CONTAINS "${search}"`;

  return filters;
};
