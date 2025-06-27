import {
  Appearance,
  StyleSheet,
  Platform,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { MENU_ITEMS } from "@/constants/MenuItems";
import MenuImages from "@/constants/MenuImages";

export default function MenuScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const seperatorComp = <View style={styles.seperator} />;
  const headerComp = <Text style={{ color: theme.text }}>Start of menu</Text>;
  const footerComp = <Text style={{ color: theme.text }}>End of menu</Text>;
  return (
    <Container style={styles.contentContainer}>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={seperatorComp}
        ListHeaderComponent={headerComp}
        ListFooterComponent={footerComp}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.menuTextRow}>
              <Text style={[styles.menuItemTitle, styles.menuItemText]}>
                {item.title}
              </Text>
              <Text style={styles.menuItemText}>{item.description}</Text>
              <Image
                source={MenuImages[item.id - 1]}
                style={styles.menuImage}
              ></Image>
            </View>
          </View>
        )}
      ></FlatList>
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    contentContainer: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    seperator: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "black",
      width: "50%",
      marginHorizontal: "auto",
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 600,
      height: 200,
      marginBottom: 10,
      borderStyle: "solid",
      borderColor: colorScheme === "dark" ? "papayawhip" : "#000",
      borderWidth: 1,
      borderRadius: 20,
      overflow: "hidden",
      marginHorizontal: "auto",
    },
    menuTextRow: {
      width: "65%",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
    },
    menuItemTitle: {
      fontSize: 18,
      textDecorationLine: "underline",
    },
    menuItemText: {
      color: theme.text,
    },
    menuImage: {
      width: 100,
      height: 100,
    },
  });
}
