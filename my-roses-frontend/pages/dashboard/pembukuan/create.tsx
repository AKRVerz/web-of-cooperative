import React from 'react';
import PembukuanCreate from 'src/components/dashboardPage/pembukuanPage/PembukuanCreate';
import { AdminLayout } from 'src/components/pageLayout';

const LaporanDetail = () => {
  return (
    <AdminLayout>
      <PembukuanCreate />
    </AdminLayout>
  );
};

export default LaporanDetail;
