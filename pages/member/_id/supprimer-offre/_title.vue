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
        <form method="POST" @submit.prevent="deleteOffer">
            <p>Titre de l'offre : {{ offer.title }}</p>
            <p>Description de l'offre : {{ offer.description }}</p>
            <p>Catégorie : {{ offer.category.title }}</p>
            <p>Date d'expiration : {{ offer.expirationDate }}</p>
            <button type="submit">Valider</button>
        </form>  
      </div>
  </div>
</template>


<script>  
//import categoriesQuery from '~/apollo/queries/category/categories'
import membersQuery from '~/apollo/queries/member/members'
import memberQuery from '~/apollo/queries/member/member'
import offerQuery from '~/apollo/queries/offer/offer'
import gql from 'graphql-tag'

export default {  
    layout: 'withCategories',
    data() {
        return {
            offer: Object,
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
        offer: {
            prefetch: true,
            query: offerQuery,
            variables () {
                return { id: this.$route.params.title }
            }
        }
    },
    methods: {
        deleteOffer (event) {
        this.$apollo
            .mutate({
            mutation: gql`
                mutation (
                $id: ID!
                ){
                    updateOffer(input: {where: {
                    id: $id
                    },
                        data: {
                            state:3
                            }
                        }) {
                            offer {
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