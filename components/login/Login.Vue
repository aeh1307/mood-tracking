<template>
  <div class="login">
    <v-form class="loginForm" ref="form" v-model="valid">
      <v-text-field class="emailField" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
      <v-text-field class="passwordField" v-model="password" type="password" label="Password" required></v-text-field>
      <v-btn
        color="black"
        @click="logIn(email, password)"
      >
        Login
      </v-btn>
    </v-form>
  </div>
</template>


<script>
export default {
  name: 'Login.vue',
  data() {
    return {
      valid: true,
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    logIn(email, password) {
      let store = this.$store;
      let router = this.$router
      this.$fireAuth.signInWithEmailAndPassword(email, password).then(response => {
        console.log(response.user.uid)
        this.$fireStore.collection("users").doc(response.user.uid).collection("moodTracking")
          .orderBy('time').onSnapshot(querySnapshot => {
          this.$store.commit('statistics/emptyMoods');
          let trackedMoods = []
          querySnapshot.forEach(doc => {
            // Degree of emotion, emotion, time, id:
            let trackedMood = {
              degreeOfEmotion: doc.data().degreeOfEmotion,
              emotion: doc.data().emotion,
              time: doc.data().time,
              notes: doc.data().notes,
              id: doc.id
            }
            trackedMoods.push(trackedMood)
          })
          this.$store.commit('statistics/addMoods', trackedMoods)
        })

        router.push('/')

        store.commit('users/setIsLoggedIn', true);
      }).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    },
  },
}

</script>
<style scoped>

.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  font-family: 'Manrope', sans-serif;
}

.login::after {
  content: "";
  background: linear-gradient(to right, #24C6DC, #514A9D);
  opacity: 0.4;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

.loginForm {
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 0 auto;
}

.passwordField {
  padding-bottom: 20px;
}

</style>
