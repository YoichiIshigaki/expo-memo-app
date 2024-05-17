import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { type Memo, type MemoDoc, docToData } from '.';
import { ROOT_DOC } from '../../constant';

export const list = async (uid: string): Promise<Memo[]> => {
  const ref = collection(db, `${ROOT_DOC}/${uid}/memos`);
  const gotQuery = query(ref, orderBy('created_at', 'desc'));
  const docSnaps = await getDocs(gotQuery);

  if (docSnaps.empty) return [];

  return docSnaps.docs.map((v) => docToData(v.id, v.data() as MemoDoc));
};

export const get = async (uid: string, memoId: string): Promise<Memo> => {
  const ref = doc(db, `${ROOT_DOC}/${uid}/memos`, memoId);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists) {
    throw new Error(`not found memo data id=${memoId}`);
  }

  return docToData(docSnap.id, docSnap.data() as MemoDoc);
};
