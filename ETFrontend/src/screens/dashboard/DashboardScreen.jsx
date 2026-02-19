import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { APP_CONFIG } from '../../utils/config';
import { TrendingUpIcon, ArrowUpRightIcon, ArrowDownLeftIcon, WalletIcon, ClockIcon, ChevronRightIcon, TagIcon, FileTextIcon } from '../../assets/icons';
import { useSummary, useCategories } from '../../hooks/useData';
import { useTransactions } from '../../hooks/useTransactions';
import { useAuthStore } from '../../store/authStore';

const DashboardScreen = () => {
    const { data: summary } = useSummary();
    const { data: transactions } = useTransactions();
    const { data: categories } = useCategories();
    const { user } = useAuthStore();
    const [selectedReceipt, setSelectedReceipt] = React.useState(null);

    const recentTransactions = transactions?.slice(0, 5) || [];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Receipt Modal */}
            <Modal
                visible={!!selectedReceipt}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedReceipt(null)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setSelectedReceipt(null)}>
                    <View style={styles.modalContent}>
                        <Image
                            source={{ uri: `${APP_CONFIG.API_URL}${selectedReceipt}` }}
                            style={styles.fullReceipt}
                            resizeMode="contain"
                        />
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedReceipt(null)}>
                            <Text style={styles.closeBtnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, {user?.name || 'User'} 👋</Text>
                    <Text style={styles.subtitle}>Your financial overview</Text>
                </View>
                <TouchableOpacity style={styles.profileBtn}>
                    <Text style={styles.profileInitial}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
                </TouchableOpacity>
            </View>

            {/* Balance Card */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <Text style={styles.balanceAmount}>
                    ${summary?.total_balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                </Text>
                <View style={styles.balanceRow}>
                    <View style={styles.balanceItem}>
                        <View style={[styles.balanceIcon, { backgroundColor: 'rgba(16,185,129,0.15)' }]}>
                            <ArrowUpRightIcon size={16} color="#10b981" />
                        </View>
                        <View>
                            <Text style={styles.balanceItemLabel}>Income</Text>
                            <Text style={[styles.balanceItemValue, { color: '#10b981' }]}>
                                +${summary?.total_income?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.balanceItem}>
                        <View style={[styles.balanceIcon, { backgroundColor: 'rgba(239,68,68,0.15)' }]}>
                            <ArrowDownLeftIcon size={16} color="#ef4444" />
                        </View>
                        <View>
                            <Text style={styles.balanceItemLabel}>Expenses</Text>
                            <Text style={[styles.balanceItemValue, { color: '#ef4444' }]}>
                                -${summary?.total_expenses?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <TrendingUpIcon size={24} color="#6366f1" />
                    <Text style={styles.statValue}>{summary?.wallet_count || 0}</Text>
                    <Text style={styles.statLabel}>Wallets</Text>
                </View>
                <View style={styles.statCard}>
                    <ClockIcon size={24} color="#f59e0b" />
                    <Text style={styles.statValue}>{transactions?.length || 0}</Text>
                    <Text style={styles.statLabel}>Transactions</Text>
                </View>
            </View>

            {/* Recent Transactions */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Transactions</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            {recentTransactions.length === 0 ? (
                <Text style={styles.emptyText}>No transactions yet</Text>
            ) : (
                recentTransactions.map((item, index) => {
                    const category = categories?.find(c => c.id === item.category_id);
                    return (
                        <TouchableOpacity
                            key={item.id || index}
                            style={styles.transactionItem}
                            onPress={() => item.receipt_url && setSelectedReceipt(item.receipt_url)}
                        >
                            <View style={[styles.transactionIcon, { backgroundColor: item.type === 'income' ? '#f0fdf4' : '#fef2f2' }]}>
                                {item.type === 'income' ? (
                                    <ArrowUpRightIcon size={20} color="#10b981" />
                                ) : (
                                    <ArrowDownLeftIcon size={20} color="#ef4444" />
                                )}
                            </View>
                            <View style={styles.transactionDetails}>
                                <Text style={styles.transactionNote}>{item.note || 'No description'}</Text>
                                <View style={styles.transactionMeta}>
                                    <View style={styles.categoryBadge}>
                                        <TagIcon size={12} color="#6b7280" />
                                        <Text style={styles.categoryText}>{category?.name || 'Category'}</Text>
                                    </View>
                                    {item.receipt_url && (
                                        <View style={styles.receiptIndicator}>
                                            <FileTextIcon size={12} color="#6366f1" />
                                            <Text style={styles.receiptText}>Receipt</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={[styles.transactionAmount, { color: item.type === 'income' ? '#10b981' : '#ef4444' }]}>
                                    {item.type === 'income' ? '+' : '-'}${item.amount?.toFixed(2)}
                                </Text>
                                <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })
            )}
            <View style={{ height: 120 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 24 },
    greeting: { fontSize: 24, fontWeight: '800', color: '#111827' },
    subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
    profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
    profileInitial: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    balanceCard: { backgroundColor: '#6366f1', borderRadius: 24, padding: 24, marginBottom: 24, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
    balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
    balanceAmount: { color: '#fff', fontSize: 36, fontWeight: '800', marginTop: 8, marginBottom: 20 },
    balanceRow: { flexDirection: 'row', justifyContent: 'space-between' },
    balanceItem: { flexDirection: 'row', alignItems: 'center' },
    balanceIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    balanceItemLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
    balanceItemValue: { fontSize: 16, fontWeight: '700' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 20, marginHorizontal: 6, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 1 },
    statValue: { fontSize: 24, fontWeight: '800', color: '#111827', marginTop: 8 },
    statLabel: { fontSize: 13, color: '#6b7280', marginTop: 4 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#374151' },
    seeAll: { fontSize: 14, color: '#6366f1', fontWeight: '600' },
    transactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 10 },
    transactionIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    transactionDetails: { flex: 1, marginLeft: 14 },
    transactionNote: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
    transactionMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    categoryBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginRight: 8 },
    categoryText: { fontSize: 11, color: '#6b7280', marginLeft: 4 },
    receiptIndicator: { flexDirection: 'row', alignItems: 'center' },
    receiptText: { fontSize: 11, color: '#6366f1', marginLeft: 4, fontWeight: '600' },
    amountContainer: { alignItems: 'flex-end' },
    transactionDate: { fontSize: 11, color: '#9ca3af', marginTop: 4 },
    transactionAmount: { fontSize: 16, fontWeight: '700' },
    emptyText: { textAlign: 'center', color: '#9ca3af', marginTop: 20, fontSize: 14 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '90%', height: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 10, alignItems: 'center' },
    fullReceipt: { width: '100%', height: '90%', borderRadius: 10 },
    closeBtn: { marginTop: 10, padding: 10, backgroundColor: '#6366f1', borderRadius: 10, width: '100%', alignItems: 'center' },
    closeBtnText: { color: '#fff', fontWeight: 'bold' },
});

export default DashboardScreen;
