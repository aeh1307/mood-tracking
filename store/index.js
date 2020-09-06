import {getUserFromCookie} from "@/helpers";

export const actions = {
  nuxtServerInit({commit}, {req}) {
    if(process.server) {
      const user = getUserFromCookie(req);
      if (user) {
        commit('users/setIsLoggedIn', true);
        commit('users/setUser', user);
      } else {
        commit('users/setIsLoggedIn', false);
        commit('users/setUser', {});
      }
      // console.log("Server: ", this.isLoggedIn)
    }
  }
}

