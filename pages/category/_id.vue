<template>   
    <div>
        <client-only>
            <div v-if="login">
                <div class="table-container" v-if="category.demands && category.offers">
                <h2>Catégorie {{ category.title }}</h2>
                    <div v-if="category.demands.length>0">
                        <h3>Les demandes</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Description</th>
                                    <th>Date d'expiration de la demande</th>
                                    <th>Membre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="demand in category.demands">
                                    <td><router-link tag="a" :to="{ name:'voir-les-demandes-demande-id', params: { id:demand.id }}" exact>{{ demand.title }}</router-link></td>
                                    <td>{{ demand.description | summary }}</td>
                                    <td>{{ demand.expirationDate | dateFormat }}</td>
                                    <td><router-link tag="a" :to="{ name:'member-id', params: { id:demand.user.id }}" exact>{{ demand.user.firstname | firstLetter }} {{ demand.user.lastname | firstletter }}</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <h3>Il n'y a pas de demande en cours dans cette catégorie.</h3>
                    </div>

                    <div v-if="category.offers.length>0">
                    <h3>Les offres</h3>
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
                            <tr v-for="offer in category.offers">
                                <td><router-link tag="a" :to="{ name:'voir-les-offres-offre-id', params: { id:offer.id }}" exact>{{ offer.title }}</router-link></td>
                                <td>{{ offer.description | summary }}</td>
                                <td>{{ offer.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id', params: { id:offer.user.id }}" exact>{{ offer.user.firstname | firstLetter }} {{ offer.user.lastname | firstletter }}</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div v-else>
                        <h3>Il n'y a pas d'offre en cours dans cette catégorie.</h3>
                    </div>                
                </div>
            </div>
            <div v-else>
                <div class="table-container" v-if="category.demands && category.offers">
                <h2>Catégorie {{ category.title }}</h2>
                <p>Pour contacter le membre concerné par l'offre ou la demande, <router-link tag="a" to="/connexion" exact>connectez-vous</router-link> ou <router-link tag="a" to="/inscription" exact>inscrivez-vous</router-link> au Sel de Mâcon !

                    <div v-if="category.demands.length>0">
                        <h3>Les demandes</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Description</th>
                                    <th>Date d'expiration de la demande</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="demand in category.demands">
                                    <td>{{ demand.title }}</td>
                                    <td>{{ demand.description | summary }}</td>
                                    <td>{{ demand.expirationDate }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <h3>Il n'y a pas de demande en cours dans cette catégorie.</h3>
                        <p>Pour déposer une demande, <router-link tag="a" to="/connexion" exact>connectez-vous</router-link> ou <router-link tag="a" to="/inscription" exact>inscrivez-vous</router-link> au Sel de Mâcon !</p>
                    </div>

                    <div v-if="category.offers.length>0">
                    <h3>Les offres</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date d'expiration de l'offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in category.offers">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description | summary }}</td>
                                <td>{{ offer.expirationDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div v-else>
                        <h3>Il n'y a pas d'offre en cours dans cette catégorie.</h3>
                        <p>Pour déposer une offre, <router-link tag="a" to="/connexion" exact>connectez-vous</router-link> ou <router-link tag="a" to="/inscription" exact>inscrivez-vous</router-link> au Sel de Mâcon !</p>
                    </div>                
                </div>
            
            </div>
        </client-only>
    </div>
</template>

<script>  
import categoryQuery from '~/apollo/queries/category/category'

export default {  
    layout: 'withCategories',
    data() {
        return {
            category: Object,  
            login: true          
        }
    },
    apollo: {
        category: {
            prefetch: true,
            query: categoryQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    },
    computed:{
        categoryTitle(){
            return this.category.find(category => category.title === this.title)
        }
    },
}

</script>  