export const fetchMock = jest.fn();

const fetch = (url, options) => {
  return fetchMock(url, options);
};

fetch.mock = fetchMock;

export default fetch;
