<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricaoTarefa"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="" selected>Selecione um projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" :liberado="liberado"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  emits: ["aoSalvarTarefa"],
  components: {
    Temporizador,
  },
  data() {
    return {
      descricaoTarefa: "",
      idProjeto: '',
      liberado: false,
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      if (!this.idProjeto) {
        this.store.commit(NOTIFICAR, {
          titulo: 'Falha',
          texto: 'É necessário vincular alguem projeto a tarefa',
          tipo: TipoNotificacao.FALHA
        } as INotificacao);

        this.liberado = false;

        return;
      }

      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricaoTarefa,
        projeto: this.projetos.find(proj => proj.id == this.idProjeto),
      });
      this.descricaoTarefa = "";
      this.liberado = true;      

      setTimeout(() => {
        this.liberado = false;
      }, 1000);
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projetos),
      store
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background: var(--bg-primario);
}
</style>