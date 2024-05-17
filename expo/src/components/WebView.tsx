import { WebView } from 'react-native-webview';

type WebViewProps = { uri: string };

export const WebViewComponent: React.FC<WebViewProps> = ({ uri }) => (
  <WebView source={{ uri }} style={{ flex: 1 }} />
);
