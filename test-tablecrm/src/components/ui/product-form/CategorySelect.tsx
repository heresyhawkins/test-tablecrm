import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Button } from '../button';
import { Sparkles, Loader2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormValues } from '../../../schema/productSchema';
import { useAIGeneration } from '../../../hooks/useAIGeneration';
import { cn } from '../../../lib/utils';
import { useQuery } from '@tanstack/react-query';

const mockCategories = [
  { id: 2477, name: 'Электроника' },
  { id: 2478, name: 'Одежда' },
  { id: 2479, name: 'Дом и сад' },
];

interface CategorySelectProps {
  form: UseFormReturn<ProductFormValues>;
}

export function CategorySelect({ form }: CategorySelectProps) {
  const { data: categories = mockCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return mockCategories;
    },
  });

  const { suggestCategory, isLoading: aiLoading } = useAIGeneration(form);

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Категория</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value?.toString()}
                disabled={isLoadingCategories}
              >
                <SelectTrigger
                  className={cn('w-full', isLoadingCategories && 'opacity-50 cursor-wait')}
                >
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={suggestCategory}
              disabled={aiLoading || !form.getValues('name')}
              title="Подобрать категорию по названию"
              className="shrink-0 border-primary/20 hover:bg-primary/5"
            >
              {aiLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 text-primary" />
              )}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
