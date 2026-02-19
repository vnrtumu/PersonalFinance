import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { UsersIcon, PlusIcon, ChevronRightIcon } from '../../assets/icons';

const SplitExpensesScreen = () => {
    const groups = [
        { id: '1', name: 'Apartment', balance: -450, members: 3 },
        { id: '2', name: 'Trip to Goa', balance: 1200, members: 5 },
        { id: '3', name: 'Dinner Party', balance: 0, members: 8 },
    ];

    const renderGroup = ({ item }) => (
        <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupIcon}>
                <UsersIcon size={24} color="#6366f1" />
            </View>
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupMembers}>{item.members} members</Text>
            </View>
            <View style={styles.balanceInfo}>
                <Text style={[styles.balanceAmount, { color: item.balance < 0 ? '#ef4444' : item.balance > 0 ? '#10b981' : '#6b7280' }]}>
                    {item.balance === 0 ? 'Settled' : `${item.balance < 0 ? '-' : '+'}$${Math.abs(item.balance)}`}
                </Text>
                <ChevronRightIcon size={20} color="#9ca3af" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Split Expenses</Text>
                <TouchableOpacity style={styles.addButton}>
                    <PlusIcon size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.summaryCard}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>You are owed</Text>
                    <Text style={[styles.summaryValue, { color: '#10b981' }]}>$1,200.00</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>You owe</Text>
                    <Text style={[styles.summaryValue, { color: '#ef4444' }]}>$450.00</Text>
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
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: '800', color: '#111827' },
    addButton: { backgroundColor: '#6366f1', width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    summaryCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, flexDirection: 'row', marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 2 },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryLabel: { fontSize: 13, color: '#6b7280', marginBottom: 4 },
    summaryValue: { fontSize: 18, fontWeight: '700' },
    divider: { width: 1, backgroundColor: '#f3f4f6', marginHorizontal: 10 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#374151', marginBottom: 15 },
    listContent: { paddingBottom: 100 },
    groupCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 1 },
    groupIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center' },
    groupInfo: { flex: 1, marginLeft: 16 },
    groupName: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
    groupMembers: { fontSize: 13, color: '#6b7280', marginTop: 2 },
    balanceInfo: { flexDirection: 'row', alignItems: 'center' },
    balanceAmount: { fontSize: 15, fontWeight: '700', marginRight: 8 },
});

export default SplitExpensesScreen;
