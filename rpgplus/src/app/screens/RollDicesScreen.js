import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Picker,
} from 'react-native';

import styles from '../styles/styles';

import CustomAppBar from '../components/CustomAppBar';

export default class SketchScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 4,        //type of the dice (D10, D20...)
            quantity: 1,    //quantity of dices to get rolled
            modifier: 0,    //modifier, if the player has for example +1 or -2 of bonus points
            results: [],    //final results
        }
    }

    //roll dice function
    roll = (type, quantity, modifier) => {

        let value;

        let results = [];

        for(let i = 0; i < quantity; i++){

            value = Math.floor((Math.random() * type) + 1); //rolls 1 dice

            value += parseInt(modifier); //will make a sum of the result with the modifier

            results[i] = value; //will keep the value at that current index
        }

        let sumOfResults = results.reduce((a, b) => a + b, 0);
        
        sumOfResults += parseInt(modifier);


        /************
        **IMPORTANT**
        ************/
         
         //modifier is being applied to all dices; need to fix it later.         

        this.setState({results: results});
    }

    render(){

        let type = this.state.type;
        let quantity = this.state.quantity;
        let modifier = this.state.modifier;
        let results = this.state.results;

        return(
            <View style={styles.container}>
                
                <CustomAppBar title="Roll Dices" subtitle=""/>
                <View style={styles.childContainer}>
                
                    <Text style={styles.title}>Roll Dices</Text>
                    <Text style={styles.text}>Please, select the type of the dice, quantity of dices to be rolled and the modifier:</Text>
                 
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.type}
                        onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}
                    >
                        <Picker.Item label="D4" value={4}/>
                        <Picker.Item label="D6" value={6}/>
                        <Picker.Item label="D8" value={8}/>
                        <Picker.Item label="D10" value={10}/>
                        <Picker.Item label="D12" value={12}/>
                        <Picker.Item label="D20" value={20}/>
                        <Picker.Item label="D100" value={100}/>
            
                    </Picker>

                    <TextInput
                        style={styles.textinput}
                        value={this.state.quantity}
                        maxLength={2}
                        keyboardType = 'numeric'
                        onChangeText={ (txt) => this.setState({quantity: txt}) }
                        placeholder="Quantity... (default value = 1)"
                    />

                    <TextInput
                        style={styles.textinput}
                        value={this.state.modifier}
                        maxLength={2}
                        keyboardType = 'numeric'
                        onChangeText={ (txt) => this.setState({modifier: txt}) }
                        placeholder="Modifier... (default value = 0)"
                    />

                    {
                        results.map((item, key)=>
                            (<Text key={key} style={styles.text}>{key + 1} º dice: { item } </Text>)
                        )
                    }
 
                    <TouchableOpacity onPress={() => this.roll(type, quantity, modifier)} style={styles.button}>
                        <Text style={styles.buttonText}>ROLL</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}