
import { Token } from "../Main";
import { useEthers, useTokenBalance, useEtherBalance } from "@usedapp/core";
import { useBalance, useAccount } from 'wagmi';
import { formatUnits } from "@ethersproject/units";

export interface WalletBalanceProps {
    token: Token   
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {

    const { image, address, name } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(address, account); // in wei
    const etherBalance = useEtherBalance(account);
    const [{ data, error, loading }, getBalance] = useBalance({
        addressOrName: '0x63Ed5a2f1f7dfbe87449379e520A88585C1e233a',
      })
    

    console.log(data);
    console.log(useTokenBalance(account, address));
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0;
    if (loading) return <div>Fetching balance…</div>
    if (error) return <div>Error fetching balance</div>
    return (<div>
        <p>{account}</p>
        <p>{address} {formattedTokenBalance}</p>
    </div>);
}