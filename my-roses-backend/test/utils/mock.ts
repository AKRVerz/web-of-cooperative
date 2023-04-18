import httpMocks from 'node-mocks-http';

export const createMockData = ({
  url,
  method,
  body = {},
  query = {},
}: {
  method: httpMocks.RequestMethod;
  url: string;
  body?: httpMocks.Body;
  query?: httpMocks.Query;
}) => {
  const { req, res } = httpMocks.createMocks({
    url,
    method,
    query,
    body,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });

  return { req, res };
};

export const mockNextFn = () => {
  return null;
};
