del javascript\js\min.js
java -jar Tools\compiler.jar ^
    --js javascript\js\main.js ^
    --js javascript\js\pages.js ^
    --js javascript\js\widgets.js ^
    --js javascript\js\transitions.js ^
    > javascript\js\min.js

del javascript\css\min.css
copy /b javascript\css\main.css+javascript\css\pages.css+javascript\css\widgets.css javascript\css\temp.css
java -jar Tools\yuicompressor-2.4.7.jar ^
    javascript\css\temp.css ^
    > javascript\css\min.css
del javascript\css\temp.css
