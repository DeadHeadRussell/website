#!/bin/bash

# Remove previously minimized files
rm javascript/js/min.js
rm javascript/css/min.css

# Minimize JS
java -jar Tools/compiler.jar \
    --js javascript/js/main.js \
    --js javascript/js/pages.js \
    --js javascript/js/widgets.js \
    --js javascript/js/transitions.js \
    > javascript/js/min.js


# Minimize CSS
cat javascript/css/main.css \
    javascript/css/pages.css \
    javascript/css/widgets.css \
    | \
java -jar Tools/yuicompressor-2.4.7.jar \
    --type css \
    -o javascript/css/min.css

