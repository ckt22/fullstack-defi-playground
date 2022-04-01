import Box from '@mui/material/Box';
import React, { useState, useEffect } from "react"
import { useEthers, useTokenBalance, useNotifications } from '@usedapp/core';
import { Token } from "../Main";
import { formatUnits } from "@ethersproject/units";
import Alert from "@mui/lab/Alert"
import { Button, Input, CircularProgress, Snackbar } from "@mui/material";
import { useStakeTokens } from "../../hooks";
import { utils } from "ethers";

import { SliderInput } from "../../components";

interface StakeFormProps {
    token: Token
}

export const StakeForm = ({token}: StakeFormProps) => {

    const { address: tokenAddress, name } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(tokenAddress, account);
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0;
    const { notifications } = useNotifications();

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    const { send: stakeTokensSend, state: stakeTokensState} = useStakeTokens(tokenAddress);
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString());
        return stakeTokensSend(amountAsWei.toString());
    }

    // token states
    const hasZeroBalance = formattedTokenBalance === 0;
    const hasZeroAmountSelected = parseFloat(amount.toString()) === 0;

    // pending approve
    const isMining = stakeTokensState.status === "Mining";
    // alerts
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false);
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false);
    const [showStakeTokensSuccess, setShowStakeTokensSuccess] = useState(false);

    const handleCloseSnack = () => {
        showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
        showStakeTokensSuccess && setShowStakeTokensSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Approve ERC20 transfer").length > 0) {
            setShowErc20ApprovalSuccess(true)
            setShowStakeTokenSuccess(false)
        }
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Stake Tokens"
        ).length > 0) {
            setShowErc20ApprovalSuccess(false)
            setShowStakeTokenSuccess(true)
        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess])

    return (
        <>
            <div>
                <SliderInput
                    label={`Stake ${name}`}
                    maxValue={formattedTokenBalance}
                    id={`slider-input-${name}`}
                    value={amount}
                    onChange={setAmount}
                    disabled={isMining || hasZeroBalance}
                />
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={handleStakeSubmit}
                    disabled={isMining || hasZeroAmountSelected}
                >
                {isMining ? <CircularProgress size={26} /> : "Stake"}
                </Button>
            </div>
            <Snackbar
                open={showErc20ApprovalSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                ERC-20 token transfer approved successfully! Now approve the 2nd tx to
                initiate the staking transfer.
                </Alert>
            </Snackbar>
            <Snackbar
                open={showStakeTokensSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                Tokens staked successfully!
                </Alert>
            </Snackbar>
        </>
    );

}