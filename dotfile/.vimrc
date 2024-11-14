" Save as ~/.vimrc
"
" curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
" https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

set nocompatible
set encoding=utf-8
set number

syntax on
filetype plugin indent on

set autoindent
set tabstop=2
set shiftwidth=2
set expandtab
set softtabstop=2
" =========================================================

call plug#begin('~/.vim/pluged')
  Plug 'editorconfig/editorconfig-vim'
  Plug 'vim-airline/vim-airline'
  Plug 'vim-airline/vim-airline-themes'
  Plug 'preservim/nerdtree'
  Plug 'preservim/nerdcommenter'
  Plug 'Xuyuanp/nerdtree-git-plugin'
call plug#end()

" keybindings
" =========================================================
nnoremap <C-t> :NERDTreeMirror<CR>:NERDTreeFocus<CR>
nnoremap <C-b> :NERDTreeToggle<CR>

" configs
" =========================================================

" close vim if the only window left open is a NERDTree
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
