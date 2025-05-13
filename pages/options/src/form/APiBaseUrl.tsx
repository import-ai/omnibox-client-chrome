import { useRef } from 'react';
import { Input } from '@extension/ui';

interface IProps {
  value: string;
  onChange: (val: string) => void;
  onRealChange: () => void;
}

export default function ApiBaseUrl(props: IProps) {
  const { value, onChange, onRealChange } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timer = useRef<any>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length <= 0) {
      onChange('');
    } else {
      onChange(val);
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(onRealChange, 1000);
  };

  return <Input value={value} onChange={handleChange} />;
}
