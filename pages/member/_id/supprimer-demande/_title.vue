<template>
 <div class="table-container">
    <ul class="member-menu">
        <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:member.id }}" exact>Mon profil</router-link></li>
        <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:member.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
        <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:member.id }}" exact>Gérer mes échanges</router-link></li>
        <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:member.id }}" exact>Déposer une offre</router-link></li>
        <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:member.id }}" exact>Déposer une demande</router-link></li>
        <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:member.id }}" exact>Liste des membres</router-link></li>
    </ul>
    <div class="form-container">
        <h2>Détails de l'échange</h2>
        <form method="POST" @submit.prevent="deleteDemand">
            <p>Titre de la demande : {{ demand.title }}</p>
            <p>Description de la demande : {{ demand.description }}</p>
            <p>Catégorie : {{ demand.category.title }}</p>
            <p>Date d'expiration : {{ demand.expirationDate }}</p>
            <button type="submit">Supprimer</button>
        </form>  
      </div>
  </div>
</template>


<script>  
//import categoriesQuery from '~/apollo/queries/category/categories'
import membersQuery from '~/apollo/queries/member/members'
import memberQuery from '~/apollo/queries/member/member'
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
        member: {
            prefetch: true,
            query: memberQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        },
        members: {
            prefetch: true,
            query: membersQuery,
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
        deleteDemand (event) {
        this.$apollo
            .mutate({
            mutation: gql`
                mutation(
                    $id:ID!
                    ){
                    updateDemand(input: {where: {
                    id: $id
                    },
                        data: {                            
                            state:3
                            }
                        }) {
                            demand {
                                state
                            }
                        }
                    }
                `,
            variables: {
                id: this.$route.params.title,
                }
            })
            .then((data) => {
            event.target.reset()
            })
            .catch((e) => {
            this.errors = e.graphQLErrors
            })
        }
    }
}
</script>