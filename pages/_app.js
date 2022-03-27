import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { TinderProvider } from "../context/TinderContext";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://wwiq2agtwten.usemoralis.com:2053/server"
      appId="b2kZ4rzfDlo38b2Zwxn1sEXdp2knOwzUqWczVFp7"
    >
      <TinderProvider>
        <Component {...pageProps} />
      </TinderProvider>
    </MoralisProvider>
  );
}

export default MyApp;
