import { Component } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent {
  public audio = new Audio();
  public isPlaying = false;
  public tracks = ['assets/music/1.mp3', 'assets/music/2.mp3', 'assets/music/3.mp3']; // Add your mp3 files here
  public currentTrack = 0;

  playPause() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.src = this.tracks[this.currentTrack];
      this.audio.load();
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextTrack() {
    this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    this.isPlaying = false;
    this.playPause();
  }

  previousTrack() {
    this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
    this.isPlaying = false;
    this.playPause();
  }
}
