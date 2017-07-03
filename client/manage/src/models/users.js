import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: []
  },
  effects: {
    *getAll({ payload: payload }, { call, put }) {
      const { data } = yield call(usersService.getAll);
      yield put({ type: 'save', payload: {data}});
    },
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state , list};
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname === '/users')
        if (pathname === '/users') {
          dispatch({ type: 'getAll', payload: query });
        }
      });
    }
  }
};
