<template>
  <router-link to="/projetos/novo" class="button mb-2">
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>
    <span>Novo projeto</span>
  </router-link>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.nome }}</td>
        <td>
          <router-link :to="`/projetos/${projeto.id}`" class="button">
            <span class="icon is-small">
              <i class="fas fa-pencil-alt"></i>
            </span>
          </router-link>
          <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
            <span class="icon is-msmall">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
  <script lang="ts">
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { EXCLUIR_PROJETO, NOTIFICAR } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Lista",
  data() {
    return {
      nomeProjeto: "",
    };
  },
  methods: {
    excluir(idProjeto: string) {
      this.store.commit(EXCLUIR_PROJETO, idProjeto as string);

      this.store.commit(NOTIFICAR, {
        titulo: 'Sucesso',
        texto: 'Projeto excluido com sucesso!',
        tipo: TipoNotificacao.SUCESSO
      } as INotificacao);
    },
  },
  setup() {
    const store = useStore();
    return { store, projetos: computed(() => store.state.projetos) };
  },
});
</script>