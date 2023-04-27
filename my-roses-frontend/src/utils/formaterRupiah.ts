export const formatRupiah = <T>(money: T) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(money as never);
};
