<template>   
    <div>
        <client-only>
        <div v-if="username && id==user.id">
            <div class="table-container" v-if="user.demands || user.offers || offers || demands">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:user.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:user.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:user.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:user.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:user.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:user.id }}" exact>Liste des membres</router-link></li>
                </ul>
                <h2>Bonjour {{ user.username }} !</h2>
                <div v-if="user.demands.length>0">
                    <h3>Vos demandes en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Date d'expiration de la demande</th>
                                <th>Valider l'échange</th>
                                <th>Supprimer la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in user.demands" v-if="demand.state==0">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description | summary  }}</td>
                                <td>{{ demand.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-validation-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-supprimer-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Supprimer</button></router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas de demande en cours.</h3>
                </div>
                <div v-if="user.offers.length>0">
                    <h3>Vos offres en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Description</th>
                                <th>Date d'expiration de l'offre</th>
                                <th>Valider l'échange</th>
                                <th>Supprimer l'offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in user.offers"  v-if="offer.state==0">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description | summary }}</td>
                                <td>{{ offer.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-validation-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-supprimer-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Supprimer</button></router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas d'offre en cours.</h3>
                </div>
                <h3>Vos demandes expirées</h3>
                    <table v-if="demands && demands.length>0">
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Date d'expiration de la demande</th>
                                <th>Renouveler la demande</th>
                                <th>Supprimer la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in demands">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description | summary  }}</td>
                                <td>{{ demand.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-renouveler-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Renouveler</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-supprimer-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Supprimer</button></router-link></td>
                            </tr>
                        </tbody>
                    </table>
                <div v-else>
                    <p>Vous n'avez pas de demande expirée</p>
                </div>
                
                <h3>Vos offres expirées</h3>
                    <table v-if="offers && offers.length>0">
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Description</th>
                                <th>Date d'expiration de l'offre</th>
                                <th>Renouveler l'offre</th>
                                <th>Supprimer l'offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in offers">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description | summary }}</td>
                                <td>{{ offer.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-renouveler-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Renouveler</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-supprimer-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Supprimer</button></router-link></td>
                            </tr>
                        </tbody>
                    </table>
                <div v-else>
                    <p>Vous n'avez pas d'offre expirée</p>
                </div>
            </div>
        </div>
        <div v-else class="table-container">
            <p>Vous n'avez pas accès à cette page.</p>
        </div>
        </client-only>
    </div>
    
</template>

<script>  
//import userQuery from '~/apollo/queries/user/user'
import userDashboardQuery from '~/apollo/queries/user/userDasboard'
//import userWithExpirationQuery from '~/apollo/queries/user/userWithExpiration'
import demandsExpiredQuery from '~/apollo/queries/demand/demandsExpired'
import offersExpiredQuery from '~/apollo/queries/offer/offersExpired'
import { mapMutations } from 'vuex'


export default {  
    layout: 'withCategories',
    
    data() {
        return {
            user: Object,
            userWithExpiration: Object,
            offersExpired: [],
            demandsExpired: [],
            query: ''
        }        
    },
    apollo: {
        user: {
            prefetch: true,
            query: userDashboardQuery,
            variables () {
                return { 
                    id: this.$route.params.id, 
                    date: Date.now() 
                }
            }
        },
        /*userWithExpiration: {
            prefetch: true,
            query: userWithExpirationQuery,
            variables () {
                return { 
                    id: this.$route.params.id, 
                    date: Date.now() 
                }
            }
        }*/
        demands: {
            prefetch: true,
            query: demandsExpiredQuery,
            variables () {
                return {
                    user: this.$route.params.id,
                    date: Date.now()
                }
            }
        },
        offers: {
            prefetch: true,
            query: offersExpiredQuery,
            variables () {
                return {
                    user: this.$route.params.id,
                    date: Date.now()
                }
            }
        }
    },
    computed: {
        username() {
            return this.$store.getters['auth/username']
        },
        id() {
            return this.$store.getters['auth/id']
        }
    },
    methods: {
        ...mapMutations({
            logout: 'auth/logout'
        })
    },
}
</script>  

<style>

</style>