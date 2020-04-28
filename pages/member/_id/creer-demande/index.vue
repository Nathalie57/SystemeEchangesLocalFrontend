<template>
 <div class="table-container">
    <div class="form-container">
        <h2>Quelle demande souhaitez-vous déposer ?</h2>
        <form method="POST" @submit.prevent="">
            <p>
                <label>Titre de la demande (choisissez un titre suffisamment explicite) :</label><br/>
                <input type="text" v-model="title" required autofocus>
            </p>
            <p>
                <label>Description de la demande (soyez le plus précis possible) :</label><br/>
                <textarea v-model="description" required></textarea>
            </p>  
            <p>
                <label>Catégorie de la demande</label>                
                <select  v-model="id">
                        <option>Jardinage</option>
                        <option>Cuisine</option>
                        <option>Musique</option>
                    
                </select>
            </p>
            <button type="submit">Valider</button>
        </form>  
      </div>
  </div>
</template>


<script>  
import categoriesQuery from '~/apollo/queries/category/categories'

export default {  
    layout: 'withCategories',
    data() {
        return {
            category: Object,
        }
    },
    apollo: {
        categories: {
            prefetch: true,
            query: categoriesQuery,
        }
    },
}
</script>