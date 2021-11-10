<template>  
  <router-view />
</template>

<script>
  export default {
    name: 'App',
    metaInfo: {
      title: 'App',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  }
</script>