import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
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
import MyCardsScreen from '../screens/wallets/MyCardsScreen';
import AddCardScreen from '../screens/wallets/AddCardScreen';
import COLORS from '../utils/theme';

const Stack = createStackNavigator();

const AppTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: COLORS.primary,
        background: COLORS.background,
        card: COLORS.surface,
        text: COLORS.textPrimary,
        border: COLORS.divider,
        notification: COLORS.primary,
    },
};

const RootNavigator = () => {
    const { isAuthenticated, initialize } = useAuthStore();

    useEffect(() => {
        initialize();
    }, []);

    return (
        <NavigationContainer theme={AppTheme}>
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
                        <Stack.Screen name="MyCards" component={MyCardsScreen} />
                        <Stack.Screen name="AddCard" component={AddCardScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
