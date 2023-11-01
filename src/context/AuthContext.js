import React, { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import {
  OpenloginAdapter,
  OpenloginLoginParams,
} from "@web3auth/openlogin-adapter";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { WalletConnectModal } from "@walletconnect/modal";
import RPC from "../web3RPC";
export const AuthContext = React.createContext();
const AuthContextProvider = (props) => {
  const getInitialState = () => {
    const storedAuthState = localStorage.getItem("authState");
    return storedAuthState
      ? JSON.parse(storedAuthState)
      : { isLoggedIn: false, userData: null };
  };
  const [authState, setAuthState] = React.useState(getInitialState);
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const clientId =
    "BJORtAz5IYlRqOhixg8s27OaVWoBM_qxxTs1vbHempdKnK9qfmNJPFmBoJmv-zcT5rEuyjdS41j4CZohO4HfESk";
  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const login = (state) => {
    setAuthState({ ...authState, isLoggedIn: true, userData: state });
  };
  const syncState = async () => {
    try {
      if (web3auth.connected) {
        const state = await web3auth.getUserInfo();
        setAuthState({ ...authState, isLoggedIn: true, userData: state });
        console.log("loggedin with payload", authState?.userData);
      }
    } catch (error) {
      console.log("Error while login", error);
    }
  };
  const loginWithGoogle = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    console.log("google login payload returned ", web3authProvider);
    setProvider(web3authProvider);
    await syncState();
  };
  const loginWithGithub = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "github",
      }
    );
    setProvider(web3authProvider);
  };
  const loginWithEmail = async (email) => {
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "email_passwordless",
        extraLoginOptions: {
          login_hint: email,
        },
      }
    );
    setProvider(web3authProvider);
    await syncState();
  };
  const loginWCModal = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.WALLET_CONNECT_V2
    );
    setProvider(web3authProvider);
  };
  const logout = async () => {
    await web3auth.logout();
    setAuthState({ ...authState, isLoggedIn: false, userData: null });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: "https://rpc.ankr.com/eth",
          displayName: "Ethereum Mainnet",
          blockExplorer: "https://goerli.etherscan.io",
          ticker: "ETH",
          tickerName: "Ethereum",
        };
        const web3auth = new Web3AuthNoModal({
          clientId,
          chainConfig,
          web3AuthNetwork: "sapphire_devnet",
        });

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            whiteLabel: {
              appName: "W3A Heroes",
              appUrl: "https://web3auth.io",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
              mode: "auto", // whether to enable dark mode. defaultValue: false
              theme: {
                primary: "#768729",
              },
              useLogoLoader: true,
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
          loginSettings: {
            mfaLevel: "mandatory",
          },
          privateKeyProvider,
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        // adding wallet connect v2 adapter
        const defaultWcSettings = await getWalletConnectV2Settings(
          "eip155",
          [1],
          "9db50fcef8f52b719deb3165f6d7beec"
        );
        const walletConnectModal = new WalletConnectModal({
          projectId: "9db50fcef8f52b719deb3165f6d7beec",
        });
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: {
            qrcodeModal: walletConnectModal,
            ...defaultWcSettings.adapterSettings,
          },
          loginSettings: { ...defaultWcSettings.loginSettings },
        });

        web3auth.configureAdapter(walletConnectV2Adapter);

        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  console.log(web3auth);
  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        loginWithEmail,
        loginWithGithub,
        loginWithGoogle,
        loginWCModal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
