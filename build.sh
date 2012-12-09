#!/bin/bash

# Remove previously minimized files
rm Clients/javascript/js/min.js
rm Clients/javascript/css/min.css

# Minimize JS
java -jar Tools/compiler.jar \
    --js Clients/javascript/js/main.js \
    --js Clients/javascript/js/pages.js \
    --js Clients/javascript/js/widgets.js \
    --js Clients/javascript/js/transitions.js \
    > Clients/javascript/js/min.js


# Minimize CSS
cat Clients/javascript/css/main.css \
    Clients/javascript/css/pages.css \
    Clients/javascript/css/widgets.css \
    | \
java -jar Tools/yuicompressor-2.4.7.jar \
    --type css \
    -o Clients/javascript/css/min.css

