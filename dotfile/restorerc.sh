#!/usr/bin/env bash

RC_DIR=$(dirname $0)

RC_FILES=(
  ".envrc"
  ".gitconfig"
  ".npmrc"
)

for rc in ${RC_FILES[*]}; do
  /usr/bin/cp -f $RC_DIR/$rc ~
  echo "restore $rc to ~/$rc"
done

if [[ $MSYSTEM ]]; then
  BASH_FILES=(
    ".bash_profile"
    ".bashrc"
  )

  for rc in ${BASH_FILES[*]}; do
    /usr/bin/cp -f $RC_DIR/$rc ~
    echo "restore $rc to ~/$rc"
  done
fi
