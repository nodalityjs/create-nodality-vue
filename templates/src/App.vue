<template>
  <HelloWorld :text="textInstance" v-model:msg="welcomeMessage"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {Text} from "nodality";
export default {
  name: 'App',
  components: {
    HelloWorld
  },
 
  watch: {
    // Watch for changes to welcomeMessage and recreate the instance
    welcomeMessage() {
      console.log(this.welcomeMessage) // THIS WORKS
       this.textInstance = new Text(this.welcomeMessage).set({ size: "S1", color: "#1abc9c" });
    },
  },
  data() {
    return {
      welcomeMessage: "Welcome to Your Vue.js App", // Define a reactive property
     textInstance: null
    }
  },
   created() {
    // Initialize the Text instance when the component is created
    this.textInstance = new Text(this.welcomeMessage).set({ size: "S1", color: "#1abc9c" });
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>