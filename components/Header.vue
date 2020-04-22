<template>  
  <client-only>
    <nav class="top-navbar">
            <div class="social-networks">
                <router-link tag="a" to="/" exact><img src="../images/facebook.svg" class="icon"></router-link>
                <router-link tag="a" to="/" exact><img src="../images/instagram.svg" class="icon"></router-link>
                <router-link tag="a" to="/" exact><img src="../images/twitter.svg" class="icon"></router-link>
            </div>
            <div class="top-menu">
            <router-link tag="a" to="/" exact><img src="../images/home.svg" class="icon">Accueil</router-link>
            <router-link tag="a" to="/contact" exact><img src="../images/contact.svg" class="icon">Contactez-nous</router-link>
            <router-link tag="a" to="/inscription" exact><img src="../images/more.svg" class="icon">S'inscrire</router-link>
            <router-link tag="a" to="/connexion" exact><img src="../images/login.svg" class="icon">Se connecter</router-link>  
            </div>
    </nav>
  </client-only>
</template>  