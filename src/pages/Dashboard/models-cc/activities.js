import { queryActivities } from '@/services/api';

export default {
  state: {
    list: [],
  },

  reducer: {
    fetchList: async function (_, __, ctx) {
      const response = await queryActivities();
      const list = Array.isArray(response) ? response : [];
      return { list };
    },
  }
  
};
