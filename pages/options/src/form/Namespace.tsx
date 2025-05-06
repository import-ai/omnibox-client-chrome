import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import axios from '@extension/shared/lib/utils/axios';
import { isValidStrictHttpRootDomain } from '@src/utils';
import { FormControl, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@extension/ui';

interface IProps {
  apiKey: string;
  value: string;
  baseUrl: string;
  onChange: (value: string) => void;
}

export default function Namespace(props: IProps) {
  const { value, baseUrl, apiKey, onChange } = props;
  const [data, setData] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);

  useEffect(() => {
    if (!baseUrl || !apiKey || !isValidStrictHttpRootDomain(baseUrl)) {
      return;
    }
    axios(`${baseUrl}/api/v1/namespaces`, {
      apiKey,
    })
      .then(data => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(err => {
        toast(err && err.message ? err.message : err, { position: 'top-center' });
      });
  }, [baseUrl, apiKey]);

  return (
    <Select disabled={!baseUrl || !apiKey} value={value} onValueChange={onChange}>
      <FormControl>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {data.map(item => (
          <SelectItem key={item.id} value={item.id}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
