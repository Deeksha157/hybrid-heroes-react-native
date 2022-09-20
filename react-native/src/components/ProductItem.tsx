import React from "react";
import { StyleSheet } from "react-native";
import { Card, Button, Text } from "react-native-paper";

let today = new Date();
today.setDate(today.getDate() - 7);
const newDate = new Date(today);

interface ProductProps {
    title: string;
    posted: Date;
    img: string;
    categories: string;
}

export class ProductItem extends React.Component <ProductProps> {
    render() {
        const { title, posted, img,  categories} = this.props;
        return (
            <Card mode='outlined' style={styles.container}>
                <Card.Title title={title}
                    titleStyle={styles.title}
                    subtitle= {posted.toLocaleDateString()}
                    subtitleStyle={styles.subtitle}/>
                <Card.Content style={styles.content}>
                    {categories ? categories.split(",").map((item) => (
                        <Text style={styles.categories}>{item}</Text>
                    )) : null}
                </Card.Content>
                {posted>=newDate ? <Button style={styles.new} color="#FFFFFF">New</Button>: 
                    null}
                <Card.Cover style={styles.cover} source={img} defaultSource="/assets/image.png"/>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      bottom: 16,
      width: "100%",
      flex: 1,
      alignItems: "center"
    },
    container: {
      minHeight: 128,
      padding: 8,
      backgroundColor: "#F8F9FC",
      flexGrow: 0,
      shadowColor: "rgba(27, 38, 51, 0.25)",
      borderRadius: 4,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      marginHorizontal: 8,
      marginVertical: 4,
      marginStart: 8,
      marginEnd: 8
    },
    title: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "900",
      fontSize: 20,
      height: 22,
      position: "relative",
      left: 90,
      width: "55%"
    },
    subtitle: {
      fontWeight: "400",
      fontSize: 12,
      fontFamily: "Roboto",
      height: 18,
      display: "flex",
      alignItems: "flex-end",
      position: "relative",
      left: 90
    },
    cover: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 85,
      height: 112,
      backgroundColor: "#C4C4C4"
    },
    content: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        left: 90,
        maxWidth: "80%"
    },
    categories: {
        position: "relative",
        backgroundColor: "#D5E6FF",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 48,
        fontFamily: "Roboto",
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 22,
        color: "#1B2633",
        marginRight: 4,
        marginBottom: 4
    },
    new: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#333333",
        borderBottomLeftRadius: 9,
        borderTopLeftRadius: 9,
        borderBottomRightRadius: 9,
        borderTopRightRadius: 0
    }
  });