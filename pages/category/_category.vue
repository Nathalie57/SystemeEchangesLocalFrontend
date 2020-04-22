<template>   
    <div>
        <client-only>
        <div class="table-container">
        <h2>{{ category }}</h2>
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
                    <tr v-for="demand in demands" v-bind:category="demand.category.category">
                        <td><router-link tag="a" to="/" exact>{{ demand.title }}</router-link></td>
                        <td>{{ demand.description }}</td>
                        <td>{{ demand.expiration_date }}</td>
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