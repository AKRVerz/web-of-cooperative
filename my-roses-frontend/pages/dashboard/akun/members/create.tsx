import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import CreateMemberContent from 'src/components/dashboardPage/akunPage/member/CreateMemberContent';

const CreateAdmin = () => {
  return (
    <AdminLayout>
      <CreateMemberContent />
    </AdminLayout>
  );
};

export default CreateAdmin;
