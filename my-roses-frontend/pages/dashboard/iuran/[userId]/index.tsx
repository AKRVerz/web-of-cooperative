import React from 'react';
import IuranListContent from 'src/components/dashboardPage/iuranPage/IuranListContent';
import { AdminLayout } from 'src/components/pageLayout';

const pembukuan = () => {
  return (
    <AdminLayout>
      <IuranListContent />
    </AdminLayout>
  );
};

export default pembukuan;
