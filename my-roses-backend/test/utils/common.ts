import express from 'express';

export const extractMiddleware = <
  T,
  U extends T extends Array<unknown> ? T[0] : T
>(
  mw: T
): U => (Array.isArray(mw) ? mw[0] : mw);

export const resolveMiddleware = <T, U>({
  req,
  res,
  mw,
}: {
  req: T;
  res: U;
  mw: express.RequestHandler;
}) =>
  new Promise<unknown>(function (resolve, reject) {
    mw(req as never, res as never, (err) => {
      if (err instanceof Error) {
        reject(err);

        return;
      }

      resolve(err);
    });
  });
