import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Modal,
    TextInput,
    Pressable
} from 'react-native';
import {
    TrendingUpIcon,
    ArrowUpRightIcon,
    ArrowDownLeftIcon,
    TagIcon,
    IconMap,
    ClockIcon,
    XIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '../../assets/icons';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api';

const { width } = Dimensions.get('window');

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const AnalyticsDashboardScreen = () => {
    const [period, setPeriod] = useState('month'); // 'month', 'year', 'all', 'custom'
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showMonthPicker, setShowMonthPicker] = useState(false);

    const [showCustomModal, setShowCustomModal] = useState(false);
    const [customRange, setCustomRange] = useState({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });
    const [tempRange, setTempRange] = useState({ ...customRange });

    const dateRange = useMemo(() => {
        const now = new Date();
        let start = new Date();
        let end = new Date();

        if (period === 'month') {
            start = new Date(selectedYear, selectedMonth, 1);
            end = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59);
        } else if (period === 'year') {
            start = new Date(now.getFullYear(), 0, 1);
            end = now;
        } else if (period === 'custom') {
            return {
                start: new Date(customRange.start).toISOString(),
                end: new Date(customRange.end + 'T23:59:59').toISOString()
            };
        } else {
            return { start: null, end: null };
        }

        return {
            start: start.toISOString(),
            end: end.toISOString()
        };
    }, [period, selectedMonth, selectedYear, customRange]);

    const { data: summary, isLoading: isSummaryLoading } = useQuery({
        queryKey: ['summary', period, dateRange.start, dateRange.end],
        queryFn: async () => {
            const params = { period };
            if (dateRange.start) params.start_date = dateRange.start;
            if (dateRange.end) params.end_date = dateRange.end;
            const response = await apiClient.get('/reports/summary', { params });
            return response.data;
        }
    });

    const { data: breakdown, isLoading: isBreakdownLoading } = useQuery({
        queryKey: ['category-breakdown', period, dateRange.start, dateRange.end],
        queryFn: async () => {
            const params = { period };
            if (dateRange.start) params.start_date = dateRange.start;
            if (dateRange.end) params.end_date = dateRange.end;
            const response = await apiClient.get('/reports/category-breakdown', { params });
            return response.data;
        }
    });

    const isLoading = isSummaryLoading || isBreakdownLoading;

    const totalSpent = breakdown?.total_spent || 0;

    const handleApplyCustom = () => {
        setCustomRange({ ...tempRange });
        setShowCustomModal(false);
        setPeriod('custom');
    };

    const handleMonthSelect = (index) => {
        setSelectedMonth(index);
        setShowMonthPicker(false);
        setPeriod('month');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.title}>Analytics</Text>
                <TouchableOpacity
                    style={styles.periodBadge}
                    onPress={() => {
                        if (period === 'month') setShowMonthPicker(true);
                        else if (period === 'custom') setShowCustomModal(true);
                    }}
                >
                    <Text style={styles.periodText}>
                        {period === 'month' ? `${MONTHS[selectedMonth]} ${selectedYear}` :
                            period === 'year' ? 'This Year' :
                                period === 'all' ? 'All Time' :
                                    `${customRange.start} - ${customRange.end}`}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                {['month', 'year', 'all', 'custom'].map((p) => (
                    <TouchableOpacity
                        key={p}
                        style={[styles.filterTab, period === p && styles.activeFilterTab]}
                        onPress={() => {
                            if (p === 'custom') setShowCustomModal(true);
                            else if (p === 'month') {
                                if (period === 'month') setShowMonthPicker(true);
                                else setPeriod('month');
                            }
                            else setPeriod(p);
                        }}
                    >
                        <Text style={[styles.filterTabText, period === p && styles.activeFilterTabText]}>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <View style={styles.centerContent}>
                        <ActivityIndicator size="large" color="#6366f1" />
                    </View>
                ) : (
                    <>
                        {/* Spending Overview */}
                        <View style={[styles.card, styles.overviewCard]}>
                            <Text style={styles.cardHeader}>Spending Overview</Text>
                            <View style={styles.mainStatContainer}>
                                <Text style={styles.mainStatLabel}>Total Expenses</Text>
                                <Text style={styles.mainStatValue}>${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                            </View>

                            <View style={styles.statsGrid}>
                                <View style={styles.miniStat}>
                                    <View style={[styles.miniIcon, { backgroundColor: 'rgba(16,185,129,0.1)' }]}>
                                        <ArrowUpRightIcon size={16} color="#10b981" />
                                    </View>
                                    <View>
                                        <Text style={styles.miniLabel}>Income</Text>
                                        <Text style={[styles.miniValue, { color: '#10b981' }]}>
                                            +${summary?.total_income?.toLocaleString() || '0'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.miniStat}>
                                    <View style={[styles.miniIcon, { backgroundColor: 'rgba(59,130,246,0.1)' }]}>
                                        <ClockIcon size={16} color="#3b82f6" />
                                    </View>
                                    <View>
                                        <Text style={styles.miniLabel}>Balance</Text>
                                        <Text style={[styles.miniValue, { color: '#3b82f6' }]}>
                                            ${summary?.total_balance?.toLocaleString() || '0'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Category Breakdown */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Category Breakdown</Text>
                            {breakdown?.breakdown?.length === 0 ? (
                                <View style={styles.emptyCard}>
                                    <TagIcon size={40} color="#e5e7eb" />
                                    <Text style={styles.emptyText}>No data for this period</Text>
                                </View>
                            ) : (
                                breakdown?.breakdown?.map((item, index) => {
                                    const Icon = IconMap[item.icon] || TagIcon;
                                    return (
                                        <View key={index} style={styles.breakdownItem}>
                                            <View style={styles.itemHeader}>
                                                <View style={styles.itemTitleGroup}>
                                                    <View style={[styles.iconContainer, { backgroundColor: '#f3f4f6' }]}>
                                                        <Icon size={20} color="#6366f1" />
                                                    </View>
                                                    <Text style={styles.itemName}>{item.name}</Text>
                                                </View>
                                                <Text style={styles.itemAmount}>${item.amount.toLocaleString()}</Text>
                                            </View>
                                            <View style={styles.progressBarContainer}>
                                                <View
                                                    style={[
                                                        styles.progressBar,
                                                        { width: `${item.percentage}%`, backgroundColor: '#6366f1' }
                                                    ]}
                                                />
                                            </View>
                                            <View style={styles.itemFooter}>
                                                <Text style={styles.itemPercentage}>{item.percentage}% of total</Text>
                                            </View>
                                        </View>
                                    );
                                })
                            )}
                        </View>
                    </>
                )}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Custom Range Modal */}
            <Modal
                visible={showCustomModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCustomModal(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowCustomModal(false)}>
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Custom Date Range</Text>
                            <TouchableOpacity onPress={() => setShowCustomModal(false)}>
                                <XIcon size={24} color="#111827" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Start Date (YYYY-MM-DD)</Text>
                            <TextInput
                                style={styles.input}
                                value={tempRange.start}
                                onChangeText={(text) => setTempRange({ ...tempRange, start: text })}
                                placeholder="2026-01-01"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>End Date (YYYY-MM-DD)</Text>
                            <TextInput
                                style={styles.input}
                                value={tempRange.end}
                                onChangeText={(text) => setTempRange({ ...tempRange, end: text })}
                                placeholder="2026-02-19"
                            />
                        </View>

                        <TouchableOpacity style={styles.applyBtn} onPress={handleApplyCustom}>
                            <CheckIcon size={20} color="#fff" />
                            <Text style={styles.applyBtnText}>Apply Filter</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

            {/* Month Picker Modal */}
            <Modal
                visible={showMonthPicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowMonthPicker(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowMonthPicker(false)}>
                    <View style={[styles.modalContent, { minHeight: 350, paddingBottom: 40 }]}>
                        <View style={styles.modalHeader}>
                            <View style={styles.yearSelector}>
                                <TouchableOpacity onPress={() => setSelectedYear(y => y - 1)}>
                                    <ChevronLeftIcon size={24} color="#6366f1" />
                                </TouchableOpacity>
                                <Text style={styles.yearText}>{selectedYear}</Text>
                                <TouchableOpacity onPress={() => setSelectedYear(y => y + 1)}>
                                    <ChevronRightIcon size={24} color="#6366f1" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
                                <XIcon size={24} color="#111827" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.monthGrid}>
                            {MONTHS.map((m, idx) => (
                                <TouchableOpacity
                                    key={m}
                                    style={[
                                        styles.monthItem,
                                        selectedMonth === idx && styles.activeMonthItem
                                    ]}
                                    onPress={() => handleMonthSelect(idx)}
                                >
                                    <Text style={[
                                        styles.monthText,
                                        selectedMonth === idx && styles.activeMonthText
                                    ]}>
                                        {m.slice(0, 3)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
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
    periodBadge: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    periodText: { fontSize: 13, fontWeight: '700', color: '#6366f1' },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 16,
        gap: 8
    },
    filterTab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        alignItems: 'center'
    },
    activeFilterTab: { backgroundColor: '#6366f1' },
    filterTabText: { fontSize: 13, fontWeight: '600', color: '#6b7280' },
    activeFilterTabText: { color: '#fff' },
    content: { flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 20 },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
    card: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 1 },
    overviewCard: { marginTop: 20, backgroundColor: '#6366f1' },
    cardHeader: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '700', marginBottom: 16 },
    mainStatContainer: { marginBottom: 24 },
    mainStatLabel: { color: '#fff', fontSize: 13, opacity: 0.8 },
    mainStatValue: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 4 },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
    miniStat: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 16, marginRight: 10 },
    miniIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    miniLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' },
    miniValue: { fontSize: 14, fontWeight: '700' },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 16 },
    breakdownItem: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 5, elevation: 1 },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    itemTitleGroup: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    itemName: { fontSize: 15, fontWeight: '700', color: '#1f292d' },
    itemAmount: { fontSize: 15, fontWeight: '800', color: '#111827' },
    progressBarContainer: { height: 8, backgroundColor: '#f3f4f6', borderRadius: 4, overflow: 'hidden' },
    progressBar: { height: '100%', borderRadius: 4 },
    itemFooter: { marginTop: 8 },
    itemPercentage: { fontSize: 12, fontWeight: '600', color: '#9ca3af' },
    emptyCard: { backgroundColor: '#fff', borderRadius: 24, padding: 40, alignItems: 'center', justifyContent: 'center' },
    emptyText: { marginTop: 16, fontSize: 14, color: '#9ca3af', fontWeight: '600' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, minHeight: 400 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    modalTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
    yearSelector: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    yearText: { fontSize: 18, fontWeight: '800', color: '#111827' },
    monthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
    monthItem: { width: (width - 80) / 3, paddingVertical: 16, borderRadius: 16, backgroundColor: '#f3f4f6', alignItems: 'center' },
    activeMonthItem: { backgroundColor: '#6366f1' },
    monthText: { fontSize: 15, fontWeight: '700', color: '#6b7280' },
    activeMonthText: { color: '#fff' },
    inputGroup: { marginBottom: 20 },
    inputLabel: { fontSize: 13, fontWeight: '700', color: '#6b7280', marginBottom: 8 },
    input: { backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: '#111827' },
    applyBtn: { backgroundColor: '#6366f1', borderRadius: 16, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 12 },
    applyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default AnalyticsDashboardScreen;
