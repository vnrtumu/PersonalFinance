import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    ChevronLeftIcon,
    UsersIcon,
    UserIcon,
    ClockIcon,
    PencilIcon
} from '../assets/icons';
import COLORS from '../utils/theme';

import SplitExpensesScreen from '../screens/split/SplitExpensesScreen';
import SplitFriendsScreen from '../screens/split/SplitFriendsScreen';
import SplitActivityScreen from '../screens/split/SplitActivityScreen';
import SplitSettingsScreen from '../screens/split/SplitSettingsScreen';

const Tab = createBottomTabNavigator();

const BackTabButton = ({ onPress }) => (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
        <ChevronLeftIcon size={24} color={COLORS.tabInactive} />
        <Text style={[styles.tabLabel, { color: COLORS.tabInactive }]}>Back</Text>
    </TouchableOpacity>
);

const SplitNavigator = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Tab.Navigator
                initialRouteName="Groups"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: styles.tabBar,
                    tabBarActiveTintColor: COLORS.tabActive,
                    tabBarInactiveTintColor: COLORS.tabInactive,
                    tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
                }}
            >
                <Tab.Screen
                    name="Back"
                    component={View}
                    options={{
                        tabBarButton: () => (
                            <BackTabButton onPress={() => navigation.navigate('Main', { screen: 'Home' })} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Groups"
                    component={SplitExpensesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <UsersIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Friends"
                    component={SplitFriendsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <UserIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Activity"
                    component={SplitActivityScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <ClockIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SplitSettingsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <PencilIcon size={24} color={focused ? COLORS.tabActive : COLORS.tabInactive} />
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
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
});

export default SplitNavigator;
