<template>   
    <div>
        <client-only>
            <div class="table-container" v-if="username">
                <h2>Titre de la demande : {{ demand.title }}</h2>
                <h3>Description : {{ demand.description }}</h3>
                <h3>Date d'expiration de la demande : {{demand.expirationDate | dateFormat }}</h3>
                <h3 v-if="demand.category">Catégorie : <router-link tag="a" :to="{ name:'category-id', params: { id:demand.category.id }}" exact>{{ demand.category.title }}</router-link></h3>
                <h3 v-if="demand.user">Membre ayant publié la demande : <router-link tag="a" :to="{ name:'member-id', params: { id:demand.user.id }}" exact>{{ demand.user.firstname | firstLetter }} {{ demand.user.lastname | firstLetter }}</router-link></h3>                
            </div>        
            <div class="table-container" v-else>
                <h2>Titre de la demande : {{ demand.title }}</h2>
                <h3>Description : {{ demand.description }}</h3>
                <h3>Date d'expiration de la demande : {{demand.expirationDate | dateFormat }}</h3>
                <h3 v-if="demand.category">Catégorie : <router-link tag="a" :to="{ name:'category-id', params: { id:demand.category.id }}" exact>{{ demand.category.title }}</router-link></h3>
            </div>
        </client-only>
    </div>
    
</template>

<script>  
import userQuery from '~/apollo/queries/user/user'
import demandQuery from '~/apollo/queries/demand/demand'
import { mapMutations } from 'vuex'

export default {  
    layout: 'withCategories',
    data() {
        return {
            user: Object,
            demand: Object,
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
        demand: {
            prefetch: true,
            query: demandQuery,
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

