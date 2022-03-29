
import { Token } from "../Main";
import { useEthers, useTokenBalance, useEtherBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { BalanceMsg } from "../BalanceMsg";

export interface WalletBalanceProps {
    token: Token   
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {

    const { image, address, name } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(address, account); // in wei
    const etherBalance = useEtherBalance(account);
    // const [{ data, error, loading }, getBalance] = useBalance({
    //     addressOrName: '0x63Ed5a2f1f7dfbe87449379e520A88585C1e233a',
    //   })
    
    console.log(etherBalance);
    console.log(tokenBalance);
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0;
    // if (loading) return <div>Fetching balance…</div>
    // if (error) return <div>Error fetching balance</div>
    return (<BalanceMsg
        label={`Your un-staked ${name} balance`}
        tokenImgSrc={image}
        amount={formattedTokenBalance} />);
}