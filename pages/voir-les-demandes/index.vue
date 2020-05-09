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
                                    <td>{{ demand.expirationDate | dateFormat }}</td>
                                    <td><router-link tag="a" :to="{ name:'member-id', params: { id:demand.member.id }}" exact>{{ demand.member.pseudo }}</router-link></td>
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
import demandsWithMemberQuery from '~/apollo/queries/demand/demandsWithMember'
import demandQuery from '~/apollo/queries/demand/demand'

export default {  
    layout: 'withCategories',
    data() {
        return {
            demand: Object,
            login:true,
            date: new Date()
        }
    },
    apollo: {
        demands: {
            prefetch: true,
            query: demandsWithMemberQuery
        }
    },
    demand: {
            prefetch: true,
            query: demandQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
}

</script>  