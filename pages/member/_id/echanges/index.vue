<template>
    <div>
        <client-only>
            <div class="table-container">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:member.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:member.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:member.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:member.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:member.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:member.id }}" exact>Liste des membres</router-link></li>
                </ul>
                <h2>Bonjour {{ member.pseudo }} !</h2>
                <h2>Echanges en attente de confirmation</h2>
                <div v-if="member.demands && member.demands.length>0 || member.offers && member.offers.length>0">                    
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
                            <tr v-for="demand in member.demands" v-if="demand.state==1">
                                <td>Demande</td>
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>- {{ demand.amount }} grains de sel</td>
                                <td>{{ demand.memberExchange.pseudo }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-annulation-demande-title', params: { id:member.id, title:demand.id }}" exact><button class="see-more-button">Annuler</button></router-link></td>

                            </tr>
                            <tr v-for="offer in member.offers" v-if="offer.state==1">
                                <td>Offre</td>
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>+ {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.memberExchange.pseudo }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-annulation-offre-title', params: { id:member.id, title:demand.id }}" exact><button class="see-more-button">Annuler</button></router-link></td>
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
                                <th>Echange</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre ayant publié l'offre ou la demande</th>
                                <th>Valider l'échange</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in demands" v-if="demand.memberExchange && demand.memberExchange.id==member.id && demand.state==1">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>+ {{ demand.amount }} grains de sel</td>
                                <td>{{ demand.member.pseudo }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-validation-demande-title', params: { id:member.id, title:demand.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                            <tr v-for="offer in offers" v-if="offer.memberExchange && offer.memberExchange.id==member.id && offer.state==1">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>- {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.member.pseudo }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-echanges-validation-offre-title', params: { id:member.id, title:offer.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>

                <h2>Echanges réalisés</h2>
                <div v-if="member.demands || member.offers">                    
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
                            <tr v-for="demand in member.demands" v-if="demand.memberExchange && demand.state==2">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>- {{ demand.amount }} grains de sel</td>
                                <td>{{ demand.memberExchange.pseudo }}</td>
                            </tr>
                            <tr v-for="offer in member.offers" v-if="offer.memberExchange && offer.state==2">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>+ {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.memberExchange.pseudo }}</td>
                            </tr>
                            <tr v-for="demand in demands" v-if="demand.memberExchange && demand.memberExchange.id==member.id && demand.state==2">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>+ {{ demand.amount }} grains de sel</td>
                                <td>{{ demand.member.pseudo }}</td>
                            </tr>
                            <tr v-for="offer in offers" v-if="offer.memberExchange && offer.memberExchange.id==member.id && offer.state==2">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>- {{ offer.amount }} grains de sel</td>
                                <td>{{ offer.member.pseudo }}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas encore finalisé d'échange.</p>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script>  
import memberQuery from '~/apollo/queries/member/member'
import demandQuery from '~/apollo/queries/demand/demand'
import offerQuery from '~/apollo/queries/offer/offer'
import demandsInWaitQuery from '~/apollo/queries/demand/demandsInWait'
import offersInWaitQuery from '~/apollo/queries/offer/offersInWait'

export default {  
    layout: 'withCategories',
    data() {
        return {
            member: Object,
            demands: Object,
            login: true,
        }
    },
    apollo: {
        member: {
            prefetch: true,
            query: memberQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        },
        demands: {
            prefetch: true,
            query: demandsInWaitQuery,            
        },
        offers: {
            prefetch: true,
            query: offersInWaitQuery,            
        },
        demand: {
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
        }
    }
}
</script>