import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import { Container, Content, Text, Button, StyleProvider, Card, CardItem, Item, Input, Spinner,
  List, ListItem, Left, Thumbnail, Body, Right, Icon, Tab, Tabs, TabHeading, Header, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useKeepAwake } from 'expo-keep-awake';
import { connect } from 'react-redux';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import firebase from '../services/firebase';
import { setWatchLocation } from '../redux/actions/actions';

function DeliveryScreen(props) {
  const [order, setOrder] = useState({});
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const db = firebase.firestore();
  const orderId = props.navigation.dangerouslyGetParent().getParam('id');

  useKeepAwake();
  
  useEffect(() => {
    const unsubscribe = db.collection("orders").doc(orderId)
    .onSnapshot(function(doc) {
      const body = doc.data();
      setOrder({id: doc.id, ...body});
      setPage(body.stage);
    });

    return () => {
      unsubscribe();
    };
  }, [orderId]);

  const updateDelivery = async (stage, status) => {
    setLoading(true);
    props.watchLocation.remove();

    if(stage <= order.stage) {
      setLoading(false);
      return Toast.show({
        text: `Delivery already at ${order.status.toUpperCase()} stage`,
        buttonText: 'Close',
        type: 'warning',
        duration: 5000
      })
    }

    // check for location permission and GPS availability
    if (stage < 3 && stage >= order.stage)  {
      let gps = await Location.hasServicesEnabledAsync();
      if (!gps) {
        return Toast.show({
          text: 'Please enable your GPS location service to continue',
          buttonText: 'Close',
          type: 'danger',
          duration: 5000
        })
      }
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        return Toast.show({
          text: 'Permission to access location was denied. Please allow permission',
          buttonText: 'Close',
          type: 'danger',
          duration: 5000
        })
      }
    }

    if(stage === 4 && code !== order.deliveryConfirmationCode)  { // check delivery code
      setLoading(false);
      
      return Toast.show({
        text: 'Incorrect delivery code. Please confirm user\'s identity!',
        buttonText: 'Close',
        type: 'danger',
        duration: 5000
      })
    }

    db.collection("orders").doc(orderId)
    .update({
      stage: stage,
      status: status
    })
    .then(async () => {
      setLoading(false);
      setPage(stage);
      Toast.show({
        text: `Order ${status.toUpperCase()} successfully.`,
        buttonText: 'Close',
        type: 'success',
        duration: 5000
      })

      if (stage < 3 && stage >= order.stage)  {
        // redundant but check anyway
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          Toast.show({
            text: 'Permission to access location was denied. Please allow permission',
            buttonText: 'Close',
            type: 'danger',
            duration: 5000
          })
        } else  {
          const options = {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 0
          }
          const clearLocation = await Location.watchPositionAsync(options, (location) => {
            db.collection("transit").doc(orderId)
            .set(location);
          });
          props.setWatchLocation(clearLocation);
        }
      }
    })
    .catch((error) => {
      setLoading(false);
      Toast.show({
        text: error,
        buttonText: 'Close',
        type: 'danger',
        duration: 5000
      })
    })
  };
  
  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Content padder>
          <Grid>
            <Row>
              <Col style={styles.topCol}>
                <Button iconLeft full dark bordered  onPress={() => props.navigation.navigate('Orders')}
                  style={{...styles.topButton, borderBottomLeftRadius: 45, borderTopLeftRadius: 45}}>
                  <Icon ios='ios-arrow-back' android="md-arrow-back"/>
                  <Text>BACK</Text>
                </Button>
              </Col>
              <Col style={styles.topCol}>
                <Button iconLeft full dark bordered style={styles.topButton}>
                  <Icon ios='ios-locate' android="md-locate"/>
                  <Text>TRACK</Text>
                </Button>
              </Col>
              <Col style={styles.topCol}>
                <Button iconRight full dark bordered style={{...styles.topButton, borderBottomRightRadius: 45, borderTopRightRadius: 45}}
                   onPress={() => Linking.openURL(`tel:${order.support}`)}>
                  <Text>SUPPORT</Text>
                  <Icon ios='ios-call' android="md-call"/>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={styles.break} />
            </Row>
            <Row>
              <Col>
                <Tabs page={page > 3 ? 3 : page}>
                  <Tab heading={ <TabHeading style={styles.tabHeading}>
                    <Image source={ order.stage >= 1 ? require('../assets/images/source1.png')
                                : require('../assets/images/source.png')} style={styles.sourceImage}/>
                      <Text style={styles.tabText}>SOURCE</Text>
                    </TabHeading>}>
                    <Row>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment party</Text>
                        <Text style={styles.bottomText}>{order.paymentParty}</Text>
                      </Col>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment type</Text>
                        <Text style={styles.bottomText}>{order.paymentType}</Text>
                      </Col>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Extra Packaging</Text>
                        <Text style={styles.bottomText}>{order.extraPackaging ? 'YES' : 'NO'}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{...styles.mainCol, marginTop: 0, flexDirection: 'row'}}>
                        <Text style={styles.topText}>Delivery Fee:   </Text>
                        <Text style={styles.fee}>₦ {order.deliveryFee}</Text>
                      </Col>
                    </Row>
                    <Row style={styles.mainRow}>
                      <Col>
                        <Card>
                          <Row>
                            <Col style={styles.sourceLeft}>
                              <Image source={ require('../assets/images/source.png') } style={styles.sourceImage}/>
                              <Text style={styles.tabText}>SOURCE</Text>
                            </Col>
                            <Col>
                              <List>                                
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-person' android="md-person" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.sender && order.sender.fullName.toUpperCase()}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-pin' android="md-pin" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.pickup && order.pickup.description}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-chatbubbles' android="md-chatbubbles" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                  <ScrollView>
                                    <Text style={styles.listText}>{order.pickupInstruction}</Text>
                                  </ScrollView>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-call' android="md-call" style={styles.listText}/>
                                  </Left>
                                  <Body style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.listText}>{order.sender && order.sender.phoneNumber}</Text>
                                    <Button rounded style={styles.listButton} onPress={() => Linking.openURL(`tel:${order.sender.phoneNumber}`)}>
                                      <Text>CALL NOW</Text>
                                    </Button>
                                  </Body>
                                </ListItem>
                              </List>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                    <Row style={styles.mainRow}>
                      <Col>
                        <Card>
                          <Row>
                            <Col style={{...styles.sourceLeft, backgroundColor: colors.pinkGray}}>
                              <Image source={ require('../assets/images/final.png') } style={styles.sourceImage}/>
                              <Text style={styles.tabText}>FINAL</Text>
                            </Col>
                            <Col>
                              <List>                                
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-person' android="md-person" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.receiver && order.receiver.fullName.toUpperCase()}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-pin' android="md-pin" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.destination && order.destination.description}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-chatbubbles' android="md-chatbubbles" style={styles.listText}/>
                                  </Left>
                                  <ScrollView>
                                    <Text style={styles.listText}>{order.deliveryInstruction}</Text>
                                  </ScrollView>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-call' android="md-call" style={styles.listText}/>
                                  </Left>
                                  <Body style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.listText}>{order.receiver && order.receiver.phoneNumber}</Text>
                                    <Button rounded style={styles.listButton} onPress={() => Linking.openURL(`tel:${order.sender.phoneNumber}`)}>
                                      <Text>CALL NOW</Text>
                                    </Button>
                                  </Body>
                                </ListItem>
                              </List>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.buttonCol}>
                        <Button disabled={loading} onPress={() => updateDelivery(1, 'started')}
                          rounded style={styles.buttonItem}>
                          {
                            loading ? <Spinner color='white' /> : <Text style={styles.buttonText}>Start</Text>
                          }
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab heading={ <TabHeading style={styles.tabHeading}>
                    <Image source={ order.stage >= 2 ? require('../assets/images/pickup.png')
                                : require('../assets/images/pickup_blank.png')} style={styles.sourceImage}/>
                      <Text style={styles.tabText}>PICK UP</Text>
                    </TabHeading>}>
                    <View style={{justifyContent: 'flex-start'}}>
                      <Row>
                        <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment party</Text>
                        <Text style={styles.bottomText}>{order.paymentParty}</Text>
                      </Col>
                        <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment type</Text>
                        <Text style={styles.bottomText}>{order.paymentType}</Text>
                      </Col>
                        <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Extra Packaging</Text>
                        <Text style={styles.bottomText}>{order.extraPackaging ? 'YES' : 'NO'}</Text>
                      </Col>
                      </Row>
                      <Row>
                        <Col style={{...styles.mainCol, marginTop: 0, flexDirection: 'row'}}>
                          <Text style={styles.topText}>Delivery Fee:   </Text>
                          <Text style={styles.fee}>₦ {order.deliveryFee}</Text>
                        </Col>
                      </Row>
                      <Row style={styles.mainRow}>
                        <Col>
                        <Card>
                          <Row>
                            <Col style={styles.sourceLeft}>
                              <Image source={ order.stage >= 1 ? require('../assets/images/source1.png')
                                : require('../assets/images/source.png')} style={styles.sourceImage}/>
                              <Text style={styles.tabText}>SOURCE</Text>
                            </Col>
                            <Col>
                              <List>                                
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-person' android="md-person" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.sender && order.sender.fullName.toUpperCase()}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-pin' android="md-pin" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.pickup && order.pickup.description}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-albums' android="md-albums" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>Type: {order.selectedItems && order.selectedItems[0] && order.selectedItems[0].itemName}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-cube' android="md-cube" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>Parcel: {order.parcelType && order.parcelType[0] && order.parcelType[0].count} 
                                      {order.parcelType && order.parcelType[0] && order.parcelType[0].type}
                                    </Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-chatbubbles' android="md-chatbubbles" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                  <ScrollView>
                                    <Text style={styles.listText}>{order.pickupInstruction}</Text>
                                  </ScrollView>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-call' android="md-call" style={styles.listText}/>
                                  </Left>
                                  <Body style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.listText}>{order.sender && order.sender.phoneNumber}</Text>
                                    <Button rounded style={styles.listButton} onPress={() => Linking.openURL(`tel:${order.sender.phoneNumber}`)}>
                                      <Text>CALL NOW</Text>
                                    </Button>
                                  </Body>
                                </ListItem>
                              </List>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                      </Row>
                      <Row>
                        <Col style={{...styles.buttonCol, marginTop: layout.modifier.height(330)}}>
                        <Button disabled={loading} onPress={() => updateDelivery(2, 'picked-up')}
                          rounded style={styles.buttonItem}>
                          {
                            loading ? <Spinner color='white' /> : <Text style={styles.buttonText}>Pick Up</Text>
                          }
                        </Button>
                      </Col>
                      </Row>
                    </View>
                  </Tab>
                  <Tab heading={ <TabHeading style={styles.tabHeading}>
                    <Image source={ order.stage >= 3 ? require('../assets/images/destination.png')
                                : require('../assets/images/destination_blank.png')} style={styles.sourceImage}/>
                      <Text style={styles.tabText}>DESTINATION</Text>
                    </TabHeading>}>
                    <Row>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment party</Text>
                        <Text style={styles.bottomText}>{order.paymentParty}</Text>
                      </Col>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment type</Text>
                        <Text style={styles.bottomText}>{order.paymentType}</Text>
                      </Col>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Extra Packaging</Text>
                        <Text style={styles.bottomText}>{order.extraPackaging ? 'YES' : 'NO'}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{...styles.mainCol, marginTop: 0, flexDirection: 'row'}}>
                        <Text style={styles.topText}>Delivery Fee:   </Text>
                        <Text style={styles.fee}>₦ {order.deliveryFee}</Text>
                      </Col>
                    </Row>
                    <Row style={styles.mainRow}>
                      <Col>
                        <Card>
                          <Row>
                            <Col style={styles.sourceLeft}>
                              <Image source={ require('../assets/images/source1.png') } style={styles.sourceImage}/>
                              <Text style={styles.tabText}>SOURCE</Text>
                            </Col>
                            <Col>
                              <List>                                
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-person' android="md-person" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.sender && order.sender.fullName.toUpperCase()}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-pin' android="md-pin" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.pickup && order.pickup.description}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-chatbubbles' android="md-chatbubbles" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                  <ScrollView>
                                    <Text style={styles.listText}>{order.pickupInstruction}</Text>
                                  </ScrollView>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-call' android="md-call" style={styles.listText}/>
                                  </Left>
                                  <Body style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.listText}>{order.sender && order.sender.phoneNumber}</Text>
                                    <Button rounded style={styles.listButton} onPress={() => Linking.openURL(`tel:${order.sender.phoneNumber}`)}>
                                      <Text>CALL NOW</Text>
                                    </Button>
                                  </Body>
                                </ListItem>
                              </List>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                    <Row style={styles.mainRow}>
                      <Col>
                        <Card>
                          <Row>
                            <Col style={{...styles.sourceLeft, backgroundColor: colors.pinkGray}}>
                              <Image source={ require('../assets/images/final.png') } style={styles.sourceImage}/>
                              <Text style={styles.tabText}>FINAL</Text>
                            </Col>
                            <Col>
                              <List>                                
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-person' android="md-person" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.receiver && order.receiver.fullName.toUpperCase()}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-pin' android="md-pin" style={styles.listText}/>
                                  </Left>
                                  <Body>
                                    <Text style={styles.listText}>{order.destination && order.destination.description}</Text>
                                  </Body>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-chatbubbles' android="md-chatbubbles" style={styles.listText}/>
                                  </Left>
                                  <ScrollView>
                                    <Text style={styles.listText}>{order.deliveryInstruction}</Text>
                                  </ScrollView>
                                </ListItem>
                                <ListItem icon>
                                  <Left>
                                    <Icon ios='ios-call' android="md-call" style={styles.listText}/>
                                  </Left>
                                  <Body style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.listText}>{order.receiver && order.receiver.phoneNumber}</Text>
                                    <Button rounded style={styles.listButton} onPress={() => Linking.openURL(`tel:${order.sender.phoneNumber}`)}>
                                      <Text>CALL NOW</Text>
                                    </Button>
                                  </Body>
                                </ListItem>
                              </List>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.buttonCol}>
                        <Button disabled={loading} onPress={() => updateDelivery(3, 'delivered')}
                          rounded style={styles.buttonItem}>
                          {
                            loading ? <Spinner color='white' /> : <Text style={styles.buttonText}>Deliver</Text>
                          }
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab heading={ <TabHeading style={styles.tabHeading}>
                    <Image source={ order.stage >= 4 ? require('../assets/images/delivered.png')
                                : require('../assets/images/delivered_blank.png')} style={styles.sourceImage}/>
                      <Text style={styles.tabText}>DELIVERED</Text>
                    </TabHeading>}>
                    <Row>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment party</Text>
                        <Text style={styles.bottomText}>{order.paymentParty}</Text>
                      </Col>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Payment type</Text>
                        <Text style={styles.bottomText}>{order.paymentType}</Text>
                      </Col>
                      <Col style={styles.mainCol}>
                        <Text style={styles.topText}>Extra Packaging</Text>
                        <Text style={styles.bottomText}>{order.extraPackaging ? 'YES' : 'NO'}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{...styles.mainCol, marginTop: 0, flexDirection: 'row'}}>
                        <Text style={styles.topText}>Delivery Fee:   </Text>
                        <Text style={styles.fee}>₦ {order.deliveryFee}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{...styles.mainCol, marginTop: 20, height: layout.modifier.height(950), justifyContent: 'flex-start'}}>
                        {/* <Text style={styles.nameText}>John Doe</Text>
                        <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: layout.modifier.width(830),
                          }}
                        /> */}
                        <Item style={styles.deliveryCodeItem}>
                          <Input maxLength={6} style={styles.deliveryCodeItemText} placeholder="XXXXXX"
                            value={code} onChangeText={text => setCode(text)} autoCapitalize='characters'/>
                        </Item>
                        <Text style={styles.deliveryCode}>Delivery Code</Text>                        
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.buttonCol}>
                        <Button disabled={loading} onPress={() => updateDelivery(4, 'completed')}
                          rounded style={styles.buttonItem}>
                          {
                            loading ? <Spinner color='white' /> : <Text style={styles.buttonText}>Complete</Text>
                          }
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
}

DeliveryScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  buttonCol: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: layout.modifier.height(35),
    marginBottom: layout.modifier.height(15)
  },
  buttonItem: {
    justifyContent: 'center',
    width: layout.modifier.width(567),
    height: layout.modifier.height(150),
  },
  buttonText: {
    fontFamily: 'aller',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center',
    color: 'black'
  },
  topCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(204)
  },
  topButton: {
    height: layout.modifier.height(90),    
  },
  tabHeading: {
    flexDirection: 'column',
  },
  tabText: {
    color: colors.gray,
    fontFamily: 'aller',
    fontSize: 11,
    lineHeight: 12,
    textAlign: 'center',    
  },
  mainRow: {
    marginTop: layout.modifier.height(15),
  },
  topText: {
    fontFamily: 'aller',
    fontSize: 11,
    lineHeight: 12,
    textAlign: 'center',
    color: colors.lightGray,
    marginBottom: 5
  },
  bottomText: {
    fontFamily: 'aller',
    fontSize: 13,
    lineHeight: 14,
    textAlign: 'center',
  },
  mainCol: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: layout.modifier.height(165),
    borderColor: colors.superLightGray,
    borderWidth: 1,
    marginTop: layout.modifier.height(60),
  },
  fee: {
    fontFamily: 'aller',
    fontSize: 28,
    lineHeight: 29,
    textAlign: 'center',
  },
  sourceLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: layout.modifier.width(170),
    backgroundColor: colors.superLightGray
  },
  listText: {
    fontFamily: 'aller',
    fontSize: 14,
    lineHeight: 15,
    color: colors.blueGray
  },
  listButton: {
    height: layout.modifier.height(80),
    width: layout.modifier.width(290),
    backgroundColor: colors.blueGray
  },
  nameText: {
    fontFamily: 'aller',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.actualBlue,
    marginBottom: 5,
    marginTop: 15,
  },
  deliveryCode: {
    fontFamily: 'aller',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.lightGray,
    marginBottom: 5,
    marginTop: 50,
  },
  deliveryCodeItem: {
    marginTop: 20,
  },
  deliveryCodeItemText: {
    fontFamily: 'aller-display',
    fontSize: 22,
    lineHeight: 23,
    textAlign: 'center',
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
    height: layout.modifier.height(70)
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
  sourceImage: {
    // width: layout.modifier.width(83),
    height: layout.modifier.height(115),
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
  return { watchLocation: state.watchLocation, };
};

const mapDispatchToProps = dispatch => {
  return {
    setWatchLocation: (location)	=> { // so I can access it with this.props.setWatchLocation in the instance methods
			return dispatch(setWatchLocation(location));
		},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryScreen);