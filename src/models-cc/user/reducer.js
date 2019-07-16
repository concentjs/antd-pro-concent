
import { query as queryUsers, queryCurrent } from '@/services/user';

export function save(list) {
  return {list};
}

export function saveCurrentUser(currentUser) {
  return { currentUser: currentUser || {}, };
}

export function changeNotifyCount(payload, moduleState) {
  return {
    currentUser: {
      ...moduleState.currentUser,
      notifyCount: payload.totalCount,
      unreadCount: payload.unreadCount,
    },
  };
}

export async function fetch(_, __, ctx) {
  const response = await queryUsers();
  await ctx.dispatch(save, response);
}

export async function fetchCurrent(_, __, ctx) {
  const response = await queryCurrent();
  await ctx.dispatch(saveCurrentUser, response);
}