import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView, Image
} from 'react-native';
import { Button } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carousel from 'react-native-snap-carousel';
export default class introStepper extends React.Component {
  constructor(props) {
    // console.log("IntroStepper.js: constructor()", props.navigation.navigate("RiderRegister"));
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          image: require('../../assets/images/bike.png'),
          title: "Rider Registration",
          subTitle: "Opportunity knocks for every man, but you have to give a woman a ring."
        },
        {
          image: require('../../assets/images/delivery.png'),
          title: "Pick Order",
          subTitle: "Come as you are, As you were, as I want you to be. As a friend, As a friend."
        },
        {
          image: require('../../assets/images/money.png'),
          title: "Earn Money",
          subTitle: "There's a lady who is sure, All the glitters is gold. And She in buying a stairway to heaven."
        },
      ]
    }
  }
  _renderItem({ item, index }) {
    return (
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 250,
        padding: 50,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#999999',
      }}>
        <Image source={item.image} style={{
          height: 180,
          width: 180,
          resizeMode: 'contain',
        }} />
      </View>

    )
  }

  _renderDescription
    ({ item, index }) {
    return (
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 250,
        textAlign: 'center'
      }}>

        <Text style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 25,
          marginBottom: 10,
        }}> Lakhri Rider </Text>
        <Text style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}> Fantastic Opportunity </Text>
        <View style={{
          width: "100%",
          borderRadius: 8,
          marginTop: 25,
        }}>
          <Button
            style={{
              paddingTop: 30,
              paddingBottom: 30,
            }}
            title="Create an account"
            buttonStyle={{ backgroundColor: "#179bd7", borderRadius: 10 }}

          />
          <Text style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 20,
            fontSize: 13,
          }}> Already have an acoount? </Text>
          <Text style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: "#179BD7",
            fontSize: 13,
          }}> Log in </Text>
        </View>
      </View>

    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#0da5eb', paddingTop: 50, paddingLeft: 30, paddingRight: 30 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
          <Carousel
            layout={"tinder"}
            ref={ref => this.carousel = ref}
            data={this.state.carouselItems}
            autoplay={true}
            sliderWidth={300}
            itemWidth={300}
            autoplayInterval={2000}
            loop={true}
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({ activeIndex: index })} />
        </View>
        <View style={{ flex: 1 }}>


          <Text style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 40,
            marginBottom: 5,
            paddingTop: 20,
            fontWeight: 'bold',
            color: '#fff',
          }}> Lakhri Rider </Text>
          <View style={{
            width: "100%",
            borderRadius: 8,
            marginTop: 25,
          }}>
            <Button
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}
              type="outline"
              onPress={() => this.props.navigation.navigate('RiderRegister')}
              title="Create an account"
              buttonStyle={{ backgroundColor: "#FFF", borderRadius: 10, color: "#0da5eb" }}
            />
            <Text style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginTop: 20,
              fontSize: 13,
            }}> Already have an acoount? </Text>
            <Text style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: "#fff",
              fontSize: 13,
              
            }} onPress={() => this.props.navigation.navigate('RiderLogin')}
            > Log in </Text>

          </View>
        </View>
       
      </View>
    );
  }
}



