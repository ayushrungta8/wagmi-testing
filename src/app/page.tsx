"use client";

import { Account, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSignTypedData,
} from "wagmi";

// The named list of all type definitions
const types = {
  Person: [
    { name: "name", type: "string" },
    { name: "wallet", type: "address" },
  ],
  Mail: [
    { name: "from", type: "Person" },
    { name: "to", type: "Person" },
    { name: "contents", type: "string" },
  ],
};

const value = {
  from: {
    name: "Cow",
    wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
  },
  to: {
    name: "Bob",
    wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
  },
  contents: "Hello, Bob!",
};
const privateKey =
  "0x44b7601574b3e2f53f589ae529e22ef47868d88edaf1eb34c13c6757f2c9239a";
export const mockAccount = privateKeyToAccount(privateKey);
function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const {
    data: txHash,
    isSuccess,
    isError,
    error: txError,
    sendTransaction,
  } = useSendTransaction({});
  const { data: balance } = useBalance({ address: account.address });
  console.log(balance);
  // const {
  //   data: txHash,
  //   isError,
  //   error: txError,
  //   isSuccess,
  //   signTypedData,
  // } = useSignTypedData();
  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        <div>Bal:{String(balance?.value)}</div>
        <button
          onClick={() => {
            sendTransaction({
              to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              value: parseEther("0.001"),
              // chainId: goerli.id,
              // account: mockAccount,
              // gas: parseEther("0.001"),
            });
            // signTypedData({ types, primaryType: "Mail", message: value });
          }}
        >
          Send
        </button>
        {isSuccess && <div>Signature: {txHash}</div>}
        {isError && <div>{txError?.message}</div>}
      </div>
    </>
  );
}

export default App;
