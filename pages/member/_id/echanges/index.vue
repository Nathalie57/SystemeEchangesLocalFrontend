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
                <h2>Echanges en attente de confirmation</h2>
                <div v-if="member.demands && member.demands.length>0">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par la demande</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in member.demands" v-if="demand.state==0">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>{{ demand.amount }} grains de sel</td>
                                <td>{{ demand.memberExchange.pseudo }}</td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>
                <div v-if="member.demands && member.demands.length>0">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par l'offre</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in member.offers" v-if="offer.state==0">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>{{ offer.amount }} grains de sel</td>
                                <td>{{ offer.memberExchange.pseudo }}</td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>
                <h2>Echanges à valider</h2>
                <h2>Echanges réalisés</h2>
                <div v-if="member.demands">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in member.demands" v-if="demand.memberExchange && demand.state==1">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>{{ demand.amount }} grains de sel</td>
                                <td>{{ demand.memberExchange.pseudo }}</td>
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
//import memberExchangeWaitingQuery from '~/apollo/queries/member/memberExchangeWaiting'

export default {  
    layout: 'withCategories',
    data() {
        return {
            member: Object,
            login: true
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
        /*member: {
            prefetch: true,
            query: memberExchangeWaitingQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }*/
    },
}
</script>