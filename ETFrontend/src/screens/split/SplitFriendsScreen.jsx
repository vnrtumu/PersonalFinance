import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    PlusIcon,
    SearchIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const SplitFriendsScreen = ({ navigation }) => {
    const friends = [
        { id: '1', name: 'Alma Harris', balance: '+$91.14', type: 'owed', image: 'https://i.pravatar.cc/150?u=alma' },
        { id: '2', name: 'Lenora Beck', balance: '+$73.82', type: 'owed', image: 'https://i.pravatar.cc/150?u=lenora' },
        { id: '3', name: 'Rebecca Ryan', balance: '-$7.10', type: 'owe', image: 'https://i.pravatar.cc/150?u=rebecca' },
        { id: '4', name: 'Cora Davis', balance: '-$69.18', type: 'owe', image: 'https://i.pravatar.cc/150?u=cora' },
        { id: '5', name: 'Benjamin', balance: '+$21.86', type: 'owed', image: 'https://i.pravatar.cc/150?u=benjamin' },
    ];

    const renderFriend = ({ item }) => (
        <TouchableOpacity style={styles.friendCard}>
            <View style={styles.friendLeft}>
                <Image source={{ uri: item.image }} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{item.name}</Text>
            </View>
            <Text style={[
                styles.friendBalance,
                { color: item.type === 'owed' ? SPLIT_COLORS.success : SPLIT_COLORS.textPrimary }
            ]}>
                {item.balance}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Friends</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <SearchIcon size={24} color={SPLIT_COLORS.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.plusBtn}>
                            <PlusIcon size={24} color={SPLIT_COLORS.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryCol}>
                            <Text style={styles.summaryLabel}>Total Receivable</Text>
                            <Text style={[styles.summaryAmount, { color: SPLIT_COLORS.success }]}>+ $938.83</Text>
                        </View>
                        <View style={styles.summaryCol}>
                            <Text style={[styles.summaryLabel, { textAlign: 'right' }]}>Total Payable</Text>
                            <Text style={[styles.summaryAmount, { textAlign: 'right' }]}>- $254.83</Text>
                        </View>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: '75%' }]} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            <FlatList
                data={friends}
                renderItem={renderFriend}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.listHeader}>
                        <TouchableOpacity style={styles.filterBtn}>
                            <Text style={styles.filterText}>All Friends</Text>
                            <ChevronDownIcon size={20} color={SPLIT_COLORS.primaryDark} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FBFBFB' },
    safeArea: { backgroundColor: '#FBFBFB' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTitle: { fontSize: 32, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    headerActions: { flexDirection: 'row', gap: 12 },
    actionBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    plusBtn: {
        width: 44,
        height: 44,
        backgroundColor: SPLIT_COLORS.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summarySection: { paddingHorizontal: 24, marginTop: 8, marginBottom: 24 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    summaryCol: { flex: 1 },
    summaryLabel: { fontSize: 13, color: SPLIT_COLORS.textSecondary, fontWeight: '500', marginBottom: 8 },
    summaryAmount: { fontSize: 22, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    progressBarContainer: { height: 12, width: '100%' },
    progressBarBg: { height: 12, backgroundColor: '#212121', borderRadius: 6, overflow: 'hidden', flexDirection: 'row' },
    progressBarFill: { height: 12, backgroundColor: SPLIT_COLORS.success, borderRadius: 6 },
    listHeader: { paddingHorizontal: 24, marginBottom: 16 },
    filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    filterText: { fontSize: 16, fontWeight: '700', color: SPLIT_COLORS.primaryDark, textDecorationLine: 'underline' },
    listPadding: { paddingBottom: 100 },
    friendCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    friendLeft: { flexDirection: 'row', alignItems: 'center' },
    friendAvatar: { width: 48, height: 48, borderRadius: 24, marginRight: 16 },
    friendName: { fontSize: 16, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
    friendBalance: { fontSize: 16, fontWeight: '800' },
});

export default SplitFriendsScreen;
