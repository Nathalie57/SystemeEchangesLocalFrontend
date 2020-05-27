<template>  
    <div>
        <client-only>
            <div class="text-container">
            <img class="image" src="../images/dessin-sel.png"></br>
            <h1>Les actus de l'association</h1>
              <div  v-if="articles" v-for="article in articles">
                  <h2>{{ article.title }} - Publié le {{ article.published | dateFormat }}</h2>
                  {{ article.content }}
              </div>
            </div>
        </client-only>
    </div>
</template>  
<script> 
import articlesQuery from '~/apollo/queries/article/articles'

export default {  
    data() {
        return {
            article: Object,    
        }
    },
    apollo: {
        articles: {
            prefetch: true,
            query: articlesQuery
        }
    },
    computed: {
        username() {
            return this.$store.getters['auth/username']
        }
    },
}
</script>

<style>
.text-container{
    width: 950px;
    top:20px;
    color:rgb(89, 178, 200);
    position: absolute;
    margin-top:10%;
    margin-right:10%;
    margin-left:10%;
    padding:5px; 
	  text-align:justify;	
}
.image{
    display: block;
    height: 500px;
    margin-left: 15%;
    margin-right: auto
}
</style>