<template>   
    <div>
        <client-only>
        <div v-if="login">
            <div class="table-container" v-if="demands">
                <div>
                    <h2>Les demandes en cours</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Date d'expiration de la demande</th>
                                    <th>Membre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="demand in demands">
                                    <td><router-link tag="a" :to="{ name:'voir-les-demandes-demande-id', params: { id:demand.id }}" exact>{{ demand.title }}</router-link></td>
                                    <td>{{ demand.description | summary }}</td>
                                    <td><router-link :to="{ name:'category-id', params: { id:demand.category.id }}" tag="a">{{ demand.category.title }}</router-link></td>
                                    <td>{{ demand.expirationDate | dateFormat  }}</td>
                                    <td><router-link tag="a" :to="{ name:'member-id', params: { id:demand.user.id }}" exact>{{ demand.user.firstname | firstLetter }} {{ demand.user.lastname | firstLetter }}</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="table-container" v-if="demands">
                <div v-if="demands.length>0">
                    <h2>Les demandes en cours</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Date d'expiration de la demande</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="demand in demands">
                                    <td><router-link tag="a" to="/" exact>{{ demand.title }}</router-link></td>
                                    <td>{{ demand.description | summary }}</td>
                                    <td><router-link :to="{ name:'category-id', params: { id:demand.category.id }}" tag="a">{{ demand.category.title }}</router-link></td>
                                    <td>{{ demand.expirationDate | dateFormat }}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div v-else>
                    <h3>Il n'y a pas de demande en cours.</h3>
                </div>
            </div>
        </div>
        </client-only>
    </div>
    
</template>

<script> 
import gql from 'graphql-tag'
export default {
    layout: 'withCategories',
    data() {
        return {
            demand: Object,
            login:true,
        }
    },
    async asyncData({ app, redirect }) {
        let date = Date.now()
        const result = await app.apolloProvider.defaultClient.query({
        query: gql`
            query DemandsWithUser($date:DateTime) {  
                demands(sort:"expirationDate:asc", where:{state:0, expirationDate_gt:$date}) {
                    id
                    title
                    description
                    demandDate
                    expirationDate
                    user{
                        id
                        username
                        lastname
                        firstname
                    }
                    category{
                        id
                        title
                    }
                }
            }
        `,
        variables : {
            date: date
        },
        context: {
            headers:{
                //Authorization: Bearer [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg5NDQ3MzgyLCJleHAiOjE1OTIwMzkzODJ9.OH6704a_Yv7zcvhYYlGfZ_QSEXd14cgLew7ONCWUeUk]
            }
        },
    })
    //redirect('/' + result.data.characters[0].id)
    return result.data
  }
}
/*import demandsWithUserQuery from '~/apollo/queries/demand/demandsWithUser'
import demandQuery from '~/apollo/queries/demand/demand'

export default {  
    layout: 'withCategories',
    data() {
        return {
            demand: Object,
            login:true,
            date:''
        }
    },
    apollo: {
        demands: {
            prefetch: true,
            query: demandsWithUserQuery
        }
    },
        demand: {
            prefetch: true,
            query: demandQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        },
    computed: {
        filteredDate() {
            let date = this.demand.expirationDate
            let today = new Date()
   
            return this.demands.filter(demand => {
                if(date>today) return demands
            })
        }
    }
}


/*import axios from 'axios';
export default { 
    data(){
        return {
            login:true,
            token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU4OTEyNzAzNCwiZXhwIjoxNTkxNzE5MDM0fQ.ntR0u7JOSjuRzqZITa_c-lXcI4aYjy2BdqOshB-R9Ao'
        }
    },
    methods:{
    // Request API.
        demands(){axios
        .get('http://localhost:1337/posts', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            // Handle success.
            return{
                title: this.demand.title
            }
            console.log('Data: ', response.data);
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
        });
        }
    }
}*/
</script>  