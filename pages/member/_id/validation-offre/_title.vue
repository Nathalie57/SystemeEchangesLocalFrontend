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
        <form method="POST" @submit.prevent="offerValidation">
            <p>Titre de l'offre : {{ offer.title }}</p>
            <p>Description de l'offre : {{ offer.description }}</p>
             <p>
                <label>Sélectionnez la personne concernée par l'échange</label>                
                <select v-model="userExchange">
                    <option v-for="user in users" :value="user.id" required>
                    {{ user.username }}
                    </option>
                </select>
            </p>
            <p>
                <label>Indiquez le montant en grains de sel de l'échange : </label>
                <input type="number" v-model="amount" required>
            </p>
            <button type="submit">Valider</button>
        </form>  
      </div>
  </div>
</template>


<script>  
//import categoriesQuery from '~/apollo/queries/category/categories'
import usersQuery from '~/apollo/queries/user/users'
import userQuery from '~/apollo/queries/user/user'
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
        offer: {
            prefetch: true,
            query: offerQuery,
            variables () {
                return { id: this.$route.params.title }
            }
        }
    },
    methods: {
        offerValidation (event) {
        this.$apollo
            .mutate({
            mutation: gql`
                mutation (
                $id: ID!
                $amount: Int 
                $userExchange:ID!
                ){
                    updateOffer(input: {where: {
                    id: $id
                    },
                        data: {
                            amount:$amount
                            state:1
                            userExchange:$userExchange
                            }
                        }) {
                            offer {
                                
                                amount
                                state
                                userExchange{
                                    id
                                    }
                            }
                    }
                }
            `,
            variables: {
                id: this.$route.params.title,
                amount: parseInt(this.amount, 10),
                userExchange: this.userExchange
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