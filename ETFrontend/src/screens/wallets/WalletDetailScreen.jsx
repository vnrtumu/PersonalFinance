import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { WalletIcon, TrendingUpIcon, ArrowDownLeftIcon, ArrowUpRightIcon } from '../../assets/icons';

const WalletDetailScreen = ({ route, navigation }) => {
    const { wallet } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Wallet Details</Text>
                <View style={{ width: 50 }} />
            </View>

            <View style={styles.card}>
                <WalletIcon size={40} color="#6366f1" />
                <Text style={styles.walletName}>{wallet.name}</Text>
                <Text style={styles.walletBalance}>${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                <Text style={styles.walletType}>{wallet.type.replace('_', ' ').toUpperCase()}</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <ArrowUpRightIcon size={20} color="#10b981" />
                    <Text style={styles.statLabel}>Income</Text>
                    <Text style={[styles.statValue, { color: '#10b981' }]}>$0.00</Text>
                </View>
                <View style={styles.statBox}>
                    <ArrowDownLeftIcon size={20} color="#ef4444" />
                    <Text style={styles.statLabel}>Expenses</Text>
                    <Text style={[styles.statValue, { color: '#ef4444' }]}>$0.00</Text>
                </View>
            </View>

            {/* Placeholder for transaction history */}
            <Text style={styles.sectionTitle}>Transaction History</Text>
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No transactions for this wallet yet.</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
    backText: { fontSize: 16, color: '#6366f1', fontWeight: 'bold' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
    card: { backgroundColor: '#fff', borderRadius: 24, padding: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 5, marginBottom: 20 },
    walletName: { fontSize: 18, color: '#6b7280', marginTop: 15 },
    walletBalance: { fontSize: 36, fontWeight: '800', color: '#111827', marginVertical: 10 },
    walletType: { fontSize: 12, color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statBox: { flex: 0.48, backgroundColor: '#fff', borderRadius: 20, padding: 15, alignItems: 'center' },
    statLabel: { fontSize: 12, color: '#9ca3af', marginTop: 5 },
    statValue: { fontSize: 16, fontWeight: '700', marginTop: 2 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 15 },
    emptyContainer: { padding: 40, alignItems: 'center' },
    emptyText: { color: '#9ca3af', fontSize: 14 },
});

export default WalletDetailScreen;
