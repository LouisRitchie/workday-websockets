#Audio Visualization with WebSockets
#Server: Server: https://github.com/LouisRitchie/workday-websockets-server
##By Workday

Ok, so here's the deal. Workday made this nodejs app that runs in the browser and does audio visualization. 
It's just a toy example, there's no actual music playing.
The way it was set up in the workshop was that they had a private client that controlled the server, and then the client
that each student worked on was built up just to receive and render the audio data.
Anyways, the point is that this didn't work without their private client. So I'm trying to get this to a point where students can
download both repositories (server and client) and run both with `npm start` in two terminal windows.

##How to run this thing

1. Download both repos with `git clone`. 
2. Then you need to `git clone https://github.com/arirusso/d3-audio-spectrum` as well.
3. Open `workday-websockets/index.html` in your web browser.
4. Run `workday-websockets-server/index.js` with `node index.js` or `nodejs index.js`.
5. You shoud see stuff in the browser` try clicking the play button then the circle button.
6. You can now edit the client by modifying `FINAL.script.js` and the stylesheets.

Have fun.
