import React, {useState, useEffect} from 'react';
import {
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

//keyboardType sirve para cambiar el diseño del teclado

//cualquier dependencia que instalemos en nuestro proyecto hay que ejecutar cd ios y luego pod install para que tambien en ios

export const Formulario = ({
  modalVisible,
  cerraModal,
  setPacientes,
  pacientes,
  paciente: pacienteObj,
  setPaciente:setPacienteApp
}) => {
  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState('');

  const [propetario, setPropetario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropetario(pacienteObj.propetario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    if ([paciente, propetario, email, telefono, fecha, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevoPaciente = {
      paciente,
      propetario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    //revisar si es un registro nuevo o edicionado
    if (id) {
      //Editando
      nuevoPaciente.id=id
      const pacientesActualizados = pacientes.map(pacientesState => 
        pacientesState.id === nuevoPaciente.id ? nuevoPaciente : pacientesState)

        setPacientes(pacientesActualizados)
        setPacienteApp({})

    } else {
      //nuevo registro
      nuevoPaciente.id=Date.now()
      setPacientes([...pacientes, nuevoPaciente]);

    }

    cerraModal()
    setPaciente('');
    setId('');
    setPropetario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            onLongPress={() =>{
              cerraModal()
              setPacienteApp({})
              setId('');
              setPaciente('');
              setPropetario('');
              setEmail('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');

            }}
            style={styles.btnCancelar}>
            <Text style={styles.btnCancelarText}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propetario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propetario"
              placeholderTextColor={'#666'}
              value={propetario}
              onChangeText={setPropetario}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email Propetario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propetario"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Telefono Propetario</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono Propetario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={8}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>

            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale="es"
                mode="date"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, styles.sintomasInput]}>Síntomas</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaText}> {pacienteObj.id ? 'Editar Paciente' : 'Agregar Paciente'}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
    marginBottom: 10,
  },

  fechaContenedor: {
   
    borderRadius: 10,
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnCancelarText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaText: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
