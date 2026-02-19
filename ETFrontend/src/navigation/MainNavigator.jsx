import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ListIcon, UsersIcon, UserIcon, PlusIcon } from '../assets/icons';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import WalletsListScreen from '../screens/wallets/WalletsListScreen';
import TransactionsListScreen from '../screens/transactions/TransactionsListScreen';
import SplitExpensesScreen from '../screens/split/SplitExpensesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={styles.fabContainer}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.fab}>
            {children}
        </View>
    </TouchableOpacity>
);

const MainTabs = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: styles.tabBar,
                    tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
                    tabBarActiveTintColor: '#6366f1',
                    tabBarInactiveTintColor: '#9ca3af',
                    tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={DashboardScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <HomeIcon size={24} color={focused ? '#6366f1' : '#9ca3af'} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Transactions"
                    component={TransactionsListScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <ListIcon size={24} color={focused ? '#6366f1' : '#9ca3af'} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={View} // Placeholder
                    options={{
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} onPress={() => navigation.navigate('AddTransaction')}>
                                <PlusIcon size={30} color="#fff" />
                            </CustomTabBarButton>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Split"
                    component={SplitExpensesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <UsersIcon size={24} color={focused ? '#6366f1' : '#9ca3af'} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <UserIcon size={24} color={focused ? '#6366f1' : '#9ca3af'} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 10,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        borderTopWidth: 0,
        paddingBottom: 0,
    },
    fabContainer: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#6366f1',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 4,
        borderColor: '#f9fafb',
    },
});

export default MainTabs;
