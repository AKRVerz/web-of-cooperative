import React from 'react';
import IuranUpdate from 'src/components/dashboardPage/iuranPage/IuranUpdate';
import { AdminLayout } from 'src/components/pageLayout';

const updateIuran = () => {
  return (
    <AdminLayout>
      <IuranUpdate />
    </AdminLayout>
  );
};

export default updateIuran;
