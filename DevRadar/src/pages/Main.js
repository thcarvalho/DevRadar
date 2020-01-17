import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../services/api";
import {connect, disconnect, subscribeToNewDev} from "../services/socket";

export default function Main({ navigation }) {
  const [region, setRegion] = useState(null)
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('')

  useEffect(() => {
    async function getPosition() {
      await Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setRegion({ latitude, longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 })
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
        }
      )
    }

    getDevs();
    getPosition();
  }, []);

  useEffect(() => {
    subscribeToNewDev(dev => {
      setDevs([...devs, dev])
    })
  }, [devs])

  async function getDevs() {
    try {
      const response = await api.get('/devs');
      setDevs(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  function changeRegion(currentRegion) {
    setRegion(currentRegion)
    console.log(region);

  }
  function setupWebsocket() {
    disconnect();

    const {latitude, longitude} = region;
    connect(latitude, longitude, techs);


  }

  async function searchDevs() {
    const { latitude, longitude } = region;
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });
    setDevs(response.data.devs);
    setupWebsocket();
  }
  if (!region) {
    return null
  }
  return (
    <>
      <MapView
        onRegionChangeComplete={changeRegion}
        initialRegion={region}
        region={region}
        showsUserLocation
        followsUserLocation
        style={{ flex: 1 }}
      >
        {
          devs.map(dev => (
            <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }}>
              <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
              <Callout onPress={() => navigation.navigate('Profile', { github: dev.github })}>
                <View style={styles.callout}>
                  <Text style={styles.devName}>{dev.name}</Text>
                  <Text style={styles.devBio}>{dev.bio}</Text>
                  <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        }

      </MapView>
      <View style={styles.searchForm}>
        <TextInput value={techs} onChangeText={techs => setTechs(techs)} style={styles.searchInput} placeholder="Busque devs por techs..." placeholderTextColor="#999" autoCapitalize="words" autoCorrect={false} />
        <TouchableOpacity style={styles.btnLocation} onPress={searchDevs}>
          <Icon name="my-location" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    color: "#333",
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 3
  },
  btnLocation: {
    width: 50,
    height: 50,
    backgroundColor: '#8d4eff',
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  },
})