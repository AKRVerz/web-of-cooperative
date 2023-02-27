import React from 'react';
import IuranCreate from 'src/components/dashboardPage/iuranPage/IuranCreate';
import { AdminLayout } from 'src/components/pageLayout';

const IuranDetail = () => {
  return (
    <AdminLayout>
      <IuranCreate />
    </AdminLayout>
  );
};

export default IuranDetail;
