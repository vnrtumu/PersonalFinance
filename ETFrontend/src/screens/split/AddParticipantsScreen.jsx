import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    XIcon,
    SearchIcon,
    PlusIcon,
    ChevronRightIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const AddParticipantsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const recentFriends = [
        { id: '1', name: 'Dorothy Arnold', image: 'https://i.pravatar.cc/150?u=1' },
        { id: '2', name: 'Gregory Lewis', image: 'https://i.pravatar.cc/150?u=2' },
        { id: '3', name: 'Marguerite Cox', image: 'https://i.pravatar.cc/150?u=3' },
    ];

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <XIcon size={24} color={SPLIT_COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Participants</Text>
            <TouchableOpacity>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {renderHeader()}
            </SafeAreaView>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <SearchIcon size={20} color={SPLIT_COLORS.textSecondary} />
                    <TextInput
                        placeholder="Enter name, email, phone"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={styles.inviteRow}
                onPress={() => navigation.navigate('AddFriend')}
            >
                <PlusIcon size={20} color={SPLIT_COLORS.primaryDark} />
                <Text style={styles.inviteText}>Add a new friend to Fairpay</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Nearby Friends</Text>
                <View style={styles.emptyNearby}>
                    <View style={styles.emptyIconPlaceholder} />
                    <Text style={styles.emptyText}>You have no friends around.</Text>
                </View>

                <Text style={styles.sectionTitle}>From Contacts</Text>
                <FlatList
                    data={recentFriends}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.contactItem}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                            <Text style={styles.contactName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
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
    headerTitle: { fontSize: 18, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
    doneText: { fontSize: 16, fontWeight: '600', color: SPLIT_COLORS.textSecondary },
    searchContainer: { paddingHorizontal: 20, marginBottom: 16 },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: SPLIT_COLORS.textPrimary },
    inviteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 24,
        gap: 8,
    },
    inviteText: { color: SPLIT_COLORS.primaryDark, fontWeight: '600', textDecorationLine: 'underline' },
    content: { flex: 1, paddingHorizontal: 20 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: SPLIT_COLORS.textSecondary, marginBottom: 16 },
    emptyNearby: { alignItems: 'center', marginBottom: 32 },
    emptyIconPlaceholder: { width: 60, height: 60, backgroundColor: '#F5F5F5', borderRadius: 30, marginBottom: 12 },
    emptyText: { color: SPLIT_COLORS.textSecondary, fontSize: 13 },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
    contactName: { fontSize: 16, fontWeight: '600', color: SPLIT_COLORS.textPrimary },
});

export default AddParticipantsScreen;
