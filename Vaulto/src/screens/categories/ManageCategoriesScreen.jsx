import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    ChevronLeftIcon,
    PlusIcon,
    TagIcon,
    IconMap,
    TrendingUpIcon,
    TrendingDownIcon,
    TrashIcon,
    PencilIcon,
    ShieldCheckIcon
} from '../../assets/icons';
import { useCategories, useDeleteCategory } from '../../hooks/useData';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import COLORS from '../../utils/theme';

const ManageCategoriesScreen = ({ navigation }) => {
    const { data: categories, isLoading } = useCategories();
    const deleteCategoryMutation = useDeleteCategory();
    const [activeTab, setActiveTab] = useState('expense');

    const incomeCategories = categories?.filter(c => c.type === 'income') || [];
    const expenseCategories = categories?.filter(c => c.type === 'expense') || [];
    const displayedCategories = activeTab === 'income' ? incomeCategories : expenseCategories;

    const handleDelete = (category) => {
        Alert.alert(
            'Delete Category',
            `Are you sure you want to delete "${category.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteCategoryMutation.mutateAsync(category.id);
                        } catch (err) {
                            Alert.alert('Error', 'Failed to delete category');
                        }
                    }
                }
            ]
        );
    };

    const CategoryItem = ({ category }) => {
        const Icon = IconMap[category.icon] || TagIcon;
        const isSystem = !category.user_id;

        const renderRightActions = (progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [-140, 0],
                outputRange: [0, 140],
            });

            return (
                <View style={styles.swipeActions}>
                    <TouchableOpacity
                        style={[styles.swipeAction, styles.editAction]}
                        onPress={() => navigation.navigate('AddCategory', { category, isEditing: true })}
                    >
                        <Animated.View style={{ transform: [{ translateX: trans }] }}>
                            <PencilIcon size={20} color="#fff" />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.swipeAction, styles.deleteAction]}
                        onPress={() => handleDelete(category)}
                    >
                        <Animated.View style={{ transform: [{ translateX: trans }] }}>
                            <TrashIcon size={20} color="#fff" />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            );
        };

        const content = (
            <View style={styles.categoryCard}>
                <View style={[styles.iconContainer, { backgroundColor: activeTab === 'income' ? COLORS.incomeBg : COLORS.expenseBg }]}>
                    <Icon size={20} color={activeTab === 'income' ? COLORS.income : COLORS.expense} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                {isSystem ? (
                    <View style={styles.systemBadge}>
                        <ShieldCheckIcon size={10} color={COLORS.textMuted} />
                        <Text style={styles.systemBadgeText}>System</Text>
                    </View>
                ) : (
                    <View style={styles.customBadge}>
                        <Text style={styles.customBadgeText}>Custom</Text>
                    </View>
                )}
            </View>
        );

        if (isSystem) return <View style={styles.itemWrapper}>{content}</View>;

        return (
            <View style={styles.itemWrapper}>
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
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <StatusBar barStyle="light-content" />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeftIcon size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Categories</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddCategory', { type: activeTab })}
                        style={styles.addButton}
                    >
                        <PlusIcon size={20} color={COLORS.buttonText} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'expense' && styles.activeExpenseTab]}
                        onPress={() => setActiveTab('expense')}
                    >
                        <TrendingDownIcon size={18} color={activeTab === 'expense' ? COLORS.expense : COLORS.textSecondary} />
                        <Text style={[styles.tabText, activeTab === 'expense' && styles.activeTabText]}>Expenses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'income' && styles.activeIncomeTab]}
                        onPress={() => setActiveTab('income')}
                    >
                        <TrendingUpIcon size={18} color={activeTab === 'income' ? COLORS.income : COLORS.textSecondary} />
                        <Text style={[styles.tabText, activeTab === 'income' && styles.activeTabText]}>Income</Text>
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                ) : (
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.categoryList}>
                            {displayedCategories.length === 0 ? (
                                <View style={styles.emptyState}>
                                    <TagIcon size={48} color={COLORS.textMuted} />
                                    <Text style={styles.emptyText}>No {activeTab} categories yet.</Text>
                                </View>
                            ) : (
                                displayedCategories.map(cat => (
                                    <CategoryItem key={cat.id} category={cat} />
                                ))
                            )}
                        </View>
                        <View style={{ height: 40 }} />
                    </ScrollView>
                )}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 15,
        backgroundColor: COLORS.background
    },
    backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceElevated, justifyContent: 'center', alignItems: 'center' },
    addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
    tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent'
    },
    activeExpenseTab: { borderBottomColor: COLORS.expense },
    activeIncomeTab: { borderBottomColor: COLORS.income },
    tabText: { marginLeft: 8, fontSize: 15, fontWeight: '700', color: COLORS.textSecondary },
    activeTabText: { color: COLORS.textPrimary },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    content: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    categoryList: { marginTop: 10 },
    itemWrapper: {
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
    },
    iconContainer: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    categoryName: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
    customBadge: { backgroundColor: COLORS.surfaceElevated, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    customBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase' },
    systemBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceElevated, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: COLORS.divider },
    systemBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', marginLeft: 4 },
    emptyState: { alignItems: 'center', marginTop: 100 },
    emptyText: { marginTop: 16, color: COLORS.textMuted, fontSize: 15, fontWeight: '500' },
    swipeActions: {
        flexDirection: 'row',
        width: 140,
        height: '100%',
    },
    swipeAction: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    editAction: { backgroundColor: COLORS.primary },
    deleteAction: { backgroundColor: COLORS.expense },
});

export default ManageCategoriesScreen;
