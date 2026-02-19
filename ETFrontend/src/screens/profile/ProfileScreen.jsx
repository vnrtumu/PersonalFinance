import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { UserIcon, BellIcon, ShieldIcon, WalletIcon, CircleHelpIcon, LogOutIcon, ChevronRightIcon, TagIcon } from '../../assets/icons';

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useAuthStore();

    const MenuItem = ({ icon: Icon, title, value, color = '#6366f1', onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={[styles.menuIcon, { backgroundColor: `${color}10` }]}>
                <Icon size={22} color={color} />
            </View>
            <Text style={styles.menuTitle}>{title}</Text>
            {value && <Text style={styles.menuValue}>{value}</Text>}
            <ChevronRightIcon size={20} color="#9ca3af" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity style={styles.editBadge}>
                        <UserIcon size={14} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <MenuItem icon={UserIcon} title="Personal Information" />
                <MenuItem icon={WalletIcon} title="Payment Methods" value="2 Cards" />
                <MenuItem icon={BellIcon} title="Notifications" color="#f59e0b" />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Master Data</Text>
                <MenuItem
                    icon={TagIcon}
                    title="Categories"
                    color="#6366f1"
                    onPress={() => navigation.navigate('ManageCategories')}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Security & Support</Text>
                <MenuItem icon={ShieldIcon} title="Security" color="#10b981" />
                <MenuItem icon={CircleHelpIcon} title="Help Center" color="#6b7280" />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <LogOutIcon size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>Version 1.0.0 (2026)</Text>
            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', padding: 20 },
    header: { marginTop: 40, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: '800', color: '#111827' },
    profileCard: { backgroundColor: '#fff', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 3 },
    avatarContainer: { position: 'relative', marginBottom: 16 },
    avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
    editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#111827', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#fff' },
    userName: { fontSize: 20, fontWeight: '700', color: '#111827' },
    userEmail: { fontSize: 14, color: '#6b7280', marginTop: 4 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 14, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
    menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 8 },
    menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    menuTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1f2937' },
    menuValue: { fontSize: 14, color: '#6b7280', marginRight: 8 },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fee2e2', padding: 16, borderRadius: 16, marginTop: 10 },
    logoutText: { fontSize: 16, fontWeight: '700', color: '#ef4444', marginLeft: 8 },
    versionText: { textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 24 },
});

export default ProfileScreen;
