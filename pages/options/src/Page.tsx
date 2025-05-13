import * as z from 'zod';
import { useEffect } from 'react';
import ApiKey from './form/ApiKey';
import { t } from '@extension/i18n';
import { Toaster, toast } from 'sonner';
import Namespace from './form/Namespace';
import SpaceType from './form/SpaceType';
import ApiBaseUrl from './form/APiBaseUrl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  Form,
  Button,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from '@extension/ui';

const formSchema = z.object({
  apiKey: z.string().min(2),
  apiBaseUrl: z.string().url(),
  namespaceId: z.string().min(2),
  spaceType: z.string().min(2),
});

type TForm = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<TForm>({
    defaultValues: {
      apiKey: '',
      apiBaseUrl: '',
      namespaceId: '',
      spaceType: '',
    },
    resolver: zodResolver(formSchema),
  });
  const watchApiKey = form.watch('apiKey');
  const watchApiBaseUrl = form.watch('apiBaseUrl');
  const handleBaseUrlChange = () => {
    chrome.storage.sync.remove('apiKey').then(() => {
      form.resetField('apiKey');
      form.resetField('namespaceId');
      form.resetField('spaceType');
    });
  };
  const handleSubmit = (data: TForm) => {
    return chrome.storage.sync.set(data).then(() => {
      toast(t('setting_success'), { position: 'top-center' });
    });
  };

  useEffect(() => {
    chrome.storage.sync.get(['apiKey', 'apiBaseUrl', 'namespaceId', 'spaceType']).then(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(data).forEach((key: any) => {
        if (data[key]) {
          form.setValue(key, data[key]);
        }
      });
    });
    const focusFN = () => {
      chrome.storage.sync.get('apiKey', data => {
        if (data) {
          form.setValue('apiKey', data.apiKey);
          form.trigger(['apiKey']);
        }
      });
    };
    window.addEventListener('focus', focusFN);
    return () => {
      window.removeEventListener('focus', focusFN);
    };
  }, [form]);

  return (
    <Card className="w-[460px]">
      <CardHeader>
        <CardTitle className="text-2xl">{t('setting_title')}</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiBaseUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Base URL</FormLabel>
                  <FormControl>
                    <ApiBaseUrl {...field} onRealChange={handleBaseUrlChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <ApiKey {...field} baseUrl={watchApiBaseUrl} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="namespaceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Namespace ID</FormLabel>
                  <FormControl>
                    <Namespace {...field} baseUrl={watchApiBaseUrl} apiKey={watchApiKey} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="spaceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space Type</FormLabel>
                  <FormControl>
                    <SpaceType {...field} apiKey={watchApiKey} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t('setting_submit')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
