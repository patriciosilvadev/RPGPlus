import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Picker,
} from 'react-native';

import styles from '../style/styles';

import CustomAppBar from '../components/CustomAppBar';
import {translate} from '../locales/localeConfig';

export default class SketchScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 4,        //type of the dice (D10, D20...)
            quantity: 1,    //quantity of dices to get rolled
            modifier: 0,    //modifier, if the player has for example +1 or -2 of bonus points
            results: [],    //final results
            sum: 0,         //sum of the final results
        }
    }

    //roll dice function
    roll = (type, quantity, modifier) => {

        if(quantity < 1 || quantity > 5){
            alert("The quantity must be a value between 1 and 5.");
            return;
        }

        if(modifier > 30 || modifier < (-30)){
            alert("The modifier must be a value between -30 and 30.");
            return;
        }

        let value;

        let results = [];

        for(let i = 0; i < quantity; i++){

            value = Math.floor((Math.random() * type) + 1); //rolls 1 dice

            results[i] = value; //will keep the value at that current index
        }

        let sumOfResults = results.reduce((a, b) => a + b, 0);
        
        sumOfResults += parseInt(modifier); //will make a sum of the results with the modifier      

        this.setState({
            results: results,
            sum: sumOfResults
        });
    }

    render(){

        let type = this.state.type;
        let quantity = this.state.quantity;
        let modifier = this.state.modifier;
        let results = this.state.results;
        let sum = this.state.sum;

        return(
            <View style={styles.container}>
                
                <CustomAppBar title={translate('appBarRollDices')} subtitle="" navigation={this.props.navigation}/>
                <View style={styles.childContainer}>
                
                    <Text style={styles.title}>{translate('rollTitle')}</Text>
                    <Text style={styles.text}>{translate('rollSubtitle')}</Text>
                 
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.type}
                        onValueChange={(itemValue) => this.setState({type: itemValue})}
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
                        style={styles.textInput}
                        value={this.state.quantity}
                        maxLength={2}
                        keyboardType = 'numeric'
                        onChangeText={ (txt) => this.setState({quantity: txt}) }
                        placeholder={translate('rollQuantityPlaceholder')}
                    />

                    <TextInput
                        style={styles.textInput}
                        value={this.state.modifier}
                        maxLength={2}
                        keyboardType = 'numeric'
                        onChangeText={ (txt) => this.setState({modifier: txt}) }
                        placeholder={translate('rollModifierPlaceholder')}
                    />

                    {
                        results.map((item, key)=>
                            (<Text key={key} style={styles.text}>{key + 1} {translate('rollCountingDices')} { item }</Text>)
                        )
                    }

                    <Text style={styles.text}>{translate('rollSum')} {sum}</Text>
 
                    <TouchableOpacity onPress={() => this.roll(type, quantity, modifier)} style={styles.button}>
                        <Text style={styles.buttonText}>{translate('rollBtnRoll')}</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}