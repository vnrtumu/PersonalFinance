import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useBudgets } from '../../hooks/useData';

const BudgetScreen = () => {
    const { data: budgets, isLoading } = useBudgets();

    const renderBudget = ({ item }) => {
        const spent = Math.random() * item.monthly_limit;
        const progress = Math.min(spent / item.monthly_limit, 1);

        return (
            <View style={styles.budgetCard}>
                <View style={styles.budgetHeader}>
                    <Text style={styles.categoryName}>Category ID: {item.category_id}</Text>
                    <Text style={styles.amountText}>${spent.toFixed(0)} / ${item.monthly_limit}</Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: progress > 0.8 ? '#dc3545' : '#28a745' }]} />
                </View>
                <Text style={styles.remainingText}>
                    {progress >= 1 ? 'Budget Exceeded!' : `$${(item.monthly_limit - spent).toFixed(0)} remaining`}
                </Text>
            </View>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budgets</Text>
            <FlatList
                data={budgets}
                renderItem={renderBudget}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>No budgets set for this month</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginTop: 40, marginBottom: 30 },
    budgetCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
    },
    budgetHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    categoryName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    amountText: { fontSize: 14, color: '#666' },
    progressBarContainer: { height: 8, backgroundColor: '#eee', borderRadius: 4, marginBottom: 10, overflow: 'hidden' },
    progressBar: { height: '100%', borderRadius: 4 },
    remainingText: { fontSize: 12, color: '#999', textAlign: 'right' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 40 },
});

export default BudgetScreen;
