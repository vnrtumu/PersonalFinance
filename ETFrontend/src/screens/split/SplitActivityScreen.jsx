import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    BellIcon,
    ChevronRightIcon,
    UsersIcon,
    CreditCardIcon,
    ClockIcon,
    XIcon,
    WalletIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const SplitActivityScreen = ({ navigation }) => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = [
        { id: '1', name: 'Benjamin Willis', subtext: 'paid you via Paypal', amount: '+$24.50', type: 'received', date: 'Jul 12, 2020', time: '09:24 AM', avatar: 'https://i.pravatar.cc/150?u=ben', group: 'Paris Vacation', note: 'Visit the Eiffel Tower' },
        { id: '2', name: 'Beulah Walker', subtext: 'send you reminder', amount: null, type: 'reminder', date: 'Jul 12, 2020', time: '10:15 AM', avatar: 'https://i.pravatar.cc/150?u=beu', group: 'Dinner', note: 'Split for Italian night' },
        { id: '3', name: 'Sally Hawkins', subtext: 'money sent', amount: '-$128.00', type: 'sent', date: 'Jul 12, 2020', time: '11:30 AM', avatar: 'https://i.pravatar.cc/150?u=sal', group: 'Shopping', note: 'Groceries and snacks' },
        { id: '4', name: 'Song Bao', subtext: 'paid you via Apple Pay', amount: '+$76.50', type: 'received', date: 'Jul 12, 2020', time: '02:45 PM', avatar: 'https://i.pravatar.cc/150?u=son', group: 'Trip', note: 'Flights' },
        { id: '5', name: 'Fatima Delgado', subtext: 'paid you via Paypal', amount: '+$24.50', type: 'received', date: 'Jul 08, 2020', time: '08:12 AM', avatar: 'https://i.pravatar.cc/150?u=fat', group: 'Coffee', note: 'Quick meeting' },
    ];

    const groupedActivities = [
        { title: 'Jul 12, 2020', data: activities.slice(0, 4) },
        { title: 'Jul 08, 2020', data: activities.slice(4) },
    ];

    const renderActivityItem = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.activityItem}
            onPress={() => setSelectedActivity(item)}
        >
            <View style={styles.itemLeft}>
                {item.type === 'reminder' ? (
                    <View style={styles.reminderAvatar}>
                        <BellIcon size={20} color="#fff" />
                    </View>
                ) : (
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                )}
                <View style={styles.itemInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.subtext}>{item.subtext}</Text>
                </View>
            </View>
            {item.amount && (
                <Text style={[
                    styles.amount,
                    { color: item.type === 'received' ? SPLIT_COLORS.success : SPLIT_COLORS.textPrimary }
                ]}>
                    {item.amount}
                </Text>
            )}
        </TouchableOpacity>
    );

    const DetailModal = () => (
        <Modal
            visible={!!selectedActivity}
            transparent
            animationType="fade"
            onRequestClose={() => setSelectedActivity(null)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => setSelectedActivity(null)}
                    >
                        <XIcon size={20} color={SPLIT_COLORS.textPrimary} />
                    </TouchableOpacity>

                    {selectedActivity && (
                        <>
                            <Image
                                source={{ uri: selectedActivity.avatar }}
                                style={styles.modalAvatar}
                            />

                            <Text style={styles.modalSummary}>
                                <Text style={{ fontWeight: '800' }}>{selectedActivity.name}</Text>
                                {selectedActivity.type === 'received' ? ' paid you ' : ' you paid '}
                                <Text style={{ fontWeight: '800' }}>{selectedActivity.amount}</Text>
                            </Text>
                            <Text style={styles.modalSubtext}>via {selectedActivity.type === 'received' ? 'Paypal' : 'Credit Card'}</Text>

                            <View style={styles.modalDetails}>
                                <View style={styles.detailRow}>
                                    <View style={styles.detailIcon}>
                                        <UsersIcon size={18} color={SPLIT_COLORS.textSecondary} />
                                    </View>
                                    <Text style={styles.detailText}>{selectedActivity.group}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <View style={styles.detailIcon}>
                                        <WalletIcon size={18} color={SPLIT_COLORS.textSecondary} />
                                    </View>
                                    <Text style={styles.detailText}>{selectedActivity.note}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <View style={styles.detailIcon}>
                                        <ClockIcon size={18} color={SPLIT_COLORS.textSecondary} />
                                    </View>
                                    <Text style={styles.detailText}>{selectedActivity.date} {selectedActivity.time}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.viewExpenseBtn}
                                onPress={() => setSelectedActivity(null)}
                            >
                                <Text style={styles.viewExpenseText}>View Expense</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.header} edges={['top']}>
                <View style={styles.headerTop}>
                    <View style={{ width: 44 }} />
                    <TouchableOpacity style={styles.bellBtn}>
                        <BellIcon size={24} color="#FBB142" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>My Balance</Text>
                    <View style={styles.balanceRow}>
                        <Text style={styles.currencySymbol}>$</Text>
                        <Text style={styles.balanceAmount}>684.00</Text>
                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.contentTitle}>Activity</Text>
                    <TouchableOpacity
                        style={styles.seeAllBtn}
                        onPress={() => navigation.navigate('SplitFullActivity')}
                    >
                        <Text style={styles.seeAllText}>See All</Text>
                        <ChevronRightIcon size={16} color={SPLIT_COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={groupedActivities}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{item.title}</Text>
                            {item.data.map(renderActivityItem)}
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listPadding}
                />
            </View>

            <DetailModal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    header: { paddingHorizontal: 20, paddingBottom: 40 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    bellBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    badge: { position: 'absolute', top: 5, right: 5, backgroundColor: '#FF5A5F', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#121212' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },

    balanceContainer: { alignItems: 'center', marginTop: 20 },
    balanceLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '600', marginBottom: 5 },
    balanceRow: { flexDirection: 'row', alignItems: 'flex-start' },
    currencySymbol: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 8, marginRight: 5 },
    balanceAmount: { color: '#fff', fontSize: 44, fontWeight: '800' },

    content: { flex: 1, backgroundColor: '#F8F9FA', borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: 10 },
    contentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 30, marginBottom: 20 },
    contentTitle: { fontSize: 20, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    seeAllBtn: { flexDirection: 'row', alignItems: 'center' },
    seeAllText: { fontSize: 14, fontWeight: '700', color: SPLIT_COLORS.textPrimary, marginRight: 5 },

    listPadding: { paddingHorizontal: 25, paddingBottom: 100 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textSecondary, marginBottom: 15 },

    activityItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    avatar: { width: 44, height: 44, borderRadius: 22 },
    reminderAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FF5A5F', justifyContent: 'center', alignItems: 'center' },
    itemInfo: { marginLeft: 15 },
    name: { fontSize: 16, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    subtext: { fontSize: 13, color: SPLIT_COLORS.textSecondary, marginTop: 2 },
    amount: { fontSize: 15, fontWeight: '800' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', borderRadius: 30, padding: 30, width: '85%', alignItems: 'center' },
    closeBtn: { position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderRadius: 12, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center' },
    modalAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 20, marginTop: 20 },
    modalSummary: { fontSize: 18, color: SPLIT_COLORS.textPrimary, textAlign: 'center', lineHeight: 26 },
    modalSubtext: { fontSize: 14, color: SPLIT_COLORS.textSecondary, marginTop: 5, marginBottom: 30 },
    modalDetails: { width: '100%', marginBottom: 30 },
    detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    detailIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    detailText: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
    viewExpenseBtn: { backgroundColor: '#FBB142', width: '100%', height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    viewExpenseText: { fontSize: 16, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
});

export default SplitActivityScreen;
