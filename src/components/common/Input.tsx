import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Input;
