import * as z from 'zod';
import { useEffect } from 'react';
import ApiKey from './form/ApiKey';
import { t } from '@extension/i18n';
import { Toaster, toast } from 'sonner';
import Namespace from './form/Namespace';
import SpaceType from './form/SpaceType';
import ApiBaseUrl from './form/APiBaseUrl';
import { useForm } from 'react-hook-form';
import { useOption } from '@extension/shared';
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
  const { value, onChange } = useOption();
  const form = useForm<TForm>({
    defaultValues: value,
    resolver: zodResolver(formSchema),
  });
  const watchApiKey = form.watch('apiKey');
  const watchApiBaseUrl = form.watch('apiBaseUrl');
  const handleSubmit = (data: TForm) => {
    onChange(data).then(() => {
      toast(t('setting_success'), { position: 'top-center' });
    });
  };

  useEffect(() => {
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

  useEffect(() => {
    if (!value || !value.apiKey) {
      return;
    }
    if (value.spaceType) {
      form.setValue('spaceType', value.spaceType);
    }
    if (value.apiKey) {
      form.setValue('apiKey', value.apiKey);
    }
    if (value.apiBaseUrl) {
      form.setValue('apiBaseUrl', value.apiBaseUrl);
    }
    if (value.namespaceId) {
      form.setValue('namespaceId', value.namespaceId);
    }
  }, [form, value]);

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
                    <ApiBaseUrl {...field} />
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
