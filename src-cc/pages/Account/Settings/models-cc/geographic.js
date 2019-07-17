import { queryProvince, queryCity } from '@/services/geographic';

export default {
  state: {
    province: [],
    city: [],
    isLoading: false,
  },

  reducer: {
    async fetchProvince(_, __, ctx) {
      ctx.dispatch('changeLoading', true);
      const response = await queryProvince();
      ctx.dispatch('setProvince', response);
      ctx.dispatch('changeLoading', false);
    },
    async fetchCity(payload, __, ctx) {
      ctx.dispatch('changeLoading', true);
      const response = await queryCity(payload);
      ctx.dispatch('setCity', response);
      ctx.dispatch('changeLoading', false);
    },
    setProvince(province) {
      return { province };
    },
    setCity(city) {
      return { city };
    },
    changeLoading(isLoading) {
      return { isLoading };
    },
  },
};
