import { forwardRef, LegacyRef } from 'react';
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

const input = cva('placeholder:font-medium placeholder:select-none', {
  variants: {
    variant: {
      default: 'bg-accent border-0',
      outline: '',
    },
    size: {
      sm: '',
      base: '',
      lg: 'h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
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

const Input = <T extends FieldValues>(
  {
    name,
    control,
    type,
    label,
    defaultValue,
    variant,
    size,
    className,
    ...restProps
  }: InputProps<T>,
  ref: LegacyRef<HTMLInputElement> | undefined,
) => {
  const def = defaultValue ? defaultValue : type === 'number' ? 0 : '';

  if (!name) {
    return (
      <ShadInput
        {...restProps}
        type={type}
        ref={ref}
        className={input({ variant, size, className })}
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
          <FormItem className={`${!label ? 'space-y-0' : ''} select-none`}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <ShadInput
                {...field}
                {...restProps}
                type={type}
                ref={ref}
                className={input({ variant, size, className })}
              />
            </FormControl>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        </>
      )}
    />
  );
};

export default forwardRef(Input);
