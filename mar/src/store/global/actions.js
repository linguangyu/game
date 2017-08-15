import * as types from './mutations_types';

const actions = {
	show_loading: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_LOADING);
			resolve()
		});
	},

	hide_loading: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_LOADING);
			resolve()
		});
	},
  update_userinfo: ({commit}, {
    userinfo
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_USERINFO, {
        userinfo
      });
      resolve()
    });
  },

  remove_userinfo: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_USERINFO);
      resolve()
    });
  },

  update_token: ({commit}, {
    token
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_TOKEN, {
        token
      });
      resolve()
    });
  },
  tabvalue: ({commit},value) => {
    return new Promise((resolve, reject) => {
      commit(types.TAB_VALUE,value);
      resolve()
    });
  },
  against_status:({commit},{value})=>{
     return new Promise((resolve, reject) => {
      commit(types.AGAINST_STATUS,{value});
      resolve()
    });
  }
}
export default actions
