<template>
  <div class="projetos">
    <h1 class="title texto">Projetos</h1>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Projetos",
});
</script>

<style>
.projetos {
  padding: 1.25rem;
}
.texto {
  color: var(--texto-primario);
}
</style>