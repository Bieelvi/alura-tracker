<template>
  <section>
    <strong class="cronometro">
      <i class="far fa-clock"></i> {{ pausado ? 'pausado' : tempoDecorrido }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cronometro",
  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0,
    },
    pausado: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style scoped>
.cronometro {
  color: var(--texto-primario);
}
</style>