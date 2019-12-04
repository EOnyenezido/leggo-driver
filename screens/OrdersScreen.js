import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Button, StyleProvider,
  List, ListItem, Left, Thumbnail, Body, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import firebase from '../services/firebase';


export default function OrdersScreen(props) {
  const [orders, setOrders] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    const unsubscribe = db.collection("orders").where("assignedTo", "==", "1816")
    .onSnapshot(function(querySnapshot) { 
      let newOrders = [];       
      querySnapshot.forEach(function(doc) {
        newOrders.push({id: doc.id, ...doc.data()});
      });
      setOrders(newOrders);
    });

    return () => {
      unsubscribe();
    };
  }, [orders.length]);

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Content padder>
          <Grid>
            <Row>
              <Col style={styles.topCol}>
                <Text style={styles.topText}>Your orders</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.midCol}>
                <Text style={styles.subText}>All orders assigned to you</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.break} />
            </Row>
            <Row>
              <Col>
                <List>
                  <ListItem itemDivider first>
                    <Text>MY ORDERS</Text>
                  </ListItem>
                  {
                    orders.length > 0 ?
                    orders.map((order) => {
                      return (
                        <ListItem avatar key={order.id}>
                          <Left>
                            <Thumbnail source={ props.userDetails ? {uri: props.userDetails.profileImage} : require('../assets/images/profile_picture.png') } />
                          </Left>
                          <Body>
                            <Text>{order.sender.fullName}</Text>
                            <Text note>{order.pickup.description}</Text>
                          </Body>
                          <Right>
                            <Text note>{new Date(order.createdAt).toLocaleTimeString()}</Text>
                            <Button transparent onPress={() => props.navigation.navigate('Delivery', {id: order.id})}>
                              <Text style={styles.buttonText}>View</Text>
                            </Button>
                          </Right>
                        </ListItem>
                      )
                    })
                    :
                    <Text style={{textAlign: 'center', marginTop: 10}}>NO ORDERS ASSIGNED TO YOU YET.</Text>
                  }
                </List>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
}

OrdersScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  topText: {
    fontFamily: 'aller',
    fontSize: 24,
    lineHeight: 25,
    textAlign: 'center',
  },
  topCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(315)
  },
  midCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(86)
  },
  subText: {
    color: colors.gray,
    fontFamily: 'aller',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center',
  },
  mainText: {
    fontFamily: 'aller',
    fontSize: 101,
    lineHeight: 102,
    textAlign: 'center',
  },
  mainCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(430)
  },
  orderCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(165)
  },
  orderRow: {
    justifyContent: 'center',
    // alignItems: 'center',
    height: layout.modifier.height(165)
  },
  orderImage: {
    width: layout.modifier.width(130),
    height: layout.modifier.height(130),
    resizeMode: 'contain'
  },  
  break: {
    height: layout.modifier.height(87)
  },
  break1: {
    height: layout.modifier.height(65)
  },
  buttonText: {
    color: colors.tintColor,
  },
  progressCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(60)
  },
  progressBar: {
    width: layout.modifier.width(465)
  },
  dot: {
    width: layout.modifier.width(29),
    height: layout.modifier.height(29),
    marginBottom: layout.modifier.height(35),
    resizeMode: 'contain'
  },
  commentText: {
    fontFamily: 'aller',
    fontSize: 10,
    lineHeight: 11,
    textAlign: 'left',
  },
  commentCol: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: layout.modifier.height(155)
  },
  dotCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(155),
    width: layout.modifier.height(100)
  },
});