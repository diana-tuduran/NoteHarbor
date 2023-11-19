import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

const MenuPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState('');

  const handleUpload = () => {
    // Implement the upload functionality here.
    setModalVisible(true);
  };

  const handleSongPress = (songTitle) => {
    // Handle the press on a song box.
    setSelectedSong(songTitle);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Note Harbor</Text>
      
      <Button title="Upload" onPress={handleUpload} />

      <View style={styles.songContainer}>
        {/* Replace these TouchableOpacity components with song boxes */}
        <TouchableOpacity style={styles.songBox} onPress={() => handleSongPress('Song 1')}>
          <Text>Song 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.songBox} onPress={() => handleSongPress('Song 2')}>
          <Text>Song 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.songBox} onPress={() => handleSongPress('Song 3')}>
          <Text>Song 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.songBox} onPress={() => handleSongPress('Song 4')}>
          <Text>Song 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.songBox} onPress={() => handleSongPress('Song 5')}>
          <Text>Song 5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.songBox} onPress={() => handleSongPress('Song 6')}>
          <Text>Song 6</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for displaying song information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Song Title: {selectedSong}</Text>
            {/* Add more song details here */}
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  songContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  songBox: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default MenuPage;
