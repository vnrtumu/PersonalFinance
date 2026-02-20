import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserIcon, ChevronRightIcon, PlusIcon } from '../../assets/icons';
import COLORS from '../../utils/theme';

const SplitFriendsScreen = () => {
    const friends = [
        { id: '1', name: 'John Doe', balance: -15, settled: false },
        { id: '2', name: 'Jane Smith', balance: 45, settled: false },
        { id: '3', name: 'Mike Ross', balance: 0, settled: true },
    ];

    const renderFriend = ({ item }) => (
        <TouchableOpacity style={styles.friendCard}>
            <View style={styles.friendIcon}>
                <UserIcon size={24} color={COLORS.primary} />
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.settledText}>{item.settled ? 'Settled up' : 'Pending balance'}</Text>
            </View>
            <View style={styles.balanceInfo}>
                <Text style={[styles.balanceAmount, { color: item.balance < 0 ? COLORS.expense : item.balance > 0 ? COLORS.income : COLORS.textSecondary }]}>
                    {item.balance === 0 ? '$0.00' : `${item.balance < 0 ? '-' : '+'}$${Math.abs(item.balance)}`}
                </Text>
                <ChevronRightIcon size={20} color={COLORS.textMuted} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Friends</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <PlusIcon size={24} color={COLORS.buttonText} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={friends}
                    renderItem={renderFriend}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
    addButton: { backgroundColor: COLORS.primary, width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    friendCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: COLORS.divider },
    friendIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: COLORS.primaryMuted, justifyContent: 'center', alignItems: 'center' },
    friendInfo: { flex: 1, marginLeft: 16 },
    friendName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
    settledText: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
    balanceInfo: { flexDirection: 'row', alignItems: 'center' },
    balanceAmount: { fontSize: 15, fontWeight: '700', marginRight: 8 },
    listContent: { paddingBottom: 100 },
});

export default SplitFriendsScreen;
