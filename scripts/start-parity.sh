#!/bin/bash
WRKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
forever start --pidFile ~/.forever/pids/parity.pid -c /bin/bash $WRKDIR/scripts/parity.sh