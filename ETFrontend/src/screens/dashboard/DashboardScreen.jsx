import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { APP_CONFIG } from '../../utils/config';
import COLORS from '../../utils/theme';
import {
    TrendingUpIcon,
    ArrowUpRightIcon,
    ArrowDownLeftIcon,
    WalletIcon,
    ClockIcon,
    ChevronRightIcon,
    TagIcon,
    FileTextIcon,
    PlusIcon
} from '../../assets/icons';
import { useSummary, useCategories } from '../../hooks/useData';
import { useTransactions } from '../../hooks/useTransactions';
import { useAuthStore } from '../../store/authStore';

const DashboardScreen = ({ navigation }) => {
    const { data: summary } = useSummary();
    const { data: transactions } = useTransactions();
    const { data: categories } = useCategories();
    const { user } = useAuthStore();
    const [selectedReceipt, setSelectedReceipt] = React.useState(null);

    const recentTransactions = transactions?.slice(0, 5) || [];

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
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
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => navigation.navigate('AddTransaction')}
                        >
                            <PlusIcon size={24} color={COLORS.buttonText} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.profileBtn}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            {user?.avatar_url ? (
                                <Image
                                    source={{ uri: `${APP_CONFIG.API_URL.replace('/api/v1', '')}${user.avatar_url}` }}
                                    style={styles.avatarImage}
                                />
                            ) : (
                                <Text style={styles.profileInitial}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Balance Card */}
                <View style={[
                    styles.balanceCard,
                    { backgroundColor: (summary?.total_balance >= 0) ? COLORS.primary : COLORS.expense }
                ]}>
                    <Text style={styles.balanceLabel}>Total Balance (This Month)</Text>
                    <Text style={styles.balanceAmount}>
                        {(summary?.total_balance >= 0) ? '' : '-'}${Math.abs(summary?.total_balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Text>
                    <View style={styles.balanceRow}>
                        <View style={styles.balanceItem}>
                            <View style={[styles.balanceIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                <ArrowUpRightIcon size={16} color="#fff" />
                            </View>
                            <View>
                                <Text style={styles.balanceItemLabel}>Income</Text>
                                <Text style={[styles.balanceItemValue, { color: '#fff' }]}>
                                    +${summary?.total_income?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.balanceItem}>
                            <View style={[styles.balanceIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                <ArrowDownLeftIcon size={16} color="#fff" />
                            </View>
                            <View>
                                <Text style={styles.balanceItemLabel}>Expenses</Text>
                                <Text style={[styles.balanceItemValue, { color: '#fff' }]}>
                                    -${summary?.total_expenses?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <TrendingUpIcon size={24} color={COLORS.primary} />
                        <Text style={styles.statValue}>{summary?.wallet_count || 0}</Text>
                        <Text style={styles.statLabel}>Wallets</Text>
                    </View>
                    <View style={styles.statCard}>
                        <ClockIcon size={24} color={COLORS.cream} />
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
                                <View style={[styles.transactionIcon, { backgroundColor: item.type === 'income' ? COLORS.incomeBg : COLORS.expenseBg }]}>
                                    {item.type === 'income' ? (
                                        <ArrowUpRightIcon size={20} color={COLORS.income} />
                                    ) : (
                                        <ArrowDownLeftIcon size={20} color={COLORS.expense} />
                                    )}
                                </View>
                                <View style={styles.transactionDetails}>
                                    <Text style={styles.transactionNote}>{item.note || 'No description'}</Text>
                                    <View style={styles.transactionMeta}>
                                        <View style={styles.categoryBadge}>
                                            <TagIcon size={12} color={COLORS.textSecondary} />
                                            <Text style={styles.categoryText}>{category?.name || 'Category'}</Text>
                                        </View>
                                        {item.receipt_url && (
                                            <View style={styles.receiptIndicator}>
                                                <FileTextIcon size={12} color={COLORS.primary} />
                                                <Text style={styles.receiptText}>Receipt</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.amountContainer}>
                                    <Text style={[styles.transactionAmount, { color: item.type === 'income' ? COLORS.income : COLORS.expense }]}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 24 },
    headerActions: { flexDirection: 'row', alignItems: 'center' },
    addBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    greeting: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
    subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
    profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    profileInitial: { color: COLORS.buttonText, fontSize: 18, fontWeight: 'bold' },
    balanceCard: { borderRadius: 24, padding: 24, marginBottom: 24, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
    balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
    balanceAmount: { color: '#fff', fontSize: 36, fontWeight: '800', marginTop: 8, marginBottom: 20 },
    balanceRow: { flexDirection: 'row', justifyContent: 'space-between' },
    balanceItem: { flexDirection: 'row', alignItems: 'center' },
    balanceIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    balanceItemLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
    balanceItemValue: { fontSize: 16, fontWeight: '700' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 20, padding: 20, marginHorizontal: 6, alignItems: 'center', borderWidth: 1, borderColor: COLORS.divider },
    statValue: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginTop: 8 },
    statLabel: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
    seeAll: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
    transactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 16, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: COLORS.divider },
    transactionIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    transactionDetails: { flex: 1, marginLeft: 14 },
    transactionNote: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
    transactionMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    categoryBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceElevated, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginRight: 8 },
    categoryText: { fontSize: 11, color: COLORS.textSecondary, marginLeft: 4 },
    receiptIndicator: { flexDirection: 'row', alignItems: 'center' },
    receiptText: { fontSize: 11, color: COLORS.primary, marginLeft: 4, fontWeight: '600' },
    amountContainer: { alignItems: 'flex-end' },
    transactionDate: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
    transactionAmount: { fontSize: 16, fontWeight: '700' },
    emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: 20, fontSize: 14 },
    modalOverlay: { flex: 1, backgroundColor: COLORS.modalOverlay, justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '90%', height: '80%', backgroundColor: COLORS.surface, borderRadius: 20, padding: 10, alignItems: 'center' },
    fullReceipt: { width: '100%', height: '90%', borderRadius: 10 },
    closeBtn: { marginTop: 10, padding: 10, backgroundColor: COLORS.primary, borderRadius: 10, width: '100%', alignItems: 'center' },
    closeBtnText: { color: COLORS.buttonText, fontWeight: 'bold' },
});

export default DashboardScreen;
