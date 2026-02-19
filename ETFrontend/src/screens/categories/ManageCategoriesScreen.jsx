import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, Alert, Animated } from 'react-native';
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
                <View style={[styles.iconContainer, { backgroundColor: activeTab === 'income' ? '#effbf6' : '#fff1f2' }]}>
                    <Icon size={20} color={activeTab === 'income' ? '#10b981' : '#ef4444'} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                {isSystem ? (
                    <View style={styles.systemBadge}>
                        <ShieldCheckIcon size={10} color="#9ca3af" />
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
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeftIcon size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Categories</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddCategory', { type: activeTab })}
                        style={styles.addButton}
                    >
                        <PlusIcon size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'expense' && styles.activeExpenseTab]}
                        onPress={() => setActiveTab('expense')}
                    >
                        <TrendingDownIcon size={18} color={activeTab === 'expense' ? '#ef4444' : '#6b7280'} />
                        <Text style={[styles.tabText, activeTab === 'expense' && styles.activeTabText]}>Expenses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'income' && styles.activeIncomeTab]}
                        onPress={() => setActiveTab('income')}
                    >
                        <TrendingUpIcon size={18} color={activeTab === 'income' ? '#10b981' : '#6b7280'} />
                        <Text style={[styles.tabText, activeTab === 'income' && styles.activeTabText]}>Income</Text>
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#6366f1" />
                    </View>
                ) : (
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.categoryList}>
                            {displayedCategories.length === 0 ? (
                                <View style={styles.emptyState}>
                                    <TagIcon size={48} color="#e5e7eb" />
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
    safeArea: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff'
    },
    backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
    addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: '800', color: '#111827' },
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
    activeExpenseTab: { borderBottomColor: '#ef4444' },
    activeIncomeTab: { borderBottomColor: '#10b981' },
    tabText: { marginLeft: 8, fontSize: 15, fontWeight: '700', color: '#6b7280' },
    activeTabText: { color: '#111827' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    content: { flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 20 },
    categoryList: { marginTop: 10 },
    itemWrapper: {
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        // Remove borderRadius and marginBottom as they are handled by itemWrapper for swipe alignment
    },
    iconContainer: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    categoryName: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1f2937' },
    customBadge: { backgroundColor: '#f3f4f6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    customBadgeText: { fontSize: 10, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase' },
    systemBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#f3f4f6' },
    systemBadgeText: { fontSize: 10, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', marginLeft: 4 },
    emptyState: { alignItems: 'center', marginTop: 100 },
    emptyText: { marginTop: 16, color: '#9ca3af', fontSize: 15, fontWeight: '500' },
    swipeActions: {
        flexDirection: 'row',
        width: 140,
        height: '100%',
    },
    swipeAction: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    editAction: { backgroundColor: '#6366f1' },
    deleteAction: { backgroundColor: '#ef4444' },
});

export default ManageCategoriesScreen;
