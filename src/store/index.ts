import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: []
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
        }
    }
});

export function useStore() : Store<Estado> {
    return vuexUseStore(key);
}