import { Router } from 'express';
import * as user from '../middleware/users';
import * as iuran from '../middleware/iuran';

const router = Router();

//Post /iurans
router.post('/', user.authMw, iuran.createIuranMw, iuran.returnIuranMw);

//GET /iurans
router.get('/', user.authMw, iuran.getIuransMw, iuran.returnIuransMw);

//GET /iurans/:id
router.get('/:id', user.authMw, iuran.getIuranMw, iuran.returnIuranMw);

//PATCH /iurans/:id
router.patch(
  '/:id',
  user.authMw,
  iuran.getIuranMw,
  iuran.updateIuranMw,
  iuran.getIuranMw,
  iuran.returnIuranMw
);

//DELETE /iurans/:id
router.delete('/:id', user.authMw, iuran.getIuranMw, iuran.deleteIuranMw);

export default router;
