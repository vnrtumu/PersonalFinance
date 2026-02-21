import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WalletIcon, TrendingUpIcon, ArrowDownLeftIcon, ArrowUpRightIcon } from '../../assets/icons';
import COLORS from '../../utils/theme';

const WalletDetailScreen = ({ route, navigation }) => {
    const { wallet } = route.params;

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Wallet Details</Text>
                    <View style={{ width: 50 }} />
                </View>

                <View style={styles.card}>
                    <WalletIcon size={40} color={COLORS.primary} />
                    <Text style={styles.walletName}>{wallet.name}</Text>
                    <Text style={styles.walletBalance}>${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                    <Text style={styles.walletType}>{wallet.type.replace('_', ' ').toUpperCase()}</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <ArrowUpRightIcon size={20} color={COLORS.income} />
                        <Text style={styles.statLabel}>Income</Text>
                        <Text style={[styles.statValue, { color: COLORS.income }]}>$0.00</Text>
                    </View>
                    <View style={styles.statBox}>
                        <ArrowDownLeftIcon size={20} color={COLORS.expense} />
                        <Text style={styles.statLabel}>Expenses</Text>
                        <Text style={[styles.statValue, { color: COLORS.expense }]}>$0.00</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Transaction History</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No transactions for this wallet yet.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 30 },
    backText: { fontSize: 16, color: COLORS.primary, fontWeight: 'bold' },
    title: { fontSize: 20, fontWeight: 'bold', color: COLORS.textPrimary },
    card: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: COLORS.divider, marginBottom: 20 },
    walletName: { fontSize: 18, color: COLORS.textSecondary, marginTop: 15 },
    walletBalance: { fontSize: 36, fontWeight: '800', color: COLORS.textPrimary, marginVertical: 10 },
    walletType: { fontSize: 12, color: COLORS.textMuted, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statBox: { flex: 0.48, backgroundColor: COLORS.surface, borderRadius: 20, padding: 15, alignItems: 'center', borderWidth: 1, borderColor: COLORS.divider },
    statLabel: { fontSize: 12, color: COLORS.textMuted, marginTop: 5 },
    statValue: { fontSize: 16, fontWeight: '700', marginTop: 2 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 15 },
    emptyContainer: { padding: 40, alignItems: 'center' },
    emptyText: { color: COLORS.textMuted, fontSize: 14 },
});

export default WalletDetailScreen;
