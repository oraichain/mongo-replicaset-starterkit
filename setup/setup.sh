#!/bin/bash

echo ******************************************************
echo Starting the replica set
echo ******************************************************

sleep 20 | echo Sleeping

# use password here
mongo mongodb://mongodb:27017 replicaSet.js
