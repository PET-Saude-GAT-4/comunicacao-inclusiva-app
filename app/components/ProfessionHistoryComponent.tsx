import { useProfessionHistory } from "@/hooks/useProfessionHistory";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
export function ProfessionHistory() {
  const { history } = useProfessionHistory();

 
  if (history.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acessos Recentes</Text>
      
      <FlatList 
        data={history}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="history" size={24} color="#6366f1" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.professionText} numberOfLines={1}>
                {item.profession.name}
              </Text>
              <Text style={styles.specialityText} numberOfLines={1}>
                {item.speciality.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 20,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 14, 
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, 
    
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
    minWidth: 180,
    maxWidth: 240,
  },
  iconContainer: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)', 
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  professionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  specialityText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
});
