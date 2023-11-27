include .env
export

### Environment Setup

# This assumes that you created a full hardhat typescript project which install a lot of the other dependencies
.PHONY: install-deps
install-deps:
	yarn

.PHONY: run-local-network
run-local-network:
	yarn hardhat node

### Compile and deploy Commands

.PHONY: compile
compile:
	yarn hardhat compile

.PHONY: local-deploy
local-deploy:
	yarn hardhat deploy --network localhost

.PHONY: sepolia-deploy
sepolia-deploy:
	yarn hardhat deploy --network sepolia

### Tests

.PHONY: run-tests
run-tests:
	yarn hardhat test