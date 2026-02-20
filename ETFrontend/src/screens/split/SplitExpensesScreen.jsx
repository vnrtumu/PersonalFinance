import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UsersIcon, PlusIcon, ChevronRightIcon } from '../../assets/icons';
import COLORS from '../../utils/theme';

const SplitExpensesScreen = () => {
    const groups = [
        { id: '1', name: 'Apartment', balance: -450, members: 3 },
        { id: '2', name: 'Trip to Goa', balance: 1200, members: 5 },
        { id: '3', name: 'Dinner Party', balance: 0, members: 8 },
    ];

    const renderGroup = ({ item }) => (
        <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupIcon}>
                <UsersIcon size={24} color={COLORS.primary} />
            </View>
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupMembers}>{item.members} members</Text>
            </View>
            <View style={styles.balanceInfo}>
                <Text style={[styles.balanceAmount, { color: item.balance < 0 ? COLORS.expense : item.balance > 0 ? COLORS.income : COLORS.textSecondary }]}>
                    {item.balance === 0 ? 'Settled' : `${item.balance < 0 ? '-' : '+'}$${Math.abs(item.balance)}`}
                </Text>
                <ChevronRightIcon size={20} color={COLORS.textMuted} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Split Expenses</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <PlusIcon size={24} color={COLORS.buttonText} />
                    </TouchableOpacity>
                </View>

                <View style={styles.summaryCard}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>You are owed</Text>
                        <Text style={[styles.summaryValue, { color: COLORS.income }]}>$1,200.00</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>You owe</Text>
                        <Text style={[styles.summaryValue, { color: COLORS.expense }]}>$450.00</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Groups</Text>
                <FlatList
                    data={groups}
                    renderItem={renderGroup}
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
    addButton: { backgroundColor: COLORS.primary, width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    summaryCard: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 20, flexDirection: 'row', marginBottom: 30, borderWidth: 1, borderColor: COLORS.divider },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryLabel: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 },
    summaryValue: { fontSize: 18, fontWeight: '700' },
    divider: { width: 1, backgroundColor: COLORS.divider, marginHorizontal: 10 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 15 },
    listContent: { paddingBottom: 100 },
    groupCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: COLORS.divider },
    groupIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: COLORS.primaryMuted, justifyContent: 'center', alignItems: 'center' },
    groupInfo: { flex: 1, marginLeft: 16 },
    groupName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
    groupMembers: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
    balanceInfo: { flexDirection: 'row', alignItems: 'center' },
    balanceAmount: { fontSize: 15, fontWeight: '700', marginRight: 8 },
});

export default SplitExpensesScreen;
