<template>   
    <div>
        <client-only>
            <div class="table-container">
                <h2>Titre de l'offre : {{ offer.title }}</h2>
                <h3>Description : {{ offer.description }}</h3>
                <h3>Date d'expiration de l'offre : {{offer.expirationDate }}</h3>
                <h3 v-if="offer.category">Catégorie : <router-link tag="a" :to="{ name:'category-id', params: { id:offer.category.id }}" exact>{{ offer.category.title }}</router-link></h3>
                <h3 v-if="offer.member">Membre ayant publié l'offre : <router-link tag="a" :to="{ name:'member-id', params: { id:offer.member.id }}" exact>{{ offer.member.pseudo }}</router-link></h3>                
            </div>        
        </client-only>
    </div>
    
</template>

<script>  
import memberQuery from '~/apollo/queries/member/member'
import offerQuery from '~/apollo/queries/offer/offer'

export default {  
    layout: 'withCategories',
    data() {
        return {
            member: Object,
            offer: Object,
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
        offer: {
            prefetch: true,
            query: offerQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    },
}

</script>  

