import Vue from 'vue'
import Vuex from 'vuex'
import  { LOGIN, LOGOUT, UPDATE_L_USER, ADD_USER, DEL_USER, UPDT_USER } from './mutations_types.js'

Vue.use(Vuex)

const userAccountModule = {
  state: () => ({
    isLoggedIn: false,
    jwt: '',
    user: {}
  }),
  getters: {
    getJwt(state) {
      return state.jwt;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    [LOGIN] (state, user, jwt) {
      state.isLoggedIn = true;
      state.jwt = jwt;
      state.user = user;
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false;
      state.jwt = "";
      state.user = {}
    },
    [UPDATE_L_USER] (state, user) {
      state.user = user;
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    logIn({commit}, username, password) {
      //api call
      let user = {
        username,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
        authorizationLevel: "admin"
      }
      commit(LOGIN, user, "lfdajsfwiofjklsaf");
    },
    logOut({commit}) {
      commit(LOGOUT);
    },
    updateUser({commit}, user) {
      commit(UPDATE_L_USER, user);
    }
  }
}

const usersModule = {
  namespaced: true,
  state: () => ({
    users: [
      {id: 1, username: "admin", firstName: "John", lastName: "Doe", email: "john.doe@gmail.com", authorizationLevel: "admin", activated: true},
      {id: 2, username: "otatar", firstName: "Omer", lastName: "Tatar", email: "otatar@gmail.com", authorizationLevel: "user", activated: true},
      {id: 3, username: "otata1", firstName: "Omer1", lastName: "Tatar1", email: "otatar1@gmail.com", authorizationLevel: "user", activated: true},
      {id: 4, username: "otatar2", firstName: "Omer2", lastName: "Tatar2", email: "otatar2@gmail.com", authorizationLevel: "user", activated: true},
      {id: 5, username: "otatar3", firstName: "Omer3", lastName: "Tatar3", email: "otatar3@gmail.com", authorizationLevel: "user", activated: true},
      {id: 6, username: "admin1", firstName: "Admin", lastName: "Admin", email: "admin.admin@gmail.com", authorizationLevel: "admin", activated: true},
    ]
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
    getUser(state) {
      return function(id) {
        return state.users.filter(el => el.id == id)[0];
      }
    }
  },
  mutations: {
    [ADD_USER] (state, user) {
      state.users.push(user)
    },
    [DEL_USER] (state, id) {
      state.users = state.users.filter((el) => el.id != id);
    },
    [UPDT_USER] (state, user) {
      state.users.forEach((el, index) => {
        if(el.id == user.id) {
          state.users[index] = user;
        }
      });
    } 
  },
  actions: {
    addUser({commit}, user) {
      commit(ADD_USER, user);
    },
    updateUser({commit}, user) {
      commit(UPDT_USER, user);
    },
    deleteUser({commit}, user) {
      commit(DEL_USER, user);
    }
  }

}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userAccountModule, usersModule
  },
  strict: process.env.NODE_ENV !== 'production'
})
