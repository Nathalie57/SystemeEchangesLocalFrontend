<template>   
    <div>
        <client-only>
        <div v-if="login">
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
                                    <th>Membre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="demand in demands">
                                    <td><router-link tag="a" to="/" exact>{{ demand.title }}</router-link></td>
                                    <td>{{ demand.description }}</td>
                                    <td><router-link :to="{ name:'category-id', params: { id:demand.category.id }}" tag="a">{{ demand.category.title }}</router-link></td>
                                    <td>{{ demand.expirationDate }}</td>
                                    <td><router-link tag="a" :to="{ name:'member-id', params: { id:demand.member.id }}" exact>{{ demand.member.pseudo }}</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div v-else>
                    <h3>Il n'y a pas de demande en cours.</h3>
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
                                    <td>{{ demand.description }}</td>
                                    <td><router-link :to="{ name:'category-id', params: { id:demand.category.id }}" tag="a">{{ demand.category.title }}</router-link></td>
                                    <td>{{ demand.expirationDate }}</td>
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

export default {  
    layout: 'withCategories',
    data() {
        return {
            demand: Object,
            login:true
        }
    },
    apollo: {
        demands: {
            prefetch: true,
            query: demandsWithMemberQuery
        }
    },
    computed: {
        filteredList() {
            return this.demands.filter(demand => {
                return demandsWithMemberQuery.title.toLowerCase().includes(this.query.toLowerCase())
            })
        },
    }
}

</script>  