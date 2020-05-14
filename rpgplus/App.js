/*
author: G.P.
RPG+ (RPGPlus) is a project made for tests and studies using React Native technology
version: 1.3.1
*/

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';


import {MyDrawer, MyStack} from './Navigations';



/*
export default function App() {
  return (
    <Navigator/>
  );
}*/
let isLoggedIn = true;

const App = () => {

  return(

    <NavigationContainer>
      {
        isLoggedIn ? (
          <MyDrawer/>

        ) : (
          <MyStack/>
        )
      }
    </NavigationContainer>
     
  );

/*
  let isLogged = true;

  if(isLogged){
    return(
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
    );
  }else{
    return(
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
    );
  }*/
}

export default App;