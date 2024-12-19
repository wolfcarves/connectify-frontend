import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Input as ShadInput, InputProps as ShadInputProps } from '../ui/input';
import { cva, VariantProps } from 'class-variance-authority';

const input = cva('border bg-card rounded-md focus:outline-none', {
  variants: {
    size: {
      sm: '',
      base: '',
      lg: 'h-12',
    },
  },
});

export interface InputProps<T extends FieldValues>
  extends Omit<ShadInputProps, 'size'>,
    VariantProps<typeof input> {
  name?: Path<T>;
  control?: Control<T>;
  type?: 'file' | 'text' | 'number' | 'password';
  label?: string;
  defaultValue?: PathValue<T, Path<T>>;
}

const Input = <T extends FieldValues>({
  name,
  control,
  type,
  label,
  defaultValue,
  size,
  className,
  ...restProps
}: InputProps<T>) => {
  const def = defaultValue ? defaultValue : type === 'number' ? 0 : '';

  if (!name) {
    return (
      <ShadInput
        type={type}
        {...restProps}
        className={input({ size, className })}
      />
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={def as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormItem className={!label ? 'space-y-0' : ''}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <ShadInput
                type={type}
                {...field}
                {...restProps}
                className={input({ size, className })}
              />
            </FormControl>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        </>
      )}
    />
  );
};

export default Input;
