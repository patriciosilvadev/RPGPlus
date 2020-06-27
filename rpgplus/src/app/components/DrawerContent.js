import React from 'react';
import {View, Text, StyleSheet, Alert, ToastAndroid} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { Drawer, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../controller/Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';


//All credits goes to Pradip Debnath
//https://github.com/itzpradip
//https://www.youtube.com/watch?v=ayxRtBHw754


export default function DrawerContent(props) {

    const user = firebase.auth().currentUser;

    return(
        <View style={{flex:1}} backgroundColor = '#2d3042'>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>

                        <View style={{flexDirection: 'row', marginTop: 15}}>

                            <TouchableOpacity onPress={() => alert("ops!")}>
                                <Avatar.Image
                                    source={{
                                        uri: user.photoURL ? user.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                                    }}
                                    size={80}
                                />
                            </TouchableOpacity>
                            
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>{user.displayName}</Title>
                                <Caption style={styles.caption}>{user.email}</Caption>  
                            </View>
                        </View>

                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            labelStyle = {{color: 'white'}}
                            label="Home"
                            onPress={() => props.navigation.navigate('Home')}
                        />
                    </Drawer.Section>

                        <Text style={styles.submenuTitle}>Tools</Text>

                    <Drawer.Section>

                        <DrawerItem
                            labelStyle = {{color: 'white'}}
                            label="Name Generator"
                            onPress={()=> props.navigation.navigate('Name Generator')}
                        />

                        <DrawerItem
                            labelStyle = {{color: 'white'}}
                            label="Roll Dices"
                            onPress={()=> props.navigation.navigate("Roll Dices")}
                        />

                        <DrawerItem
                            labelStyle = {{color: 'white'}}
                            label="Create Draft"
                            onPress={()=>props.navigation.navigate('Create Draft')}
                        />

                        <DrawerItem
                            labelStyle = {{color: 'white'}}
                            label="My Drafts"
                            onPress={()=>props.navigation.navigate('List Drafts')}
                        />
                    </Drawer.Section>

                    <Text style={styles.submenuTitle}>Settings</Text>

                    <Drawer.Section>
                        
                        <DrawerItem
                            labelStyle = {{color: 'white'}}
                            label="Preferences"
                            onPress={()=>props.navigation.navigate('Preferences')}
                        />

                        <DrawerItem
                            labelStyle = {{color: 'white'}}
                            label="Sign out"
                            onPress={() => {

                                Alert.alert(
                                    'Logout', //title
                                    'Are you sure you want to logout?', //message
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => ToastAndroid.show("Logout canceled.", ToastAndroid.SHORT),
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'OK', onPress: () => {
                                                firebase
                                                    .auth().signOut().then(() => {

                                                props.navigation.navigate("Login"); //goes to Login screen
                                                ToastAndroid.show("Successfully logged out!", ToastAndroid.SHORT); //make a toast
                                                
                                                }).catch(error => alert("Ops, error: " + error));
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

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      //backgroundColor: 'red',
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color: 'white',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color: 'white',
      
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      color: 'red',
      
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
      color: 'red',
      
    },
    drawerSection: {
      marginTop: 15,

      //backgroundColor: 'red',
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        color: 'red',

        //backgroundColor: 'red',
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      //color: 'white',
    },
    submenuTitle: {
        marginLeft: 15,
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: 'white',
    }
  });