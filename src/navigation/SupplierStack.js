import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens
import SuppliersScreen from '../screens/suppliers';

// Transition for navigate between screen
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    // gestureEnabled: true,
};


// Create stack fro screens
const Stack = createStackNavigator();

const SupplierStack = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={TransitionScreenOptions}
        >
            <Stack.Screen name="SuppliersScreen" component={SuppliersScreen} />
        </Stack.Navigator>
    )
}

export default SupplierStack;