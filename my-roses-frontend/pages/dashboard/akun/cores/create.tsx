import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import CreateCoreContent from 'src/components/dashboardPage/akunPage/core/CreateCoreContent';

const CreateAdmin = () => {
  return (
    <AdminLayout>
      <CreateCoreContent />
    </AdminLayout>
  );
};

export default CreateAdmin;
