<template>   
    <div>
        <client-only>
        <div v-if="username">
            <div class="table-container" v-if="user.demands && user.offers">
            <h2>{{ user.firstname | firstLetter }}, membre depuis le {{ user.registrationDate | dateFormat }}</h2>
                <div v-if="user.demands.length>0">
                    <h3>Ses demandes en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date d'expiration de la demande</th>
                                <th>Catégorie</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in user.demands" v-if="demand.state==0">
                                <td><router-link tag="a" :to="{ name:'voir-les-demandes-demande-id', params: { id:demand.id }}" exact>{{ demand.title }}</router-link></td>
                                <td>{{ demand.description | summary }}</td>
                                <td>{{ demand.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'category-id', params: { id:demand.category.id }}" exact>{{ demand.category.title }}</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>{{ user.firstname | firstLetter }} n'a pas de demande en cours.</h3>
                </div>
                <div v-if="user.offers.length>0">
                    <h3>Ses offres en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date d'expiration de l'offre</th>
                                <th>Membre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in user.offers"  v-if="offer.state==0">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description | summary }}</td>
                                <td>{{ offer.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'category-id', params: { id:offer.category.id }}" exact>{{ offer.category.title }}</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>{{ user.firstname | firstLetter }} n'a pas d'offre en cours.</h3>
                </div>
            </div>
        </div>
        <div v-else class="table-container">
            <p><router-link tag="a" to="/connexion" exact>Connectez-vous</router-link> ou <router-link tag="a" to="/inscription" exact>inscrivez-vous</router-link> pour avoir accès à cette page !</p>
        </div>
        </client-only>
    </div>
    
</template>

<script>  
import userDashboardQuery from '~/apollo/queries/user/userDashboard'

export default {  
    layout: 'withCategories',
    data() {
        return {
            user: Object,
            login: true
        }
    },
    apollo: {
        user: {
            prefetch: true,
            query: userDashboardQuery,
            variables () {
                return { id: this.$route.params.id, date: Date.now() }
            }
        }
    },
    computed: {
        username() {
            return this.$store.getters['auth/username']
        },
    },
}

</script>  

