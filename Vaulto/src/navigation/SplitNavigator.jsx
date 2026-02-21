import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    ChevronLeftIcon,
    UsersIcon,
    UserIcon,
    ClockIcon,
    PencilIcon,
    SearchIcon,
    PlusIcon
} from '../assets/icons';
import { SPLIT_COLORS } from '../utils/theme';

import SplitExpensesScreen from '../screens/split/SplitExpensesScreen';
import SplitFriendsScreen from '../screens/split/SplitFriendsScreen';
import SplitActivityScreen from '../screens/split/SplitActivityScreen';
import SplitFullActivityScreen from '../screens/split/SplitFullActivityScreen';
import SplitSettingsScreen from '../screens/split/SplitSettingsScreen';
import AddParticipantsScreen from '../screens/split/AddParticipantsScreen';
import SplitGroupDetailScreen from '../screens/split/SplitGroupDetailScreen';
import CreateGroupScreen from '../screens/split/CreateGroupScreen';
import AddFriendScreen from '../screens/split/AddFriendScreen';
import AddSplitExpenseScreen from '../screens/split/AddSplitExpenseScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ActivityStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ActivityHome" component={SplitActivityScreen} />
        <Stack.Screen name="SplitFullActivity" component={SplitFullActivityScreen} />
    </Stack.Navigator>
);

const BackTabButton = (props) => (
    <TouchableOpacity
        {...props}
        style={styles.backTabButton}
        activeOpacity={0.7}
    >
        <ChevronLeftIcon size={22} color={SPLIT_COLORS.textSecondary} />
        <Text style={styles.backTabLabel}>Back</Text>
    </TouchableOpacity>
);

const SplitNavigator = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: SPLIT_COLORS.background }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplitTabs" component={SplitTabs} />
                <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
                <Stack.Screen name="AddParticipants" component={AddParticipantsScreen} />
                <Stack.Screen name="AddFriend" component={AddFriendScreen} />
                <Stack.Screen name="GroupDetail" component={SplitGroupDetailScreen} />
                <Stack.Screen name="AddSplitExpense" component={AddSplitExpenseScreen} />
            </Stack.Navigator>

            {/* Floating Action Button for Adding Spending */}
            <TouchableOpacity
                style={styles.fabContainer}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('SplitApp', { screen: 'AddSplitExpense' })}
            >
                <View style={styles.fabInner}>
                    <PlusIcon size={28} color={SPLIT_COLORS.textPrimary} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const SplitTabs = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Groups"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: SPLIT_COLORS.textPrimary,
                tabBarInactiveTintColor: SPLIT_COLORS.textSecondary,
                tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 0, marginBottom: 15 },
            }}
        >
            <Tab.Screen
                name="Back"
                component={View}
                options={{
                    tabBarButton: (props) => (
                        <BackTabButton {...props} onPress={() => navigation.navigate('Main')} />
                    ),
                }}
            />
            <Tab.Screen
                name="Groups"
                component={SplitExpensesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <UsersIcon size={24} color={focused ? SPLIT_COLORS.textPrimary : SPLIT_COLORS.textSecondary} />
                    ),
                }}
            />
            <Tab.Screen
                name="AddSpacer"
                component={View}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => null,
                    tabBarButton: () => <View style={{ flex: 1 }} />,
                }}
            />
            <Tab.Screen
                name="Activity"
                component={ActivityStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ClockIcon size={24} color={focused ? SPLIT_COLORS.textPrimary : SPLIT_COLORS.textSecondary} />
                    ),
                }}
            />

            <Tab.Screen
                name="Friends"
                component={SplitFriendsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <UserIcon size={24} color={focused ? SPLIT_COLORS.textPrimary : SPLIT_COLORS.textSecondary} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 85,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        borderTopWidth: 0,
        paddingTop: 10,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: SPLIT_COLORS.divider,
    },
    backTabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backTabLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: SPLIT_COLORS.textSecondary,
        marginTop: 4,
        marginBottom: 11,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 60,
        alignSelf: 'center',
        zIndex: 100,
    },
    fabInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: SPLIT_COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: SPLIT_COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 3,
        borderColor: '#fff',
    },
});

export default SplitNavigator;
