## Takeaways

# Brownie contract vs interface
Is there a difference between casting to Interface and to a contract instance?
Yes!!
When working in a live environment or forked development network, you can create Contract objects to interact with already-deployed contracts.

Contract objects may be created from interfaces within the interfaces/ folder of your project, or by fetching information from a remote source such as a block explorer or ethPM registry.

The InterfaceContainer object (available as interface) provides access to the interfaces within your project’s interfaces/ folder.

For example, to create a Contract object from an interface named Dai:

```
interface.Dai("0x6B175474E89094C44Da98b954EedeAC495271d0F")
```

You can also use the Contract.from_abi classmethod to instatiate from an ABI as a dictionary:

```
Contract.from_abi("Token", "0x79447c97b6543F6eFBC91613C655977806CB18b0", abi)
```

https://eth-brownie.readthedocs.io/en/stable/core-contracts.html

https://stackoverflow.com/questions/71041850/is-there-a-difference-between-casting-to-interface-and-to-a-contract-instance
