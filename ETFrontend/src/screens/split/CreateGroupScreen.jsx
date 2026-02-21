import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    XIcon,
    PlusIcon,
    UserIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const CreateGroupScreen = ({ navigation }) => {
    const [groupName, setGroupName] = useState('');
    const [participants, setParticipants] = useState([
        { id: '1', name: 'Hieu Le Quang', role: 'Owner', image: 'https://i.pravatar.cc/150?u=hieu' }
    ]);

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <XIcon size={24} color={SPLIT_COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {renderHeader()}
            </SafeAreaView>

            <View style={styles.inputContainer}>
                <View style={styles.avatarPlaceholder}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                        style={styles.groupAvatar}
                    />
                </View>
                <TextInput
                    style={styles.nameInput}
                    placeholder="Enter Group Name"
                    placeholderTextColor="#CCC"
                    value={groupName}
                    onChangeText={setGroupName}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Add Participants</Text>

                <FlatList
                    data={participants}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.participantItem}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                            <View style={styles.participantInfo}>
                                <Text style={styles.participantName}>{item.name}</Text>
                                <Text style={styles.participantRole}>{item.role}</Text>
                            </View>
                        </View>
                    )}
                    ListFooterComponent={
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => navigation.navigate('AddParticipants')}
                        >
                            <View style={styles.plusIconBox}>
                                <PlusIcon size={20} color={SPLIT_COLORS.primaryDark} />
                            </View>
                            <Text style={styles.addText}>Add Participants</Text>
                        </TouchableOpacity>
                    }
                />
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
    doneText: { fontSize: 16, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    avatarPlaceholder: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    groupAvatar: { width: 40, height: 40, opacity: 0.5 },
    nameInput: { fontSize: 24, fontWeight: '700', color: SPLIT_COLORS.textPrimary, flex: 1 },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: SPLIT_COLORS.textSecondary, marginBottom: 20 },
    participantItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FCFCFC',
        borderRadius: 16,
        marginBottom: 12,
    },
    avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
    participantInfo: { flex: 1 },
    participantName: { fontSize: 16, fontWeight: '600', color: SPLIT_COLORS.textPrimary },
    participantRole: { fontSize: 12, color: SPLIT_COLORS.textSecondary },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FCFCFC',
        borderRadius: 16,
        marginTop: 8,
    },
    plusIconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: SPLIT_COLORS.primary,
    },
    addText: { fontSize: 15, fontWeight: '600', color: SPLIT_COLORS.textPrimary },
});

export default CreateGroupScreen;
