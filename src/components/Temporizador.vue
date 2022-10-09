<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" :pausado="pausado" />
    <Botao
      v-if="pausado || !iniciado"
      @clicado="iniciar"
      :icone="'fas fa-play'"
      :nome="'play'"
    />
    <Botao
      v-if="!pausado && iniciado"
      @clicado="pausar"
      :icone="'fas fa-pause'"
      :nome="'pause'"
    />
    <Botao
      @clicado="finalizar"
      :icone="'fas fa-stop'"
      :nome="'stop'"
      :iniciado="!iniciado"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
  name: "Temporizador",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    Cronometro,
    Botao,
  },
  props: {
    liberado: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      iniciado: false,
      pausado: false,
    };
  },
  watch: {
    liberado() {
      if (this.liberado)
        this.reseta();       
    }    
  },
  methods: {
    iniciar() {
      if (this.pausado) {
        this.pausar();
      } else {
        this.iniciado = true;
        this.cronometro = setInterval(() => {
          if (!this.pausado) this.tempoEmSegundos++;
        }, 1000);
      }
    },
    finalizar() {
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
    },
    pausar() {
      this.pausado = !this.pausado;
    },
    reseta() {
      this.iniciado = false;
      this.pausado = false;
      this.tempoEmSegundos = 0;
      clearInterval(this.cronometro);
    },
  },
});
</script>