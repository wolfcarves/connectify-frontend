import {
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/components/ui/form';

interface InputProps {
  name: string;
}

const Input = ({ name }: InputProps) => {
  return (
    <FormField
      name={name}
      control={undefined}
      render={() => (
        <FormItem>
          <FormLabel />
          <FormControl>{/* Your form field */}</FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Input;
