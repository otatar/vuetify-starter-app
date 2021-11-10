<template>
<v-app>
    <v-container text-center class="fill-height">
        <v-row justify="center">
            <v-col cols="8">
                <h1 class="text-h3 primary--text">Whoops, 404</h1>
                <p>The page you were looking for does not exist</p>
                <v-btn color="primary" outlined :to="{name: 'Dashboard'}">Take me home!</v-btn>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>