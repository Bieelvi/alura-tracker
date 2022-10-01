<template>
  <header>
    <h1>
      <img src="./../assets/logo.png" alt="Logo do alura tracker" />
    </h1>
    <button class="button" @click="alterarTema">{{ textoBotao }}</button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuro: true,
    };
  },
  computed: {
    textoBotao(): string {
      return this.modoEscuro ? "Desativar modo escuro" : "Ativar modo escuro";
    },
  },
  methods: {
    alterarTema(): void {
      this.modoEscuro = !this.modoEscuro;
      this.$emit("aoTemaAlterado", this.modoEscuro);
    },
  },
});
</script>

<style>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>