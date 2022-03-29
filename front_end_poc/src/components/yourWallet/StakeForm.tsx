import Box from '@mui/material/Box';
import React, { useState, useEffect } from "react"
import { useEthers, useTokenBalance, useNotifications } from '@usedapp/core';
import { Token } from "../Main";
import { formatUnits } from "@ethersproject/units";
import { Button, Input, CircularProgress, Snackbar } from "@mui/material";
import { utils } from "ethers"

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

    return (
        <Box>
            <Button color="primary" size="large">Stake!!!</Button>
        </Box>
    );

}