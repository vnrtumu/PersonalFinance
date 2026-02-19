import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal, Pressable, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { UserIcon, BellIcon, ShieldIcon, WalletIcon, CircleHelpIcon, LogOutIcon, ChevronRightIcon, TagIcon, CreditCardIcon, CameraIcon, ImageIcon } from '../../assets/icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useUploadAvatar } from '../../hooks/useUser';
import apiClient from '../../services/api';

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useAuthStore();
    const [showPickerModal, setShowPickerModal] = useState(false);

    const uploadAvatarMutation = useUploadAvatar();

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

    const handleImageResult = async (result) => {
        if (result.didCancel) return;
        if (result.errorCode) {
            Alert.alert('Error', result.errorMessage || 'Failed to pick image');
            return;
        }
        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            try {
                await uploadAvatarMutation.mutateAsync({
                    uri: asset.uri,
                    type: asset.type,
                    fileName: asset.fileName || 'avatar.jpg',
                });
                Alert.alert('Success', 'Profile picture updated successfully');
            } catch (err) {
                Alert.alert('Error', 'Failed to upload profile picture');
            }
        }
        setShowPickerModal(false);
    };

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8,
            saveToPhotos: true,
        }, handleImageResult);
    };

    const chooseFromLibrary = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        }, handleImageResult);
    };

    const avatarUrl = user?.avatar_url ? `${apiClient.defaults.baseURL.replace('/api/v1', '')}${user.avatar_url}` : null;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity
                        style={styles.avatar}
                        activeOpacity={0.8}
                        onPress={() => setShowPickerModal(true)}
                    >
                        {uploadAvatarMutation.isPending ? (
                            <ActivityIndicator color="#fff" />
                        ) : avatarUrl ? (
                            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
                        ) : (
                            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.editBadge}
                        onPress={() => setShowPickerModal(true)}
                    >
                        <CameraIcon size={14} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
            </View>

            {/* Image Picker Modal */}
            <Modal
                transparent={true}
                visible={showPickerModal}
                animationType="slide"
                onRequestClose={() => setShowPickerModal(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowPickerModal(false)}>
                    <View style={styles.pickerOptions}>
                        <Text style={styles.modalTitle}>Update Profile Picture</Text>
                        <TouchableOpacity style={styles.optionBtn} onPress={takePhoto}>
                            <View style={[styles.optionIcon, { backgroundColor: '#f0fdf4' }]}>
                                <CameraIcon size={24} color="#10b981" />
                            </View>
                            <Text style={styles.optionText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionBtn} onPress={chooseFromLibrary}>
                            <View style={[styles.optionIcon, { backgroundColor: '#eff6ff' }]}>
                                <ImageIcon size={24} color="#2563eb" />
                            </View>
                            <Text style={styles.optionText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionBtn, styles.cancelBtn]}
                            onPress={() => setShowPickerModal(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <MenuItem icon={UserIcon} title="Personal Information" />
                <MenuItem
                    icon={CreditCardIcon}
                    title="My Cards"
                    value="2 Cards"
                    onPress={() => navigation.navigate('MyCards')}
                />
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
    avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
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
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    pickerOptions: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 40 },
    modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 24, textAlign: 'center' },
    optionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
    optionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    optionText: { fontSize: 16, fontWeight: '700', color: '#374151' },
    cancelBtn: { marginTop: 12, borderBottomWidth: 0, justifyContent: 'center' },
    cancelText: { fontSize: 16, fontWeight: '800', color: '#ef4444' },
});

export default ProfileScreen;
