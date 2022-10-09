<template>
  <form @submit.prevent="salvar" class="form">
    <div class="field">
      <label for="nomeProjeto" class="label texto">Nome do Projeto</label>
      <input type="text" class="input" id="nomeProjeto" v-model="nomeProjeto" />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import useNotificar from "@/hooks/notificar"

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeProjeto: "",
    };
  },
  methods: {
    salvar() {
      if (this.nomeProjeto === "") {
        this.notificar(
          TipoNotificacao.ATENCAO,
          "Atenção",
          "É necessário o projeto ter nome!"
        );
        return;
      }
      if (this.id) {
        this.store.commit(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeProjeto,
        } as IProjeto);

        this.notificar(
          TipoNotificacao.SUCESSO,
          "Sucesso",
          "Projeto alterado com sucesso!"
        );
      } else {
        this.store.commit(ADICIONAR_PROJETO, this.nomeProjeto as string);

        this.notificar(
          TipoNotificacao.SUCESSO,
          "Sucesso",
          "Projeto criado com sucesso!"
        );
      }

      this.nomeProjeto = "";
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificar();
    return { store, notificar };
  },
});
</script>

<style scoped>
.form {
  padding-bottom: 1rem;
}
</style>