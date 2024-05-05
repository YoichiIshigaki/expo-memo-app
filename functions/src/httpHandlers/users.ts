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

const toJson = (user: UserRecord): User => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  disabled: user.disabled,
});

const getHandle = async (
  req: Request,
  res: Response<User | User[]>
): Promise<void> => {
  const { uid } = req.params;
  if (uid) {
    const user = await get(uid);
    res.json(toJson(user));
    return;
  }
  const result = await list();
  res.setHeader('user-count', result.users.length);
  res.json(result.users.map((v) => toJson(v)));
};

const postHandle = async (req: Request, res: Response<User>) => {
  const user = await create(req.body);
  res.status(201).json(toJson(user));
};
const putHandle = async (
  req: Request,
  res: Response<User | { error: string }>,
  uid: string
) => {
  const { uid: id } = req.params;
  if (!id || id !== uid) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  const user = await update(uid, req.body);
  res.status(201).json(toJson(user));
};

const deleteHandle = async (
  req: Request,
  res: Response<{ result: true } | { error: string }>,
  uid: string
) => {
  const { uid: id } = req.params;
  if (!id || id !== uid) {
    res.status(400).json({ error: 'invalid' });
    return;
  }

  await remove(uid);
  res.json({ result: true });
};

export const handler = async (req: Request, res: Response): Promise<void> => {
  logger.info('user log', { structuredData: true });
  const idToken = req.headers.authorization?.replace('Bearer', '').trim();

  if (!idToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const uid = (await verifyIdToken(idToken))?.uid;
  if (!uid) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  switch (req.method) {
    case 'GET':
      await getHandle(req, res);
      break;
    case 'POST':
      await postHandle(req, res);
      break;
    case 'PUT':
      await putHandle(req, res, uid);
      break;
    case 'DELETE':
      await deleteHandle(req, res, uid);
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
};
