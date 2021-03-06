/**
 * 
 * author: G.P.
 * RPG+ (RPGPlus) is a project made for tests and studies using React Native technology
 * 
 */

import React from 'react';
import {View, Text, Alert, ToastAndroid} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { Drawer, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../controller/FirebaseConfig';
import 'firebase/firestore';
import styles from '../style/styles';
import colors from '../style/colors';
import {translate} from '../locales/localeConfig';

//All credits goes to Pradip Debnath
//https://github.com/itzpradip
//https://www.youtube.com/watch?v=ayxRtBHw754

//icons:
//https://oblador.github.io/react-native-vector-icons/

function logout(){
    firebase.auth().signOut().then(() => {
        ToastAndroid.show(translate('alertLogoutSuccessful'), ToastAndroid.SHORT); //make a toast
    }).catch(error => console.log("Ops, error: " + error));
}

export default function DrawerContent(props) {

    const user = firebase.auth().currentUser;
    
    return(
        <View style={{flex:1}} backgroundColor = {colors.orange}>
            
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.drawerUserInfoSection}>

                        <View style={{flexDirection: 'row', marginTop: 15}}>

                            <Avatar.Image
                                source={{
                                    uri: user.photoURL !== null ?
                                        user.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                                }}
                                size={80}
                            />
                            
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.drawerTitle}>{user.displayName}</Title>
                                <Caption style={styles.drawerCaption}>{user.email}</Caption>  
                            </View>
                        </View>

                    </View>
                        
                    <Drawer.Section style={styles.drawerSection}>
                        
                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection}>
                        <Text style={styles.drawerSubmenuTitle}>{translate('drawerMain')}</Text>
                        
                        <DrawerItem
                            icon={({size}) => (
                                <Icon 
                                    name="home" 
                                    color={colors.white}
                                    size={size}
                                />
                            )} 
                            labelStyle = {{color: colors.white}}
                            label={translate('drawerHome')}
                            onPress={() => props.navigation.navigate('Home')}
                        />
                    </Drawer.Section>

                    <Text style={styles.drawerSubmenuTitle}>{translate('drawerTools')}</Text>
                        
                    <Drawer.Section>

                        <DrawerItem
                            icon={({size}) => (
                                <Icon 
                                    name="drama-masks" 
                                    color={colors.white}
                                    size={size}
                                />
                            )} 
                            labelStyle = {{color: colors.white}}
                            label={translate('drawerNameGenerator')}
                            onPress={()=> props.navigation.navigate('Name Generator')}
                        />

                        <DrawerItem
                            icon={({size}) => (
                                <Icon 
                                    name="dice-d20" 
                                    color={colors.white}
                                    size={size}
                                />
                            )} 
                            labelStyle = {{color: colors.white}}
                            label={translate('drawerRollDices')}
                            onPress={()=> props.navigation.navigate("Roll Dices")}
                        />

                        <DrawerItem
                            icon={({size}) => (
                                <Icon 
                                    name="pen" 
                                    color={colors.white}
                                    size={size}
                                />
                            )} 
                            labelStyle = {{color: colors.white}}
                            label={translate('drawerCreateDraft')}
                            onPress={()=>props.navigation.navigate('Create Draft')}
                        />

                        <DrawerItem
                            icon={({size}) => (
                                <Icon 
                                    name="folder" 
                                    color={colors.white}
                                    size={size}
                                />
                            )} 
                            labelStyle = {{color: colors.white}}
                            label={translate('drawerMyDrafts')}
                            onPress={()=>props.navigation.navigate('Draft Stack')}
                        />
                    </Drawer.Section>

                    <Text style={styles.drawerSubmenuTitle}>{translate('drawerSettings')}</Text>

                    <Drawer.Section>
                        
                        <DrawerItem
                            icon={({size}) => (
                                <Icon 
                                    name="settings" 
                                    color={colors.white}
                                    size={size}
                                />
                            )} 
                            labelStyle = {{color: colors.white}}
                            label={translate('drawerPreferences')}
                            onPress={()=>props.navigation.navigate('Preferences')}
                        />

                        <DrawerItem
                            icon={({size}) => (
                                <Icon 
                                    name="logout" 
                                    color={colors.white}
                                    size={size}
                                />
                            )} 
                            labelStyle = {{color: colors.white}}
                            label={translate('drawerSignOut')}
                            onPress={() => {

                                Alert.alert(
                                    translate('alertLogoutTitle'), //title
                                    translate('alertLogoutMessage'), //message
                                    [
                                        {
                                            text: translate('alertCancel'),
                                            onPress: () => ToastAndroid.show(translate('alertLogoutCanceled'), ToastAndroid.SHORT),
                                            style: 'cancel'
                                        },
                                        {
                                            text: translate('alertConfirm'), onPress: () => {
                                                logout();
                                            }
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }}
                        />
                        
                    </Drawer.Section>
                    
                </View>

            </DrawerContentScrollView>
           
        </View>
    );
}