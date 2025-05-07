import { t } from '@extension/i18n';
import { Button } from '@extension/ui';
import { isValidStrictHttpRootDomain } from '@src/utils';

interface IProps {
  baseUrl: string;
  value: string;
}

export default function ApiKey(props: IProps) {
  const { value, baseUrl } = props;
  const handleClick = () => {
    chrome.tabs.create({
      url: `${baseUrl}/user/login?from=extension`,
    });
  };

  if (value) {
    return (
      <Button variant="outline" className="w-full" disabled>
        {t('apikey_done')}
      </Button>
    );
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleClick} disabled={!isValidStrictHttpRootDomain(baseUrl)}>
      {t('apikey_submit')}
    </Button>
  );
}
