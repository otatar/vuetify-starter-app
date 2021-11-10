<template>
  <v-app>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3 mt-10"
            contain
            height="200"
          />
        </v-col>
        <v-col cols="12">
          <h1>Welcome to Vuetify Starter App</h1>
        </v-col>
        <v-col cols="12">
          <v-card width="400px" class="mx-auto">
            <v-card-title>
              <h3>Login</h3>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submit()" id="login-form">
                  <v-text-field v-model.trim.lazy="$v.form.username.$model" :error-messages="usernameErrors" label="Username" prepend-icon="mdi-account-circle" />
                  <v-text-field 
                  v-model.trim.lazy="$v.form.password.$model"
                  :type="showPass ? 'text' : 'password'"
                  :error-messages="passwordErrors"
                  label="Password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" 
                  @click:append="showPass = !showPass"
                  />
              </v-form>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-btn type="submit" color="primary" class="mx-auto" form="login-form">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  data: () => ({
    showPass: false,
    form: {
      username: '',
      password: ''
    }
  }),
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      }
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.$store.dispatch('logIn', this.form.username, this.form.password);
        if (this.$store.state.userAccountModule.isLoggedIn) {
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push({name: "Dashboard"});
          }         
        }
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if(!this.$v.form.username.$dirty) return errors;
      !this.$v.form.username.required && errors.push("Username is required");
      return errors
    },
    passwordErrors() {
      const errors = [];
       if(!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("Password is required");
      return errors;
    }
  }
}
</script>
