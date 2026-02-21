import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ChevronLeftIcon,
    TrendingUpIcon,
    PlusIcon,
    PinIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const SplitGroupDetailScreen = ({ route, navigation }) => {
    const { groupName = 'Paris Summer Vacation' } = route.params || {};

    const transactions = [
        { id: '1', title: 'Vedettes du Pont Neuf', total: '$232.45', share: '+$174.33', type: 'owed', date: 'Jul 28, 2020', icon: '🛳️' },
        { id: '2', title: 'Cruises on the Seine', total: '$486.00', share: '+$364.50', type: 'owed', date: 'Jul 28, 2020', icon: '🚢' },
        { id: '3', title: 'Taxi from Airport to Hotel', total: '$62.60', share: '+$46.95', type: 'owed', date: 'Jul 28, 2020', icon: '🚕' },
    ];

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerActionBtn}>
                        <TrendingUpIcon size={24} color={SPLIT_COLORS.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerActionBtn}>
                        <Text style={styles.moreText}>•••</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.headerContent}>
                <Text style={styles.groupTitle}>{groupName}</Text>
                <Text style={styles.syncText}>Last sync on Jul 28, 2020</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            {renderHeader()}

            <View style={styles.statsContainer}>
                <View style={styles.statsCard}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Group Spent:</Text>
                        <Text style={styles.statValue}>$901.95</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Total Receivable:</Text>
                        <Text style={[styles.statValue, { color: SPLIT_COLORS.success }]}>+ $538.83</Text>
                    </View>
                </View>

                <ScrollView style={styles.transactionScroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.dateLabel}>Jul 28, 2020</Text>
                    {transactions.map(item => (
                        <View key={item.id} style={styles.transactionItem}>
                            <View style={[styles.iconBox, { backgroundColor: item.type === 'owed' ? '#FFF0E6' : '#F5F5F5' }]}>
                                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                            </View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionTitle}>{item.title}</Text>
                                <Text style={styles.transactionTotal}>Total {item.total}</Text>
                            </View>
                            <Text style={[styles.transactionShare, { color: SPLIT_COLORS.success }]}>{item.share}</Text>
                        </View>
                    ))}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#FBFBFB' },
    header: {
        backgroundColor: SPLIT_COLORS.headerBlack,
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    headerActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    headerActionBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    moreText: { color: SPLIT_COLORS.primary, fontSize: 24, fontWeight: '800' },
    headerContent: { alignItems: 'center' },
    groupTitle: { fontSize: 28, fontWeight: '800', color: '#FFF', marginBottom: 8 },
    syncText: { fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: '500' },
    statsContainer: { flex: 1, marginTop: -32, paddingHorizontal: 24 },
    statsCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        marginBottom: 24,
    },
    statBox: { flex: 1 },
    statLabel: { fontSize: 13, color: SPLIT_COLORS.textSecondary, marginBottom: 8, fontWeight: '500' },
    statValue: { fontSize: 22, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    transactionScroll: { flex: 1 },
    dateLabel: { fontSize: 14, fontWeight: '600', color: SPLIT_COLORS.textSecondary, marginBottom: 16 },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    transactionInfo: { flex: 1 },
    transactionTitle: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textPrimary, marginBottom: 4 },
    transactionTotal: { fontSize: 12, color: SPLIT_COLORS.textSecondary },
    transactionShare: { fontSize: 15, fontWeight: '800' },
});

export default SplitGroupDetailScreen;
