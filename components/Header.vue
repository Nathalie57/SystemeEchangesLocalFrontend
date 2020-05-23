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
                <router-link tag="a" :to="{name:'member-id-dashboard', params: { id:id }}" exact><img src="../images/profile.svg" class="icon">{{ username }}</router-link>
                <a href="/" @click="logout"><img src="../images/logout.svg" class="icon">Se déconnecter</a>
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
<style>
.top-navbar{
    display: flex;
    background-color: rgb(89, 178, 200, 0.2);
    overflow: hidden;
    width:100%;
    height:60px;
    margin-left: auto;   
    box-shadow: 4px 4px 12px #aaa;
  }

.top-navbar a {
    float: left;
    color: rgb(130, 130, 130);
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    margin: auto;
  }

  .top-menu {
    margin-left: auto;
    display: flex;
    width: 75%;
  }

.logo {
    width: 150px;
    height: 150px;
    display: block;   
    position: absolute;
    top: 0px;
    left:50px;
}

.icon {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    padding-right: 5px;
}

.arrow {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    padding-right: 5px;
}

.lien_invisible {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
    text-decoration: none;
}
</style>