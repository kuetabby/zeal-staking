"use client";
import { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useTokenBalance,
  useTokenDecimals,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import dayjs from "dayjs";

import { useIsMounted } from "@/hooks/useIsMounted";

import "./style.css";

const stakingContractAddress = "";

interface Props {}

const Stake: React.FC<Props> = () => {
  const [amountToStake, setAmountToStake] = useState("");

  const address = useAddress();
  const isMounted = useIsMounted();
  const toast = useToast();

  const { contract: staking, isLoading: isStakingLoading } = useContract(
    stakingContractAddress,
    "custom"
  );

  const { mutateAsync: requestStake } = useContractWrite(staking, "stake");
  const { mutateAsync: requestWithdraw } = useContractWrite(
    staking,
    "withdraw"
  );
  const { mutateAsync: requestClaim } = useContractWrite(
    staking,
    "claimRewards"
  );

  const { mutateAsync: requestDeposit } = useContractWrite(
    staking,
    "depositRewardTokens"
  );

  const { data: rewardRatio } = useContractRead(staking, "getRewardRatio");
  const { data: rewardUnlockTime, refetch: refetchRewardUnlockTime } =
    useContractRead(staking, "getRewardUnlockTime", [address]);
  const { data: isAbleToClaimNormal, isLoading: isLoadingAbleToClaimNormal } =
    useContractRead(staking, "isAbleToClaimNormal", [address]);

  const { data: stakingTokenAddress } = useContractRead(
    staking,
    "stakingToken"
  );

  // Initialize token contracts
  const { contract: stakingToken, isLoading: isStakingTokenLoading } =
    useContract(stakingTokenAddress, "token");
  const { data: stakingTokenDecimal } = useTokenDecimals(stakingToken);

  // Token balances
  const {
    data: stakingTokenBalance,
    isLoading: isLoadingStakingTokenBalance,
    refetch: refetchStakingTokenBalance,
  } = useTokenBalance(stakingToken, address);

  // Get staking data
  const { data: stakeInfo, refetch: refetchStakingInfo } = useContractRead(
    staking,
    "getStakeInfo",
    [address || "0"]
  );

  useEffect(() => {
    setInterval(() => {
      refetchData();
    }, 10000);
  }, []);

  const displayTotalBalance = useMemo(() => {
    if (stakingTokenBalance) {
      const total = Number(stakingTokenBalance?.displayValue).toFixed(2);
      const formattedTotal = Number(total).toLocaleString("en-US");
      return `${formattedTotal}`;
    }

    return "--";
  }, [stakingTokenBalance]);

  const displayTotalStaked = useMemo(() => {
    if (stakeInfo && stakingTokenDecimal) {
      // const total = Number(
      //   ethers.utils.formatEther(stakeInfo[0].toString())
      // ).toFixed(2);
      const total = stakeInfo[0].toNumber() / 10 ** stakingTokenDecimal;
      const formattedTotal = Number(total).toLocaleString("en-US");
      return `${formattedTotal}`;
    }

    return "--";
  }, [stakeInfo, stakingTokenDecimal]);

  const displayTotalRewards = useMemo(() => {
    if (stakingTokenBalance && stakingTokenDecimal) {
      // console.log(stakeInfo[1].toNumber() / 10 ** 9);
      const total = stakeInfo[1].toNumber() / 10 ** stakingTokenDecimal;
      // const total = Number(
      //   ethers.utils.parseUnits(stakeInfo[1].toString(), 9)
      // ).toFixed(2);
      const formattedTotal = Number(total).toLocaleString("en-US");
      return `${formattedTotal}`;
    }

    return "--";
  }, [stakingTokenBalance, stakingTokenDecimal]);

  const displayUnlockDate = useMemo(() => {
    if (rewardUnlockTime) {
      const compareTime =
        new Date().getTime() >
        new Date(rewardUnlockTime?.toString() * 1000).getTime();

      if (compareTime) {
        return "Unlocked";
      }

      const remain = dayjs(rewardUnlockTime?.toString() * 1000).format(
        "DD/MM/YYYY hh:mm:ss A"
      );

      return remain;
    }

    return "--";
  }, [rewardUnlockTime]);

  const displayRewardRatio = useMemo(() => {
    if (rewardRatio) {
      const numerator = BigNumber.from(rewardRatio["_numerator"]).toNumber();
      const denominator = BigNumber.from(
        rewardRatio["_denominator"]
      ).toNumber();
      return (numerator / denominator) * 100 * 52 + " %";
    }

    return "--";
  }, [stakingTokenBalance]);

  const onChangeAmountToStake = (values: NumberFormatValues) => {
    setAmountToStake(values.value);
  };

  const onStake = async () => {
    if (!amountToStake || !stakingTokenDecimal) return;

    try {
      await stakingToken?.setAllowance(stakingContractAddress, amountToStake);

      await requestStake({
        args: [
          ethers.utils.parseUnits(
            amountToStake.toString(),
            stakingTokenDecimal
          ),
        ],
      });

      toast({
        title: `Tokens staked successfully`,
        status: "success",
      });

      refetchData();
      setAmountToStake("");
      return "SUCCESS";
    } catch (error: any) {
      toast({
        title: error?.reason ?? `Failed to Stake`,
        status: "error",
      });
      return "ERROR";
    }
  };

  const onWithdraw = async () => {
    if (!amountToStake || !stakingTokenDecimal) return;

    try {
      await requestWithdraw({
        args: [
          ethers.utils.parseUnits(
            amountToStake.toString(),
            stakingTokenDecimal
          ),
        ],
      });

      toast({
        title: `Tokens unstaked successfully`,
        status: "success",
      });

      refetchData();
      setAmountToStake("");
      return "SUCCESS";
    } catch (error: any) {
      toast({
        title: error?.reason ?? `Failed to Withdraw`,
        status: "error",
      });
      return "ERROR";
    }
  };

  const onClaimRewards = async () => {
    if (isLoadingAbleToClaimNormal || !address) return;

    try {
      await requestClaim({
        args: [isAbleToClaimNormal ? 0 : 1],
      });

      toast({
        title: `Rewards claimed successfully`,
        status: "success",
      });

      refetchData();
      return "SUCCESS";
    } catch (error: any) {
      toast({
        title: error?.reason ?? `Failed to Claim Rewards`,
        status: "error",
      });
      return "ERROR";
    }
  };

  const onDeposit = async () => {
    if (!amountToStake || !stakingTokenDecimal) return;

    try {
      await stakingToken?.setAllowance(stakingContractAddress, amountToStake);

      await requestDeposit({
        args: [
          ethers.utils.parseUnits(
            amountToStake.toString(),
            stakingTokenDecimal
          ),
        ],
      });

      toast({
        title: `Tokens staked successfully`,
        status: "success",
      });

      refetchData();
      setAmountToStake("");
      return "SUCCESS";
    } catch (error: any) {
      toast({
        title: error?.reason ?? `Failed to Stake`,
        status: "error",
      });
      return "ERROR";
    }
  };

  const refetchData = () => {
    refetchStakingTokenBalance();
    refetchStakingInfo();
    refetchRewardUnlockTime();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="stakepage-container">
      <div className="h-10 lg:h-20" />
      <div className="w-full md:w-11/12 lg:w-4/5 h-full flex flex-wrap justify-between mx-auto relative">
        <Card className="w-full md:w-3/5 bg-dark-secondary border-2 border-yellow-600 text-white rounded-2xl">
          <CardHeader className="text-xl sm:text-3xl !font-extrabold pb-4 text-white">
            <span className="stake-title">Ace</span> Staking
          </CardHeader>
          <CardBody className="w-full text-lg pt-4 pb-0 font-semibold">
            <div className="w-full flex justify-between text-xl sm:text-2xl mb-4">
              <div>Balance: </div>
              <div>{displayTotalBalance}</div>
            </div>
            <div className="w-full flex justify-between border-yellow-600">
              <div>Lock Period:</div>
              <div>14 days</div>
            </div>
            <div className="w-full flex justify-between border-yellow-600 mb-4">
              <div>APY Rewards:</div>
              <div>{displayRewardRatio}</div>
            </div>
            <div className="w-full flex flex-wrap items-center justify-between mx-auto mt-4 mb-2">
              <NumericFormat
                id="stakeAmount"
                value={amountToStake}
                onValueChange={onChangeAmountToStake}
                decimalScale={6}
                thousandSeparator=","
                maxLength={18}
                allowNegative={false}
                className="w-full sm:w-[65%] my-2 rounded-lg py-1 focus:!border-yellow-600 !shadow-none !outline-none"
                placeholder="Amount to Stake / Withdraw"
                customInput={Input}
                isDisabled={isLoadingStakingTokenBalance}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  if (floatValue) {
                    const balance = Number(stakingTokenBalance?.displayValue);
                    return floatValue <= balance;
                  }
                  return true;
                }}
                // isInvalid={!amountToStake}
              />
              <Web3Button
                className="btn-stake"
                contractAddress={stakingContractAddress}
                isDisabled={!amountToStake || isStakingLoading}
                action={onStake}
              >
                Stake!
              </Web3Button>
            </div>
            {address && (
              <div className="w-full flex flex-wrap justify-between mt-1 sm:mt-4">
                <Web3Button
                  className={"btn-unstake"}
                  contractAddress={stakingContractAddress}
                  isDisabled={!amountToStake || isStakingLoading}
                  action={onWithdraw}
                >
                  Withdraw!
                </Web3Button>

                <Web3Button
                  className={"btn-claim"}
                  contractAddress={stakingContractAddress}
                  isDisabled={
                    isStakingLoading ||
                    !Number(stakingTokenBalance?.displayValue)
                  }
                  action={onClaimRewards}
                >
                  {isAbleToClaimNormal
                    ? "Claim rewards!"
                    : "Claim Penalty rewards!"}
                </Web3Button>
              </div>
            )}

            {/* <Web3Button
              className="btn-stake"
              contractAddress={stakingContractAddress}
              // isDisabled={!amountToStake || isStakingLoading}
              action={onDeposit}
            >
              Deposit
            </Web3Button> */}
          </CardBody>
          <CardFooter className="text-sm font-bold">*APY is dynamic</CardFooter>
        </Card>
        <div className="w-full md:w-[35%] mt-6 md:mt-0">
          <Card className="bg-dark-secondary border-2 border-yellow-600 text-white font-semibold rounded-2xl">
            <CardHeader className="pb-0 border-yellow-600">
              Total Staked
            </CardHeader>
            <CardBody>{displayTotalStaked}</CardBody>
          </Card>
          <Card className="bg-dark-secondary border-2 border-yellow-600 my-6 text-white font-semibold rounded-2xl">
            <CardHeader className="pb-0 border-yellow-600">
              Total Rewards
            </CardHeader>
            <CardBody>{displayTotalRewards}</CardBody>
          </Card>
          <Card className="bg-dark-secondary border-2 border-yellow-600 text-white font-semibold rounded-2xl">
            <CardHeader className="pb-0 border-yellow-600">
              Unlock Date
            </CardHeader>
            <CardBody>{displayUnlockDate}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stake;
