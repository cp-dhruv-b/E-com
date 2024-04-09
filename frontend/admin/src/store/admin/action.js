import axios from 'axios';

export default {
  async loginUser({ commit }, userData) {
    try {
      const response = await axios.post('/api/admin/login', userData);
      const { user, token } = response.data;
      commit('setUser', user);
      commit('setToken', token);
      return user;
    } catch (error) {
      commit('setError', error.response.data.message);
      throw error;
    }
  },
  async logoutUser({ commit }) {
    try {
      commit('setUser', null);
      commit('setToken', null);
      // Perform logout logic, like clearing localStorage, etc. 
    } catch (error) {
      commit('setError', error.response.data.message);
      throw error;
    }
  },
};
