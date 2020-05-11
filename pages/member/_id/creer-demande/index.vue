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
        <h2>Bonjour {{ user.username | firstLetter }} !</h2>
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
import userQuery from '~/apollo/queries/user/user'
import gql from 'graphql-tag'

export default {  
    layout: 'withCategories',
    data() {
        return {
           // user: this.$route.params.id,
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
        user: {
            prefetch: true,
            query: userQuery,
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
                    $user:ID
                          
                ){
                    createDemand(input: {
                        data: {
                            title: $title
                            description: $description
                            category: $category
                            expirationDate: $expirationDate
                            user: $user
                            state: 0
                        }
                    }) {
                        demand {
                            title
                            description 
                            expirationDate 
                            state
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
                title: this.title,
                description: this.description,
                expirationDate: this.expirationDate,
                category: this.category,
                user: this.$route.params.id
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
/*import axios from 'axios';

export default { 
    data() {
    return {
      title: '',
      description:'',
      category:'',
      expirationDate:'',
      errors: []
    }
  },

methods: {
    newDemand() {
      axios.post('http://localhost:1337/demands',{
            title: this.title,
            description: this.description,
            category: this.category,
            expirationDate: this.expirationDate,
      })
        
                        
           .then(response => {
                // Handle success.
                console.log('Well done!');
               
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
            });
    }
  }
}*/

</script>