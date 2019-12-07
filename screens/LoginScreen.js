import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Content, Text, Item, Input, Button, StyleProvider, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import firebase from '../services/firebase';
import { setUserDetails } from '../redux/actions/actions';

function LoginScreen(props) {
  const db = firebase.firestore();
  const [isDisabled, setDisabled] = useState(true);
  const [isError, setError] = useState(false);
  const [pin, setPin] = useState({2: '', 3: '', 4: '', 5: ''});

  const handlePINchange = (number, event) => {    
    if (event.nativeEvent.key !== 'Backspace')  {
      number === 2 ? this.secondPIN._root.focus() :
      number === 3 ? this.thirdPIN._root.focus() :
      number === 4 ? this.lastPIN._root.focus() :
      number === 5 ? setDisabled(false) : null;
      setPin({...pin, [number]: event.nativeEvent.key});
    }
  }

  const signIn = () => {
    const userPin = Object.values(pin).join('');
    const userRef = db.collection("drivers").doc(userPin);
    userRef.get().then(function(doc) {
      if (doc.exists) {
          props.setUserDetails({id: doc.id, ...doc.data()}); // dispatch user details to redux store
          props.navigation.navigate('Welcome');
      } else {
          // user account does not exist
          Toast.show({
            text: 'Account does not exist. Please contact administrator.',
            buttonText: 'Close',
            type: 'danger',
            duration: 5000
          })
      }
    }).catch(function(error) {
      Toast.show({
        text: error,
        buttonText: 'Close',
        type: 'danger',
        duration: 5000
      })
    });
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
              <Col style={styles.midCol}>
                <Text style={styles.subText}>Enter your PIN code</Text>
              </Col>
            </Row>
            <Row style={{marginLeft: layout.modifier.width(142), marginRight: layout.modifier.width(142)}}>
              <Col style={styles.pinCol}>
                <Item style={styles.pinItem}>
                  <Input
                    style={styles.pinInput}
                    placeholder="-"
                    placeholderTextColor={colors.lightGray}
                    maxLength={1}
                    onKeyPress={(e) => handlePINchange(2, e)}
                    keyboardType={'numeric'} />
                </Item>
              </Col>
              <Col style={styles.pinCol}>
                <Item style={styles.pinItem} error={isError}>
                  <Input
                    style={styles.pinInput}
                    placeholder="-"
                    placeholderTextColor={colors.lightGray}
                    maxLength={1} 
                    ref={(input) => { this.secondPIN = input }}
                    onKeyPress={(e) => handlePINchange(3, e)}
                    keyboardType={'numeric'} />
                </Item>
              </Col>
              <Col style={styles.pinCol}>
                <Item style={styles.pinItem}>
                  <Input
                    style={styles.pinInput}
                    placeholder="-"
                    placeholderTextColor={colors.lightGray}
                    maxLength={1}
                    ref={(input) => { this.thirdPIN = input }}
                    onKeyPress={(e) => handlePINchange(4, e)}
                    keyboardType={'numeric'} />
                </Item>
              </Col>
              <Col style={styles.pinCol}>
                <Item style={styles.pinItem}>
                  <Input
                    style={styles.pinInput}
                    placeholder="-"
                    placeholderTextColor={colors.lightGray}
                    maxLength={1}
                    ref={(input) => { this.lastPIN = input }}
                    onKeyPress={(e) => handlePINchange(5, e)}
                    keyboardType={'numeric'} />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col style={styles.pinImageCol}>
                <Image source={ require('../assets/images/enter_pin.png') }
                  style={styles.pinImage}
                />
              </Col>
            </Row>
            <Row>
              <Col style={styles.dotImageCol}>
                <Image source={ require('../assets/images/f_dot.png') }
                  style={styles.dotImage}
                />
              </Col>
            </Row>
            <Row>
              <Col style={styles.buttonCol}>
                <Button
                  rounded style={styles.buttonItem}
                  disabled={isDisabled}
                  onPress={() => signIn()}>
                  <Text style={styles.buttonText}>Next</Text>
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
    height: layout.modifier.height(135)
  },
  topCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(360)
  },
  midCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(220)
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
    width: layout.modifier.width(410),
    height: layout.modifier.height(540),
    resizeMode: 'contain'
  },
  pinImageCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(650)
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

const mapStateToProps = state => {
  return { userDetails: state.userDetails, };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDetails: (user)	=> { // so I can access it with this.props.setUserDetails in the instance methods
			return dispatch(setUserDetails(user));
		},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)