import { ComponentProps } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Input as ShadInput, InputProps as ShadInputProps } from '../ui/input';

interface InputProps<T extends FieldValues> extends ShadInputProps {
  label?: string;
  name: Path<T>;
  control: Control<T>;
}

const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const { name, control, label, ...restProps } = props;

  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <>
          {/* remove padding (sapce-y-2) */}
          <FormItem className={!label ? 'space-y-0' : ''}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <ShadInput {...restProps} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
};

export default Input;
