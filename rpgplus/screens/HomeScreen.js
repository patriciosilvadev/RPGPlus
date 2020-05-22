import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert

} from 'react-native';
import CustomText from '../components/CustomText';
import CustomTitle from '../components/CustomTitle';

const HomeScreen = ({navigation}) => {
/*
    componentDidMount = () => {
        const {email} = firebase.auth().currentUser;
    }*/
    
    return(
        <View style={styles.container}>

            <CustomTitle>Home</CustomTitle>
            <CustomText>Hm......</CustomText>
            
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d3042',
    },
    
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
    
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
      },


      /*CONFIG OF FLOATING ACTION BUTTON

      <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => alert("ok")}
            style={styles.TouchableOpacityStyle}>
            <Image
                //We are making FAB using TouchableOpacity with an image
                //We are using online image here
                source={{
                    uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                }}
                //You can use you project image Example below
                //source={require('./images/float-add-icon.png')}
                style={styles.FloatingButtonStyle}
            />
        </TouchableOpacity>


      */
});

export default HomeScreen;