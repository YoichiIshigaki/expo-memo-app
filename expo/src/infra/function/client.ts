import get from 'lodash.get';

const isEmulator = !!process.env.EXPO_PUBLIC_EMULATOR;

const baseUrl = isEmulator
  ? 'http://127.0.0.1:5001/vue3-tutorial-127e1/us-central1/'
  : 'https://us-central1-vue3-tutorial-127e1.cloudfunctions.net/';

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
      console.error('error not exist path', { path });
      throw Error('error not exist path');
    }
    console.log({ path: `${baseUrl}${path}` });

    const request = new Request(`${baseUrl}${path}`, init);
    console.log('before fetch');
    const res = await fetch(request);
    console.log('after fetch');
    const json = await res.json();
    console.log(json);
    console.log('get json');
    return json as T;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
