import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import CustomButton from '../components/CustomButton';

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class SketchScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            category: '',
            system: '',
            text: ''
        }
    }

    addSketch = () => {

        if(this.state.name == '' || this.state.category == '' || this.state.system == '' || this.state.text == '' ){
            alert("All fields must be filled.");
            return;
        }

        const dbh = firebase.firestore();

        dbh.collection("sketchs").doc(this.state.name).set({
            name: this.state.name,
            category: this.state.category,
            system: this.state.system,
            text: this.state.text,
        }).then(function() {
            alert("Sketch created!")
        })
        .catch(function(error) {
            alert("Could not add the doc, error:\n" + error);
        });
    }
   
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.textAreaContainer}>
                    <TextInput style={styles.textinput} value={this.state.name} onChangeText={ (txt) => this.setState({name: txt}) } placeholder="Name of the story..." />

                    <TextInput style={styles.textinput} value={this.state.category} onChangeText={ (txt) => this.setState({category: txt}) } placeholder="Category of the story (medieval, cyberpunk)..."/>

                    <TextInput style={styles.textinput} value={this.state.system} onChangeText={ (txt) => this.setState({system: txt}) } placeholder="System used (Storyteller, D20)..." />

                    <TextInput style={styles.textinput}
                    value={this.state.text}
                    multiline = {true} //textinput will be multiline
                    height = {150}
                    textAlignVertical= 'top'
                    onChangeText={ (txt) => this.setState({text: txt}) }
                    placeholder="Type here a basic sketch of your storyboard..." />

                </View>

                <CustomButton
                    title="CREATE"
                    onPress={this.addSketch}
                    style={{}}
                    textStyle={{}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d3042',
    },

    textAreaContainer: {
        borderColor: '#7a42f4',
        borderWidth: 1,
        padding: 15,
      },

    textinput: {
        padding: 5,
        margin: 5,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    
});