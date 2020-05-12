<template>
 <div class="table-container">
    <ul class="member-menu">
        <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:user.id }}" exact>Mon profil</router-link></li>
        <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:user.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
        <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:user.id }}" exact>Gérer mes échanges</router-link></li>
        <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:user.id }}" exact>Déposer une offre</router-link></li>
        <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:user.id }}" exact>Déposer une demande</router-link></li>
        <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:user.id }}" exact>Liste des membres</router-link></li>
    </ul>
    <div class="form-container">
        <h2>Détails de l'échange</h2>
        <form method="POST" @submit.prevent="cancelDemand">
            <p>Titre de la demande : {{ demand.title }}</p>
            <p>Description de la demande : {{ demand.description }}</p>
            <p v-if="demand.user">Personne concernée par l'échange : {{ demand.user.firstname | firstLetter }} {{ demand.user.lastname | firstLetter }}</p>
            <p>Montant de l'échange : + {{ demand.amount }} grains de sel</p>
            <button type="submit">Annuler</button>
        </form>  
      </div>
  </div>
</template>


<script>  
//import categoriesQuery from '~/apollo/queries/category/categories'
import usersQuery from '~/apollo/queries/user/users'
import userQuery from '~/apollo/queries/user/user'
import demandQuery from '~/apollo/queries/demand/demand'
import gql from 'graphql-tag'

export default {  
    layout: 'withCategories',
    data() {
        return {
            demand: Object,
            title: '',
            description: '',
            category: '',
            expirationDate: ''           
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
        users: {
            prefetch: true,
            query: usersQuery,
        },
        demand: {
            prefetch: true,
            query: demandQuery,
            variables () {
                return { id: this.$route.params.title }
            }
        }
    },
    methods: {
        cancelDemand (event) {
        this.$apollo
            .mutate({
            mutation: gql`
                mutation (
                    $id: ID!
                    ){
                        updateDemand(input: {where: {
                        id: $id
                        },
                            data: {      
                                state:0
                                amount:0
                                userExchange:null
                                }
                            }) {
                                demand {
                                    state
                                    amount
                                    userExchange{id}
                                }
                        }
                    }
                `,
            variables: {
                id: this.$route.params.title,
                }
            })
            .then((data) => {
            this.$router.push({name: 'member-id-echanges', params: {id:this.$route.params.id}}),
            event.target.reset()
            })
            .catch((e) => {
            this.errors = e.graphQLErrors
            })
        }
    }
}
</script>