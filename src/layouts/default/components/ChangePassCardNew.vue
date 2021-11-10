<template>
  <v-card class="pa-2" min-width="50%">
    <v-card-title style="font-weight: '400">Change Password</v-card-title>
    <v-divider />
    <v-card-text>
      <v-form id="change-pass-form" @submit.prevent="onSubmit">
        <BaseInput label="Username" disabled />
        <BaseInputPassword label="Old Password" v-model.trim="form.oldPassword" :error-messages="oldPasswordError" />
        <BaseInputPassword label="New Password" v-model.trim="form.newPassword" :error-messages="newPasswordError"/>
        <BaseInputPassword label="Repeat New Password" v-model.trim="form.repeatNewPassword" :error-messages="repeatNewPasswordError"/>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <BaseDialogButton color="primary" type="submit" form="change-pass-form" title="Submit" />
      <BaseDialogButton title="Cancel" @click="onCancel" />
    </v-card-actions>
  </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'
import validPassword from '@/utils/validators/valid-password'

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.$emit('submit');
        this.$dialog.notify.success('Password changed', {
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
      oldPassword: {required},
      newPassword: {required, validPassword: validPassword},
      repeatNewPassword: {required, sameAs: sameAs('newPassword')}
    }
  },
  computed: {
    oldPasswordError() {
      const errors = [];
      if(!this.$v.form.oldPassword.$dirty) return errors;
      !this.$v.form.oldPassword.required && errors.push("Password is required");
      return errors
    },
    newPasswordError() {
      const errors = [];
      if(!this.$v.form.newPassword.$dirty) return errors;
      this.$v.form.newPassword.$error && errors.push("Password must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number and special character");
      return errors;
    },
    repeatNewPasswordError() {
      const errors = [];
      if(!this.$v.form.oldPassword.$dirty) return errors;
      this.$v.form.repeatNewPassword.$error && errors.push("New passwords must match!");
      return errors;
    }
    
  }
}
</script>