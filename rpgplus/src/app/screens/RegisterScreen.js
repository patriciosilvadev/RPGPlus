/**
 * 
 * author: G.P.
 * RPG+ (RPGPlus) is a project made for tests and studies using React Native technology
 * 
 */

 import React, { Component } from 'react';
import {
    View,
    ToastAndroid,
    Text,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import styles from '../style/styles';
import CustomAppBar from '../components/CustomAppBar';
import firebase from '../controller/FirebaseConfig';
import 'firebase/firestore';
import { translate } from '../locales/localeConfig';
import { Hoshi } from 'react-native-textinput-effects';
import colors from '../style/colors';
import AwesomeButton from "react-native-really-awesome-button";

export default class RegisterScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            nickname: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSignUp = () => {

        const name = this.state.name;
        const nickname = this.state.nickname;
        const email = this.state.email;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        
        if(name == '' ||nickname == '' || email == '' || password == '' || confirmPassword == ''){
            Alert.alert(translate('alertRegisterTitleFillFields'),
                        translate('alertRegisterFillFields'));
            return;
        }

        if(password !== confirmPassword){
            Alert.alert(translate('alertRegisterTitlePassword'),
                        translate('alertRegisterPassword'));
            return;
        }

        const dbh = firebase.firestore();

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            cred.user.updateProfile({displayName: name});
            this.addUserToFirestore(dbh, cred);
        })
        .catch(error => {   
            switch(error.code) {
                case 'auth/email-already-in-use':
                    Alert.alert(translate('alertTitleEmailInUse'),
                                translate('alertEmailInUse'));
                break;

                case 'auth/invalid-email':
                    Alert.alert(translate('alertTitleInvalidEmail'),
                                translate('alertInvalidEmail'));
                break;

                case 'auth/weak-password':
                    Alert.alert(translate('alertTitleWeakPassword'),
                                translate('alertWeakPassword'));
                break;

                default:
                    alert(error);
           }
        });

    }

    addUserToFirestore = (dbh, cred) => {
        dbh.collection("users").doc(cred.user.uid).set({nickname: this.state.nickname})
        .then(() =>ToastAndroid.show(translate('toastRegisterSuccess'), ToastAndroid.SHORT))
        .catch(error => console.log("Something went wrong:\n" + error));
    }

    render(){

        const name = this.state.name;
        const nickname = this.state.nickname;
        const email = this.state.email;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        
        return(

            <View style={styles.container}>

                <CustomAppBar title={translate('appBarRegister')} subtitle="" backIsVisible={true} navigation={this.props.navigation}/>

                <ScrollView style={{marginTop: 4}}>   

                    <View style={{justifyContent:'center', alignItems: 'center'}}>

                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{ width: 200, height: 100, justifyContent: 'center',
                            alignItems: 'center',}}
                        />

                    </View>

                    <View style={styles.cardBackground}>

                        <Text style={styles.title}>{translate('registerTitle')}</Text>

                        <Text style={styles.text}>{translate('registerSubtitle')}</Text>

                        <Hoshi
                            style={styles.hoshiStyle}
                            borderColor={colors.orange}
                            labelStyle={{color: colors.black}}
                            inputStyle={{color: colors.black}}
                            backgroundColor={colors.white}
                            label={translate('registerName')}
                            borderHeight={3}
                            inputPadding={16}
                            maxLength={50}
                            value={name}
                            onChangeText={(txt) => this.setState({name: txt})}
                        />

                        <Hoshi
                            style={styles.hoshiStyle}
                            borderColor={colors.orange}
                            labelStyle={{color: colors.black}}
                            inputStyle={{color: colors.black}}
                            backgroundColor={colors.white}
                            label={translate('registerNickname')}
                            borderHeight={3}
                            inputPadding={16}
                            maxLength={50}
                            value={nickname}
                            onChangeText={(txt) => this.setState({nickname: txt})}
                        />

                        <Hoshi
                            style={styles.hoshiStyle}
                            borderColor={colors.orange}
                            labelStyle={{color: colors.black}}
                            inputStyle={{color: colors.black}}
                            backgroundColor={colors.white}
                            label={translate('registerEmail')}
                            borderHeight={3}
                            inputPadding={16}
                            maxLength={50}
                            value={email}
                            onChangeText={(txt) => this.setState({email: txt})}
                        />

                        <Hoshi
                            style={styles.hoshiStyle}
                            borderColor={colors.orange}
                            labelStyle={{color: colors.black}}
                            inputStyle={{color: colors.black}}
                            backgroundColor={colors.white}
                            label={translate('registerPassword')}
                            borderHeight={3}
                            inputPadding={16}
                            maxLength={50}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(txt) => this.setState({password: txt})}
                        />

                        <Hoshi
                            style={styles.hoshiStyle}
                            borderColor={colors.orange}
                            labelStyle={{color: colors.black}}
                            inputStyle={{color: colors.black}}
                            backgroundColor={colors.white}
                            label={translate('registerConfirmPassword')}
                            borderHeight={3}
                            inputPadding={16}
                            maxLength={50}
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(txt) => this.setState({confirmPassword: txt})}
                        />

                    </View>

                    <View style={{justifyContent:'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>

                        <AwesomeButton
                            backgroundColor={colors.slateBlue}
                            backgroundDarker={colors.darkBlue}
                            backgroundShadow={colors.lightGray}
                            progress
                            width={340}
                            onPress={next => {
                                /** Do Something **/
                                this.handleSignUp();
                                next();
                            }}
                        >
                            {translate('registerBtnRegister')}
                        </AwesomeButton>

                    </View>

                </ScrollView>
            </View>
        )
    }
}