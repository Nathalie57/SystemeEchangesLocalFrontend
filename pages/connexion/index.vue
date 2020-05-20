<template>  
    <div>
        <div class="table-container" v-if="!username">
            <form @submit.stop.prevent="handleSubmit">
                <p>
                    <label>Votre identifiant</label>
                    <input type="text" v-model="email" required>
                </p>
                </p>
                    <label>Votre mot de passe</label>
                    <input type="password" v-model="password" required>
                </p>    
                          
                <button :disabled="loading" type="submit">Connexion</button>
                <p>
                    Pas encore de compte ?
                    <router-link :to="{ name: 'inscription'}">S'inscrire </router-link>
                </p>
            </form>
        </div>
        <div v-else class="table-container">
            <p>Vous êtes déjà connecté</p>
        </div>    
    </div>  
</template>

<script>  
import { mapMutations } from 'vuex'  
import strapi from '~/utils/Strapi'

export default {  
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.login(
          this.email,
          this.password
        )
        this.loading = false
        this.setUser(response.user)
        this.$router.go(-1)
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  },
  computed: {
        username() {
            return this.$store.getters['auth/username']
        }
    },
}
</script>  