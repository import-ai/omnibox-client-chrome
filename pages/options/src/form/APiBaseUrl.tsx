import { Input } from '@extension/ui';

interface IProps {
  value: string;
  onChange: (val: string) => void;
}

export default function ApiBaseUrl(props: IProps) {
  const { value, onChange } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length <= 0) {
      onChange('');
      return;
    }
    if (val.endsWith('/')) {
      onChange(val.slice(0, -1));
      return;
    }
    onChange(val);
  };

  return <Input value={value} onChange={handleChange} />;
}
