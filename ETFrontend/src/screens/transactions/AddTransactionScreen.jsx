import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal, Pressable, SafeAreaView, StatusBar } from 'react-native';
import {
    ArrowUpRightIcon as ArrowUpCircle,
    ArrowDownLeftIcon as ArrowDownCircle,
    TagIcon as Tag,
    FileTextIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    IconMap,
    CameraIcon,
    ImageIcon
} from '../../assets/icons';
import { useAddTransaction, useUploadReceipt, useUpdateTransaction } from '../../hooks/useTransactions';
import { useCategories } from '../../hooks/useData';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddTransactionScreen = ({ navigation, route }) => {
    const transactionToEdit = route.params?.transaction;
    const isEditing = !!transactionToEdit;

    const [type, setType] = useState(transactionToEdit?.type || 'expense');
    const [amount, setAmount] = useState(transactionToEdit?.amount?.toString() || '');
    const [selectedCategory, setSelectedCategory] = useState(transactionToEdit?.category_id || null);
    const [description, setDescription] = useState(transactionToEdit?.note || '');
    const [receipt, setReceipt] = useState(transactionToEdit?.receipt_url ? { uri: transactionToEdit.receipt_url, isExisting: true } : null);
    const [isUploading, setIsUploading] = useState(false);
    const [showPickerModal, setShowPickerModal] = useState(false);

    const { data: categories } = useCategories();
    const addTransactionMutation = useAddTransaction();
    const updateTransactionMutation = useUpdateTransaction();
    const uploadReceiptMutation = useUploadReceipt();

    const filteredCategories = categories?.filter(c => c.type === type) || [];

    const handleImageResult = (result) => {
        if (result.didCancel) return;
        if (result.errorCode) {
            Alert.alert('Error', result.errorMessage || 'Failed to pick image');
            return;
        }
        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            setReceipt({
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName || 'receipt.jpg',
            });
        }
        setShowPickerModal(false);
    };

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8,
            saveToPhotos: true,
        }, handleImageResult);
    };

    const chooseFromLibrary = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        }, handleImageResult);
    };

    const handleSave = async () => {
        if (!amount || !selectedCategory) {
            Alert.alert('Error', 'Please enter an amount and select a category');
            return;
        }

        setIsUploading(true);
        let receiptUrl = transactionToEdit?.receipt_url || '';

        try {
            // Only upload if it's a new local image (has no isExisting flag)
            if (receipt && !receipt.isExisting) {
                const uploadResult = await uploadReceiptMutation.mutateAsync(receipt);
                receiptUrl = uploadResult.receipt_url;
            }

            const payload = {
                type,
                amount: parseFloat(amount),
                note: description,
                category_id: selectedCategory,
                receipt_url: receiptUrl,
                date: transactionToEdit?.date || new Date().toISOString()
            };

            if (isEditing) {
                await updateTransactionMutation.mutateAsync({
                    id: transactionToEdit.id,
                    ...payload
                });
            } else {
                await addTransactionMutation.mutateAsync(payload);
            }

            Alert.alert('Success', isEditing ? 'Transaction updated successfully' : 'Transaction saved successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (err) {
            Alert.alert('Error', err.response?.data?.detail || 'Failed to save transaction');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditing ? 'Edit Transaction' : 'New Transaction'}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Image Picker Modal */}
                <Modal
                    transparent={true}
                    visible={showPickerModal}
                    animationType="slide"
                    onRequestClose={() => setShowPickerModal(false)}
                >
                    <Pressable style={styles.modalOverlay} onPress={() => setShowPickerModal(false)}>
                        <View style={styles.pickerOptions}>
                            <Text style={styles.modalTitle}>Select Receipt Source</Text>
                            <TouchableOpacity style={styles.optionBtn} onPress={takePhoto}>
                                <View style={[styles.optionIcon, { backgroundColor: '#f0fdf4' }]}>
                                    <CameraIcon size={24} color="#10b981" />
                                </View>
                                <Text style={styles.optionText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionBtn} onPress={chooseFromLibrary}>
                                <View style={[styles.optionIcon, { backgroundColor: '#eff6ff' }]}>
                                    <ImageIcon size={24} color="#2563eb" />
                                </View>
                                <Text style={styles.optionText}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionBtn, styles.cancelBtn]}
                                onPress={() => setShowPickerModal(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>

                {/* Type Selector */}
                <View style={styles.typeSelector}>
                    <TouchableOpacity
                        style={[styles.typeBtn, type === 'expense' && styles.expenseActive]}
                        onPress={() => { setType('expense'); setSelectedCategory(null); }}
                    >
                        <ArrowDownCircle size={18} color={type === 'expense' ? '#ef4444' : '#6b7280'} />
                        <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeBtn, type === 'income' && styles.incomeActive]}
                        onPress={() => { setType('income'); setSelectedCategory(null); }}
                    >
                        <ArrowUpCircle size={18} color={type === 'income' ? '#10b981' : '#6b7280'} />
                        <Text style={[styles.typeText, type === 'income' && styles.activeTypeText]}>Income</Text>
                    </TouchableOpacity>
                </View>

                {/* Amount Input */}
                <View style={styles.amountContainer}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                {/* Category Selector */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalSelect}
                    >
                        {filteredCategories.length === 0 ? (
                            <Text style={styles.emptyText}>No categories found. Add one in Profile.</Text>
                        ) : (
                            filteredCategories.map(cat => {
                                const CatIcon = IconMap[cat.icon] || Tag;
                                return (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[styles.selectItem, selectedCategory === cat.id && styles.selectedItem]}
                                        onPress={() => setSelectedCategory(cat.id)}
                                    >
                                        <View style={[styles.iconBox, selectedCategory === cat.id && styles.selectedIconBox]}>
                                            <CatIcon size={20} color={selectedCategory === cat.id ? '#fff' : '#6366f1'} />
                                        </View>
                                        <Text style={[styles.itemLabel, selectedCategory === cat.id && styles.selectedLabel]}>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })
                        )}
                    </ScrollView>
                </View>

                {/* Receipt (Optional) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Receipt (Optional)</Text>
                    <TouchableOpacity style={styles.uploadBtn} onPress={() => setShowPickerModal(true)}>
                        <CameraIcon size={20} color="#6366f1" />
                        <Text style={styles.uploadText}>{receipt ? 'Receipt Selected' : 'Tap to capture or upload'}</Text>
                        {receipt && <Text style={styles.fileName}>{receipt.name || (receipt.isExisting ? 'Existing Receipt' : 'Selected Image')}</Text>}
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="What was this for?"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.saveBtn, isUploading && styles.disabledBtn]}
                    onPress={handleSave}
                    disabled={isUploading}
                >
                    {isUploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>{isEditing ? 'Update Transaction' : 'Save Transaction'}</Text>}
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
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
    container: { flex: 1, backgroundColor: '#f9fafb', paddingHorizontal: 20 },
    typeSelector: { flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 16, padding: 6, marginBottom: 24, marginTop: 20 },
    typeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12 },
    expenseActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
    incomeActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
    typeText: { fontSize: 15, fontWeight: '700', color: '#6b7280', marginLeft: 8 },
    activeTypeText: { color: '#111827' },
    amountContainer: { marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 10, marginLeft: 4 },
    amountInput: { fontSize: 32, fontWeight: '800', color: '#111827', backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#f3f4f6' },
    inputGroup: { marginBottom: 24 },
    horizontalSelect: { paddingVertical: 10, paddingRight: 20 },
    selectItem: { alignItems: 'center', marginRight: 20, width: 80 },
    iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#f0f0ff', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    selectedIconBox: { backgroundColor: '#6366f1' },
    itemLabel: { fontSize: 13, color: '#4b5563', fontWeight: '600', textAlign: 'center' },
    selectedLabel: { color: '#6366f1', fontWeight: '700' },
    uploadBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 18, borderStyle: 'dashed', borderWidth: 1, borderColor: '#6366f1' },
    uploadText: { fontSize: 15, fontWeight: '600', color: '#6366f1', marginLeft: 12 },
    fileName: { fontSize: 10, color: '#6366f1', position: 'absolute', bottom: 4, left: 50, fontWeight: '600' },
    descriptionInput: { backgroundColor: '#fff', borderRadius: 20, padding: 18, fontSize: 16, height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#f3f4f6' },
    saveBtn: { backgroundColor: '#6366f1', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
    saveBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    disabledBtn: { backgroundColor: '#9ca3af' },
    emptyText: { color: '#9ca3af', fontSize: 13, fontStyle: 'italic', paddingLeft: 4 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    pickerOptions: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 40 },
    modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 24, textAlign: 'center' },
    optionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
    optionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    optionText: { fontSize: 16, fontWeight: '700', color: '#374151' },
    cancelBtn: { marginTop: 12, borderBottomWidth: 0, justifyContent: 'center' },
    cancelText: { fontSize: 16, fontWeight: '800', color: '#ef4444' },
});

export default AddTransactionScreen;
