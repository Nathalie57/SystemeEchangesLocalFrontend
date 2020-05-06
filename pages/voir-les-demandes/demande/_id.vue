<template>   
    <div>
        <client-only>
            <div class="table-container">
                <h2>Titre de la demande : {{ demand.title }}</h2>
                <h3>Description : {{ demand.description }}</h3>
                <h3>Date d'expiration de la demande : {{demand.expirationDate }}</h3>
                <h3>Catégorie : {{ demand.category.title }}</h3>
                <h3>Membre ayant publié la demande : {{ demand.member.pseudo }}</h3>                
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

