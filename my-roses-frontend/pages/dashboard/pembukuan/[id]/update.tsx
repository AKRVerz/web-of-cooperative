import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import PembukuanUpdate from 'src/components/dashboardPage/pembukuanPage/PembukuanUpdate';

const UpdateAdmin = () => {
  return (
    <AdminLayout>
      <PembukuanUpdate />
    </AdminLayout>
  );
};

export default UpdateAdmin;
