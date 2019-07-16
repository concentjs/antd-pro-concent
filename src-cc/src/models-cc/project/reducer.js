import { queryProjectNotice } from '@/services/api';

export function saveNotice(notice) {
  return { notice };
}

export async function fetchNotice(_, __, ctx) {
  const response = await queryProjectNotice();
  const notice = Array.isArray(response) ? response : [];
  return { notice };
  // or ctx.dispatch(saveNotice, notice);
}