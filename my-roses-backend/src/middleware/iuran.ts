import _ from "lodash";
import { asyncMw } from "express-asyncmw";
import repository from "../repository";

export const createIuranMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  const data = await repository.mount.resourceToModel(req.body);
  req.iuran = await repository.mount.create(data);

  return next();
});

export const getIuranMw = asyncMw(async (req, res, next) => {
  const iuran = await repository.mount.findOne(req.params.id);

  if (!iuran) return res.status(404).json({ message: "Iuran Not Found" });

  req.iuran = iuran;

  return next();
});

export const getIuransMw = asyncMw(async (req, res, next) => {
  req.iurans = await repository.mount.findAll(
    {},
    req.filterQueryParams,
    req.query
  );
  return next();
});

export const updateIuranMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  const data = await repository.mount.resourceToModel(req.body);
  const iuran = await repository.mount.update(req.params.id, data);

  req.iuran = iuran;

  return next();
});

export const deleteIuranMw = asyncMw(async (req, res) => {
  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  await repository.mount.delete(req.params.id);

  return res.status(204).json({
    message: "Iuran deleted",
  });
});

export const returnIuranMw = asyncMw(async (req, res) => {
  return res.json(await repository.mount.modelToResource(req.iuran));
});

export const returnIuransMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.iurans, "rows", []), (iuran) =>
        repository.mount.modelToResource(iuran)
      )
    ),
    count: _.get(req.iurans, "count", 0),
  });
});
