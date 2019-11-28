import React from 'react';
import { Image, StyleSheet, ProgressBarAndroid, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Text, Item, Thumbnail, Button, StyleProvider, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

function ProfileScreen(props) {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Content padder>
          <Grid>
            <Row>
              <Col style={styles.topCol}>
                <Thumbnail style={styles.thumbnail} source={ props.userDetails.profileImage ? {uri: props.userDetails.profileImage} : require('../assets/images/profile_picture.png') } />
              </Col>
            </Row>
            <Row>
              <Col style={styles.nameCol}>
                <Text style={styles.nameText}>{props.userDetails.firstName} {props.userDetails.lastName}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.subCol}>
                <Text style={styles.subText}>PIN: {props.userDetails.pin}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.dotCol}>
                <Image source={ require('../assets/images/mobile.png') }
                    style={styles.dot}
                />
              </Col>
              <Col style={styles.detailCol}>
                <Text style={styles.detailText}>Mobile</Text>
              </Col>
              <Col style={styles.infoCol}>
                <Text style={styles.infoText}>{props.userDetails.mobile}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.dotCol}>
                <Image source={ require('../assets/images/address.png') }
                    style={styles.dot}
                />
              </Col>
              <Col style={styles.detailCol}>
                <Text style={styles.detailText}>Address</Text>
              </Col>
              <Col style={styles.infoCol}>
                <Text style={styles.infoText}>{props.userDetails.address}</Text>
              </Col>
            </Row>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Login')}>
              <Row>
                <Col style={styles.dotCol}>
                  <Icon ios='ios-log-out' android="md-log-out" style={{fontSize: 30, color: 'red'}}/>
                </Col>
                <Col style={styles.detailCol}>
                  <Text style={styles.detailText}>Logout</Text>
                </Col>
                <Col style={styles.infoCol}>
                  <Text style={styles.infoText}>Logout</Text>
                </Col>
              </Row>
            </TouchableWithoutFeedback>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
}

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  topCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(435)
  },
  thumbnail: {
    width: layout.modifier.width(275),
    height: layout.modifier.height(275),
    borderRadius: 100,
    resizeMode: 'contain'
  },
  nameText: {
    fontFamily: 'aller',
    fontSize: 24,
    lineHeight: 25,
    textAlign: 'center',
  },
  nameCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(125)
  },
  subText: {
    fontFamily: 'aller-light',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.noticeBackground
  },
  subCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(75)
  },
  dot: {
    width: layout.modifier.width(57),
    height: layout.modifier.height(73),
    // marginBottom: layout.modifier.height(35),
    resizeMode: 'contain'
  },
  detailText: {
    fontFamily: 'aller',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.noticeBackground
  },
  detailCol: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: layout.modifier.height(175)
  },
  dotCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(175),
    width: layout.modifier.height(200)
  },
  infoText: {
    fontFamily: 'aller',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.lightGray
  },
  infoCol: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: layout.modifier.height(175)
  },
});

const mapStateToProps = state => {
  return { userDetails: state.userDetails, };
};

export default connect(mapStateToProps)(ProfileScreen)
