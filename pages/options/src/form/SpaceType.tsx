import { t } from '@extension/i18n';
import { FormControl, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@extension/ui';

interface IProps {
  apiKey: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SpaceType(props: IProps) {
  const { value, apiKey, onChange } = props;

  return (
    <Select disabled={!apiKey} value={value} onValueChange={onChange}>
      <FormControl>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {[
          {
            label: t('spacetype_private'),
            value: 'private',
          },
          {
            label: t('spacetype_teamspace'),
            value: 'teamspace',
          },
        ].map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
