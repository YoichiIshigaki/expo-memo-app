import * as logger from 'firebase-functions/logger';
import type { Request, Response } from 'firebase-functions/v1';
import {
  get,
  list,
  remove,
  update,
  create,
  verifyIdToken,
} from '../lib/firebase/resources/auth';
import { UserRecord } from 'firebase-admin/auth';
import {
  validateAuthPutRequest,
  validateAuthPostRequest,
} from '../lib/validation/auth';

type User = Pick<
  UserRecord,
  | 'uid'
  | 'displayName'
  | 'email'
  | 'emailVerified'
  | 'phoneNumber'
  | 'photoURL'
  | 'disabled'
>;

const getParams = (req: Request, keys: string[]): Record<string, string> => {
  const values = Object.values(req.params);
  if (values.length !== keys.length) {
    throw new Error('invalid request params');
  }
  return values.reduce<Record<string, string>>(
    (acc, v, i) => ({ ...acc, [keys[i]]: v }),
    {}
  );
};

const toJson = (user: UserRecord): User => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  disabled: user.disabled,
});

const getHandler = async (
  req: Request,
  res: Response<User | User[]>
): Promise<void> => {
  console.log({ params: req.params });
  const { uid } = getParams(req, ['uid']);
  console.log({ getUid: uid });
  if (uid) {
    const user = await get(uid);
    res.json(toJson(user));
    return;
  }
  const result = await list();
  res.setHeader('user-count', result.users.length);
  res.json(result.users.map((v) => toJson(v)));
};

const postHandler = async (
  req: Request,
  res: Response<User | { error: string }>
) => {
  if (!validateAuthPostRequest(req.body).success) {
    res.status(400).json({ error: 'badRequest' });
    return;
  }
  const user = await create(req.body);
  res.status(201).json(toJson(user));
};
const putHandler = async (
  req: Request,
  res: Response<User | { error: string }>,
  uid: string
) => {
  const { uid: id } = getParams(req, ['uid']);
  if (!id || id !== uid) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  if (!validateAuthPutRequest(req.body).success) {
    res.status(400).json({ error: 'badRequest' });
    return;
  }
  const user = await update(uid, req.body);
  res.status(201).json(toJson(user));
};

const deleteHandler = async (
  req: Request,
  res: Response<{ result: true } | { error: string }>,
  uid: string
) => {
  const { uid: id } = getParams(req, ['uid']);
  if (!id || id !== uid) {
    res.status(400).json({ error: 'invalid' });
    return;
  }

  await remove(uid);
  res.status(201).json({ result: true });
};

export const handler = async (req: Request, res: Response): Promise<void> => {
  logger.info('user log', { structuredData: true });
  try {
    const idToken = req.headers.authorization?.replace('Bearer', '').trim();

    if (!idToken) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const uid = (await verifyIdToken(idToken))?.uid;
    console.log({ uid });
    if (!uid) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    switch (req.method) {
      case 'GET':
        await getHandler(req, res);
        break;
      case 'POST':
        await postHandler(req, res);
        break;
      case 'PUT':
        await putHandler(req, res, uid);
        break;
      case 'DELETE':
        await deleteHandler(req, res, uid);
        break;
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
        break;
    }
  } catch (e) {
    logger.error(e);
    res.status(401).json({ error: 'invalid' });
  }
};
