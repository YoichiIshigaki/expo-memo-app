import { WebView } from 'react-native-webview';

type WebViewProps = { url: string };

export const WebViewComponent = ({ url }: WebViewProps) => (
  <WebView source={{ uri: url }} style={{ flex: 1 }} />
);
