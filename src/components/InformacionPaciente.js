import React from 'react';
import {Text, SafeAreaView, Pressable, View, StyleSheet} from 'react-native';
import {formatearFecha} from '../helpers';

export const InformacionPaciente = ({paciente, setModalPaciente,setPaciente}) => {
  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>
        Informacion
        <Text style={styles.tituloBold}> Paciente</Text>
      </Text>
      <View>
        <Pressable
          onLongPress={() =>{
            setModalPaciente(false)
            setPaciente({})
          }}
          style={styles.btnCerrar}>
          <Text style={styles.btnCerrarText}>X Cerrar</Text>
        </Pressable>
      </View>

      <View style={styles.conetido}>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{paciente.paciente}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Propetario:</Text>
          <Text style={styles.valor}>{paciente.propetario}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Email::</Text>
          <Text style={styles.valor}>{paciente.email}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Telefono:</Text>
          <Text style={styles.valor}>{paciente.telefono}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Fecha Alta:</Text>
          <Text style={styles.valor}>{formatearFecha(paciente.fecha)}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Sintomas:</Text>
          <Text style={styles.valor}>{paciente.sintomas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnCerrarText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  conetido: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,

    elevation: 8,
  },

  campo:{
      marginBottom:10

  },
label:{
    textTransform: "uppercase",
    color:'#374151',
    fontWeight:'600',
    marginBottom:3,
    fontSize:12

},
valor:{
    fontWeight: '700',
    fontSize:20,
    color:'#334155',

},
});
