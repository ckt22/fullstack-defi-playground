
import { useState } from "react";
import { Token } from "../Main";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { WalletBalance } from './WalletBalance';
import { StakeForm } from './StakeForm';
import { useTheme } from '@mui/material/styles';

interface YourWalletProps {
    supportedTokens: Array<Token>
}

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
    const theme = useTheme();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }
    return (
        <Box sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: theme.spacing(1)
        }}>
            <h1> Your Wallet! </h1>
            <Box>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="stake form tabs">
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div>
                                    <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                                    <StakeForm token={supportedTokens[selectedTokenIndex]} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
        </Box >
    )
}