#!/bin/bash
forever stop $(cat ~/.forever/pids/contract_api.pid)
