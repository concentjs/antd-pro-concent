import { queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  state: {
    list: [],
    pagination: {},
  },

  reducer: {
    async fetch(payload) {
      const data = await queryRule(payload);
      return { data };
    },
    async add({ payload, callback }) {
      const data = await addRule(payload);
      if (callback) callback();
      return { data };
    },
    // async remove({ payload, callback }, _, ctx) {
    async remove({ payload, callback }) {
      const data = await removeRule(payload);
      if (callback) callback();
      return { data };
      /**
       * or write like below:
       * ctx.dispatch('save', data);
       * if (callback) callback();
       */
    },
    async update({ payload, callback }) {
      const data = await updateRule(payload);
      if (callback) callback();
      return { data };
    },
    save(data) {
      return { data };
    },
  },
};
