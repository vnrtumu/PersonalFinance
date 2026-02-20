import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRightIcon, ShieldCheckIcon, BellIcon, UserIcon } from '../../assets/icons';
import COLORS from '../../utils/theme';

const SplitSettingsScreen = () => {
    const settingsOptions = [
        { id: '1', title: 'Default Currency', value: 'USD ($)', icon: UserIcon },
        { id: '2', title: 'Notifications', value: 'On', icon: BellIcon },
        { id: '3', title: 'Privacy & Security', value: '', icon: ShieldCheckIcon },
    ];

    const renderOption = (option) => (
        <TouchableOpacity key={option.id} style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
                <option.icon size={20} color={COLORS.primary} />
            </View>
            <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                {option.value ? <Text style={styles.optionValue}>{option.value}</Text> : null}
            </View>
            <ChevronRightIcon size={20} color={COLORS.textMuted} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Split Settings</Text>
                </View>
                <View style={styles.section}>
                    {settingsOptions.map(renderOption)}
                </View>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Reset Split Data</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    header: { marginTop: 15, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
    section: { marginBottom: 30 },
    optionCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: COLORS.divider },
    optionIconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.primaryMuted, justifyContent: 'center', alignItems: 'center' },
    optionInfo: { flex: 1, marginLeft: 12 },
    optionTitle: { fontSize: 16, color: COLORS.textPrimary, fontWeight: '500' },
    optionValue: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
    logoutButton: { padding: 16, alignItems: 'center', marginBottom: 40 },
    logoutText: { color: COLORS.expense, fontSize: 16, fontWeight: '600' },
});

export default SplitSettingsScreen;
