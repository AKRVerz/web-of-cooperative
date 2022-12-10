import React from 'react';
import { AdminLayout } from 'src/components/pageLayout';
import MemberContent from 'src/components/dashboardPage/akunPage/member/MemberContent';

const Admins = () => {
  return (
    <AdminLayout>
      <MemberContent />
    </AdminLayout>
  );
};

export default Admins;
