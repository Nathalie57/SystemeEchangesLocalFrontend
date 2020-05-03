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
        <h2>Quelle demande souhaitez-vous déposer ?</h2>
        <form method="POST" @submit.prevent="newDemand">
            <p>
                <label>Titre de la demande (choisissez un titre suffisamment explicite) :</label><br/>
                <input type="text" v-model="title" required autofocus>
            </p>
            <p>
                <label>Description de la demande (soyez le plus précis possible) :</label><br/>
                <textarea v-model="description" required></textarea>
            </p>  
            <p>
                <label>Catégorie de la demande</label>                
                <select v-model="category">
                    <option v-for="category in categories" :value="category.id">
                    {{ category.title }}
                    </option>
                </select>
            </p>
            <p>
                <label>Date d'expiration de la demande (maximum un mois)</label>
                <input type="date" v-model="expirationDate" required>
            </p>
            <button type="submit">Valider</button>
        </form>  
      </div>
  </div>
</template>


<script>  
import categoriesQuery from '~/apollo/queries/category/categories'
import memberQuery from '~/apollo/queries/member/member'
import gql from 'graphql-tag'

export default {  
    layout: 'withCategories',
    data() {
        return {
           // member: this.$route.params.id,
            category: Object,
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
        member: {
            prefetch: true,
            query: memberQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        },
    },
    methods: {
        newDemand (event) {
        this.$apollo
            .mutate({
            mutation: gql`
                mutation (
                    $title: String
                    $description: String
                    $category: ID
                    $expirationDate: DateTime
                    $member:ID
                          
                ){
                    createDemand(input: {
                        data: {
                            title: $title
                            description: $description
                            category: $category
                            expirationDate: $expirationDate
                            member: $member
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
                            member{
                                id
                            }                     
                        }
                    }
                }
            `,
            variables: {
                title: this.title,
                description: this.description,
                expirationDate: this.expirationDate,
                category: this.category,
                member: this.$route.params.id
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