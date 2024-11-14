#!/usr/bin/env bash

RC_FILES=(
  ".envrc"
  ".gitconfig"
  ".npmrc"
)

RC_DIR=$(dirname $0)

for rc in ${RC_FILES[*]}; do
  /usr/bin/cp -f $RC_DIR/$rc ~
  echo "restore $rc to ~/$rc"
done
