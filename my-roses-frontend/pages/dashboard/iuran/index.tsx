import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import IuranContent from 'src/components/dashboardPage/iuranPage/IuranContent';

const pembukuan = () => {
  return (
    <AdminLayout>
      <IuranContent />
    </AdminLayout>
  );
};

export default pembukuan;
