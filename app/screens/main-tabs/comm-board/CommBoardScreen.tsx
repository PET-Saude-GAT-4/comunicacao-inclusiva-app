import { commBoardMock } from "@/mocks/commBoardMock";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pictogram } from "../../../types/pictogram.types";
import { styles } from "./CommBoardScreen.styles";

export default function CommBoardScreen() {
  //save the selected pictogram sequence
  const [selectedPictograms, setSelectedPictograms] = useState<Pictogram[]>([]);

  //add pictograms to the list
  const handleSelect = (pictogram: Pictogram) => {
    setSelectedPictograms((prev) => [...prev, pictogram]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.visorContainer}>
        <Text style={styles.text}>Iteração do Porfissional</Text>
        <View style={styles.listSelectedPictograms}>
          {/* Scroll view to list all selected pictograms  */}
          <ScrollView horizontal={true}>
            {selectedPictograms.map((pictogram, index) => (
              <View
                key={`${pictogram.id}-${index}`}
                style={styles.selectedPictrogramDiv}
              >
                <Image
                  source={pictogram.imageUrl}
                  style={styles.selectedPictrogramImage}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* FlatList to list all pictograms */}
      <View style={styles.gridContainer}>
        <FlatList
          horizontal={true}
          data={commBoardMock.items}
          keyExtractor={(item) => item.pictogram.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item.pictogram)}>
              <View style={styles.pictrogramDiv}>
                <Image
                  source={item.pictogram.imageUrl}
                  style={styles.pictrogramImage}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
