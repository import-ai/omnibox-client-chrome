import { useState, useEffect } from 'react';

export function useOption() {
  const [value, onData] = useState({
    apiKey: '',
    apiBaseUrl: '',
    namespaceId: '',
    spaceType: '',
  });
  const refetch = () => {
    chrome.storage.sync.get(['apiKey', 'apiBaseUrl', 'namespaceId', 'spaceType'], onData);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (val: any, key?: string) => {
    const newVal = key ? { [key]: val } : val;
    return chrome.storage.sync.set(newVal).then(() => {
      onData(prev => ({ ...prev, ...newVal }));
    });
  };

  useEffect(refetch, []);

  return { value, refetch, onChange };
}
