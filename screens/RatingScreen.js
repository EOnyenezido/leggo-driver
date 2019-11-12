import React from 'react';
import { Image, StyleSheet, ProgressBarAndroid } from 'react-native';
import { Container, Content, Text, Item, Input, Button, StyleProvider } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default function RatingScreen() {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Content padder>
          <Grid>
            <Row>
              <Col style={styles.topCol}>
                <Text style={styles.topText}>Your rating</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.midCol}>
                <Text style={styles.subText}>Average points on all trips</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.mainCol}>
                <Text style={styles.mainText}>3.26</Text>
              </Col>
            </Row>
            <Row style={styles.ratingRow}>
              <Image source={ require('../assets/images/rating.png') }
                  style={styles.ratingImage}
              />
              <Image source={ require('../assets/images/rating.png') }
                  style={styles.ratingImage}
              />
              <Image source={ require('../assets/images/rating.png') }
                  style={styles.ratingImage}
              />
              <Image source={ require('../assets/images/rating_blank.png') }
                  style={styles.ratingImage}
              />
              <Image source={ require('../assets/images/rating_blank.png') }
                  style={styles.ratingImage}
              />
            </Row>
            <Row>
              <Col style={styles.break} />
            </Row>
            <Row>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>5 star</Text>
              </Col>
              <Col style={styles.progressCol}>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={0.5}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>34 people</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>3 star</Text>
              </Col>
              <Col style={styles.progressCol}>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={0.2}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>34 people</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>2 star</Text>
              </Col>
              <Col style={styles.progressCol}>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={0.8}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>34 people</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.break1} />
            </Row>
            <Row>
              <Col style={styles.dotCol}>
                <Image source={ require('../assets/images/dot.png') }
                    style={styles.dot}
                />
              </Col>
              <Col style={styles.commentCol}>
                <Text style={styles.commentText}>Complaint and public affairs on top of you will have a big
                  impact on getting a higher score than your customers.</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.dotCol}>
                <Image source={ require('../assets/images/dot.png') }
                    style={styles.dot}
                />
              </Col>
              <Col style={styles.commentCol}>
                <Text style={styles.commentText}>Complaint and public affairs on top of you will have a big
                  impact on getting a higher score than your customers.</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.dotCol}>
                <Image source={ require('../assets/images/dot.png') }
                    style={styles.dot}
                />
              </Col>
              <Col style={styles.commentCol}>
                <Text style={styles.commentText}>Complaint and public affairs on top of you will have a big
                  impact on getting a higher score than your customers.</Text>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
}

RatingScreen.navigationOptions = {
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
  ratingCol: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: layout.modifier.height(165)
  },
  ratingRow: {
    justifyContent: 'center',
    // alignItems: 'center',
    height: layout.modifier.height(165)
  },
  ratingImage: {
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
  progressText: {
    fontFamily: 'aller',
    fontSize: 11,
    lineHeight: 12,
    textAlign: 'center',
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