#!/bin/bash

WRKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ $# = 0 ]; then
  echo "Usage: start.sh [--dev|--prod]"
elif [ "$1" = "--dev" ]; then
  forever start --pidFile ~/.forever/pids/frontend.pid $WRKDIR/server/index.js --dev
elif [ "$1" = "--prod" ]; then
  forever start --pidFile ~/.forever/pids/frontend.pid $WRKDIR/server/index.js --prod
else
  echo "Usage: start.sh [--dev|--prod]"
fi
