import Wrapper from '@src/Wrapper';
import { t } from '@extension/i18n';
import { Button } from '@extension/ui';
import { useState, useEffect } from 'react';
import { useOption } from '@extension/shared';
import extPage from '@extension/shared/lib/utils/ext-page';

export default function Page() {
  const { value, refetch } = useOption();
  const [tabId, onTabId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [action, onAction] = useState(t('collect_submit'));
  const handleOption = () => {
    chrome.runtime.openOptionsPage();
  };
  const handleCollect = () => {
    if (tabId <= 0) {
      return;
    }
    setLoading(true);
    chrome.tabs.sendMessage(tabId, { action: 'save', option: value }, response => {
      setLoading(false);
      if (response && response.error) {
        onAction(response.error);
        refetch();
      } else {
        onAction(t('collect_done'));
      }
      onTabId(-1);
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (!tabs[0].id) {
        return;
      }
      if (extPage(tabs[0].url)) {
        onTabId(0);
        return;
      }
      onTabId(tabs[0].id);
    });
  }, []);

  if (!value.apiBaseUrl) {
    return (
      <Wrapper>
        <Button className="w-full" onClick={handleOption}>
          {t('config_first')}
        </Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {tabId === 0 ? (
        <Button variant="destructive" className="w-full" disabled>
          {t('alert_built')}
        </Button>
      ) : (
        <Button className="w-full" loading={loading} disabled={tabId < 0} onClick={handleCollect}>
          {action}
        </Button>
      )}
    </Wrapper>
  );
}
