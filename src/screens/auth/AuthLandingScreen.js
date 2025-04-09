import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const AuthLandingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>OD App</Text>
            <Text style={styles.subtitle}>Manage your organizational development</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.chooseText}>I am a...</Text>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('StudentLogin')}
            >
              <MaterialIcons name="person" size={24} color="#fff" />
              <Text style={styles.buttonText}>Student</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.buttonAlt]}
              onPress={() => navigation.navigate('ClubLogin')}
            >
              <MaterialIcons name="group" size={24} color="#fff" />
              <Text style={styles.buttonText}>Club/Organization</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  headerContainer: {
    marginTop: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
  },
  buttonContainer: {
    marginBottom: 50,
  },
  chooseText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonAlt: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AuthLandingScreen;