import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  ToastAndroid,
  Clipboard
} from 'react-native';

/*
Name Generator algorithm by RyanGoslingsBugle

https://teasnake.wordpress.com/2016/03/03/how-to-build-a-simple-javascript-name-generator/
*/

export default class NameGeneratorScreen extends Component {
	constructor(props){
    super(props);
      this.state={
              pickerValue:'medieval',
              name: ''	
      }	
    };

    static navigationOptions = {
      drawerLabel: 'Home',
    }
            

  //still finishing
/*  =====================================

var options ={
    "1": "Home",
    "2": "Food",
    "3": "Car",
    "4": "Bank",
};

<Picker
    style={{your_style}}
    mode="dropdown"
    selectedValue={this.state.selected}
    onValueChange={()=>{}}>
    {Object.keys(options).map((key) => {
        return (<Picker.Item label={this.props.options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
    })}
</Picker>

-------------

2) When you have an array of values

var options =["Home","Savings","Car","GirlFriend"];

<Picker
    style={{your_style}}
    mode="dropdown"
    selectedValue={this.state.selected}
    onValueChange={()=>{}}> //add your function to handle picker state change
    {options.map((item, index) => {
        return (<Picker.Item label={item} value={index} key={index}/>) 
    })}
</Picker>


  =====================================*/

  //generateName function
  generateName = (firstName, lastName) => {
    
    //generates a random name based on the firstName and
    //lastName that the user has used
    let finalName = firstName[Math.floor(Math.random() * firstName.length)] + " " + lastName[Math.floor(Math.random() * lastName.length)];

    //set the state of the name
    this.setState({name: finalName});

  }

  //function that will execute on click
  buttonOnClickListener = (category) => {
    let firstName;
    let lastName;

    switch(category){
        
        case "changeling":

            firstName = ["Ax", "Zyx"];
            lastName = ["Yow","D'ella"];
        
        break;

        case "cyberpunk":

            firstName = ["Alpha", "Zero"];
            lastName = ["Zeke","dr0id"];

        break;

        case "elvish":

            firstName = ["Legolas"];
            lastName = ["..."];

        break;
  
        case "lovecraft":
            firstName = ["Edmund","Francis","Carla","Xavier"];
            lastName = ["Newton", "Kennedy"];
        
        break;

        case "mage":

            firstName = ["Radagast", "Gandalf"];
            lastName = ["the White", "the Green"];
        
        break;
  
        case "medieval":

            firstName = ["Aynur","Asriel","Baldor","Hannah","Vannet"];
            lastName = ["the Great","Iron Heart","Turambar", "Valstar", "Yelenna", "The Great One"];
        
        break;

        case "werewolf":
            firstName = ["Ganur", "Foryn"];
            lastName = ["Heart of the Forest", "ay' Ul"];
    
        break;
  
        case "vampire":
            firstName = ["Victoria","Anna","Richard"];
            lastName = ["Valerius","Stohess"];

        break;
  
        default:
            alert("No options.");
     }

     this.generateName(firstName, lastName);

  }

  //copy to clipboard function
  copyToClipboard = () => {

    //if user touches a region without name yet
    if(this.state.name == '') {
        return;
    }
    //copy the name to clipboard
    Clipboard.setString(this.state.name);

    //make a toast with the name
    ToastAndroid.show(this.state.name + " copied to your clipboard", ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Name Generator 2.0</Text>
        <Text style={styles.texts}>Select a category and press the button to generate random names, you can copy it to your clipboard by clicking on it.</Text>

        <Picker
          style={styles.pickerStyle}
          //mode = "dropdown"     //used if you want the user to scroll up the options
          selectedValue={this.state.pickerValue}
          onValueChange={(itemValue, itemIndex) => this.setState({pickerValue: itemValue})}
        >
            <Picker.Item label="Changeling: The Dreaming" value="changeling"/>
            <Picker.Item label="Cyberpunk" value="cyberpunk"/>
            <Picker.Item label="Elvish" value="elvish"/>
            <Picker.Item label="Lovecraft Mythos" value="lovecraft"/>
            <Picker.Item label="Mage: The Ascension" value="mage"/>
            <Picker.Item label="Medieval" value="medieval"/>
            <Picker.Item label="Vampire: the Masquerade" value="vampire" />
            <Picker.Item label="Werewolf: the Apocalypse" value="werewolf" />
		
		    </Picker>

        <TouchableOpacity onPress={this.copyToClipboard}>
          <Text style={styles.texts}>{this.state.name}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => this.buttonOnClickListener(this.state.pickerValue)}>
          <Text style={styles.buttonText}>GENERATE!</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3042', //'#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  texts: {
    color: 'white',
    margin: 15,
    fontSize: 15,
    textAlign: 'center'

  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center'
  },
  button: {
    padding:10,
    backgroundColor: '#fc870a',
    borderRadius:5
  },
  pickerStyle:{  
    //height: 150,
    width: "70%",  
    color: 'white',  
    justifyContent: 'center',  
}  
});