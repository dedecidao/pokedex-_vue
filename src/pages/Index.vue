<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <h2>{{ namePokemon }}</h2>
    <q-img :src="imgPokemon" width="30vh" />

    </div>
    <!--Imagem Central da Poke Agenda-->
    <div class="row justify-center full-width">
      <q-input outlined v-model="buscaPokemon" label="Digite o ID ou nome do Poke" />
      <q-btn color="primary" icon="fas fa-search" @click="getPokemon" class="q-ml-md"/>
    </div>
    <div class="row justify-between absolute full-width container-arrows">
      <q-icon
        position="absolute"
        name="far fa-arrow-alt-circle-left"
        color="primary"
        style="font-size: 3rem"
        class="q-ml-sm cursor-pointer"
        size="50px"
        @click="getPokemon(--idPokemon)"
      />
      <q-icon
        position="absolute"
        name="far fa-arrow-alt-circle-right"
        color="primary"
        style="font-size: 3rem"
        class="q-mr-sm cursor-pointer"
        size="50px"
        @click="getPokemon(++idPokemon)"

      />
    </div>

  </q-page>
</template>


<script>
import { stop } from 'vue';
import api from '../services/api.js';
import { LoadingBar } from 'quasar';


export default {
  name: "PageIndex",

  data() {
    return {
      namePokemon: "",
      imgPokemon: "",
      buscaPokemon: "bulbasaur",
      idPokemon: ""
    }
  },

  async beforeMount() {
    await this.getPokemon();

  },
  methods: {
    //Metodo Busca Pokemon
    getPokemon(idPokemon) {

      api
        .get(typeof(idPokemon) == 'number' ? `pokemon/${this.idPokemon}` : `/pokemon/${this.buscaPokemon}`)
        .then((response) => {
          //this.$q.loadingBar.start()
          this.idPokemon = response.data.id
          this.imgPokemon = response.data.sprites.other.dream_world.front_default
          this.namePokemon = response.data.name
          this.namePokemon = this.formatName(this.namePokemon)
          console.log(this.idPokemon);
          //this.$q.loadingBar.stop()
        })
        .catch((error)=> {
          this.triggerNegative()
        })
    },
    //Format Name
    formatName(name){

      name = name.split("") //quebra a string em indices de array
      let inicial = name[0].toUpperCase() //Poe o primeiro caractere em Maiusculo
      name[0] = inicial //Altera o Array
      //name = name.toString();
      name = name.join(''); //Volta e retorna a String
      //console.log(nameFormated);
      return name
    },



    //Notify Plugin
    triggerPositive() {
      this.$q.notify({
        position: 'top',
        type: 'positive',
        message: `Pokemon encontrado.`,
        timeout: '1000'
      })
    }, triggerNegative() {
      this.$q.notify({
        position: 'top',
        type: 'negative',
        message: `Pokemon Não Encontrado.`,
        timeout: '1000'
      })
    },




  } //End - Methods

}


</script>

<style lang="scss" scoped>
.container-arrows {

}


</style>
