<template>
  <v-app>
    <default-app-navigation />
    <v-main>
      <v-container fluid>
        <router-view :key="$route.path" />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import DefaultAppNavigation from './DefaultAppNavigation'
export default {
  name: 'DefaultLayout',
  components: { DefaultAppNavigation }
}
</script>