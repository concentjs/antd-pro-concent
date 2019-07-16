import { queryTags } from '@/services/api';

export default {
  state: {
    tags: [],
  },

  reducer: {
    fetchTags: async function () {
      const response = await call(queryTags);
      return {tags: response.list};
    },
  },

};
