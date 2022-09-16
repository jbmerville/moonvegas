/// <reference types="react-scripts" />
import { MetaMaskInpageProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
