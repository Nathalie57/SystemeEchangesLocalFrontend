<template>
    <div class="table-container" v-if="username && user && id==user.id">
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
            <form method="POST" @submit.prevent="demandValidation">
                <p>Titre de la demande : {{ demand.title }}</p>
                <p>Description de la demande : {{ demand.description }}</p>
                <p>
                    <label>Sélectionnez la personne concernée par l'échange</label>                
                    <select v-model="userExchange">
                        <option v-for="user in users" :value="user.id">
                        {{ user.firstname }} {{ user.lastname }}
                        </option>
                    </select>
                </p>
                <p>
                    <label>Indiquez le montant en grains de sel de l'échange : </label>
                    <input type="number" v-model="amount">
                </p>
                <button type="submit">Valider</button>
            </form>  
        </div>
    </div>
    <div v-else class="table-container">
        <p>Vous n'êtes pas autorisé à voir cette page. Veuillez vous connecter.</p>
    </div>
</template>


<script>  
//import categoriesQuery from '~/apollo/queries/category/categories'
import usersQuery from '~/apollo/queries/user/users'
import userQuery from '~/apollo/queries/user/user'
import demandQuery from '~/apollo/queries/demand/demand'
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'

export default {  
    layout: 'withCategories',
    data() {
        return {
            demand: Object,
            title: '',
            description: '',
            category: '',
            expirationDate: '',
            userExchange:'',
            amount: ''           
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
        demandValidation (event) {
        this.$apollo
            .mutate({
            mutation: gql`
                mutation (
                $id: ID!
                $amount: Int 
                $userExchange:ID!
                ){
                    updateDemand(input: {where: {
                    id: $id
                    },
                        data: {
                            amount:$amount
                            state:1
                            userExchange:$userExchange
                            }
                        }) {
                            demand {
                                
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
                this.$router.push({name: 'member-id-echanges', params: {id:this.$route.params.id}}),
                event.target.reset()
            })
            .catch((e) => {
                this.errors = e.graphQLErrors
            })
        },
    ...mapMutations({
            logout: 'auth/logout'
        })
    },
    computed: {
        username() {
            return this.$store.getters['auth/username']
        },
        id() {
            return this.$store.getters['auth/id']
        }
    }
}
</script>