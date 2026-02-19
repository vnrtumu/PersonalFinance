import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import { ChevronLeftIcon, PlusIcon, CreditCardIcon, TrashIcon, PencilIcon } from '../../assets/icons';
import { useWallets } from '../../hooks/useWallets';

const { width } = Dimensions.get('window');

const formatDate = (day) => {
    if (!day) return 'Not set';
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), day);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const CreditCard = ({ card }) => (
    <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
            <View style={styles.cardInfo}>
                <View style={styles.iconBox}>
                    <CreditCardIcon size={24} color="#6366f1" />
                </View>
                <View>
                    <Text style={styles.cardName}>{card.name} ({card.last_4 || 'XXXX'})</Text>
                    <Text style={styles.cardType}>CREDIT CARD</Text>
                </View>
            </View>
            <View style={styles.limitInfo}>
                <Text style={styles.limitLabel}>Total Limit</Text>
                <Text style={styles.limitValue}>₹{card.total_limit?.toLocaleString() || '0'}</Text>
            </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBody}>
            <View style={styles.dateInfo}>
                <View>
                    <Text style={styles.bodyLabel}>Bill Generated On</Text>
                    <Text style={styles.bodyValue}>{formatDate(card.bill_date)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.bodyLabel}>Payment Due Date</Text>
                    <Text style={styles.bodyValue}>{formatDate(card.due_date)}</Text>
                </View>
            </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
            <View>
                <Text style={[styles.bodyLabel, { fontSize: 11 }]}>Additional Charges</Text>
                <Text style={[styles.bodyLabel, { fontSize: 10 }]}>Late Fee / GST / Interest</Text>
            </View>
            <Text style={styles.chargeValue}>₹{card.additional_charges?.toLocaleString() || '0'}</Text>
        </View>
    </View>
);

const MyCardsScreen = ({ navigation }) => {
    const { data: wallets, isLoading } = useWallets();

    const cards = wallets?.filter(w => w.type === 'credit_card') || [];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.title}>My Cards</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCard')}>
                        <PlusIcon size={24} color="#6366f1" />
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color="#6366f1" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {cards.map(card => (
                        <CreditCard key={card.id} card={card} />
                    ))}

                    {cards.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconCircle}>
                                <CreditCardIcon size={48} color="#e5e7eb" />
                            </View>
                            <Text style={styles.emptyText}>No cards added yet.</Text>
                            <TouchableOpacity
                                style={styles.emptyAddButton}
                                onPress={() => navigation.navigate('AddCard')}
                            >
                                <Text style={styles.emptyAddButtonText}>Add Your First Card</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f9fafb' },
    header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    title: { fontSize: 24, fontWeight: '800', color: '#111827' },
    addButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cardContainer: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 3 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardInfo: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#f5f7ff', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    cardName: { fontSize: 16, fontWeight: '800', color: '#111827' },
    cardType: { fontSize: 10, fontWeight: '700', color: '#9ca3af', marginTop: 2 },
    limitInfo: { alignItems: 'flex-end' },
    limitLabel: { fontSize: 12, fontWeight: '600', color: '#9ca3af', marginBottom: 2 },
    limitValue: { fontSize: 16, fontWeight: '800', color: '#6366f1' },
    divider: { height: 1, backgroundColor: '#f3f4f6', marginVertical: 16 },
    cardBody: { paddingVertical: 4 },
    dateInfo: { flexDirection: 'row', justifyContent: 'space-between' },
    bodyLabel: { fontSize: 12, fontWeight: '600', color: '#9ca3af', marginBottom: 4 },
    bodyValue: { fontSize: 14, fontWeight: '700', color: '#1f2937' },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    chargeValue: { fontSize: 14, fontWeight: '800', color: '#ef4444' },
    emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
    emptyIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 2 },
    emptyText: { marginTop: 24, fontSize: 16, fontWeight: '600', color: '#9ca3af' },
    emptyAddButton: { marginTop: 24, backgroundColor: '#6366f1', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 18, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
    emptyAddButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default MyCardsScreen;
