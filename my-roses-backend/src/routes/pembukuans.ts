import { Router } from 'express';
import * as user from '../middleware/users';
import * as pembukuan from '../middleware/pembukuans';

const router = Router();

// POST /pembukuans
router.post(
  '/',
  user.authMw,
  pembukuan.createPembukuanMw,
  pembukuan.returnPembukuanMw
);

// GET /pembukuans
router.get(
  '/',
  user.authMw,
  pembukuan.getPembukuansMw,
  pembukuan.returnPembukuansMw
);

// GET /pembukuans/:id
router.get(
  '/:id',
  user.authMw,
  pembukuan.getPembukuanMw,
  pembukuan.returnPembukuanMw
);

// PATCH /pembukuans/:id
router.patch(
  '/:id',
  user.authMw,
  pembukuan.getPembukuanMw,
  pembukuan.updatePembukuanMw,
  pembukuan.getPembukuanMw,
  pembukuan.returnPembukuanMw
);

// DELETE /pembukuans/:id
router.delete(
  '/:id',
  user.authMw,
  pembukuan.getPembukuanMw,
  pembukuan.deletePembukuanMw
);

export default router;
