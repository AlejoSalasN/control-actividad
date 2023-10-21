import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Actividad", "Respiro", "Descando"];

const Header = ({
  setTime,
  currentTime,
  setCurrentTime,
  setIsActive,
  setReinicio,
}) => {
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
    setIsActive(false);
    setReinicio(false);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index && {
              borderColor: "transparent",
            },
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    padding: 5,
    borderColor: "white",
    marginVertical: 20,
  },
});

export default Header;
