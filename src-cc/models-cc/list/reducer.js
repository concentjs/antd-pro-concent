import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';

export function queryList(list) {
  return { list };
}

export function appendList(fetchedList, moduleState) {
  const list = moduleState.list.concat(fetchedList);
  return { list };
}

export async function fetch(payload, _, ctx) {
  const response = await queryFakeList(payload);
  const list = Array.isArray(response) ? response : [];
  return { list };
  // or ctx.dispatch(queryList, list); //as you like
}

export async function appendFetch(payload, moduleState, ctx) {
  const response = await queryFakeList(payload);
  const fetchedList = Array.isArray(response) ? response : [];
  const list = moduleState.list.concat(fetchedList);
  return { list };
  // or ctx.dispatch(appendList, fetchedList); //as you like
}

export async function submit(payload) {
  let callback;
  if (payload.id) {
    callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
  } else {
    callback = addFakeList;
  }

  const response = await callback(payload);
  const list = Array.isArray(response) ? response : [];
  return { list };
}