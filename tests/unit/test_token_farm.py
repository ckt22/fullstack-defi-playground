import pytest
from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
    get_account,
    get_contract,
    INITIAL_PRICE_FEED_VALUE
)
from brownie import network, exceptions
from scripts.deploy import deploy_token_farm

def test_set_price_feed_contract():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()
    account = get_account()
    non_owner = get_account(index=1)
    token_farm, mary_token = deploy_token_farm()
    # Act
    price_feed_address = get_contract("eth_usd_price_feed")

    # We don't have to call setPriceFeedContract() again, because it's already called
    # for all tokens in dict_of_allowed_tokens when we call deploy_token_farm_and_dapp_token() 
    # 
    # token_farm.setPriceFeedContract(
    #     dapp_token.address, price_feed_address, {"from": account}
    # )

    # Assert
    assert token_farm.tokenPriceFeedMapping(mary_token.address) == price_feed_address
    with pytest.raises(exceptions.VirtualMachineError):
        token_farm.setPriceFeedContract(
            mary_token.address, price_feed_address, {"from": non_owner}
        )

def test_stake_tokens(amount_staked):
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()
    account = get_account()
    token_farm, mary_token = deploy_token_farm()
    # Act
    mary_token.approve(token_farm.address, amount_staked, {"from": account})
    token_farm.stakeTokens(amount_staked, mary_token.address, {"from": account})
    # Assert
    assert (
        token_farm.stakingBalance(mary_token.address, account.address) == amount_staked
    )
    assert token_farm.uniqueTokensStaked(account.address) == 1
    assert token_farm.stakers(0) == account.address
    return token_farm, mary_token

def test_issue_tokens(amount_staked):
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    token_farm, mary_token = test_stake_tokens(amount_staked)
    starting_balance = mary_token.balanceOf(account.address)
    print(f"Starting balance of MaryToken: {starting_balance}")
    # Act
    totalValue = token_farm.getUserTotalValueDebug(0)
    # ~2000 Ether
    print(f"Total User Value: {totalValue}")
    token_farm.issueTokens({"from": account})
    # Arrange
    # we are staking 1 mary_token == in price to 1 ETH
    # soo... we should get 2,000 dapp tokens in reward
    # since the price of eth is $2,000
    assert (
        mary_token.balanceOf(account.address)
        == starting_balance + INITIAL_PRICE_FEED_VALUE
    )

def test_get_user_total_value_with_different_tokens(amount_staked, random_erc20):
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    token_farm, dapp_token = test_stake_tokens(amount_staked)
    # Act
    token_farm.addAllowedTokens(random_erc20.address, {"from": account})
    token_farm.setPriceFeedContract(
        random_erc20.address, get_contract("eth_usd_price_feed"), {"from": account}
    )
    random_erc20_stake_amount = amount_staked * 2
    random_erc20.approve(
        token_farm.address, random_erc20_stake_amount, {"from": account}
    )
    token_farm.stakeTokens(
        random_erc20_stake_amount, random_erc20.address, {"from": account}
    )
    # Assert
    total_value = token_farm.getUserTotalValue(account.address)
    assert total_value == INITIAL_PRICE_FEED_VALUE * 3