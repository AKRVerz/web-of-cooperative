import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import IuranUpdate from 'src/components/dashboardPage/iuranPage/IuranUpdate';
import { AdminLayout } from 'src/components/pageLayout';
import { resources as resourcesAction } from 'src/store/actions';
import { RESOURCE_NAME } from 'src/utils/constant';

const updateIuran = () => {
  const router = useRouter();
  const iuranId = router.query.iuranId as string;

  useEffect(() => {
    if (!router.isReady) return;

    resourcesAction.getDataById(RESOURCE_NAME.IURANS, +iuranId)();
  }, [router.isReady]);

  return <AdminLayout>{<IuranUpdate />}</AdminLayout>;
};

export default updateIuran;
