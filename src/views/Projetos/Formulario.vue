<template>
  <form @submit.prevent="salvar" class="form">
    <div class="field">
      <label for="nomeProjeto" class="label texto">Nome do Projeto</label>
      <input
        type="text"
        class="input"
        id="nomeProjeto"
        v-model="nomeProjeto"
      />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</template>
<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id){
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
      this.nomeProjeto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeProjeto: ""
    };
  },
  methods: {
    salvar() {
      if (this.nomeProjeto === "")
        return;
      if (this.id) {
        this.store.commit('ALTERAR_PROJETO', {
          id: this.id,
          nome: this.nomeProjeto
        });
      } else {
        this.store.commit('ADICIONAR_PROJETO', this.nomeProjeto);
      }

      this.nomeProjeto = "";
      this.$router.push('/projetos');
    }
  },
  setup() {
    const store = useStore();
    return { store };
  },
});
</script>

<style scoped>
.form {
  padding-bottom: 1rem;
}
</style>