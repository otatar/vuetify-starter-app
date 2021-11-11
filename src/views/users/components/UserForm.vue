<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>
      <v-form id="user-form" @submit.prevent="onSubmit()">
        <v-container>
          <v-row>
            <v-col cols="12" sm="3">
              <base-input disabled label="ID" v-model="form.id" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <base-input :disabled="formType=='show' || formType=='edit'" label="Username" v-model.trim="form.username" :error-messages="usernameErrors"/>
            </v-col>
            <v-col cols="12" sm="6" >
              <base-input-password :disabled="formType=='show' || formType=='edit'" label="Password" v-model.trim="form.password" :error-messages="passwordErrors" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <base-input :disabled="formType=='show'" label="First Name" v-model.trim="form.firstName" :error-messages="firstNameErrors" />
            </v-col>
            <v-col cols="12" sm="6">
              <base-input :disabled="formType=='show'" label="Last Name" v-model.trim="form.lastName" :error-messages="lastNameErrors" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <base-input :disabled="formType=='show'" label="E-mail" v-model.trim="form.email" :error-messages="emailErrors" />
            </v-col>
            <v-col cols="12" sm="6">
              <base-select :disabled="formType=='show'" class="pt-5" label="Authorization Level" :items="authSelectItems" v-model="form.authorizationLevel" :error-messages="authLevelErrors"/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="2">
              <v-switch :disabled="formType=='show'" label="Activated" v-model="form.activated" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-row v-if="formType == 'create' || formType == 'edit'">
          <base-button type="submit" form="user-form" class="mx-3" color="primary" title="Submit" />
          <base-button class="mx-3" color="secondary" title="Cancel" @click="onCancel"/>
        </v-row>
        <v-row v-if="formType == 'show'">
          <base-button class="mx-3" color="primary" title="Edit" @click="onEdit"/>
          <base-button class="mx-3" color="warning" title="Delete" @click="onDelete"/>
          <base-button class="mx-3" color="secondary" title="Cancel"  @click="onCancel" />
        </v-row>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
<script>
import validPassword from '@/utils/validators/valid-password'
import usernameExists from '@/utils/validators/username_exists'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email  } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    title: {
      type: String,
      default: 'User Form'
    },
    formType: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      authSelectItems: [{text: "User", value: "user"}, {text: "Administrator", value: "admin"}],
      form: {
        id: this.user ? this.user.id : '',
        username: this.user ? this.user.username : '',
        password: this.formType == 'create' ? '' : 'UT9?neQ_',
        firstName: this.user ? this.user.firstName : '',
        lastName: this.user ? this.user.lastName : '',
        email: this.user ? this.user.email : '',
        authorizationLevel: this.user ? this.user.authorizationLevel : '',
        activated: this.user ? this.user.activated : ''
      }
    }
  },
  validations: {
    form: {
      username: {required, minLength: minLength(4), maxLength: maxLength(40), usernameExists: usernameExists},
      password: {required, validPassword: validPassword},
      firstName: {required, minLength: minLength(1), maxLength: maxLength(40)},
      lastName: {required, minLength: minLength(1), maxLength: maxLength(40)},
      email: {email},
      authorizationLevel: {required},
      activated: {required}
    }
  },
  methods: {
    onSubmit() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.$emit('on-submit', this.form);
      }
    },
    onDelete() {
      this.$emit('on-delete', this.form);
    },
    onEdit() {
      this.$emit('on-edit', this.form);
    },
    onCancel() {
      this.$router.go(-1);
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if(!this.$v.form.username.$dirty) return errors;
      (!this.$v.form.username.minLength ||  !this.$v.form.username.maxLength) && errors.push("Username must contain between 4 and 40 characters");
      !this.$v.form.password.usernameExists && errors.push("Username exists!");
      return errors
    },
     passwordErrors() {
      const errors = [];
      if(!this.$v.form.password.$dirty) return errors;
      this.$v.form.password.$invalid && errors.push("Password must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number and special character");
      return errors;
    },
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
    },
    authLevelErrors() {
      const errors = [];
      if(!this.$v.form.authorizationLevel.$dirty) return errors;
      this.$v.form.authorizationLevel.$error && errors.push("Please choose authorization level");
      return errors
    }
  }
}
</script>