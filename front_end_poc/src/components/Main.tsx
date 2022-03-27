/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json";
import brownieConfig from "../brownie-config.json";
import Typography from '@mui/material/Typography';
import { constants } from "ethers";
import dapp from "../dapp.png";
import eth from "../eth.png";
import dai from "../dai.png";
import Box from '@mui/material/Box';
import { YourWallet } from "./yourWallet/YourWallet";
import { useTheme } from '@mui/material/styles';

export type Token = {
    image: string,
    address: string,
    name: string
}

export const Main = () => {

    const { chainId } = useEthers();
    const networkName = chainId ? helperConfig[chainId] : "dev";
    const theme = useTheme();

    console.log(networkName);
    console.log(chainId);

    // token addresses
    const maryTokenAddress = (brownieConfig && chainId) ? brownieConfig["networks"][networkName]["mary_token"] : constants.AddressZero;
    const wethTokenAddress = (brownieConfig && chainId) ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero;
    const fauTokenAddress = (brownieConfig && chainId) ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero;

    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: maryTokenAddress,
            name: "MARY"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        }
    ]

    return (
    <>
        <Typography variant="h2" gutterBottom component="div">
            <Box sx={{ 
                color: theme.palette.common.black,
                textAlign: "center",
                padding: theme.spacing(2)}}
            >Dapp POC</Box>
        </Typography>
        <YourWallet supportedTokens={supportedTokens} />
    </>);

}