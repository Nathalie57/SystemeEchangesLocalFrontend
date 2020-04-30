<template>   
    <div>
        <client-only>
            <div class="table-container" v-if="member.demands && member.offers">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:member.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:member.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:member.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:member.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:member.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:member.id }}" exact>Liste des membres</router-link></li>
                </ul>
                <div v-if="member.demands.length>0">
                    <h3>Vos demandes en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Date d'expiration de la demande</th>
                                <th>Valider l'échange</th>
                                <th>Renouveler la demande</th>
                                <th>Supprimer la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in member.demands">
                                <td>{{ demand.title }}</br>{{ demand.description }}</td>
                                <td>{{ demand.expirationDate }}</td>
                                <td><button class="see-more-button">Valider</button></td>
                                <td><button class="see-more-button">Renouveler</button></td>
                                <td><button class="see-more-button">Supprimer</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas de demande en cours.</h3>
                </div>
                <div v-if="member.offers.length>0">
                    <h3>Vos offres en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Date d'expiration de l'offre</th>
                                <th>Supprimer l'offre</th>
                                <th>Renouveler l'offre</th>
                                <th>Supprimer l'offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in member.offers">
                                <td>{{ offer.title }}</br>{{ offer.description }}</td>
                                <td>{{ offer.expirationDate }}</td>
                                <td><button class="see-more-button">Valider</button></td>
                                <td><button class="see-more-button">Renouveler</button></td>
                                <td><button class="see-more-button">Renouveler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas d'offre en cours.</h3>
                </div>

                
            </div>
        </client-only>
    </div>
    
</template>

<script>  
import memberQuery from '~/apollo/queries/member/member'

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
        }
    },
    computed:{
        memberTitle(){
            return this.member.find(member => member.pseudo === this.pseudo)
        }
    },
}

</script>  

<style>

</style>