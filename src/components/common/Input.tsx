import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Input as ShadInput, InputProps as ShadInputProps } from '../ui/input';

interface InputProps<T extends FieldValues> extends ShadInputProps {
  name: Path<T>;
  control: Control<T>;
  type?: 'text' | 'number' | 'password';
  label?: string;
  defaultValue?: PathValue<T, Path<T>>;
}

const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const { name, control, type, label, defaultValue, ...restProps } = props;
  const def = defaultValue ? defaultValue : type === 'number' ? 0 : '';

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={def as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => (
        <>
          {/* remove padding (sapce-y-2) */}
          <FormItem className={!label ? 'space-y-0' : ''}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <ShadInput {...restProps} {...field} />
            </FormControl>

            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        </>
      )}
    />
  );
};

export default Input;
