#!/bin/bash

if [ $# = 0 ]
    then
    echo "You need to provide an environment: --dev|prod"
    exit
elif [ $1 = '--dev' ]
    then
    export NODE_ENV=development
elif [ $1 = '--prod' ]
    then
    export NODE_ENV=production
else
    echo "You need to provide an environment: --dev|prod"
    exit
fi

WRKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
forever start --pidFile ~/.forever/pids/contract_api.pid $WRKDIR/server/index.js
