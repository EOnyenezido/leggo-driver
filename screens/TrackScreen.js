import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, Content, Text, Item, Input, Button, StyleProvider } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

function TrackScreen(props) {

  const order = props.navigation.getParam('order');
  const coordinates = [
    { latitude: order.pickup.geometry.location.lat, longitude: order.pickup.geometry.location.lng },
    { latitude: order.destination.geometry.location.lat, longitude: order.destination.geometry.location.lng },
  ];
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Content>
          <Grid>
            <Row>
              <Col>
                <MapView
                  style={styles.mapStyle}
                  initialRegion={{
                    latitude: order.stage <= 2 ? order.pickup.geometry.location.lat : order.destination.geometry.location.lat,
                    longitude: order.stage <= 2 ? order.pickup.geometry.location.lng : order.destination.geometry.location.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                >
                  {coordinates.map((coordinate, index) =>
                    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
                  )}
                  <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey='xxxx'
                    strokeWidth={3}
                    strokeColor="hotpink"
                  />
                </MapView>
              </Col>
            </Row>
            <Row>
              <Col style={styles.buttonCol}>
                <Button
                  rounded style={styles.buttonItem}
                  onPress={() => props.navigation.navigate('Delivery', {id: order.id})}>
                  <Text style={styles.buttonText}>Back</Text>
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
  mapStyle: {
    width: layout.modifier.width(1125),
    height: layout.modifier.height(1720),
  },
  buttonCol: {
    justifyContent: 'center',
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
    height: layout.modifier.height(215)
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

const mapStateToProps = state => {
  return { userDetails: state.userDetails, };
};

export default connect(mapStateToProps)(TrackScreen);