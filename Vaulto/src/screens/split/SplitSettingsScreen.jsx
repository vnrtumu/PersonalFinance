import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ChevronRightIcon,
    ShieldCheckIcon,
    BellIcon,
    UserIcon,
    CreditCardIcon,
    LogOutIcon,
    SmartphoneIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const SplitSettingsScreen = () => {
    const settingsSections = [
        {
            title: 'Account',
            options: [
                { id: '1', title: 'Personal Profile', icon: UserIcon, value: 'Wade Howard' },
                { id: '2', title: 'Payment Methods', icon: CreditCardIcon, value: '2 Linked' },
            ]
        },
        {
            title: 'Preferences',
            options: [
                { id: '3', title: 'Notifications', icon: BellIcon, value: 'Enabled' },
                { id: '4', title: 'Security', icon: ShieldCheckIcon, value: 'Biometric' },
                { id: '5', title: 'Linked Apps', icon: SmartphoneIcon, value: '' },
            ]
        }
    ];

    const renderOption = (option) => (
        <TouchableOpacity key={option.id} style={styles.optionItem}>
            <View style={styles.optionLeft}>
                <View style={styles.iconCircle}>
                    <option.icon size={20} color={SPLIT_COLORS.primary} />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            <View style={styles.optionRight}>
                {option.value ? <Text style={styles.optionValue}>{option.value}</Text> : null}
                <ChevronRightIcon size={20} color={SPLIT_COLORS.textSecondary} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header} edges={['top']}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
                        style={styles.profileAvatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Wade Howard</Text>
                        <Text style={styles.profileEmail}>wade.howard@example.com</Text>
                    </View>
                </View>
            </SafeAreaView>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.contentPadding}>
                    {settingsSections.map((section, idx) => (
                        <View key={idx} style={styles.section}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <View style={styles.optionsList}>
                                {section.options.map(renderOption)}
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.resetBtn}>
                        <LogOutIcon size={20} color={SPLIT_COLORS.error} />
                        <Text style={styles.resetText}>Reset Split Data</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.versionText}>Splitty Version 1.0.0</Text>
                    </View>
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: SPLIT_COLORS.surface },
    header: { backgroundColor: SPLIT_COLORS.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingBottom: 40 },
    headerContent: { paddingHorizontal: 20, marginTop: 10, marginBottom: 25 },
    headerTitle: { fontSize: 24, fontWeight: '900', color: '#fff' },

    profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, padding: 20, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
    profileAvatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
    profileInfo: { flex: 1 },
    profileName: { fontSize: 18, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    profileEmail: { fontSize: 13, color: SPLIT_COLORS.textSecondary, marginTop: 2 },

    scrollView: { flex: 1, marginTop: -20 },
    contentPadding: { paddingHorizontal: 20, paddingTop: 40 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 14, fontWeight: '800', color: SPLIT_COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15, marginLeft: 5 },
    optionsList: { backgroundColor: '#fff', borderRadius: 24, padding: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 16 },
    optionLeft: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: SPLIT_COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    optionTitle: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
    optionRight: { flexDirection: 'row', alignItems: 'center' },
    optionValue: { fontSize: 14, color: SPLIT_COLORS.textSecondary, marginRight: 8, fontWeight: '600' },

    resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 20, backgroundColor: SPLIT_COLORS.errorLight, marginTop: 10 },
    resetText: { fontSize: 16, fontWeight: '800', color: SPLIT_COLORS.error, marginLeft: 10 },

    footer: { marginTop: 30, alignItems: 'center' },
    versionText: { fontSize: 12, color: SPLIT_COLORS.textSecondary, fontWeight: '600' },
});

export default SplitSettingsScreen;
