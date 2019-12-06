import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, ProgressBarAndroid } from 'react-native';
import { Container, Content, Text, Item, Input, Button, StyleProvider } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import layout from '../constants/Layout';
import colors from '../constants/Colors';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import firebase from '../services/firebase';

export default function RatingScreen() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState({5: 0, 4: 0, 3: 0, 2: 0, 1: 0});
  const db = firebase.firestore();
  useEffect(() => {
    const unsubscribe = db.collection("reviews").where("driver", "==", "1816")
    .onSnapshot(function(querySnapshot) { 
      let newOrders = [];       
      querySnapshot.forEach(function(doc) {
        newOrders.push({id: doc.id, ...doc.data()});
      });
      setReviews(newOrders);
      const normalizedStars = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
      const total = newOrders.reduce((total, item) => {
        normalizedStars[item.stars]+=1;
        return total + item.stars;
      }, 0);
      setRating((total/newOrders.length).toFixed(2));
      setStars(normalizedStars);
    });

    return () => {
      unsubscribe();
    };
  }, [rating.length]);

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
                <Text style={styles.mainText}>{rating}</Text>
              </Col>
            </Row>
            <Row style={styles.ratingRow}>
              <Image source={ Math.floor(rating) >= 1 ? require('../assets/images/rating.png')
                : require('../assets/images/rating_blank.png') }
                  style={styles.ratingImage}
              />
              <Image source={ Math.floor(rating) >= 2 ? require('../assets/images/rating.png')
                : require('../assets/images/rating_blank.png') }
                  style={styles.ratingImage}
              />
              <Image source={ Math.floor(rating) >= 3 ? require('../assets/images/rating.png')
                : require('../assets/images/rating_blank.png') }
                  style={styles.ratingImage}
              />
              <Image source={ Math.floor(rating) >= 4 ? require('../assets/images/rating.png')
                : require('../assets/images/rating_blank.png') }
                  style={styles.ratingImage}
              />
              <Image source={ Math.floor(rating) >= 5 ? require('../assets/images/rating.png')
                : require('../assets/images/rating_blank.png') }
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
                  progress={stars[5] > 0 ? stars[5]/reviews.length : 0}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>{stars[5]} {stars[5] != 1 ? 'people' : 'person'}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>4 star</Text>
              </Col>
              <Col style={styles.progressCol}>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={stars[4] > 0 ? stars[4]/reviews.length : 0}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>{stars[4]} {stars[4] != 1 ? 'people' : 'person'}</Text>
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
                  progress={stars[3] > 0 ? stars[3]/reviews.length : 0}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>{stars[3]} {stars[3] != 1 ? 'people' : 'person'}</Text>
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
                  progress={stars[2] > 0 ? stars[2]/reviews.length : 0}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>{stars[2]} {stars[2] != 1 ? 'people' : 'person'}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>1 star</Text>
              </Col>
              <Col style={styles.progressCol}>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={stars[1] > 0 ? stars[1]/reviews.length : 0}
                  color={colors.yellow}
                  style={styles.progressBar}
                />
              </Col>
              <Col style={styles.progressCol}>
                <Text style={styles.progressText}>{stars[1]} {stars[1] != 1 ? 'people' : 'person'}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.break1} />
            </Row>
            {
              reviews.length > 0 ?
              reviews.slice(0, 3).map((review) => {
                return(
                  <Row key={review.id}>
                    <Col style={styles.dotCol}>
                      <Image source={ require('../assets/images/dot.png') }
                          style={styles.dot}
                      />
                    </Col>
                    <Col style={styles.commentCol}>
                      <Text style={styles.commentText}>{review.comment}</Text>
                    </Col>
                  </Row>
                )
              })
              :
              null
            }
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: layout.modifier.height(155)
  },
  dotCol: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: layout.modifier.height(155),
    width: layout.modifier.height(100)
  },
});