import _ from 'lodash';
import { asyncMw } from 'express-asyncmw';
import repository from '../repository';

export const createPembukuanMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

  const data = await repository.pembukuan.resourceToModel(req.body);
  req.pembukuan = await repository.pembukuan.create(data);

  return next();
});

export const getPembukuanMw = asyncMw(async (req, res, next) => {
  const pembukuan = await repository.pembukuan.findOne(req.params.id);

  if (!pembukuan)
    return res.status(404).json({ message: 'Pembukuan not found' });

  req.pembukuan = pembukuan;

  return next();
});

export const getPembukuansMw = asyncMw(async (req, res, next) => {
  req.pembukuans = await repository.pembukuan.findAll(
    {},
    req.filterQueryParams,
    req.query
  );

  return next();
});

export const updatePembukuanMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

  const data = await repository.pembukuan.resourceToModel(req.body);
  const pembukuan = await repository.pembukuan.update(req.params.id, data);

  req.pembukuan = pembukuan;

  return next();
});

export const deletePembukuanMw = asyncMw(async (req, res) => {
  if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

  await repository.pembukuan.delete(req.params.id);

  return res.status(204).json({
    message: 'Pembukuan deleted',
  });
});

export const returnPembukuanMw = asyncMw(async (req, res) => {
  return res.json(await repository.pembukuan.modelToResource(req.pembukuan));
});

export const returnPembukuansMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.pembukuans, 'rows', []), (pembukuan) =>
        repository.pembukuan.modelToResource(pembukuan)
      )
    ),
    count: _.get(req.pembukuans, 'count', 0),
  });
});
