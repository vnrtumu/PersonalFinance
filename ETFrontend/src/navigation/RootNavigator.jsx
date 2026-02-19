import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/authStore';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainNavigator from './MainNavigator';
import AddWalletScreen from '../screens/wallets/AddWalletScreen';
import AddTransactionScreen from '../screens/transactions/AddTransactionScreen';
import WalletDetailScreen from '../screens/wallets/WalletDetailScreen';
import AddCategoryScreen from '../screens/categories/AddCategoryScreen';
import ManageCategoriesScreen from '../screens/categories/ManageCategoriesScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const { isAuthenticated, initialize } = useAuthStore();

    useEffect(() => {
        initialize();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Main" component={MainNavigator} />
                        <Stack.Screen name="AddWallet" component={AddWalletScreen} />
                        <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
                        <Stack.Screen name="WalletDetail" component={WalletDetailScreen} />
                        <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
                        <Stack.Screen name="ManageCategories" component={ManageCategoriesScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
