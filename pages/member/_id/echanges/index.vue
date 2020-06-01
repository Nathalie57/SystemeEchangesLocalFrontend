<template>
    <div>
        <client-only>
            <div class="table-container" v-if="username && user && id==user.id && user.demands && user.offers">
                <ul class="member-menu"> 
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:user.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:user.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:user.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:user.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:user.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:user.id }}" exact>Liste des membres</router-link></li>
                </ul>
                <h2>Bonjour {{ user.username }} !</h2>
                <h2>Echanges en attente de confirmation</h2>
                <div v-if="user.demands && user.offers">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Type d'échange</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par la demande</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in user.demands" v-if="demand.state==1">
                                <td>Demande</td>
                                <td><router-link tag="a" :to="{ name:'voir-les-demandes-demande-id', params: { id:demand.id }}" exact>{{ demand.title }}</router-link></td>
                                <td>{{ demand.description | summary }}</td>
                                <td>- {{ demand.amount }} grains de sel</td>
                                <td>{{ demand.userExchange.firstname | firstLetter }} {{ demand.userExchange.lastname | firstLetter }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-annulation-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Annuler</button></router-link></td>

                            </tr>
                            <tr v-for="offer in user.offers" v-if="offer.state==1">
                                <td>Offre</td>
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description | summary }}</td>
                                <td>+ {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.userExchange.firstname | firstLetter }} {{ offer.userExchange.lastname | firstLetter }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-annulation-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Annuler</button></router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>

                <h2>Echanges à valider</h2>
                <div v-if="demands && demands.length>0">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Type d'échange</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre ayant publié l'offre ou la demande</th>
                                <th>Valider l'échange</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in demands" v-if="demand.userExchange && demand.userExchange.id==user.id && demand.state==1">
                                <td>Demande</td>
                                <td><router-link tag="a" :to="{ name:'voir-les-demandes-demande-id', params: { id:demand.id }}" exact>{{ demand.title }}</router-link></td>
                                <td>{{ demand.description | summary }}</td>
                                <td>+ {{ demand.amount }} grains de sel</td>
                                <td>{{ demand.user.firstname | firstLetter }} {{ demand.user.lastname | firstLetter }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-validation-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                            <tr v-for="offer in offers" v-if="offer.userExchange && offer.userExchange.id==user.id && offer.state==1">
                                <td>Offre</td>
                                <td><router-link tag="a" :to="{ name:'voir-les-offres-offre-id', params: { id:offer.id }}" exact>{{ offer.title }}</router-link></td>
                                <td>{{ offer.description | summary }}</td>
                                <td>- {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.user.firstname | firstLetter }} {{ offer.user.lastname | firstLetter }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-validation-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>

                <h2>Echanges réalisés</h2>
                <div v-if="user.demands || user.offers">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in user.demands" v-if="demand.userExchange && demand.state==2">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>- {{ demand.amount }} grains de sel</td>
                                <td>{{ demand.userExchange.firstname | firstLetter }} {{ demand.userExchange.lastname | firstLetter }}</td>
                            </tr>
                            <tr v-for="offer in user.offers" v-if="offer.userExchange && offer.state==2">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>+ {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.userExchange.firstname | firstLetter }} {{ offer.userExchange.lastname | firstLetter }}</td>
                            </tr>
                            <tr v-for="demand in demands" v-if="demand.userExchange && demand.userExchange.id==user.id && demand.state==2">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>+ {{ demand.amount }} grains de sel</td>
                                <td>{{demand.user.firstname | firstLetter }} {{demand.user.lastname | firstLetter }}</td>
                            </tr>
                            <tr v-for="offer in offers" v-if="offer.userExchange && offer.userExchange.id==user.id && offer.state==2">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>- {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.user.firstname | firstLetter }} {{ offer.user.lastname | firstLetter }}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas encore finalisé d'échange.</p>
                </div>
            </div>
            <div v-else class="table-container">
                <p>Vous n'êtes pas autorisé à voir cette page. Veuillez vous connecter.</p>
            </div>
        </client-only>
    </div>
</template>

<script>  
import userQuery from '~/apollo/queries/user/user'
//import demandQuery from '~/apollo/queries/demand/demand'
//import offerQuery from '~/apollo/queries/offer/offer'
import demandsInWaitQuery from '~/apollo/queries/demand/demandsInWait'
import offersInWaitQuery from '~/apollo/queries/offer/offersInWait'
import { mapMutations } from 'vuex'

export default {  
    layout: 'withCategories',
    data() {
        return {
            user: Object,
            demands: Object,
        }
    },
    apollo: {
        user: {
            fetchPolicy: 'cache-and-network',
            query: userQuery,
            variables () {
                return { id: this.$route.params.id }
            },
        },
        demands: {
            fetchPolicy: 'cache-and-network',
            query: demandsInWaitQuery,            
        },
        offers: {
            fetchPolicy: 'cache-and-network',
            query: offersInWaitQuery,            
        },
        /*demand: {
            prefetch: true,
            query: demandQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        },
        offer: {
            prefetch: true,
            query: offerQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }*/
    },
    methods: {
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