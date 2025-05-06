import { toast } from 'sonner';
import Wrapper from '@src/Wrapper';
import { Button } from '@extension/ui';
import { useOption } from '@extension/shared';

export default function Page() {
  const { value } = useOption();
  const handleOption = () => {
    chrome.runtime.openOptionsPage();
  };
  const handleCollect = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'save', option: value }, response => {
          if (response && response.error) {
            toast(response.error, { position: 'top-center' });
          } else {
            toast('保存成功', { position: 'top-center' });
          }
        });
      }
    });
  };

  if (!value.apiBaseUrl) {
    return (
      <Wrapper>
        <Button onClick={handleOption}>Please configure first</Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Button onClick={handleCollect}>Collect</Button>
    </Wrapper>
  );
}
