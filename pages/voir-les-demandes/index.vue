<template>   
    <div>
        <client-only>
        <div class="table-container">
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
                        <td><router-link tag="a" to="/" exact>{{ demand.demand_title }}</router-link></td>
                        <td>{{ demand.demand_description }}</td>
                        <td><router-link :to="{ name:'category-id', params: { id:demand.category.id }}" tag="a">{{ demand.category.title }}</router-link></td>
                        <td>{{ demand.demand_expiration_date | dateFormat('YYYY.MM.DD') }}</td>
                        <td><router-link tag="a" to="/" exact>{{ demand.member.pseudo }}</router-link></td>
                    </tr>
                </tbody>
            </table>
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
            demand: Object
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