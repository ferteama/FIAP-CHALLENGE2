import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { OcorrenciasProvider } from "./src/context/OcorrenciasContext";
import ListaScreen from "./src/screens/ListaScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import DetalheScreen from "./src/screens/DetalheScreen";
import { Ocorrencia } from "./src/interfaces/ocorrencia";
import { CORES } from "./src/utils/tema";

type Tela = "lista" | "cadastro" | "detalhe";

export default function App() {
  // Estado de navegação — controla qual tela está visível
  const [telaAtual, setTelaAtual] = useState<Tela>("lista");

  // Ocorrência selecionada para o detalhe
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] =
    useState<Ocorrencia | null>(null);

  function irParaDetalhe(ocorrencia: Ocorrencia) {
    setOcorrenciaSelecionada(ocorrencia);
    setTelaAtual("detalhe");
  }

  function irParaCadastro() {
    setTelaAtual("cadastro");
  }

  function irParaLista() {
    setOcorrenciaSelecionada(null);
    setTelaAtual("lista");
  }

  function renderTela() {
    switch (telaAtual) {
      case "lista":
        return (
          <ListaScreen
            onVerDetalhe={irParaDetalhe}
            onNovaCadastro={irParaCadastro}
          />
        );

      case "cadastro":
        return (
          <CadastroScreen
            onVoltar={irParaLista}
            onSucesso={irParaLista}
          />
        );

      case "detalhe":
        if (!ocorrenciaSelecionada) return null;
        return (
          <DetalheScreen
            ocorrencia={ocorrenciaSelecionada}
            onVoltar={irParaLista}
          />
        );

      default:
        return null;
    }
  }

  return (
    <OcorrenciasProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={CORES.background}
      />
      <SafeAreaView style={styles.safeArea}>
        {renderTela()}
      </SafeAreaView>
    </OcorrenciasProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CORES.background,
  },
});
