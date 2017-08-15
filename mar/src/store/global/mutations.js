import * as types from './mutations_types'

const mutations  = {
    [types.SHOW_LOADING](state) {
        state.ajax_loading = true;
    },

    [types.HIDE_LOADING](state) {
        state.ajax_loading = false;
    },
    [types.UPDATE_USERINFO](state, user_db) {
      state.userinfo = user_db.userinfo || {};
    },

    [types.REMOVE_USERINFO](state) {
      state.userinfo = {};
    },

    [types.UPDATE_TOKEN](state, user_db) {
      state.token = user_db.token || {};
    },
    [types.TAB_VALUE](state, value) {
      state.tabvalue = value || '提取友谊赛';
    },
    [types.AGAINST_STATUS](state, status) {
      state.status = status.value || {};
    },
}

export default mutations
