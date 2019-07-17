import { queryTags } from '@/services/api';

export default {
  state: {
    tags: [],
  },

  reducer: {
    async fetchTags() {
      const response = await queryTags();
      return { tags: response.list };
    },
  },
};
