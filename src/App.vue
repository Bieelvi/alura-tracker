<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuro }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacao />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacao from "./components/Notificacao.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    Notificacao
},
  data() {
    return {
      modoEscuro: true,
    };
  },
  computed: {},
  methods: {
    trocarTema(modoEscuro: boolean): void {
      this.modoEscuro = modoEscuro;
    }
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background: var(--bg-primario);
  color: var(--texto-primario);
}
</style>