<template>  
  <client-only>
    <nav class="top-navbar">
            <div class="social-networks">
                <router-link tag="a" to="/" exact><img src="../images/facebook.svg" class="icon"></router-link>
                <router-link tag="a" to="/" exact><img src="../images/instagram.svg" class="icon"></router-link>
                <router-link tag="a" to="/" exact><img src="../images/twitter.svg" class="icon"></router-link>
            </div>
            <div class="top-menu" v-if="username">
                <router-link tag="a" :to="{ name:'index'}" exact><img src="../images/home.svg" class="icon">Accueil</router-link>
                <router-link tag="a" :to="{name:'contact'}" exact><img src="../images/contact.svg" class="icon">Contactez-nous</router-link>
                <router-link tag="a" :to="{name:'member-id-dashboard', params: { id:id }}" exact>{{ username }}</router-link>
                <a href="/" @click="logout">Se déconnecter</a>
            </div>
            <div class="top-menu" v-else>
                <router-link tag="a" :to="{ name:'index'}" exact><img src="../images/home.svg" class="icon">Accueil</router-link>
                <router-link tag="a" :to="{name:'contact'}" exact><img src="../images/contact.svg" class="icon">Contactez-nous</router-link>
                <router-link tag="a" :to="{name:'inscription'}" exact><img src="../images/more.svg" class="icon">S'inscrire</router-link>
                <router-link tag="a" :to="{name:'connexion'}" exact><img src="../images/login.svg" class="icon">Se connecter</router-link>  
            </div>
    </nav>
  </client-only>
</template>  
<script>  
import { mapMutations } from 'vuex'
//import { mapGetters } from 'vuex'
import userQuery from '~/apollo/queries/user/user'

export default {  

  /*apollo: {
      user: {
          prefetch: true,
          query: userQuery,
          variables () {
              return { id: this.$route.params.id }
          }
      }
  },*/
  computed: {
    // Set your username thanks to your getter
    username() {
      return this.$store.getters['auth/username']
    },
    id() {
      return this.$store.getters['auth/id']
    }
  },  
  methods: {
    // Define your needed mutations, here: auth/logout
    ...mapMutations({
      logout: 'auth/logout'
    })
  },
}

</script>  