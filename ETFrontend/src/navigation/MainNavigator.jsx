import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HomeIcon,
    ListIcon,
    PlusIcon,
    UserIcon,
    UsersIcon,
    TrendingUpIcon
} from '../assets/icons';
import COLORS from '../utils/theme';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import WalletsListScreen from '../screens/wallets/WalletsListScreen';
import TransactionsListScreen from '../screens/transactions/TransactionsListScreen';
import AnalyticsDashboardScreen from '../screens/analytics/AnalyticsDashboardScreen';
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
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: styles.tabBar,
                    tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
                    tabBarActiveTintColor: COLORS.tabActive,
                    tabBarInactiveTintColor: COLORS.tabInactive,
                    tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={DashboardScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <HomeIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Transactions"
                    component={TransactionsListScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <ListIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Analytics"
                    component={AnalyticsDashboardScreen}
                    options={{
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} onPress={props.onPress}>
                                <TrendingUpIcon size={30} color="#fff" />
                            </CustomTabBarButton>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Split"
                    component={SplitExpensesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <UsersIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <UserIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
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
        backgroundColor: COLORS.surface,
        borderRadius: 25,
        height: 70,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        borderTopWidth: 0,
        paddingBottom: 0,
        borderWidth: 1,
        borderColor: COLORS.divider,
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
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 4,
        borderColor: COLORS.background,
    },
});

export default MainTabs;
