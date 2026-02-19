import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, Image, Modal, Pressable, Alert } from 'react-native';
import {
    ChevronLeftIcon,
    PlusIcon,
    TrendingUpIcon,
    ArrowUpRightIcon,
    ArrowDownLeftIcon,
    TagIcon,
    ClockIcon,
    FileTextIcon,
    FilterIcon,
    IconMap
} from '../../assets/icons';
import { useTransactions, useDeleteTransaction } from '../../hooks/useTransactions';
import { useCategories, useSummary } from '../../hooks/useData';
import { APP_CONFIG } from '../../utils/config';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { PencilIcon, TrashIcon } from '../../assets/icons';

const TransactionsListScreen = ({ navigation }) => {
    const { data: transactions, isLoading: isTxLoading } = useTransactions();
    const { data: categories } = useCategories();
    const deleteTransactionMutation = useDeleteTransaction();
    const [activeTab, setActiveTab] = useState('all');
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    const handleDelete = (tx) => {
        Alert.alert(
            'Delete Transaction',
            'Are you sure you want to delete this transaction?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteTransactionMutation.mutate(tx.id) }
            ]
        );
    };

    const filteredTransactions = useMemo(() => {
        if (!transactions) return [];
        let filtered = transactions;
        if (activeTab !== 'all') {
            filtered = transactions.filter(t => t.type === activeTab);
        }
        // Sort by date descending
        return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions, activeTab]);

    const groupedTransactions = useMemo(() => {
        const groups = {};
        filteredTransactions.forEach(tx => {
            const date = new Date(tx.date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (!groups[date]) groups[date] = [];
            groups[date].push(tx);
        });
        return groups;
    }, [filteredTransactions]);

    if (isTxLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    const renderTransactionItem = (item) => {
        const category = categories?.find(c => c.id === item.category_id);
        const Icon = IconMap[category?.icon] || TagIcon;

        const renderRightActions = (progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [-140, 0],
                outputRange: [0, 140],
            });

            return (
                <View style={styles.swipeActions}>
                    <TouchableOpacity
                        style={[styles.swipeAction, styles.editAction]}
                        onPress={() => navigation.navigate('AddTransaction', { transaction: item })}
                    >
                        <Animated.View style={{ transform: [{ translateX: trans }] }}>
                            <PencilIcon size={20} color="#fff" />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.swipeAction, styles.deleteAction]}
                        onPress={() => handleDelete(item)}
                    >
                        <Animated.View style={{ transform: [{ translateX: trans }] }}>
                            <TrashIcon size={20} color="#fff" />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            );
        };

        const content = (
            <TouchableOpacity
                style={styles.transactionItem}
                onPress={() => item.receipt_url && setSelectedReceipt(item.receipt_url)}
            >
                <View style={[styles.transactionIcon, { backgroundColor: item.type === 'income' ? '#effbf6' : '#fff1f2' }]}>
                    <Icon size={20} color={item.type === 'income' ? '#10b981' : '#ef4444'} />
                </View>
                <View style={styles.transactionDetails}>
                    <Text style={styles.transactionNote} numberOfLines={1}>{item.note || 'No description'}</Text>
                    <View style={styles.transactionMeta}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{category?.name || 'Category'}</Text>
                        </View>
                        {item.receipt_url && (
                            <FileTextIcon size={14} color="#6366f1" />
                        )}
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.transactionAmount, { color: item.type === 'income' ? '#10b981' : '#ef4444' }]}>
                        {item.type === 'income' ? '+' : '-'}${item.amount?.toFixed(2)}
                    </Text>
                    <Text style={styles.transactionTime}>
                        {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <View key={item.id} style={styles.itemWrapper}>
                <Swipeable
                    renderRightActions={renderRightActions}
                    friction={2}
                    rightThreshold={40}
                >
                    {content}
                </Swipeable>
            </View>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.header}>
                    <Text style={styles.title}>Transactions</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddTransaction')}
                        style={styles.addButton}
                    >
                        <PlusIcon size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Filter Tabs */}
                <View style={styles.tabContainer}>
                    {['all', 'expense', 'income'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {filteredTransactions.length === 0 ? (
                        <View style={styles.emptyState}>
                            <ClockIcon size={48} color="#e5e7eb" />
                            <Text style={styles.emptyText}>No {activeTab === 'all' ? '' : activeTab} transactions found.</Text>
                        </View>
                    ) : (
                        Object.keys(groupedTransactions).map(date => (
                            <View key={date} style={styles.dateGroup}>
                                <Text style={styles.dateHeader}>{date}</Text>
                                {groupedTransactions[date].map(renderTransactionItem)}
                            </View>
                        ))
                    )}
                    <View style={{ height: 100 }} />
                </ScrollView>

                {/* Receipt Preview Modal */}
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
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: { fontSize: 24, fontWeight: '800', color: '#111827' },
    addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 16,
        backgroundColor: '#fff'
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: '#f3f4f6'
    },
    activeTab: { backgroundColor: '#6366f1' },
    tabText: { fontSize: 13, fontWeight: '700', color: '#6b7280' },
    activeTabText: { color: '#fff' },
    content: { flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 20 },
    dateGroup: { marginTop: 20 },
    dateHeader: { fontSize: 13, fontWeight: '700', color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase' },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        // Remove borderRadius and marginBottom handled by itemWrapper
    },
    itemWrapper: {
        marginBottom: 8,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2
    },
    transactionIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    transactionDetails: { flex: 1, marginLeft: 14 },
    transactionNote: { fontSize: 15, fontWeight: '700', color: '#1f2937' },
    transactionMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    categoryBadge: { backgroundColor: '#f3f4f6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginRight: 8 },
    categoryText: { fontSize: 11, color: '#6b7280', fontWeight: '600' },
    amountContainer: { alignItems: 'flex-end' },
    transactionAmount: { fontSize: 16, fontWeight: '800' },
    transactionTime: { fontSize: 11, color: '#9ca3af', marginTop: 4 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    emptyState: { alignItems: 'center', marginTop: 100 },
    emptyText: { marginTop: 16, color: '#9ca3af', fontSize: 15, fontWeight: '500' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '90%', height: '80%', backgroundColor: '#fff', borderRadius: 24, padding: 16, alignItems: 'center' },
    fullReceipt: { width: '100%', height: '90%', borderRadius: 12 },
    closeBtn: { marginTop: 16, padding: 14, backgroundColor: '#6366f1', borderRadius: 16, width: '100%', alignItems: 'center' },
    closeBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
    swipeActions: {
        flexDirection: 'row',
        width: 140,
        height: '100%',
    },
    swipeAction: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    editAction: { backgroundColor: '#6366f1' },
    deleteAction: { backgroundColor: '#ef4444' },
});

export default TransactionsListScreen;
