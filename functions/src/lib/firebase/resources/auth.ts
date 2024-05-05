import {
  CreateRequest,
  UserRecord,
  ListUsersResult,
  UpdateRequest,
  DecodedIdToken,
} from 'firebase-admin/auth';
import { auth } from '../firebaseApp';

const sampleReq = {
  displayName: 'string',
  /**
   * The user's primary email.
   */
  email: 'string',

  password: 'string',
  /**
   * The user's primary phone number.
   */
  phoneNumber: 'string',
  /**
   * The user's photo URL.
   */
  photoURL: 'string',
};

export const create = async (req: CreateRequest): Promise<UserRecord> =>
  auth.createUser(req);

export const update = async (
  uid: string,
  req: UpdateRequest
): Promise<UserRecord> => auth.updateUser(uid, req);

export const remove = async (uid: string): Promise<void> =>
  auth.deleteUser(uid);

export const get = async (uid: string): Promise<UserRecord> =>
  auth.getUser(uid);

export const getByEmail = async (email: string): Promise<UserRecord> =>
  auth.getUserByEmail(email);

export const verifyIdToken = async (
  idToken: string
): Promise<DecodedIdToken | null> => {
  try {
    const decodeToken = await auth.verifyIdToken(idToken);
    return decodeToken;
  } catch (e) {
    return null;
  }
};

export const list = async (
  maxLength: number = 30,
  pageToken?: string
): Promise<ListUsersResult> => auth.listUsers(maxLength, pageToken);
