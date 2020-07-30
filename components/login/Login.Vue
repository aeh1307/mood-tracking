<template>
  <div class="loginForm">
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="email" :rules="emailRules" label="password" required ></v-text-field>
      <v-text-field v-model="password" :rules="passwordRules" label="password" required></v-text-field>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
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
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length <= 6) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
    }
  }

</script>
<style scoped>

  .loginForm {
    height: 100%;
    widht: 100%;
  }

</style>
