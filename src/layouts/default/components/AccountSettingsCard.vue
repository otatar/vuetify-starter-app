<template>
  <v-card class="pa-2" min-width="50%">
    <v-card-title style="font-weight: '400">Account Settings</v-card-title>
    <v-divider />
    <v-card-text>
      <v-form id="account-settings-form" @submit.prevent="onSubmit">
        <BaseInput label="Username" disabled v-model.trim="form.username" />
        <BaseInput label="First Name" v-model.trim="form.firstName" :error-messages="firstNameErrors"/>
        <BaseInput label="Last Name" v-model.trim="form.lastName" :error-messages="lastNameErrors"/>
        <BaseInput label="E-mail" v-model.trim="form.email" :error-messages="emailErrors"/>
        <BaseInput label="Authorizaion level" disabled v-model.trim="form.authorizationLevel" />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <BaseDialogButton color="primary" type="submit" form="account-settings-form" title="Submit" />
      <BaseDialogButton title="Cancel" @click="onCancel" />
    </v-card-actions>
  </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email  } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: this.$store.state.userAccountModule.user.username,
        firstName: this.$store.state.userAccountModule.user.firstName,
        lastName: this.$store.state.userAccountModule.user.lastName,
        email: this.$store.state.userAccountModule.user.email,
        authorizationLevel: this.$store.state.userAccountModule.user.authorizationLevel
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.$store.dispatch('updateUser', this.form);
        this.$emit('submit');
        this.$dialog.notify.success('Account setting updated', {
          position: 'top-right',
          timeout: 3000
        })
      }
    },
    onCancel() {
      this.$emit('submit');
    },
  },
  validations: {
    form: {
      firstName: {required, minLength: minLength(1), maxLength: maxLength(40)},
      lastName: {required, minLength: minLength(1), maxLength: maxLength(40)},
      email: {required, email}
    }
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if(!this.$v.form.firstName.$dirty) return errors;
      this.$v.form.firstName.$error && errors.push("First Name must contain between 1 and 40 characters");
      return errors
    },
    lastNameErrors() {
      const errors = [];
      if(!this.$v.form.lastName.$dirty) return errors;
      this.$v.form.lastName.$error && errors.push("Last Name must contain between 1 and 40 characters");
      return errors
    },
    emailErrors() {
      const errors = [];
      if(!this.$v.form.email.$dirty) return errors;
      this.$v.form.email.$error && errors.push("E-mail address in not valid");
      return errors
    }
  }
}
</script>