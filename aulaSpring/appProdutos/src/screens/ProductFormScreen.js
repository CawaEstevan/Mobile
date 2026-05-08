import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import api from '../services/api'
import FeedbackModal from '../components/FeedbackModal'

export default function ProductFormScreen({ navigation, route }) {
  const produtoId = route.params?.id ?? null
  const editando = produtoId !== null

  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [valor, setValor] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [carregandoDados, setCarregandoDados] = useState(editando)

  const [modal, setModal] = useState({ visivel: false, tipo: '', mensagem: '' })

  const abrirModal = (tipo, mensagem) => setModal({ visivel: true, tipo, mensagem })
  const fecharModal = () => {
    setModal({ visivel: false, tipo: '', mensagem: '' })
    if (modal.tipo === 'sucesso') navigation.goBack()
  }

  useEffect(() => {
    if (!editando) return
    const carregarProduto = async () => {
      try {
        const resposta = await api.get(`/api/produtos/${produtoId}`)
        setNome(resposta.data.nome)
        setQuantidade(String(resposta.data.quantidade))
        setValor(String(resposta.data.valor))
      } catch (erro) {
        abrirModal('erro', 'Não foi possível carregar os dados para edição.')
      } finally {
        setCarregandoDados(false)
      }
    }
    carregarProduto()
  }, [editando, produtoId])

  const validarCampos = () => {
    if (!nome.trim()) {
      abrirModal('erro', 'O campo Nome é obrigatório.')
      return false
    }
    if (!quantidade.trim() || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      abrirModal('erro', 'Digite uma quantidade válida (número inteiro >= 0).')
      return false
    }
    if (!valor.trim()) {
      abrirModal('erro', 'O campo Valor é obrigatório.')
      return false
    }
    const valorNum = Number(valor.replace(',', '.'))
    if (isNaN(valorNum) || valorNum <= 0) {
      abrirModal('erro', 'Digite um valor válido maior que zero.')
      return false
    }
    return true
  }

  const salvarProduto = async () => {
    if (!validarCampos()) return

    const payload = {
      nome: nome.trim(),
      quantidade: parseInt(quantidade, 10),
      valor: parseFloat(valor.replace(',', '.')),
    }

    try {
      setSalvando(true)
      if (editando) {
        await api.put(`/api/produtos/${produtoId}`, payload)
        abrirModal('sucesso', 'Produto atualizado com sucesso!')
      } else {
        await api.post('/api/produtos', payload)
        abrirModal('sucesso', 'Produto cadastrado com sucesso!')
      }
    } catch (erro) {
      const mensagem = editando
        ? 'Não foi possível atualizar o produto. Tente novamente.'
        : 'Não foi possível cadastrar o produto. Tente novamente.'
      abrirModal('erro', mensagem)
    } finally {
      setSalvando(false)
    }
  }

  if (carregandoDados) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.textoCarregando}>Carregando dados...</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>{editando ? 'Editar produto' : 'Novo produto'}</Text>
        <Text style={styles.subtitulo}>
          {editando ? 'Altere os campos e salve.' : 'Preencha os campos abaixo.'}
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            placeholderTextColor="#94a3b8"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantidade em estoque"
            placeholderTextColor="#94a3b8"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Valor unitário</Text>
          <TextInput
            style={styles.input}
            placeholder="0,00"
            placeholderTextColor="#94a3b8"
            value={valor}
            onChangeText={setValor}
            keyboardType="decimal-pad"
            returnKeyType="done"
          />
        </View>

        <TouchableOpacity
          style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
          onPress={salvarProduto}
          disabled={salvando}
          activeOpacity={0.85}
        >
          {salvando ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.textoBotao}>{editando ? 'Atualizar' : 'Cadastrar'}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <FeedbackModal
        visivel={modal.visivel}
        tipo={modal.tipo}
        mensagem={modal.mensagem}
        onFechar={fecharModal}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    gap: 12,
  },
  textoCarregando: { color: '#64748b', fontSize: 15 },
  conteudo: { padding: 20, gap: 20 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subtitulo: { fontSize: 14, color: '#94a3b8', marginTop: -12 },
  campo: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155' },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0f172a',
  },
  botaoSalvar: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  botaoDesabilitado: { opacity: 0.6 },
  textoBotao: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
})