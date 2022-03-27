from web3 import Web3
from scripts.helpful_scripts import get_account, get_contract
from brownie import config, network, TokenFarm

import yaml
import json
import shutil
import os

KEPT_BALANCE = Web3.toWei(100, "ether")

def deploy_token_farm(front_end_update=False):
    account = get_account()
    mary_token = get_contract("mary_token")
    token_farm = TokenFarm.deploy(
        mary_token.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()]["verify"],
    )
    tx = mary_token.transfer(
        token_farm.address, mary_token.totalSupply() - KEPT_BALANCE, {"from": account}
    )
    tx.wait(1)
    # dapp_token, weth_token, fau_token/dai
    weth_token = get_contract("weth_token")
    fau_token = get_contract("fau_token")
    dict_of_allowed_tokens = {
        mary_token: get_contract("dai_usd_price_feed"), # using existing price feed since token is not listed.
        fau_token: get_contract("dai_usd_price_feed"),
        weth_token: get_contract("eth_usd_price_feed"),
    }
    add_allowed_tokens(token_farm, dict_of_allowed_tokens, account)
    if front_end_update:
        update_front_end()
    return token_farm, mary_token

def add_allowed_tokens(token_farm, dict_of_allowed_tokens, account):
    for token in dict_of_allowed_tokens:
        add_tx = token_farm.addAllowedTokens(token.address, {"from": account})
        add_tx.wait(1)
        set_tx = token_farm.setPriceFeedContract(
            token.address, dict_of_allowed_tokens[token], {"from": account}
        )
        set_tx.wait(1)
    return token_farm

# write a json config on contract addresses to front end folder
def update_front_end():
    # Send the build folder
    copy_folders_to_front_end("./build", "./front_end_poc/src/chain-info")

    # Sending the front end our config in JSON format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front_end_poc/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")

def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)

def main():
    # Contract.from_abi(contract_type._name, contract_address, contract_type.abi)
    deploy_token_farm()