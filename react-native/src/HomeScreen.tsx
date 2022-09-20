import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "./store/inventory";
import { RootState } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { setAutoFreeze } from "immer";
import { ProductItem } from "./components/ProductItem"


export default (props: StackScreenProps<{}>) => {
  const fetching = useSelector((state: RootState) => state.inventory.fetching);
  const inventory = useSelector(selectors.selectInventory);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(actions.fetchInventory());
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Inventory" />
      </Appbar.Header>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={() => dispatch(actions.fetchInventory())}
          />
        }
      >
        <SafeAreaView>
          {inventory.map((record, index) => (
            <ProductItem title={record.fields["Product Name"]}
              posted={new Date(record.fields.Posted)}
              img={record.fields["Product Image"]}
              categories={record.fields["Product Categories"]}
              />
          ))}
        </SafeAreaView>
      </ScrollView>

      <SafeAreaView style={styles.fab}>
        <FAB
          icon={() => (
            <MaterialCommunityIcons
              name="barcode"
              size={24}
              color="#0B5549"
            />
          )}
          label="Scan Product"
          onPress={() => props.navigation.navigate("Camera")}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center"
  }
});
