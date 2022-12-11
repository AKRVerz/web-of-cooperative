import React from "react";
import { AdminLayout } from "src/components/pageLayout";
import PembukuanContent from "src/components/dashboardPage/pembukuanPage/PembukuanContent";

const pembukuan = () => {
  return (
    <AdminLayout>
      <PembukuanContent />
    </AdminLayout>
  );
};

export default pembukuan;
