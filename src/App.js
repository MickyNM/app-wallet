import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CryptoTracker from "./CryptoTracker";
import './App.css';
import './index.css';
import MyImageComponent from './MyImageComponent.js';
import ChartData from './ChartData.js';
import ArrowComponent from './ArrowComponent.js';

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <CryptoTracker cryptoName="bitcoin" />
    <ChartData cryptoName="bitcoin" />
    <ReactQueryDevtools />
    <MyImageComponent />
    <ArrowComponent />
  </QueryClientProvider >
);
export default App;
