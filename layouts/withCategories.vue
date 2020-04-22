<template>  
  <div>
    <Header />
    <MainMenu />
    <LeftSideBar />
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
import LeftSideBar from '~/components/LeftSideBar.vue'
export default {  
  components: {
    Header,
    Footer,
    MainMenu,
    LeftSideBar
  }
}
</script>  