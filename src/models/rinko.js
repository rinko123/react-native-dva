import Toast from 'react-native-root-toast';
import { createAction } from '../utils';


export default {
  namespace: 'rinko',
  state: {
    words: [],
    groups: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {

  },
};
