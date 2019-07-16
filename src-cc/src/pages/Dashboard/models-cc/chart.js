import { fakeChartData } from '@/services/api';

export default {
  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  reducer: {
    fetch: async function () {
      const response = await fakeChartData();
      return response;
    },
    fetchSalesData: async function () {
      const response = await fakeChartData();
      return {
        salesData: response.salesData,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    }

  },
};
