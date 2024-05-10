import get from 'lodash.get';
import config from '../../../constants/config';

const baseUrl = config.functionUrl;

const functionPath = {
  users: {
    getUsers: 'users',
  },
  test: {
    test: 'test',
  },
};

export const callFunction = async <T extends Object>(
  pathname: string,
  init?: RequestInit,
): Promise<T> => {
  try {
    const path: string = get(functionPath, pathname);
    if (!path) {
      throw Error('error not exist path');
    }
    console.log({ path: `${baseUrl}${path}` });

    const request = new Request(`${baseUrl}${path}`, init);
    const res = await fetch(request);
    const json = await res.json();
    return json as T;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
