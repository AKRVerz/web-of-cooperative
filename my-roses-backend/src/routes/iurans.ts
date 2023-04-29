import { Router } from 'express';
import * as user from '../middleware/users';
import * as iuran from '../middleware/iuran';

const router = Router();

//Post /mounts
router.post('/', user.authMw, iuran.createIuranMw, iuran.returnIuranMw);

//GET /mounts
router.get('/', user.authMw, iuran.getIuransMw, iuran.returnIuransMw);

//GET /mounts/:id
router.get('/:id', user.authMw, iuran.getIuranMw, iuran.returnIuranMw);

//PATCH /mounts/:id
router.patch(
  '/:id',
  user.authMw,
  iuran.getIuranMw,
  iuran.updateIuranMw,
  iuran.getIuranMw,
  iuran.returnIuranMw
);

//DELETE /mounts/:id
router.delete('/:id', user.authMw, iuran.getIuranMw, iuran.deleteIuranMw);

export default router;
