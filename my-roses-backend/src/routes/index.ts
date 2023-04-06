import { Router } from 'express';
import authsRoutes from './auth';
import filesRoutes from './files';
import usersRoutes from './users';
import pembukuansRoutes from './pembukuans';
import iuransRouters from './iurans';

const router = Router();

router.use('/auth', authsRoutes);
router.use('/files', filesRoutes);
router.use('/users', usersRoutes);
router.use('/pembukuans', pembukuansRoutes);
router.use('/mounts', iuransRouters);

export default router;
