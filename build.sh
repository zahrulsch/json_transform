DIST_DIR=`pwd`/dist
ENABLE_COMPRESS=$1

tsc

if test "$ENABLE_COMPRESS" = "-c"; then
    find $DIST_DIR -type f -name *.js -print -exec pnpm terser {} -c -m --toplevel -o {} \;
fi
