import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { Sparkles, Loader2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormValues } from '../../../schema/productSchema';
import { useAIGeneration } from '../../../hooks/useAIGeneration';
import { cn } from '../../../lib/utils';

interface AIAssistButtonProps {
  form: UseFormReturn<ProductFormValues>;
}

export function AIAssistButton({ form }: AIAssistButtonProps) {
  const { generateFromName, polishText, suggestCategory, isLoading } = useAIGeneration(form);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          className={cn(
            'border-primary/20 hover:bg-primary/5 transition-colors',
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
          )}
          AI Ассистент
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={generateFromName}
          className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Заполнить всё из названия
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => polishText('description_short')}
          className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          Причесать краткое описание
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => polishText('description_long')}
          className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          Причесать полное описание
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={suggestCategory}
          className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          Подобрать категорию
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => polishText('seo_description')}
          className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          Улучшить SEO описание
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
