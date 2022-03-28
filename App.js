import React, {useState} from 'react';

import {
  SafeAreaView,
  Modal,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import {Formulario} from './src/components/Formulario';
import {InformacionPaciente} from './src/components/InformacionPaciente';
import {Paciente} from './src/components/Paciente';

const App = () => {
  //los hooks se colocan en la parte  superior
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id);
    setPaciente(pacienteEditar[0]);
  };

  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {
          text: 'Si,Eliminar',
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              pacientesState => pacientesState.id !== id,
            );

            setPacientes(pacientesActualizados);
          },
        },
      ],
    );
  };

  const nuevaCitaHandler = () => {
    setModalVisible(true);
  };


  const cerraModal =()=>{
    setModalVisible(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas{' '}
        <Text style={styles.titulobold}>Veterinaria</Text>
      </Text>

      <Pressable onPress={nuevaCitaHandler} style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
              />
            );
          }}
        />
      )}

      {modalVisible && (
        <Formulario
        cerraModal={cerraModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      <Modal visible={modalPaciente} animationType="fade">
        <InformacionPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
};

//Hoja de estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  titulobold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
