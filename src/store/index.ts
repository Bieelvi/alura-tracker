import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO, FECHAR_NOTIFICACAO, NOTIFICAR } from "./tipo-mutacoes";

interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: []
  },
  mutations: {
    [ADICIONAR_PROJETO](state, nomeProjeto: string): void {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeProjeto
      } as IProjeto;

      state.projetos.push(projeto);
    },
    [ALTERAR_PROJETO](state, projeto: IProjeto): void {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, idProjeto: string): void {
      state.projetos = state.projetos.filter(proj => proj.id != idProjeto);
    },
    [NOTIFICAR](state, notificacao: INotificacao): void {
      notificacao.id = new Date().getTime();
      state.notificacoes.push(notificacao);

      setTimeout(() => {
        removerNotificacao(state, notificacao.id);
      }, 5000);
    },
    [FECHAR_NOTIFICACAO](state, notificacaoId: number): void {
      removerNotificacao(state, notificacaoId);
    }
  }
});

function removerNotificacao(state: Estado, notificacaoId: number) {
  state.notificacoes = state.notificacoes.filter(notif => notif.id != notificacaoId);
}

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}