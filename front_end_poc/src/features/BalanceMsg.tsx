import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface BalanceMsgProps {
    label: string
    amount: number
    tokenImgSrc: string
}

export const BalanceMsg = ({ label, amount, tokenImgSrc }: BalanceMsgProps) => {

    const theme = useTheme();
    return (
        <Box sx={{
            display: "inline-grid",
            gridTemplateColumns: "auto auto auto",
            gap: theme.spacing(1),
            alignItems: "center"
        }}>
            <Box>
                {label}
            </Box>
            <Box sx={{ fontWeight: 700 }}>
                {amount}
            </Box>
            <Box sx={{ width: "32px" }}>
                <img style={{ width: "32px" }} src={tokenImgSrc} alt="token logo" />
            </Box>
        </Box>
    )
}