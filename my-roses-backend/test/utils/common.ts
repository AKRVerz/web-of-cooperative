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
  mw: express.RequestHandler;
  req: T;
  res: U;
}) =>
  new Promise<void>((resolve, reject) => {
    mw(req as never, res as never, (err: unknown) => {
      console.log(err);

      if (err instanceof Error) {
        reject(err);
      }

      resolve();
    });
  });
