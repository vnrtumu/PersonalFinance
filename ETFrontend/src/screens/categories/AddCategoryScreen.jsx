import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import {
    ChevronLeftIcon,
    ArrowUpRightIcon,
    ArrowDownLeftIcon,
    TagIcon,
    IconMap
} from '../../assets/icons';
import { useAddCategory, useUpdateCategory } from '../../hooks/useData';

const availableIcons = Object.keys(IconMap).map(id => ({
    id,
    component: IconMap[id]
}));

const AddCategoryScreen = ({ navigation, route }) => {
    const isEditing = route.params?.isEditing || false;
    const categoryToEdit = route.params?.category;

    const initialType = categoryToEdit?.type || route.params?.type || 'expense';
    const [name, setName] = useState(categoryToEdit?.name || '');
    const [type, setType] = useState(initialType);
    const [selectedIcon, setSelectedIcon] = useState(categoryToEdit?.icon || 'tag');

    const addCategoryMutation = useAddCategory();
    const updateCategoryMutation = useUpdateCategory();

    const isPending = addCategoryMutation.isPending || updateCategoryMutation.isPending;

    const handleSave = () => {
        if (!name) {
            Alert.alert('Error', 'Please enter a category name');
            return;
        }

        const categoryData = {
            name,
            type,
            icon: selectedIcon,
            color: type === 'income' ? '#10b981' : '#ef4444',
        };

        const mutation = isEditing ? updateCategoryMutation : addCategoryMutation;
        const payload = isEditing ? { id: categoryToEdit.id, ...categoryData } : categoryData;

        mutation.mutate(payload, {
            onSuccess: () => {
                Alert.alert('Success', isEditing ? 'Category updated!' : 'Category added!');
                navigation.goBack();
            },
            onError: (error) => {
                const action = isEditing ? 'update' : 'add';
                Alert.alert('Error', error.response?.data?.detail || `Failed to ${action} category`);
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeftIcon size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.title}>{isEditing ? 'Edit Category' : 'New Category'}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Type Selector */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Type</Text>
                    <View style={styles.typeSelector}>
                        <TouchableOpacity
                            style={[styles.typeButton, type === 'expense' && styles.activeExpense]}
                            onPress={() => setType('expense')}
                        >
                            <ArrowDownLeftIcon size={18} color={type === 'expense' ? '#fff' : '#ef4444'} />
                            <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Expense</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.typeButton, type === 'income' && styles.activeIncome]}
                            onPress={() => setType('income')}
                        >
                            <ArrowUpRightIcon size={18} color={type === 'income' ? '#fff' : '#10b981'} />
                            <Text style={[styles.typeText, type === 'income' && styles.activeTypeText]}>Income</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Shopping, Salary"
                        placeholderTextColor="#9ca3af"
                        value={name}
                        onChangeText={setName}
                        autoFocus={!isEditing}
                    />
                </View>

                {/* Icon Selection */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Select Icon</Text>
                    <View style={styles.iconGrid}>
                        {availableIcons.map((item) => {
                            const IconComp = item.component;
                            const isSelected = selectedIcon === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.iconItem, isSelected && styles.selectedIconItem]}
                                    onPress={() => setSelectedIcon(item.id)}
                                >
                                    <IconComp size={22} color={isSelected ? '#fff' : '#4b5563'} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, isPending && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={isPending}
                >
                    {isPending ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>{isEditing ? 'Update Category' : 'Save Category'}</Text>
                    )}
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
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
    title: { fontSize: 18, fontWeight: '800', color: '#111827' },
    content: { flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 20 },
    inputGroup: { marginTop: 20, marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 10, marginLeft: 4 },
    input: { backgroundColor: '#fff', padding: 18, borderRadius: 16, fontSize: 16, color: '#111827', borderWidth: 1, borderColor: '#f3f4f6' },
    typeSelector: { flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 12, padding: 4 },
    typeButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10 },
    activeExpense: { backgroundColor: '#ef4444' },
    activeIncome: { backgroundColor: '#10b981' },
    typeText: { marginLeft: 8, fontWeight: '700', color: '#6b7280', fontSize: 14 },
    activeTypeText: { color: '#fff' },
    iconGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f3f4f6'
    },
    iconItem: { width: '18%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginBottom: 8, marginHorizontal: '1%' },
    selectedIconItem: { backgroundColor: '#6366f1' },
    saveButton: { backgroundColor: '#6366f1', padding: 18, borderRadius: 20, alignItems: 'center', marginTop: 10, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    disabledButton: { backgroundColor: '#9ca3af' }
});

export default AddCategoryScreen;
