<template>  
    <div>
        <client-only>
            <div class="table-container" v-if="articles" v-for="article in articles">
  {{ article.title }}
  {{ article.content }}
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