import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ConfirmacaoModal({ visivel, mensagem, onConfirmar, onCancelar }) {
  return (
    <Modal transparent={true} animationType="fade" visible={visivel} onRequestClose={onCancelar}>
      <View style={styles.overlay}>
        <View style={styles.caixa}>
          <Ionicons name="alert-circle" size={64} color="#f59e0b" />
          <Text style={styles.titulo}>Atenção</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
          <View style={styles.acoes}>
            <TouchableOpacity style={[styles.botao, styles.botaoCancelar]} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.botaoConfirmar]} onPress={onConfirmar}>
              <Text style={styles.textoConfirmar}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  caixa: { backgroundColor: '#fff', borderRadius: 20, padding: 32, alignItems: 'center', width: '100%', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 16, elevation: 8 },
  titulo: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginTop: 12 },
  mensagem: { fontSize: 15, color: '#475569', textAlign: 'center', marginTop: 8, marginBottom: 24, lineHeight: 22 },
  acoes: { flexDirection: 'row', gap: 12, width: '100%' },
  botao: { flex: 1, paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  botaoCancelar: { backgroundColor: '#f1f5f9' },
  botaoConfirmar: { backgroundColor: '#dc2626' },
  textoCancelar: { color: '#475569', fontWeight: '700', fontSize: 15 },
  textoConfirmar: { color: '#fff', fontWeight: '700', fontSize: 15 },
})
