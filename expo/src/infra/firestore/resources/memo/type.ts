import { Timestamp } from 'firebase/firestore';

export type MemoDoc = {
  body_text: string;
  created_at: Timestamp;
};

export type Memo = {
  id: string;
  body_text: string;
  created_at: Date;
};

export const docToData = (id: string, doc: MemoDoc): Memo => ({
  id,
  body_text: doc.body_text,
  created_at: doc.created_at.toDate(),
});
