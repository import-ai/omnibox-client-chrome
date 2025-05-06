import Page from '@src/Page';
import { withErrorBoundary, withSuspense } from '@extension/shared';

export default withErrorBoundary(withSuspense(Page, <div> Loading ... </div>), <div> Error Occur </div>);
