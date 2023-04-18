export const getUserFilter = (search: string) => {
  const filters = `filters=email CONTAINS '${search}'`;

  return filters;
};
