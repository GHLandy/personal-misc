#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return
# [[ -f /mingw64/share/git/completion/git-prompt.sh ]] && . /mingw64/share/git/completion/git-prompt.sh
[[ -f /usr/share/git/completion/git-prompt.sh ]] && . /usr/share/git/completion/git-prompt.sh
[[ -f ~/.aliasrc ]] && . ~/.aliasrc

eval "$(fnm env --use-on-cd)"

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

PS1='\[\033]0;\w\007\]'        # set window title
PS1="$PS1$_UNSET"'['           # [
PS1="$PS1$_BLUE"'\u'           # \u
PS1="$PS1$_UNSET"'@'           # @
PS1="$PS1$_PURPLE"'\h '        # \h<space>
PS1="$PS1$_YELLOW"'\W'         # current working directory
PS1="$PS1$_UNSET"']'           # ]
PS1="$PS1$_GREEN"'`__git_ps1`' # __git_ps1
PS1="$PS1$_CYAN"'\$ '          # \$
PS1="$PS1$_UNSET"              # change color

