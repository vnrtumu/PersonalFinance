import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClockIcon } from '../../assets/icons';
import COLORS from '../../utils/theme';

const SplitActivityScreen = () => {
    const activities = [
        { id: '1', title: 'John Doe added "Dinner"', date: '2 hours ago', amount: '$45.00' },
        { id: '2', title: 'You paid Jane Smith', date: 'Yesterday', amount: '$15.00' },
        { id: '3', title: 'New group created: "Trip"', date: '2 days ago', amount: null },
    ];

    const renderActivity = ({ item }) => (
        <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
                <ClockIcon size={20} color={COLORS.primary} />
            </View>
            <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityDate}>{item.date}</Text>
            </View>
            {item.amount && (
                <Text style={styles.activityAmount}>{item.amount}</Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Activity</Text>
                </View>
                <FlatList
                    data={activities}
                    renderItem={renderActivity}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    header: { marginTop: 15, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
    activityCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: COLORS.divider },
    activityIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.primaryMuted, justifyContent: 'center', alignItems: 'center' },
    activityInfo: { flex: 1, marginLeft: 12 },
    activityTitle: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '500' },
    activityDate: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
    activityAmount: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
    listContent: { paddingBottom: 100 },
});

export default SplitActivityScreen;
