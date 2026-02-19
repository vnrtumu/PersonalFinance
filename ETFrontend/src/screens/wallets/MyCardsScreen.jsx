import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import { ChevronLeftIcon, PlusIcon, CreditCardIcon, TrashIcon, PencilIcon } from '../../assets/icons';
import { useWallets } from '../../hooks/useWallets';
import COLORS from '../../utils/theme';

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
                    <CreditCardIcon size={24} color={COLORS.lavender} />
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
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>My Cards</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCard')}>
                        <PlusIcon size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {cards.map(card => (
                        <CreditCard key={card.id} card={card} />
                    ))}

                    {cards.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconCircle}>
                                <CreditCardIcon size={48} color={COLORS.textMuted} />
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
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.divider },
    title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
    addButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.divider },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cardContainer: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: COLORS.divider },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardInfo: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: COLORS.lavenderBg, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    cardName: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
    cardType: { fontSize: 10, fontWeight: '700', color: COLORS.textMuted, marginTop: 2 },
    limitInfo: { alignItems: 'flex-end' },
    limitLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted, marginBottom: 2 },
    limitValue: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
    divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: 16 },
    cardBody: { paddingVertical: 4 },
    dateInfo: { flexDirection: 'row', justifyContent: 'space-between' },
    bodyLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted, marginBottom: 4 },
    bodyValue: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    chargeValue: { fontSize: 14, fontWeight: '800', color: COLORS.expense },
    emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
    emptyIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.divider },
    emptyText: { marginTop: 24, fontSize: 16, fontWeight: '600', color: COLORS.textMuted },
    emptyAddButton: { marginTop: 24, backgroundColor: COLORS.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 18, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
    emptyAddButtonText: { color: COLORS.buttonText, fontSize: 16, fontWeight: '700' },
});

export default MyCardsScreen;
