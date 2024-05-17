export const ROOT_DOC = 'memo_app_users' as const;
// TODO: user_attrs,notifications,inquiriesは未実装
export type CollectionNames =
  | 'memos'
  | 'user_attrs'
  | 'notifications'
  | 'inquiries';
