import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    UsersIcon,
    PlusIcon,
    SearchIcon,
    PinIcon,
    UserIcon,
    ClockIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';

const SplitExpensesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [hasGroups, setHasGroups] = useState(true); // Toggle this to see empty state

    const quickAccessGroups = [
        {
            id: '1',
            name: 'Paris Summer Vacation',
            friends: 4,
            expenses: 4,
            balance: '+$538.83',
            type: 'owed',
            isPinned: true
        },
    ];

    const allGroups = [
        {
            id: '2',
            name: 'Avenger: Endgame Cinema',
            friends: 8,
            expenses: 1,
            balance: '-$43.80',
            type: 'owe',
            isPinned: false
        },
        {
            id: '3',
            name: "Disney's Land",
            friends: 4,
            expenses: 3,
            balance: 'Settled!',
            type: 'settled',
            isPinned: false
        },
        {
            id: '4',
            name: 'Paris Vacation',
            friends: 4,
            expenses: 1,
            balance: 'Settled!',
            type: 'settled',
            isPinned: false
        },
    ];

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Groups</Text>
            <View style={styles.headerActions}>
                <TouchableOpacity style={styles.headerActionBtn}>
                    <SearchIcon size={24} color={SPLIT_COLORS.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.plusBtn}
                    onPress={() => navigation.navigate('CreateGroup')}
                >
                    <PlusIcon size={24} color={SPLIT_COLORS.textPrimary} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const GroupCard = ({ item, isQuickAccess = false }) => (
        <TouchableOpacity
            style={[styles.card, isQuickAccess && styles.quickAccessCard]}
            onPress={() => navigation.navigate('GroupDetail', { groupId: item.id, groupName: item.name })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.groupName}>{item.name}</Text>
                {item.isPinned && <PinIcon size={16} color={SPLIT_COLORS.textSecondary} />}
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.cardStats}>
                    <View style={styles.statItem}>
                        <UserIcon size={14} color={SPLIT_COLORS.textSecondary} />
                        <Text style={styles.statText}>{item.friends} friends</Text>
                    </View>
                    <View style={styles.statItem}>
                        <ClockIcon size={14} color={SPLIT_COLORS.textSecondary} />
                        <Text style={styles.statText}>{item.expenses} expenses</Text>
                    </View>
                </View>

                <Text style={[
                    styles.balanceText,
                    item.type === 'owed' ? styles.owedText :
                        item.type === 'owe' ? styles.oweText : styles.settledText
                ]}>
                    {item.balance}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {renderHeader()}
            </SafeAreaView>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {hasGroups ? (
                    <View style={styles.content}>
                        <Text style={styles.sectionTitle}>Quick Access</Text>
                        {quickAccessGroups.map(group => (
                            <GroupCard key={group.id} item={group} isQuickAccess />
                        ))}

                        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>All Groups</Text>
                        {allGroups.map(group => (
                            <GroupCard key={group.id} item={group} />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIllustration}>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                                style={styles.emptyImg}
                                opacity={0.6}
                            />
                        </View>
                        <Text style={styles.emptyTitle}>You have no group.</Text>
                        <Text style={styles.emptySubtitle}>Create a first group and enjoy Fairpay!</Text>

                        <View style={styles.emptyPointerContainer}>
                            <Text style={styles.pointerArrow}>↑</Text>
                        </View>
                    </View>
                )}
                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FBFBFB'
    },
    safeArea: {
        backgroundColor: '#FBFBFB',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: SPLIT_COLORS.textPrimary,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerActionBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusBtn: {
        width: 44,
        height: 44,
        backgroundColor: SPLIT_COLORS.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: SPLIT_COLORS.textSecondary,
        marginBottom: 16,
        marginTop: 8,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    quickAccessCard: {
        // Any specific styling for quick access
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    groupName: {
        fontSize: 18,
        fontWeight: '700',
        color: SPLIT_COLORS.textPrimary,
        flex: 1,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardStats: {
        gap: 8,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 13,
        color: SPLIT_COLORS.textSecondary,
        fontWeight: '500',
    },
    balanceText: {
        fontSize: 15,
        fontWeight: '800',
    },
    owedText: {
        color: SPLIT_COLORS.success,
    },
    oweText: {
        color: SPLIT_COLORS.textPrimary, // Design shows black for 'owe' in some places, or maybe coral?
    },
    settledText: {
        color: SPLIT_COLORS.textSecondary,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 40,
    },
    emptyIllustration: {
        width: 160,
        height: 160,
        backgroundColor: '#F9F9F9',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    emptyImg: {
        width: 80,
        height: 80,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: SPLIT_COLORS.textSecondary,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: 'rgba(108, 117, 125, 0.6)',
        textAlign: 'center',
        lineHeight: 20,
    },
    emptyPointerContainer: {
        position: 'absolute',
        top: 20,
        right: 40,
        alignItems: 'center',
    },
    pointerArrow: {
        fontSize: 40,
        color: '#f1f1f1',
        fontWeight: '200',
    },

});

export default SplitExpensesScreen;
