<template>  
  <client-only>
    <div class="main-menu-container">
        <ul class="main-menu">
            <li><router-link tag="a" :to="{name:'index'}" exact><img src="../images/logo2.svg" class="logo"></router-link></li>
            <li class="orange-text"><router-link tag="a" :to="{name:'le-sel-de-macon'}" exact>Le Sel de Mâcon</router-link></li>
            <li class="green-text"><router-link tag="a" :to="{name:'pourquoi-devenir-membre'}" exact>Pourquoi devenir membre ?</router-link></li>
            <li class="blue-text"><router-link tag="a" :to="{name:'voir-les-offres'}" exact>Voir les offres en cours</router-link></li>
            <li class="pink-text"><router-link tag="a" :to="{name:'voir-les-demandes'}" exact>Voir les demandes en cours</router-link></li>
        </ul>
    </div>
  </client-only>
</template>  