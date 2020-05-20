<template>   
    <div>
        <client-only>
            <div class="table-container" v-if="username">
                <h2>Titre de l'offre : {{ offer.title }}</h2>
                <h3>Description : {{ offer.description }}</h3>
                <h3>Date d'expiration de l'offre : {{offer.expirationDate | dateFormat }}</h3>
                <h3 v-if="offer.category">Catégorie : <router-link tag="a" :to="{ name:'category-id', params: { id:offer.category.id }}" exact>{{ offer.category.title }}</router-link></h3>
                <h3 v-if="offer.user">Membre ayant publié l'offre : <router-link tag="a" :to="{ name:'member-id', params: { id:offer.user.id }}" exact>{{ offer.user.firstname | firstLetter }} {{ offer.user.lastname | firstletter }}</router-link></h3>                
            </div>
            <div class="table-container" v-else>
                <h2>Titre de l'offre : {{ offer.title }}</h2>
                <h3>Description : {{ offer.description }}</h3>
                <h3>Date d'expiration de l'offre : {{offer.expirationDate | dateFormat }}</h3>
                <h3 v-if="offer.category">Catégorie : <router-link tag="a" :to="{ name:'category-id', params: { id:offer.category.id }}" exact>{{ offer.category.title }}</router-link></h3>
            </div>        
        </client-only>
    </div>
    
</template>

<script>  
import userQuery from '~/apollo/queries/user/user'
import offerQuery from '~/apollo/queries/offer/offer'
import { mapMutations } from 'vuex'

export default {  
    layout: 'withCategories',
    data() {
        return {
            user: Object,
            offer: Object,
            login: true
        }
    },
    apollo: {
        user: {
            prefetch: true,
            query: userQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        },
        offer: {
            prefetch: true,
            query: offerQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    },
    computed: {
        username() {
            return this.$store.getters['auth/username']
        }
    },
    methods: {
        ...mapMutations({
            logout: 'auth/logout'
        })
    }
}

</script>  

