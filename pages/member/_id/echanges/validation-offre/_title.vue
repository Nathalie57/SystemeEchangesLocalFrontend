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
            <form method="POST" @submit.prevent="offerValidation">
                <p>Titre de l'offre : {{ offer.title }}</p>
                <p>Description de l'offre : {{ offer.description }}</p>
                <p v-if="offer.user">Personne concernée par l'échange : {{ offer.user.firstname | firstLetter }} {{ offer.user.lastname | firstLetter }}</p>
                <p>Montant de l'échange : - {{ offer.amount }} grains de sel</p>
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
import offerQuery from '~/apollo/queries/offer/offer'
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'

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
        offerValidation(event) {
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
                                state:2
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
            this.$apollo
                .mutate({
                mutation: gql`
                    mutation (
                        $id: ID!
                        $walletAmount: Int
                        ){
                            updateUser(input: {where: {
                            id: $id
                            },
                                data: {
                                    walletAmount:$walletAmount
                                    }
                                }) {
                                    user {
                                        walletAmount
                                    }
                            }
                        }
                    `,
                variables: {
                    id: this.$route.params.id,
                    walletAmount: this.user.walletAmount - this.offer.amount,
                    }
                })
                .then((data) => {
                    this.$apollo
                    .mutate({
                    mutation: gql`
                        mutation (
                            $id: ID!
                            $walletAmount: Int
                            ){
                                updateUser(input: {where: {
                                id: $id
                                },
                                    data: {
                                        walletAmount:$walletAmount
                                        }
                                    }) {
                                        user {
                                            walletAmount
                                        }
                                }
                            }
                        `,
                    variables: {
                        id: this.offer.user.id,
                        walletAmount: this.offer.amount + this.offer.user.walletAmount
                        }
                    })
                    .then((data) => {
                    event.target.reset()
                    })
                    .catch((e) => {
                    this.errors = e.graphQLErrors
                    })
                event.target.reset()
                })
                .catch((e) => {
                this.errors = e.graphQLErrors
                })
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