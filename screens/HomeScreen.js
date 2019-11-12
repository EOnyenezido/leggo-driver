import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Text, Item, Input, Button, StyleProvider } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default function HomeScreen(props) {
  const [online, setOnline] = useState(true);

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Content padder>
          <Grid>
            <Row>
              <Col style={styles.topCol}>
                <Image source={ require('../assets/images/logo.png') }
                  style={styles.welcomeImage}
                />
              </Col>
            </Row>
            <Row>
              <Col style={styles.break} />
            </Row>
            <Row>
              <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Orders')}>
                <Col style={{...styles.topGrid, borderRightWidth: 0.5, borderRightColor: colors.lightGray}}>                
                  <Row>
                    <Col style={styles.innerImage}>
                      <Image source={ require('../assets/images/location.png') }
                        style={styles.locationImage}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.innerGrid}>
                      <Text style={styles.gridText}>Orders</Text>
                    </Col>
                  </Row>                                
                </Col>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => props.navigation.navigate('History')}>
                <Col style={{...styles.topGrid}}>                
                  <Row>
                    <Col style={styles.innerImage}>
                      <Image source={ require('../assets/images/wallet.png') }
                        style={styles.locationImage}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.innerGrid}>
                      <Text style={styles.gridText}>History</Text>
                    </Col>
                  </Row>                
                </Col>
              </TouchableWithoutFeedback>
            </Row>
            <Row>
              <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Profile')}>
                <Col style={{...styles.topGrid, borderTopWidth: 0.5, borderTopColor: colors.lightGray}}>                
                  <Row>
                    <Col style={styles.innerImage}>
                      <Image source={ require('../assets/images/profile.png') }
                        style={styles.locationImage}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.innerGrid}>
                      <Text style={styles.gridText}>Profile</Text>
                    </Col>
                  </Row>                
                </Col>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Rating')}>
                <Col style={{...styles.topGrid, borderTopWidth: 0.5, borderTopColor: colors.lightGray,
                  borderLeftWidth: 0.5, borderLeftColor: colors.lightGray}}>                  
                  <Row>
                    <Col style={styles.innerImage}>
                      <Image source={ require('../assets/images/rating.png') }
                        style={styles.locationImage}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={styles.innerGrid}>
                      <Text style={styles.gridText}>Rating</Text>
                    </Col>
                  </Row>
                </Col>
              </TouchableWithoutFeedback> 
            </Row>
            <Row>
              { online ? 
                <Col style={styles.switchCol}>
                  <TouchableWithoutFeedback onPress={() => setOnline(false)}>
                    <Image source={ require('../assets/images/online.png') }
                      style={styles.onlineImage}
                    />
                  </TouchableWithoutFeedback>                  
                </Col> :
                <Col style={styles.switchCol}>
                  <TouchableWithoutFeedback onPress={() => setOnline(true)}>
                    <Image source={ require('../assets/images/offline.png') }
                      style={styles.onlineImage}
                    />
                  </TouchableWithoutFeedback>
                </Col>
              }              
            </Row>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  welcomeImage: {
    width: layout.modifier.width(580),
    height: layout.modifier.height(90),
    resizeMode: 'contain'
  },
  onlineImage: {
    width: layout.modifier.width(865),
    height: layout.modifier.height(160),
    resizeMode: 'contain'
  },
  locationImage: {
    width: layout.modifier.width(175),
    height: layout.modifier.height(175),
    resizeMode: 'contain'
  },
  innerImage: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(270)
  },
  innerGrid: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(125)
  },
  gridText: {
    fontFamily: 'aller',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
  },
  topCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(360)
  },
  switchCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(265)
  },
  break: {
    height: layout.modifier.height(250)
  },
  topGrid: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(450)
  },
  bottomGrid: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(450)
  },
});
