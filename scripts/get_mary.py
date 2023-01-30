from scripts.helpful_scripts import get_account, get_contract
from brownie import config, network

def get_mary():
    account = get_account()
    mary_token = get_contract("mary_token")
    tx = mary_token.transfer(
        account, 30000, {"from": account}
    )
    tx.wait(1)