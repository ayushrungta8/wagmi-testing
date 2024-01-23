// import { showSuccessToast } from "../components/SuccessToast";
import { Networks, OpusPool } from "@chorus-one/opus-pool";
import { useMutation } from "@tanstack/react-query";
import { Hex } from "viem";
import { useWalletClient } from "wagmi";
import toast from "react-hot-toast";

export const useStakeMutation = ({
  setTxHash,
}: {
  setTxHash: (txHash: Hex) => void;
}) => {
  return useMutation({
    mutationKey: ["stake"],
    mutationFn: ({
      userAddress,
      network,
      vault,
      amount,
      walletClient,
    }: {
      userAddress: Hex;
      network: Networks;
      vault: Hex;
      amount: bigint;
      walletClient: ReturnType<typeof useWalletClient>["data"];
    }) => stake({ userAddress, network, vault, amount, walletClient }),
    onSuccess: (hash) => {
      toast.success("Staked successfully");
      setTxHash(hash);
    },
    onError: (error: unknown) => {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "Something went wrong";
      }
      toast.error(errorMessage);
    },
  });
};

const stake = async ({
  userAddress,
  walletClient,
  network,
  vault,
  amount,
}: {
  userAddress: Hex;
  walletClient: ReturnType<typeof useWalletClient>["data"];
  network: Networks;
  vault: Hex;
  amount: bigint;
}): Promise<Hex> => {
  console.log(network);
  const pool = new OpusPool({ network, address: userAddress });
  const stakingReq = {
    vault,
    amount,
  };
  const stakeRes = await pool.buildStakeTransaction(stakingReq);
  const { transaction, gasEstimation, maxFeePerGas } = stakeRes;
  if (!walletClient) throw new Error("Wallet client not found");
  console.log("wallet client found", walletClient);
  let hash;
  try {
    // @ts-ignore
    hash = await walletClient.sendTransaction({
      account: userAddress,
      to: vault,
      data: transaction,
      value: amount,
      type: "eip1559",
      gas: gasEstimation,
      maxFeePerGas,
    });
  } catch (e) {
    console.log(e);
  }
  console.log("hash", hash);
  const receipt = await pool.connector.eth.waitForTransactionReceipt({ hash });
  if (receipt.status === "reverted") {
    throw new Error("Transaction reverted");
  }
  return hash;
};
