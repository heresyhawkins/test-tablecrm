import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Button } from '../button';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { productSchema, type ProductFormValues } from '../../../schema/productSchema';
import { AIAssistButton } from './AIAssistButton';
import { CategorySelect } from './CategorySelect';
import { useProductSubmit } from '../../../hooks/useProductSubmit';

const unitOptions = [
  { id: 116, name: 'шт' },
  { id: 117, name: 'кг' },
  { id: 118, name: 'л' },
];

const globalCategoryOptions = [
  { id: 127, name: 'Электроника' },
  { id: 128, name: 'Одежда' },
];

export function ProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      type: 'product',
      cashback_type: 'lcard_cashback',
      chatting_percent: 4,
    },
  });

  const { mutate, isPending } = useProductSubmit();

  const onSubmit = (data: ProductFormValues) => {
    mutate([data]);
  };

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Добавить номенклатуру</h1>
            <AIAssistButton form={form} />
          </div>

          <Tabs defaultValue="main" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="main">Основное</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="fast">Быстро</TabsTrigger>
            </TabsList>

            {/* Вкладка Основное */}
            <TabsContent value="main" className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя *</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите название товара" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тип</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product">Товар</SelectItem>
                          <SelectItem value="service">Услуга</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cashback_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тип кешбека</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lcard_cashback">Loyalty card</SelectItem>
                          <SelectItem value="none">Нет</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description_short"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Краткое описание</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Краткое описание товара" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description_long"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Длинное описание</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Подробное описание товара" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Код</FormLabel>
                      <FormControl>
                        <Input placeholder="Артикул" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Единица измерения</FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите единицу" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitOptions.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id.toString()}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CategorySelect form={form} />

              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Производитель</FormLabel>
                    <FormControl>
                      <Input placeholder="Производитель" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="seo_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Заголовок для поисковиков" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seo_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Краткое описание для поисковиков" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seo_keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Keywords</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ключевые слова через запятую"
                        value={field.value?.join(', ') || ''}
                        onChange={(e) =>
                          field.onChange(e.target.value.split(',').map((s) => s.trim()))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="fast" className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="global_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Глобальная категория</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите глобальную категорию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {globalCategoryOptions.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketplace_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена для маркетплейса</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chatting_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Комиссия маркета</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>4%</span>
                          <span>{field.value || 4}%</span>
                          <span>100%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Минимум 4%. Значение приводится к ближайшему кратному 4% (4–100)
                        </p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="text-sm text-muted-foreground border rounded p-2">
                QR-hash:{' '}
                <span className="font-mono">Автоматически генерируется при сохранении</span>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите адрес" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Широта</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="55.751244"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Долгота</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="37.618423"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Отмена
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Сохранение...' : 'Подтвердить'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
