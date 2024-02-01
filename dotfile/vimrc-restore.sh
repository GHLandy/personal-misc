#!/usr/bin/env bash

# 30m-37m 黑, 红, 绿, 黄, 蓝, 紫, 青, 白
_UNSET="\[\e[0m\]"
_BLACK="\[\e[30m\]"
_RED="\[\e[31m\]"
_GREEN="\[\e[32m\]"
_YELLOW="\[\e[33m\]"
_BLUE="\[\e[34m\]"
_PURPLE="\[\e[35m\]"
_CYAN="\[\e[36m\]"
_WHITE="\[\e[37m\]"

# 检测某个程序 (比如 git) 是否存在
# 比如检测 git 则 examineExists git
function examineExists {
  which $1 &> /dev/null
  if [[ $? -ne 0 ]]; then
    echo -e "$_RED$1$_UNSET not installed yet\n"
    exit 0
  fi
}

# 将文件恢复到家目录
# 比如会 .vimrc 文件到家目录 restoreFileToHome .vimrc
function restoreFileToHome {
  echo -e "restore $_CYAN$HOME/$1$_UNSET"
  cat $1 > "$HOME/$2"
}

cwd=$(pwd)

examineExists git
examineExists vim

mkdir -p "$HOME/.vim"
cd "$HOME/.vim"

PATHOGEN="https://github.com/tpope/vim-pathogen.git"
if [[ ! -f "$HOME/.vim/autoload/pathogen.vim" ]]; then
  if [[ ! -f "$HOME/.vim/vim-pathogen/autoload/pathogen.vim" ]]; then
    git clone $PATHOGEN || exit $?
  fi

  cp -r vim-pathogen/autoload .
fi

BUNDLE_DIR="$HOME/.vim/bundle"
mkdir -p "$BUNDLE_DIR"
cd "$BUNDLE_DIR"
VIM_PLUGINS=(
  "https://github.com/editorconfig/editorconfig-vim.git"
  "https://github.com/pangloss/vim-javascript.git"
  "https://github.com/preservim/nerdcommenter.git"
  "https://github.com/preservim/nerdtree.git"
  "https://github.com/prettier/vim-prettier.git"
)

for plugin in ${VIM_PLUGINS[*]}; do
  repo_name=$(echo $plugin | awk -F / '{ print $5 }' | awk -F . '{ print $1 }')
  echo -e "plugin: $COLOR_CYAN$repo_name$COLOR_UNSET"

  if [[ -d $repo_name ]]; then
    cd $repo_name && git pull || exit $?
    cd ..
  else
    git clone "$plugin" || exit $?
  fi

  echo ""
done

cd "$cwd"
restoreFileToHome .vimrc
