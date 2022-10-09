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
import {
  ADICIONAR_PROJETO,
  ALTERAR_PROJETO,
  NOTIFICAR,
} from "@/store/tipo-mutacoes";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
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
        this.store.commit(NOTIFICAR, {
          titulo: "Atenção",
          texto: "É necessário o projeto ter nome",
          tipo: TipoNotificacao.ATENCAO,
        } as INotificacao);
        return;
      }
      if (this.id) {
        this.store.commit(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeProjeto,
        } as IProjeto);

        this.store.commit(NOTIFICAR, {
          titulo: "Sucesso",
          texto: "Projeto alterado com sucesso!",
          tipo: TipoNotificacao.SUCESSO,
        } as INotificacao);
      } else {
        this.store.commit(ADICIONAR_PROJETO, this.nomeProjeto as string);

        this.store.commit(NOTIFICAR, {
          titulo: "Sucesso",
          texto: "Projeto criado com sucesso!",
          tipo: TipoNotificacao.SUCESSO,
        } as INotificacao);
      }

      this.nomeProjeto = "";
      this.$router.push("/projetos");
    },
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