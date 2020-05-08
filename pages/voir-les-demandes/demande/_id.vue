<template>   
    <div>
        <client-only>
            <div class="table-container">
                <h2>Titre de la demande : {{ demand.title }}</h2>
                <h3>Description : {{ demand.description }}</h3>
                <h3>Date d'expiration de la demande : {{demand.expirationDate }}</h3>
                <h3 v-if="demand.category">Catégorie : <router-link tag="a" :to="{ name:'category-id', params: { id:demand.category.id }}" exact>{{ demand.category.title }}</router-link></h3>
                <h3 v-if="demand.member">Membre ayant publié la demande : <router-link tag="a" :to="{ name:'member-id', params: { id:demand.member.id }}" exact>{{ demand.member.pseudo }}</router-link></h3>                
            </div>        
        </client-only>
    </div>
    
</template>

<script>  
import memberQuery from '~/apollo/queries/member/member'
import demandQuery from '~/apollo/queries/demand/demand'

export default {  
    layout: 'withCategories',
    data() {
        return {
            member: Object,
            demand: Object,
            login: true
        }
    },
    apollo: {
        member: {
            prefetch: true,
            query: memberQuery,
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
}

</script>  

