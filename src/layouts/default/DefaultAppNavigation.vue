<template>
  <div>
    <v-app-bar app elevation="0" color="transparent" elevate-on-scroll>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn text class="ml-3 mr-4 hidden-sm-and-down" fab small @click="mini = !mini"><v-icon>{{ mini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }}</v-icon></v-btn>
      <v-toolbar-title class="font-weight-light text-h5" v-text="name"/>
      <v-spacer></v-spacer>
      <v-btn text @click="$vuetify.theme.dark = !$vuetify.theme.dark"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn text v-on="on"><v-icon>mdi-account-circle</v-icon><span class="ml-1">{{getUserFullName}}</span></v-btn>
        </template>
        <v-list dense>
          <v-list-item-group color="primary"> 
            <v-list-item v-for="(item, index) in userAccountMenuItems" :key="index" link @click="handleMenuClick(item.actionFunction)">
              <v-list-item-icon class="mr-3"><v-icon v-text="item.icon"></v-icon></v-list-item-icon>
              <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>   
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app cliped v-model="drawer" :mini-variant.sync="mini" mini-variant-width="80" dark width="260">
      <div class="px-2">
        <v-list-item class="mb-0 justify-space-between pl-3">
          <v-list-item-avatar>
          <v-img :src="require('@/assets/logo.svg')"/>
          </v-list-item-avatar>
          <v-list-item-content class="pl-2">
          <v-list-item-title >
            <strong class="mr-1">Vuetify Starter</strong>
            <span class="primary--text"><strong>APP</strong></span>
          </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-3 mb-2" />
        <v-list>
          <template v-for="item in navBarListItems">
          <v-list-group :group="item.group" color="white" v-if="item.items" :key="item.key" :prepend-icon="item.icon" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-for="child in item.items">
              <v-list-item active-class="primary white--text" v-if="!child.items" :key="child.title" link :to="child.to" exact>
                <v-list-item-title style="font-size:15px" v-text="child.title"></v-list-item-title>
              </v-list-item>
              <v-list-group color="white" v-if="child.items" sub-group :key="child.title">
                <template v-slot:activator>
                  <v-list-item-title style="font-size:15px" v-text="child.title"></v-list-item-title>
                  </template>
                  <v-list-item active-class="primary white--text" v-for="subItem in child.items" :key="subItem.title" class="ml-11" link :to="subItem.to" exact>
                    <v-list-item-title style="font-size:14px" v-text="subItem.title"></v-list-item-title>
                  </v-list-item>
              </v-list-group>
            </template>
          </v-list-group>
          <v-list-item active-class="primary white--text" v-if="!item.items" :key="item.key" link :to="item.to"> 
            <v-list-item-icon><v-icon v-text="item.icon"></v-icon></v-list-item-icon>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
          </template>
        </v-list>   
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { navBarListItems } from './NavBarListItems'
import ChangePassCardNew from './components/ChangePassCardNew'
import AccountSettingsCard from './components/AccountSettingsCard'

export default {
  name: 'DefaultAppNavigation',
  data() {
    return {
        drawer: true,
        mini: false,
        group: null,
        dialog: false,
        userAccountMenuItems: [
          {title: "Account settings", icon: "mdi-account-cog", actionFunction: "accountSettings"},
          {title: "Change password", icon: "mdi-lock-reset", actionFunction: "changePass"},
          {title: "Logout", icon: "mdi-logout", actionFunction: "logout"},
        ],
        navBarListItems,
        showChangePassForm: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.userAccountModule.isLoggedIn
    },
    getUserFullName() {
      const user = this.$store.getters.getUser;
      return user.firstName + " " + user.lastName;
    },
    name() {
      return this.$route.name
    }
  },
  methods: {
     handleMenuClick(f) {
      this[f]();
     },
    async logout() {
      const res = await this.$dialog.confirm({
        text: 'Do you really want to logout?',
        title: 'Logout',
        persistent: true
      });
      if(res) {
        this.$store.dispatch('logOut');
        this.$router.push({ name: "Login"});
      }   
    },
    async changePass() {
      await this.$dialog.show(ChangePassCardNew, {persistent: true, width: '50%'});
    },
    async accountSettings() {
      await this.$dialog.show(AccountSettingsCard, {persistent: true, width: '50%'})
    }
  }  
};
</script>
      
