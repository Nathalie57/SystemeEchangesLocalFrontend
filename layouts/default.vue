<template>  
  <div>
    <Header />
    <MainMenu />
    <RightSideBar />
    <Footer />
    
    <div >
      <div >

        <nuxt />

      </div>
    </div>
    
  </div>
</template>

<script>  
import Header from '~/components/Header.vue'  
import Footer from '~/components/Footer.vue'  
import MainMenu from '~/components/MainMenu.vue' 
import RightSideBar from '~/components/RightSideBar.vue' 
export default {  
  components: {
    Header,
    Footer,
    MainMenu,
    RightSideBar
  }
}
</script>  