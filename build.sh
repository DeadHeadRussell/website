#!/bin/bash

rm Client/js/min.js
java -jar Tools/compiler.jar \
    --js Client/js/main.js \
    --js Client/js/pages.js \
    --js Client/js/widgets.js \
    --js Client/js/transitions.js \
    > Client/js/min.js

rm Client/css/min.css
cat Client/css/main.css Client/css/pages.css Client/css/widgets.css > Client/css/temp.css
java -jar Tools/yuicompressor-2.4.7.jar \
    Client/css/temp.css \
    > Client/css/min.css
rm Client/css/temp.css
