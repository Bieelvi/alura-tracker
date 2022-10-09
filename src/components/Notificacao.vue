<template>
  <div class="notificacao">
    <article
      class="message"
      :class="tipoNotificacao[notificacao.tipo]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header is-flex">
        {{ notificacao.titulo }} 
        <i class="fa fa-close" @click="fecharNotificacao(notificacao.id)"></i>
      </div>
      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { FECHAR_NOTIFICACAO } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Notificacao",
  data() {
    return {
      tipoNotificacao: {
        [TipoNotificacao.SUCESSO]: "is-success",
        [TipoNotificacao.ATENCAO]: "is-warning",
        [TipoNotificacao.FALHA]: "is-danger",
      },
    };
  },
  methods: {
    fecharNotificacao(notificacaoId: number){
      this.store.commit(FECHAR_NOTIFICACAO, notificacaoId);      
    },  
  },
  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
      store
    };
  },
});
</script>

<style scoped>
.notificacao {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>