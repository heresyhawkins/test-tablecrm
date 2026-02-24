import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormValues } from '../schema/productSchema';
import axios from 'axios';

export function useAIGeneration(form: UseFormReturn<ProductFormValues>) {
  const [isLoading, setIsLoading] = useState(false);

  const mockGenerateFromName = (name: string) => ({
    description_short: `Краткое описание для "${name}"`,
    description_long: `Полное описание для "${name}". Здесь может быть много текста о товаре.`,
    seo_title: `${name} купить недорого`,
    seo_description: `Лучшие предложения на ${name}. Доставка по всей России.`,
    seo_keywords: [name, 'купить', 'цена'],
  });

  const mockPolishText = (text: string) => ({
    polished: text + ' (исправлено)',
  });

  const mockSuggestCategory = () => ({
    categoryId: 2478,
  });

  const callAI = async (action: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/ai', action);
      return response.data;
    } catch (error) {
      console.warn('AI service unavailable, using mock data', error);
      switch (action.type) {
        case 'generate-from-name':
          return mockGenerateFromName(action.name);
        case 'polish-text':
          return mockPolishText(action.text);
        case 'suggest-category':
          return mockSuggestCategory();
        default:
          return null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateFromName = async () => {
    const name = form.getValues('name');
    if (!name) return;
    const result = await callAI({ type: 'generate-from-name', name });
    if (result) {
      if (result.description_short) form.setValue('description_short', result.description_short);
      if (result.description_long) form.setValue('description_long', result.description_long);
      if (result.seo_title) form.setValue('seo_title', result.seo_title);
      if (result.seo_description) form.setValue('seo_description', result.seo_description);
      if (result.seo_keywords) form.setValue('seo_keywords', result.seo_keywords);
    }
  };

  const polishText = async (field: keyof ProductFormValues) => {
    const text = form.getValues(field);
    if (!text || typeof text !== 'string') return;
    const result = await callAI({ type: 'polish-text', text, field });
    if (result?.polished) form.setValue(field, result.polished);
  };

  const suggestCategory = async () => {
    const name = form.getValues('name');
    if (!name) return;
    const result = await callAI({ type: 'suggest-category', name });
    if (result?.categoryId) form.setValue('category', result.categoryId);
  };

  return {
    isLoading,
    generateFromName,
    polishText,
    suggestCategory,
  };
}
