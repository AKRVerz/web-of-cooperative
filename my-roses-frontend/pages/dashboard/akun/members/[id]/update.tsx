import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import UpdateMemberContent from 'src/components/dashboardPage/akunPage/member/UpdateMemberContent';

const UpdateAdmin = () => {
  return (
    <AdminLayout>
      <UpdateMemberContent />
    </AdminLayout>
  );
};

export default UpdateAdmin;
