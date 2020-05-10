<template>
    <div>
    <div class="table-container">
      <div class="form-container">
        <form @submit.prevent="onSubmit" v-if="!isAuthenticated">
            <p>
              <label>Votre identifiant</label>
              <input type="text" v-model="credentials.email" required>
            </p>
            </p>
              <label>Votre mot de passe</label>
              <input type="password" v-model="credentials.password" required>
            </p>
    
            <div v-if="submitting">Submitting ....</div>
            <button type="submit">Submit</button>
        </form>
        <div v-else>
            You are logged in!
            <button type="button" @click="onLogout">Logout</button>
        </div>
        <div style="color: red;" v-if="error">{{error}}</div>
        <div v-if="successfulData">{{successfulData}}</div>
      </div>
    </div>
    </div>
</template>

<script>
  //  import authenticateMemberQuery from '~/apollo/queries/member/authenticateMember'
    import gql from 'graphql-tag'

    export default {
       /* head () {
            return {
                title: 'Startpage'
            }
        },*/
        data () {
            return {
                isAuthenticated:false,
                submitting: false,
                error: null,
                credentials: {
                    email: '',
                    password: ''
                },
                successfulData: null
            }
        },
        mounted(){
          this.isAuthenticated = !!this.$apolloHelpers.getToken()
        },
        methods: {
            async onSubmit () {
                this.submitting = true
                const credentials = this.credentials
                try {
                    const res = await this.$apollo.mutate({
            mutation: gql`
                query (
                  $email:String!
                  $password:String!){
                    users(
                        where:{
                            email: $email, 
                            password: $password
                        }
                    ){     
                    id
                    token{token}
                }
            }
            `,
                        
                        variables: credentials
                    }).then(({data}) => data && data.authenticateUser)
                    await this.$apolloHelpers.onLogin(res.token, undefined, { expires: 7 })
                    this.successfulData = res
                    this.isAuthenticated = true
                } catch (e) {
                    console.error(e)
                    this.error = e
                }
            },
            async onLogout(){
                await this.$apolloHelpers.onLogout()
                this.isAuthenticated = false
            }
        }
    }
</script>