<template>   
    <div>
        <client-only>
        <div class="table-container">
        <h2>Catégorie {{ category.title }}</h2>
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
                        <td>{{ demand.demand_title }}</td>
                        <td>{{ demand.demand_description }}</td>
                        <td>{{ demand.demand_expiration_date }}</td>
                        <td><router-link tag="a" to="/" exact>{{ demand.member.pseudo }}</router-link></td>
                    </tr>
                </tbody>
            </table>
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
            category: Object
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
    computed: {
        category(){
            return this.category.find(category => category.title === this.title)
        },      
    }
}

</script>  