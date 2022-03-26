
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MaryCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("Mary", "MARY") {
        _mint(msg.sender, initialSupply);
    }
}