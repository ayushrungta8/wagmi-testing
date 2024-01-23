import React from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance, useWalletClient } from "wagmi";
import { useNetworkAndVaultContext } from "../context/networkAndVaultContext";
import { useStakeMutation } from "../hooks/useStake";
import { hardhat } from "viem/chains";
// import { useVaultData } from '@/common/hooks/useVaultDataQuery';
// import { getStakewiseNetwork } from '@/common/utils/getStakewiseNetwork';
// import { StakeWiseSDK } from '@stakewise/v3-sdk';
// import { getShortAddress } from '@/common/utils/getShortAddress';
// import { Spinner } from '@/common/components/Spinner';

const StakeForm = ({
  setStakeStatus,
  setTxHash,
  amount,
  setAmount,
}: {
  setStakeStatus: React.Dispatch<
    React.SetStateAction<"idle" | "success" | "error">
  >;
  setTxHash: React.Dispatch<React.SetStateAction<string | null>>;
  amount: bigint;
  setAmount: React.Dispatch<React.SetStateAction<bigint>>;
}) => {
  const { address } = useAccount();
  const { networkType, selectedVaultDetails } = useNetworkAndVaultContext();
  // const stakewiseNetwork = getStakewiseNetwork(networkType);
  //   const { data: vaultData } = useVaultData({
  //     network: networkType,
  //     userAddress: address,
  //     vaultAddress: selectedVaultDetails,
  //     stakeWiseSdk: new StakeWiseSDK({ network: hardhat }),
  //   });
  const { data: balance } = useBalance({
    address,
  });
  const calculateRewards = (amount: bigint, apr: number) => ({
    yearly: ((Number(formatEther(amount)) * apr) / 100).toFixed(4),
    monthly: ((Number(formatEther(amount)) * apr) / (100 * 12)).toFixed(4),
    daily: ((Number(formatEther(amount)) * apr) / (100 * 365)).toFixed(4),
  });

  //   const rewards = vaultData
  //     ? calculateRewards(amount, vaultData.apr)
  //     : { yearly: "0.0000", monthly: "0.0000", daily: "0.0000" };

  console.log("amount", amount, formatEther(amount));
  const { mutate: stake, isSuccess } = useStakeMutation({
    setTxHash,
  });

  const { data: walletClient } = useWalletClient();

  const handleStake = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log(address, selectedVaultDetails);
    if (!address || !selectedVaultDetails) return;
    console.log("stake", address, selectedVaultDetails, walletClient);
    stake({
      userAddress: address,
      network: networkType,
      vault: selectedVaultDetails,
      amount,
      walletClient,
    });
  };
  if (isSuccess) {
    setStakeStatus("success");
  }
  return (
    <div className="p-5 pb-12 gap-4 w-full max-w-md flex flex-col justify-center">
      <span className="text-center font-bold text-3xl mb-8">Pool Ethereum</span>

      <label htmlFor="pool_amount" className="text-base flex flex-col gap-1">
        Enter amount to pool
        <input
          type="text"
          id="pool_amount"
          className="border border-opus-lightGray rounded-lg p-4"
          placeholder="Enter amount to pool"
          onChange={(e) => setAmount(parseEther(e.target.value))}
        />
      </label>
      <div>
        Available balance:
        {balance && (
          <span className="font-bold ml-2">
            {Number(balance?.formatted).toFixed(4)} ETH
          </span>
        )}
      </div>
      <div
        className=" bg-opus-teal/10 px-8 py-3 border border-opus-teal rounded-2xl mb-4 flex gap-8"
        data-testid="stake-info-card"
      >
        <div className="flex flex-col">
          <span>Pool name:</span>
          <span>Pool address:</span>
          <span>TVL:</span>
          <span>APR:</span>
        </div>
        <div className="flex flex-col">
          {/* <span className="font-bold ml-2">{vaultData?.name}</span> */}
          {/* <span className="font-bold ml-2">
            {vaultData ? getShortAddress(vaultData?.address) : "-"}
          </span> */}
          <span className="font-bold ml-2">
            {/* {vaultData ? parseFloat(vaultData?.tvl).toFixed(2) : "-"} ETH */}
          </span>
          {/* <span className="font-bold ml-2">{vaultData?.apr.toFixed(2)} %</span> */}
        </div>
      </div>
      <div className="" data-testid="stakingRewards">
        <div className="flex flex-row items-center mb-3">
          <h2 className="mr-5 font-bold">Rewards</h2>
        </div>
        {/* <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h5 className="font-bold">Daily:</h5>
            <div>{rewards.daily} ETH</div>
            <div className="text-opus-lightGray">${rewards.daily}</div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-bold">Monthly:</h5>
            <div>{rewards.monthly} ETH</div>
            <div className="text-opus-lightGray">${rewards.monthly}</div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-bold">Yearly:</h5>
            <div>{rewards.yearly} ETH</div>
            <div className="text-opus-lightGray">${rewards.yearly}</div>
          </div>
        </div> */}
      </div>
      <button
        type="button"
        className="p-4 mt-8 border btn bg-black"
        onClick={handleStake}
        // disabled={!balance || !amount || !walletClient || !address}
      >
        "Confirm and pool"
      </button>
    </div>
  );
};

export default StakeForm;
