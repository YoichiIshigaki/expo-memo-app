import { WebView } from 'react-native-webview';

type WebViewProps = { url: string };

export const WebViewComponent: React.FC<WebViewProps> = ({ url }) => (
  <WebView source={{ uri: url }} style={{ flex: 1 }} />
);
