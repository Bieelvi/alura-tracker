<template>
  <button class="button" @click="clicado" :disabled="iniciado">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{ nome }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Botao",
  emits: ["clicado"],
  props: {
    iniciado: {
      type: Boolean,
      default: false,
    },
    icone: {
      type: String,
      default: "",
    },
    nome: {
      type: String,
      default: "",
    },
  },
  methods: {
    clicado() : void {
      this.$emit("clicado");
    },
  },
});
</script>
