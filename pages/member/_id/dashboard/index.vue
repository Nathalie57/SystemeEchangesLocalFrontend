<template>   
    <div>
        <client-only>
        
            <div class="table-container" v-if="member.demands && member.offers">
                <div v-if="member.demands.length>0">
                    <h3>Vos demandes en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Date d'expiration de la demande</th>
                                <th>Renouveler la demande</th>
                                <th>Supprimer la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in member.demands">
                                <td>{{ demand.title }}</br>{{ demand.description }}</td>
                                <td>{{ demand.expirationDate }}</td>
                                <td><button class="see-more-button">Renouveler</button></td>
                                <td><button class="see-more-button">Supprimer</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas de demande en cours.</h3>
                </div>
                <div v-if="member.offers.length>0">
                    <h3>Vos offres en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Date d'expiration de la offre</th>
                                <th>Renouveler la offre</th>
                                <th>Supprimer la offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in member.offers">
                                <td>{{ offer.title }}</br>{{ offer.description }}</td>
                                <td>{{ offer.expirationDate }}</td>
                                <td><button class="see-more-button">Renouveler</button></td>
                                <td><button class="see-more-button">Renouveler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas d'offre en cours.</h3>
                </div>

                
            </div>
        </client-only>
    </div>
    
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

<style>
.member-menu-container{
    display: flex;
    overflow: hidden;
    width:92%;
    height:150px;
    margin: auto;  
}

.member-menu, .member-menu ul{
    padding:0;
    margin:0;
    list-style:none;
    text-align:center;
    width:100%;
    }
    .member-menu li{
    display:inline-block;
    position:relative;
    width: 19.5%;
    height: 50px;
    margin:auto;
    padding-top: 2%;
    }
    .member-menu ul li{
    display:inherit;
    border-radius:0;
    }
    .member-menu ul li:hover{
    border-radius:0;
    }
    .member-menu ul li:last-child{
    border-radius:0 0 8px 8px;
    }
    .member-menu ul{
    position:absolute;
    z-index: 1000;
    max-height:0;
    left: 0;
    right: 0;
    overflow:hidden;
    -moz-transition: .8s all .3s;
    -webkit-transition: .8s all .3s;
    transition: .8s all .3s;
    }
    .member-menu li:hover ul{
    max-height:15em;
    }
    
    /* background des liens menus */
    .member-menu li:first-child{
        background-color: rgb(255, 255, 255);
        border-right: solid;
        border-bottom: solid;
        border-color:  rgb(231, 231, 231);
        border-radius:0 0 8px 0;
        vertical-align: text-bottom;
    }
    .member-menu li:nth-child(2){
        background-color: rgb(255, 255, 255);
        border-right: solid;
        border-bottom: solid;
        border-color:  rgb(231, 231, 231);
        border-radius:0 0 8px 0;
        vertical-align: text-bottom;
    }
    .member-menu li:nth-child(3){
        background-color: rgb(255, 255, 255);
        border-right: solid;
        border-bottom: solid;
        border-color:  rgb(231, 231, 231);
        border-radius:0 0 8px 0;
        vertical-align: text-bottom;
    }
    .member-menu li:last-child{
        background-color: rgb(255, 255, 255);
        border-right: solid;
        border-bottom: solid;
        border-color:  rgb(231, 231, 231);
        border-radius:0 0 8px 0;
        vertical-align: text-bottom;
    }
    
    /* background des liens menus et sous menus au survol */
    .member-menu li:first-child:hover{
    background:rgb(89, 178, 200);
    }
    .member-menu li:nth-child(2):hover{
    background:rgb(240, 88, 30);
    }    
    .member-menu li:nth-child(3):hover{
    background:rgb(172, 200, 55);
    }
    .member-menu li:last-child:hover{
    background:rgb(207, 22, 121);
    }
    /* les a href */
    .member-menu a{
    text-decoration:none;
    display:block;
    
    color:rgb(0, 0, 0);
    font-family:arial;
    
    font-size:18px;
    }
    .member-menu ul a{
    padding:8px 0;
    }
    .member-menu li:hover li a{
    color:#fff;
    text-transform:inherit;
    }
    .member-menu li:hover a, .member-menu li li:hover a{
    color:#000;
    }
    .pink-text a{
        color:rgb(207, 22, 121);
    }
    .blue-text a{
        color:rgb(89, 178, 200);
    }
    .green-text a{
        color:rgb(172, 200, 55);
    }
    .orange-text a{
        color:rgb(240, 88, 30);
    }
    .submenu li:hover{
        background:rgb(207, 22, 121, 0.3);
        width: 100%;
        height: 40px;
        padding-top: 30px;
        }
</style>