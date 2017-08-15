export default  {
  getUserinfo(state) {
    return state.userinfo;
  },

  getToken(state) {
    return state.token && state.token ? state.token : '';
  }
};
