import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import { formatearFecha } from '../helpers';


export const Paciente = ({
  item,
  setModalVisible,
  setPaciente,
  setModalPaciente,
  pacienteEditar,
  pacienteEliminar,
}) => {
  const {paciente, fecha, id} = item;

  
  return (
    <Pressable
    onLongPress={()=>{
      setModalPaciente(true)
      setPaciente(item)
    }}>

    <View style={styles.contenedor}>
      <Text style={styles.label}>Paciente:</Text>
      <Text style={styles.texto}>{paciente}</Text>
      <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnEditar]}
          onLongPress={() => {
            setModalVisible(true);
            pacienteEditar(id);
          }}>
          <Text style={styles.btnTexto}>Editar</Text>
        </Pressable>
        <Pressable
        style={[styles.btn, styles.btnEliminar]}
        onLongPress={() => pacienteEliminar(id)}>
        <Text style={styles.btnTexto}>eliminar</Text>
      </Pressable>
      </View>
     
    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFf',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  texto: {
    color: '#6D28D9',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
  },

  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#F59E08',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});
