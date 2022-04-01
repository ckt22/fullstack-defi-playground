import { useEthers } from "@usedapp/core";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export const Header = () => {

    const {
        account, activateBrowserWallet, deactivate
    } = useEthers();

    const theme = useTheme();

    return(
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: theme.spacing(4),
            gap: theme.spacing(1),
            }}
      >
        { account ? 
            (<Button color="primary" variant="contained" onClick={deactivate}>
                Disconnect
            </Button>) :
            (<Button color="primary" variant="contained" onClick={() => activateBrowserWallet()}>
                Connect
            </Button>)
        }
      </Box>
    )
}