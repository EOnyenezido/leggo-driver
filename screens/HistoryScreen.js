import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Button, StyleProvider, Icon,
  Card, CardItem, Left, Thumbnail, Body, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import TextAvatar from '../components/TextAvatar';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import firebase from '../services/firebase';

function HistoryScreen(props) {
  const [orders, setOrders] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    const unsubscribe = db.collection("orders").where("assignedTo", "==", props.userDetails.id)
    .where("stage", "==", 4)
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
                <Text style={styles.topText}>Your history</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.midCol}>
                <Text style={styles.subText}>All orders completed by you</Text>
              </Col>
            </Row>
            {
              orders.length > 0 ?
              orders.map((order) => {
                const initials = order.sender.fullName[0].toUpperCase()+order.sender.fullName.split(' ')[1][0].toUpperCase();
                return (
                  <Card style={{flex: 0}} key={order.id}>
                    <CardItem bordered>
                      <Left>
                        <TextAvatar
                           backgroundColor={colors.tintColor}
                           textColor={'white'}
                           size={60}
                           type={'circle'} // optional
                          >{initials}</TextAvatar>
                        <Body>
                          <Text>{order.sender.fullName}</Text>
                          <Text note>{new Date(order.createdAt).toLocaleString()}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={styles.fee}>{order.deliveryConfirmationCode}</Text>
                        <Text>
                          From: {order.pickup.description}
                        </Text>
                        <Text>
                          To: {order.destination.description}
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem bordered>
                      <Left>
                        <Button transparent textStyle={{color: '#87838B'}}>
                          <Icon ios='ios-cash' android="md-cash"/>
                          <Text>₦ {order.deliveryFee}</Text>
                        </Button>
                      </Left>
                    </CardItem>
                  </Card>
                )
              })
              :
              <Text style={{textAlign: 'center', marginTop: 10}}>NO ORDERS COMPLETED BY YOU YET.</Text>
            }
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
}

HistoryScreen.navigationOptions = {
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
    height: layout.modifier.height(86),
    marginBottom: layout.modifier.height(50)
  },
  fee: {
    fontFamily: 'aller',
    fontSize: 28,
    lineHeight: 29,
    textAlign: 'center',
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

const mapStateToProps = state => {
  return { userDetails: state.userDetails, };
};

export default connect(mapStateToProps)(HistoryScreen);