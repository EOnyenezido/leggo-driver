import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Content, Text, Item, Input, Button, StyleProvider } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default function LoginScreen(props) {
  const [isDisabled, setDisabled] = useState(true);

  const handlePINchange = (number, event) => {
    if (event.nativeEvent.key !== 'Backspace')  {
      number === 2 ? this.secondPIN._root.focus() :
      number === 3 ? this.thirdPIN._root.focus() :
      number === 4 ? this.lastPIN._root.focus() :
      number === 5 ? setDisabled(false) : null;
    }
  }

  const start = () => {
    props.navigation.navigate('Login');
  }

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
              <Col style={styles.mainCol}>
                <Text style={styles.mainText}>Welcome, Emeka</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.midCol}>
                <Text style={styles.subText}>Press Enter to start</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.pinImageCol}>
                <Image source={ require('../assets/images/bike.png') }
                  style={styles.pinImage}
                />
              </Col>
            </Row>
            <Row>
              <Col style={styles.dotImageCol}>
                <Image source={ require('../assets/images/l_dot.png') }
                  style={styles.dotImage}
                />
              </Col>
            </Row>
            <Row>
              <Col style={styles.buttonCol}>
                <Button
                  rounded style={styles.buttonItem}
                  onPress={() => start()}>
                  <Text style={styles.buttonText}>Start</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(260)
  },
  buttonItem: {
    justifyContent: 'center',
    width: layout.modifier.width(567),
    height: layout.modifier.height(150)
  },
  buttonText: {
    color: 'black',
    fontFamily: 'aller',
    fontSize: 24,
    lineHeight: 25,
    textAlign: 'center',
  },
  dotImage: {
    width: layout.modifier.width(163),
    height: layout.modifier.height(38),
    resizeMode: 'contain'
  },
  dotImageCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(210)
  },
  topCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(360)
  },
  mainCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(240)
  },
  midCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(105)
  },
  pinItem:  {
    marginLeft: layout.modifier.width(22),
    marginRight: layout.modifier.width(22),
  },
  pinCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(300)
  },
  pinInput: {
    fontFamily: 'aller',
    fontSize: 36,
    textAlign: 'center'
  },
  pinImage: {
    width: layout.modifier.width(1125),
    height: layout.modifier.height(347),
    resizeMode: 'contain'
  },
  pinImageCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(745)
  },
  mainText: {
    fontFamily: 'aller',
    fontSize: 24,
    lineHeight: 25,
    textAlign: 'center',
  },
  subText: {
    color: colors.gray,
    fontFamily: 'aller',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
  },
  welcomeImage: {
    width: layout.modifier.width(580),
    height: layout.modifier.height(90),
    resizeMode: 'contain'
  },
});