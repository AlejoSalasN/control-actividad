import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
//import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [reinicio, setReinicio] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setReinicio(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    //playSound();
    setIsActive(!isActive);
    setReinicio(true);
  };

  const handleReiniciar = () => {
    //playSound();
    setTime(currentTime === 0 ? 25 * 60 : currentTime === 1 ? 5 * 60 : 15 * 60);
    setIsActive(false);
    setReinicio(false);
  };

  //Descomentar la siguiente sección en caso de querer agregar sonido a los botones.

  /*const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    );
    await sound.playAsync();
  };*/

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          marginTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          setTime={setTime}
          setCurrentTime={setCurrentTime}
          currentTime={currentTime}
          setIsActive={setIsActive}
          setReinicio={setReinicio}
        />
        <Timer time={time} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleStartStop()}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "DETENER" : "INICIAR"}
          </Text>
        </TouchableOpacity>
        {reinicio ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleReiniciar()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              REINICIAR
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
