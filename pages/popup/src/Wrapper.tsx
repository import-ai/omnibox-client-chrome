import { Toaster } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@extension/ui';

interface IProps {
  children: React.ReactNode;
}

export default function Wrapper(props: IProps) {
  const { children } = props;

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl">OmniBox Collector</CardTitle>
      </CardHeader>
      <CardContent>
        <Toaster />
        {children}
      </CardContent>
    </Card>
  );
}
