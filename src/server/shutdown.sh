#!/usr/bin/env bash

if [[ -n "$1" ]]; then
    process=$(lsof -t -i:$1)
    if [[ -n "$process" ]]; then
        kill $process
        echo "Server running on port $1 has been killed"
    else
        echo "Nothing to kill on port $1"
    fi
else
    echo "No port passed"
fi
