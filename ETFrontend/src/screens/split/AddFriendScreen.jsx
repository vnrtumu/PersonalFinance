import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    XIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const AddFriendScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                <XIcon size={24} color={SPLIT_COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Friend</Text>
            <View style={{ width: 44 }} />
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {renderHeader()}
            </SafeAreaView>

            <View style={styles.content}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>FULL NAME</Text>
                    <TextInput
                        style={styles.input}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Mark Twain"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: 24 }]}>
                    <Text style={styles.label}>EMAIL/PHONE NUMBER</Text>
                    <TextInput
                        style={styles.input}
                        value={contact}
                        onChangeText={setContact}
                        placeholder="986-289-6593"
                        keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.sendText}>Send Invite</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    closeBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 24, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(108, 117, 125, 0.4)',
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: '#FBFBFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        fontSize: 16,
        fontWeight: '600',
        color: SPLIT_COLORS.textPrimary,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    sendBtn: {
        backgroundColor: SPLIT_COLORS.primary,
        borderRadius: 16,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        shadowColor: SPLIT_COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    sendText: { fontSize: 16, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
});

export default AddFriendScreen;
