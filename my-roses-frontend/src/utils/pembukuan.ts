export const getPembukuanFilter = (search: string) => {
  const filters = `filters=uraian CONTAINS "${search}"`;

  return filters;
};
