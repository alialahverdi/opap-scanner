// Load required Components and Packegs 
import "./src/utils/global"

// Register react navigation in app
import 'react-native-gesture-handler'

// Navigator
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Stacks and Screen
import SplashScreen from './src/screens/splash'
import AuthStack from './src/navigation/AuthStack'
import SupplierStack from "./src/navigation/SupplierStack"

// Wrapper Components
import SnakbarProvider from "./src/components/Snakbar/SnakbarProvider"
import ErrorHandler from "./src/components/ErrorHandler"



// Create stack fro all screens
const Stack = createStackNavigator()

const Root = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="SupplierStack" component={SupplierStack} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <SnakbarProvider>
        <Root />
      </SnakbarProvider>
    </NavigationContainer>
  )
}
export default App;




// Register react navigation in app
// import 'react-native-gesture-handler'



// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Button, BackHandler } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StackActions } from '@react-navigation/native'

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

// function QRCodeResultScreen({ navigation, route }) {

//   const { event, scanner } = route.params


//   const back = () => {
//     navigation.dispatch(StackActions.replace("QRCodeScreen"))
//   }

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
//       <Text style={{ marginBottom: 20 }}>{JSON.stringify(event)}</Text>
//       <Button
//         title='back to scanner'
//         onPress={back}
//       />
//     </View>
//   );
// }

// function QRCodeScreen({ navigation }) {

//   const onSuccess = event => {
//     navigation.navigate("QRCodeResultScreen", {
//       event
//     })
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'red' }}>
//       <Text>علی بلا</Text>
//       {/* <QRCodeScanner
//         onRead={onSuccess}
//         checkAndroid6Permissions={true}
//         showMarker={true}
//         markerStyle={{ borderRadius: 10, height: 200, width: 200, borderColor: '#6f74dd' }}
//         bottomContent={
//           <View style={styles.buttonTouchable}>
//             <Text style={styles.buttonText}>Please move your camera over the QR Code</Text>
//           </View>
//         }
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     // color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   }
// });

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator headerMode="none">
//         <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
//         <Stack.Screen name="QRCodeResultScreen" component={QRCodeResultScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;






// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

// class App extends Component {
//   onSuccess = e => {
//     console.warn(e)
//   };

//   render() {
//     return (
//       <View style={{ flex: 1, }}>
//         <QRCodeScanner
//           onRead={this.onSuccess}
//           checkAndroid6Permissions={true}
//           showMarker={true}
//           markerStyle={{ borderRadius: 10, height: 200, width: 200, borderColor: 'gray' }}
//           bottomContent={
//             <TouchableOpacity style={styles.buttonTouchable}>
//               <Text style={styles.buttonText}>Please move your camera over the QR Code</Text>
//             </TouchableOpacity>
//           }
//         />
//       </View>
//     );
//   }
// }
