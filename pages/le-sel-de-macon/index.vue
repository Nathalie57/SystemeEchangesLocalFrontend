<template>  
    <div>
        <client-only>
            <div class="text-container">
                <h1>Le SEL de Mâcon, c'est quoi ?</h1>
                <p>Initié par le centre social des 1000 fenêtres, le système d'échange local de Mâcon est un nouveau service offert aux habitants du quartier de Marbé.</br>
                C’est un réseau d’entraide qui permet aux membres de donner, de recevoir et de s’échanger gratuitement des services en utilisant le temps comme monnaie d’échange au lieu de l’argent. Une heure de service rendu vaut une heure de service reçu.</br>
                C’est une opportunité de mettre ses talents, ses habiletés et ses connaissances au service des autres.</p></br>
                <img class="image" src="/_nuxt/images/post-it.png"></br>
            </div>
        </client-only>
    </div>
</template>  

<script>  
export default {  
    computed: {
        username() {
            return this.$store.getters['auth/username']
        }
    },
}
</script>  
<style>
.text-container{
    width: 750px;
    top:20px;
    color:rgb(89, 178, 200);
    position: absolute;
    margin-top:15%;
    margin-right:10%;
    margin-left:10%;
    padding:5px; 
	  text-align:justify;	
}
.image{
    display: block;
    width: 600px;
    height: 300px;
    margin-left: auto;
    margin-right: auto
}
</style>