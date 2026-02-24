import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../button';
import { Form } from '../form';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { productSchema, type ProductFormValues } from '../../../schema/productSchema';
import { useProductSubmit } from '../../../hooks/useProductSubmit';
import { ProductFormItem } from './ProductFormItem';
import { cn } from '../../../lib/utils';

export type BulkFormValues = {
  products: ProductFormValues[];
};

const bulkSchema = z.object({
  products: z.array(productSchema),
});

export function BulkCreator() {
  const { mutate, isPending } = useProductSubmit();

  const form = useForm<BulkFormValues>({
    resolver: zodResolver(bulkSchema) as any,
    defaultValues: {
      products: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  const onSubmit = (data: BulkFormValues) => {
    mutate(data.products);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Массовое создание товаров
          </h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => append({})}
            disabled={isPending}
            className="border-primary/20 hover:bg-primary/5"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Добавить товар
          </Button>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative border rounded-lg p-5 bg-card hover:shadow-md transition-shadow"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold mb-4 pr-8">Товар #{index + 1}</h3>
              <ProductFormItem index={index} />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              'flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg',
              isPending && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Сохранение...
              </span>
            ) : (
              'Создать все товары'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex-1 border-muted-foreground/20 hover:bg-muted"
          >
            Сбросить всё
          </Button>
        </div>
      </form>
    </Form>
  );
}
