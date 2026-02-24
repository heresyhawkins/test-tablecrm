import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../form';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { type BulkFormValues } from './BulkCreator';

interface ProductFormItemProps {
  index: number;
}

export function ProductFormItem({ index }: ProductFormItemProps) {
  const { control } = useFormContext<BulkFormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`products.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Название</FormLabel>
            <FormControl>
              <Input placeholder="Введите название товара" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`products.${index}.description_short`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Краткое описание</FormLabel>
            <FormControl>
              <Textarea placeholder="..." className="min-h-[60px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`products.${index}.description_long`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Полное описание</FormLabel>
            <FormControl>
              <Textarea placeholder="..." className="min-h-[100px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name={`products.${index}.code`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Артикул</FormLabel>
              <FormControl>
                <Input placeholder="Код" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`products.${index}.marketplace_price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Цена</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="500"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
