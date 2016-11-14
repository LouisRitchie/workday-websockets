class Player {
  constructor(address, container) {
    this.address = address;

    // dom nodes
    this.nodes = {};
    for (let name of ['current', 'graph', 'next', 'playlist']) {
      this.nodes[name] = document.createElement(name == 'playlist' ? 'table' : 'div');
      this.nodes[name].className = name;
      container.appendChild(this.nodes[name]);
    }
  }

  connect() {
    /* WORKSHOP STEP 1a: Initialize socket connection */
    console.log(this.address);
    this.socket = io(this.address);
    console.log(this.socket)

    // The playlist is updated when someone votes on a song, when a
    // new song starts (to zero the votes) and when we first connect.
    this.socket.on('playlist-update', (songs) => {
      this.renderPlaylist(songs);
    });

    // When the socket server emits a 'audio-update' event,
    // that means there is new spectrum data to render.
    // This happens very often (once every 50ms plus latency)
    /* WORKSHOP STEP 2a: Attach renderAudioVisualizer method to "audio-update" event */

    this.socket.on('audio-update', (data) => {
      console.log('audio-update called');
      this.renderAudioVisualizer(data);
    });
    // A play-start event is emitted when a new song starts playing
    // and when we first connect. Update the 'current' song title.
    /* WORKSHOP STEP 4a: Attach renderNowPlaying method to "play-start" event */
    this.socket.on('play-start', (song) => {
      this.renderNowPlaying(song);
    });
  }

  renderAudioVisualizer(data) {
    // Render a bar for each data point
    let i, bar, barHeight, graph = this.nodes.graph;
    for (i = 0; i < data.length; i++) {
      if (graph.childNodes[i]) {
        bar = graph.childNodes[i];
      } else {
        bar = document.createElement('div');
        graph.appendChild(bar);
      }


      /* WORKSHOP STEP 2b: Calculate barHeight based on data[i] variable */
      barHeight = data[i]/400 * 100;
      bar.style.height = barHeight + '%';
      console.log(barHeight);
      /*
      for(let i=0; i<barHeight/3; i++) {
        block = document.createElement('span');
        bar.appendChild(block);
      */
      }
    }

    // Remove excess bars
    while (graph.childNodes.length > i) {
      graph.removeChild(graph.lastChild);
    }
  }

  renderPlaylist(songs){
    // Clear out existing songs
    this.nodes.playlist.innerHTML = '';

    // Render each song into playlist table
    let next = null;
    for (let song of songs) {
        let row = document.createElement('tr');
        for (let property of ['title', 'artist', 'votes']){
            var cell = document.createElement('td');
            cell.innerText = song[property];
            row.appendChild(cell);
        }

        // Add the vote button
        cell = row.querySelector('td:last-child');
        cell.className = 'votes';
        let voteButton = document.createElement('button');
        voteButton.innerHTML = '&#x2b06;'; // Unicode "Upwards Black Arrow" character

        // Add the vote event to the button
        voteButton.addEventListener('click', () => {
          this.socket.emit('vote-cast', song);
        });

        cell.appendChild(voteButton);
        this.nodes.playlist.appendChild(row);

        // Next up is the song with the most votes
        if (!next || song.votes > next.votes) {
          next = song;
        }
    }

    // Update next-up
    if (next) {
      /* WORKSHOP STEP 4c: Set nextSongLabel to title and artist of "next" variable */
      let nextSongLabel = `${next.title} - ${next.artist}`;
      this.nodes.next.innerText = nextSongLabel;
    }
  }

  renderNowPlaying(song) {
    /* WORKSHOP STEP 4b: Set nowPlayingLabel to title and artist of "song" variable */
    let nowPlayingLabel = `${song.title} - ${song.artist}`;
    this.nodes.current.innerText = nowPlayingLabel;
  }
};
