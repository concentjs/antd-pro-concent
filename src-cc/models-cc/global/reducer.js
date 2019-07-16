import { queryNotices } from '@/services/api';

function _changeUserNotifyCount({ totalCount, unreadCount }, _, ctx) {
  ctx.dispatch('user/changeNotifyCount', { totalCount, unreadCount });
}

async function _handleFetchedNoticeData({data, isSave}, moduleState, ctx) {
  const loadedAllNotices = data && data.length && data[data.length - 1] === null;

  await ctx.dispatch(setLoadedStatus, loadedAllNotices);
  if (isSave === true) {
    await ctx.dispatch(saveNotices, data.filter(item => item));
  } else {
    await ctx.dispatch(pushNotices, data.filter(item => item));
  }

  const unreadCount = moduleState.notices.filter(item => !item.read).length;
  await ctx.invoke(_changeUserNotifyCount, {
    totalCount: data.length,
    unreadCount,
  });
}

export async function fetchNotices(_, moduleState, ctx) {
  const data = await queryNotices();
  await ctx.invoke(_handleFetchedNoticeData, { data, isSave: true });
}

export async function fetchMoreNotices(payload, moduleState, ctx) {
  const data = await queryNotices(payload);
  await ctx.invoke(_handleFetchedNoticeData, { data });
}

export async function clearNotices(payload, moduleState, ctx) {
  await ctx.dispatch(saveClearedNotices, payload);
  const notices = moduleState.notices;
  const totalCount = notices.length;
  const unreadCount = notices.filter(item => !item.read).length;

  await ctx.invoke(_changeUserNotifyCount, { totalCount, unreadCount });
}

export async function changeNoticeReadState(payload, moduleState, ctx) {
  const notices = moduleState.notices.map(item => {
    const notice = { ...item };
    if (notice.id === payload) {
      notice.read = true;
    }
    return notice;
  });
  await ctx.dispatch(saveNotices, notices);

  const totalCount = notices.length;
  const unreadCount = notices.filter(item => !item.read).length;
  await ctx.invoke(_changeUserNotifyCount, { totalCount, unreadCount });
}

export function changeLayoutCollapsed(collapsed) {
  return { collapsed };
}

export function saveNotices(notices) {
  return { notices };
}

export function saveClearedNotices(payload, moduleState) {
  const notices = moduleState.notices.filter(item => item.type !== payload);
  return { notices };
}

export function pushNotices(inputNotices, moduleState) {
  let notices = moduleState.notices;
  notices = notices.concat(inputNotices);
  return { notices };
}

export function setLoadedStatus(loadedAllNotices) {
  return { loadedAllNotices };
}