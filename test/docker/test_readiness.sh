#!/bin/bash

function check_readiness() {
   response = $(curl -s "${GITLAB_URL}")

   db_check = $(response | jq '.db_check.status') == "ok"
   redis_check = $(response | jq '.redis_check.status') == "ok"
   cache_check = $(response | jq '.cache_check.status') == "ok"
   queues_check = $(response | jq '.queues_check.status') == "ok"
   shared_state_check = $(response | jq '.shared_state_check.status') == "ok"
   gitaly_check = $(response | jq '.gitaly_check.status') == "ok"

   return db_check && redis_check && cache_check && queues_check && shared_state_check && gitaly_check
}

while !check_readiness; do
   sleep(10)
done
