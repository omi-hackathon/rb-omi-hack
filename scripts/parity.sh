#!/bin/bash
exec parity --chain=kovan --jsonrpc-apis web3,eth,pubsub,net,parity,parity_pubsub,traces,rpc,secretstore,personal --mode active --db-path /data/parity_bc --no-ui
