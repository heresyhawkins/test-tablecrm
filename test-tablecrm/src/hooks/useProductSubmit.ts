import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { type ProductFormValues } from '../schema/productSchema';

const API_URL = 'https://app.tablecrm.com/api/v1/nomenclature/';
const TOKEN = 'af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77';

function prepareProductData(product: ProductFormValues) {
  return {
    name: product.name || '',
    type: product.type || 'product',
    description_short: product.description_short || '',
    description_long: product.description_long || '',
    code: product.code || '',
    unit: product.unit ?? null,
    category: product.category ?? null,
    cashback_type: product.cashback_type || 'lcard_cashback',
    seo_title: product.seo_title || '',
    seo_description: product.seo_description || '',
    seo_keywords: Array.isArray(product.seo_keywords) ? product.seo_keywords : [],
    global_category_id: product.global_category_id ?? null,
    marketplace_price: product.marketplace_price ?? null,
    chatting_percent: product.chatting_percent ?? null,
    address: product.address || '',
    latitude: product.latitude ?? null,
    longitude: product.longitude ?? null,
  };
}

async function submitProduct(data: ProductFormValues[]) {
  const preparedData = data.map(prepareProductData);
  console.log('Prepared data:', JSON.stringify(preparedData, null, 2));
  const response = await axios.post(`${API_URL}?token=${TOKEN}`, preparedData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export function useProductSubmit() {
  return useMutation({
    mutationFn: submitProduct,
    onSuccess: () => {
      alert('✅ Товар(ы) успешно создан(ы)!');
    },
    onError: (error) => {
      console.error('Ошибка:', error);
      alert('❌ Ошибка при создании товара');
    },
  });
}
