REM compile les fichiers coffee

coffee -o js/ -cw coffee/  
coffee --output js/server/client/ --join jeux.js -w coffee/server/client/