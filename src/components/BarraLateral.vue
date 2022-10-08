<template>
  <header>
    <h1 class="has-text-centered">
      <img src="./../assets/logo.png" alt="Logo do alura tracker" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">{{ textoBotao }}</button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link class="link" to="/">
            <i class="fas fa-tasks"></i> Tarefas
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/projetos">
            <i class="fas fa-project-diagram"></i> Projetos
          </router-link>
        </li>
      </ul>
    </nav>
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
      return this.modoEscuro ? "Modo claro" : "Modo escuro";
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
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>