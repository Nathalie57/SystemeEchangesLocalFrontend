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
        <h2>Bonjour {{ user.username }} !</h2>
        <p>Vous pouvez renouveler votre demande en l'état ou en modifier des éléments. Pensez à modifier la date d'expiration.</p>
        <form method="POST" @submit.prevent="renewDemand">
            <p>
                <label>Titre de la demande :</label><br/>
                <input type="text" v-model="demand.title" required>
            </p>
            <p>
                <label>Description de la demande :</label><br/>
                <textarea v-model="demand.description" required></textarea>
            </p>  
            <p>
                <label>Catégorie de la demande</label>                
                <select v-model="category">
                    <option v-for="category in categories" :value="category.id" required>
                    {{ category.title }}
                    </option>
                </select>
            </p>
            <p>
                <label>Date d'expiration de la demande (maximum un mois)</label>
                <input type="date" v-model="expirationDate" required>
            </p>
            <button type="submit">Renouveler</button>
        </form>  
      </div>
    </div>
    <div v-else class="table-container">
        <p>Vous n'avez pas accès à cette page.</p>
    </div>
</template>


<script>  
import categoriesQuery from '~/apollo/queries/category/categories'
import userQuery from '~/apollo/queries/user/user'
import demandQuery from '~/apollo/queries/demand/demand'
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'

export default {  
    layout: 'withCategories',
    data() {
        return {
            category: Object,
            demand: Object,
            title: '',
            description: '',
            category: '',
            expirationDate: ''           
        }
    },
    
    apollo: {
        categories: {
            prefetch: true,
            query: categoriesQuery,
        },
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
                return { id: this.$route.params.title }
            }
        }
    },
    methods: {
        renewDemand (event) {
        this.$apollo
            .mutate({
            mutation: gql`
                mutation (
                    $title: String
                    $description: String
                    $category: ID!
                    $expirationDate: DateTime
                    $user:ID!
                          
                ){
                    createDemand(input: {
                        data: {
                            title: $title
                            description: $description
                            category: $category
                            expirationDate: $expirationDate
                            user: $user
                            state:0
                        }
                    }) {
                        demand {
                            title
                            description 
                            expirationDate 
                            category {
                                id
                                title
                                }    
                            user{
                                id
                            }                     
                        }
                    }
                }
            `,
            variables: {
                title: this.demand.title,
                description: this.demand.description,
                expirationDate: this.expirationDate,
                category: this.category,
                user: this.$route.params.id
                }
            })
            .then((data) => {
            this.$router.push({name: 'member-id-dashboard', params: {id:this.$route.params.id}}),
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
    },
}
</script>