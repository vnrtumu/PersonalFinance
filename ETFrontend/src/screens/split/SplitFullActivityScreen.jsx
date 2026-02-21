import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
    ScrollView,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ChevronLeftIcon,
    ListIcon,
    XIcon,
    UsersIcon,
    CreditCardIcon,
    ClockIcon,
    CheckIcon,
    BellIcon,
    BanknoteIcon
} from '../../assets/icons';
import { SPLIT_COLORS } from '../../utils/theme';

const SplitFullActivityScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Past 90 days');
    const [selectedActivity, setSelectedActivity] = useState(null);

    const tabs = ['All', 'Reminders', 'Payments Received', 'Payments Sent'];

    const activities = [
        { id: '1', name: 'Benjamin Willis', subtext: 'paid you via Paypal', amount: '+$24.50', type: 'received', date: 'Jul 12, 2020', time: '09:24 AM', avatar: 'https://i.pravatar.cc/150?u=ben', group: 'Paris Vacation', note: 'Visit the Eiffel Tower' },
        { id: '2', name: 'Beulah Walker', subtext: 'send you reminder', amount: null, type: 'reminder', date: 'Jul 12, 2020', time: '10:15 AM', avatar: 'https://i.pravatar.cc/150?u=beu', group: 'Dinner', note: 'Split for Italian night' },
        { id: '3', name: 'Sally Hawkins', subtext: 'money sent via Credit Card', amount: '-$128.00', type: 'sent', date: 'Jul 12, 2020', time: '11:30 AM', avatar: 'https://i.pravatar.cc/150?u=sal', group: 'Shopping', note: 'Groceries and snacks' },
        { id: '4', name: 'Song Bao', subtext: 'paid you via Apple Pay', amount: '+$76.50', type: 'received', date: 'Jul 12, 2020', time: '02:45 PM', avatar: 'https://i.pravatar.cc/150?u=son', group: 'Trip', note: 'Flights' },
        { id: '5', name: 'Fatima Delgado', subtext: 'paid you via Paypal', amount: '+$24.50', type: 'received', date: 'Jul 08, 2020', time: '08:12 AM', avatar: 'https://i.pravatar.cc/150?u=fat', group: 'Coffee', note: 'Quick meeting' },
        { id: '6', name: 'Martina Brito', subtext: 'paid you via Credit Card', amount: '+$56.30', type: 'received', date: 'Jul 08, 2020', time: '11:05 AM', avatar: 'https://i.pravatar.cc/150?u=mar', group: 'Party', note: 'Balloons and cake' },
    ];

    const renderActivityItem = ({ item }) => (
        <TouchableOpacity
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
            <View style={styles.detailModalOverlay}>
                <View style={styles.detailModalContent}>
                    <TouchableOpacity
                        style={styles.detailCloseBtn}
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
                                        <CreditCardIcon size={18} color={SPLIT_COLORS.textSecondary} />
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

    const FilterModal = () => (
        <Modal
            visible={isFilterVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setIsFilterVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.filterModal}>
                    <TouchableOpacity
                        style={styles.closeModalBtn}
                        onPress={() => setIsFilterVisible(false)}
                    >
                        <XIcon size={20} color={SPLIT_COLORS.textPrimary} />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Filter</Text>

                    <View style={styles.filterOptions}>
                        {['All Transactions', 'Past 90 days', 'June', '2020'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.filterOption}
                                onPress={() => setSelectedFilter(option)}
                            >
                                <Text style={[
                                    styles.filterOptionText,
                                    selectedFilter === option && styles.filterOptionActive
                                ]}>{option}</Text>
                                <View style={[
                                    styles.radioCircle,
                                    selectedFilter === option && styles.radioActive
                                ]}>
                                    {selectedFilter === option && <CheckIcon size={12} color="#fff" />}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.dateRangeSection}>
                        <Text style={styles.dateRangeLabel}>Choose a date range</Text>
                        <View style={styles.dateInputs}>
                            <View style={styles.dateInputWrapper}>
                                <Text style={styles.inputLabel}>FROM</Text>
                                <View style={styles.dateInput} />
                            </View>
                            <View style={styles.dateInputWrapper}>
                                <Text style={styles.inputLabel}>TO</Text>
                                <View style={styles.dateInput} />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.applyBtn}
                        onPress={() => setIsFilterVisible(false)}
                    >
                        <Text style={styles.applyBtnText}>Show 10+ Results</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.header} edges={['top']}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeftIcon size={24} color={SPLIT_COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Activity</Text>
                    <TouchableOpacity onPress={() => setIsFilterVisible(true)} style={styles.settingsBtn}>
                        <ClockIcon size={24} color={SPLIT_COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <ListIcon size={20} color={SPLIT_COLORS.textSecondary} />
                        <TextInput
                            placeholder="Enter name, group and more"
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <XIcon size={18} color={SPLIT_COLORS.textSecondary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContainer}
                >
                    {tabs.map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={styles.tab}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText
                            ]}>{tab}</Text>
                            {activeTab === tab && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>

            <FlatList
                data={activities}
                keyExtractor={item => item.id}
                renderItem={renderActivityItem}
                ListHeaderComponent={() => (
                    searchQuery ? (
                        <Text style={styles.resultsText}>Found 12 results for "{searchQuery}"</Text>
                    ) : (
                        <Text style={styles.sectionDate}>Jul 12, 2020</Text>
                    )
                )}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
            />

            <FilterModal />
            <DetailModal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { backgroundColor: '#fff', paddingBottom: 10 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    settingsBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: SPLIT_COLORS.textPrimary },

    searchContainer: { paddingHorizontal: 20, marginVertical: 20 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', height: 50, borderRadius: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: '#eee' },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '600', color: SPLIT_COLORS.textPrimary },

    tabsContainer: { paddingHorizontal: 20, paddingBottom: 10 },
    tab: { marginRight: 25, paddingVertical: 5 },
    tabText: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textSecondary },
    activeTabText: { color: SPLIT_COLORS.textPrimary },
    activeIndicator: { width: 12, height: 3, backgroundColor: SPLIT_COLORS.textPrimary, borderRadius: 2, marginTop: 5 },

    listPadding: { paddingHorizontal: 25, paddingTop: 20, paddingBottom: 50 },
    resultsText: { fontSize: 14, color: SPLIT_COLORS.textSecondary, marginBottom: 20, fontWeight: '600' },
    sectionDate: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textSecondary, marginBottom: 20 },

    activityItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    avatar: { width: 44, height: 44, borderRadius: 22 },
    reminderAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FF5A5F', justifyContent: 'center', alignItems: 'center' },
    itemInfo: { marginLeft: 15 },
    name: { fontSize: 16, fontWeight: '800', color: SPLIT_COLORS.textPrimary },
    subtext: { fontSize: 13, color: SPLIT_COLORS.textSecondary, marginTop: 2 },
    amount: { fontSize: 15, fontWeight: '800' },

    detailModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
    detailModalContent: { backgroundColor: '#fff', borderRadius: 30, padding: 30, width: '85%', alignItems: 'center' },
    detailCloseBtn: { position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderRadius: 12, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center' },
    modalAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 20, marginTop: 20 },
    modalSummary: { fontSize: 18, color: SPLIT_COLORS.textPrimary, textAlign: 'center', lineHeight: 26 },
    modalSubtext: { fontSize: 14, color: SPLIT_COLORS.textSecondary, marginTop: 5, marginBottom: 30 },
    modalDetails: { width: '100%', marginBottom: 30 },
    detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    detailIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    detailText: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textPrimary },
    viewExpenseBtn: { backgroundColor: '#FBB142', width: '100%', height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    viewExpenseText: { fontSize: 16, fontWeight: '800', color: SPLIT_COLORS.textPrimary },

    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    filterModal: { backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 30, paddingBottom: 50 },
    closeModalBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 24, fontWeight: '900', color: SPLIT_COLORS.textPrimary, marginBottom: 30 },
    filterOptions: { marginBottom: 30 },
    filterOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F8F9FA' },
    filterOptionText: { fontSize: 16, fontWeight: '700', color: SPLIT_COLORS.textSecondary },
    filterOptionActive: { color: SPLIT_COLORS.textPrimary },
    radioCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#eee', justifyContent: 'center', alignItems: 'center' },
    radioActive: { borderColor: SPLIT_COLORS.textPrimary, backgroundColor: SPLIT_COLORS.textPrimary },

    dateRangeSection: { marginBottom: 40 },
    dateRangeLabel: { fontSize: 15, fontWeight: '700', color: SPLIT_COLORS.textPrimary, marginBottom: 20 },
    dateInputs: { flexDirection: 'row', gap: 15 },
    dateInputWrapper: { flex: 1 },
    inputLabel: { fontSize: 12, fontWeight: '800', color: SPLIT_COLORS.textSecondary, marginBottom: 8 },
    dateInput: { height: 55, backgroundColor: '#F8F9FA', borderRadius: 15 },

    applyBtn: { backgroundColor: '#FBB142', height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    applyBtnText: { fontSize: 16, fontWeight: '800', color: SPLIT_COLORS.textPrimary }
});

export default SplitFullActivityScreen;
