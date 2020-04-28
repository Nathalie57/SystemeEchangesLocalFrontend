<template>

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