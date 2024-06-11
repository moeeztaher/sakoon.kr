import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Track {
  title: string;
  artist: string;
  path: string;
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  public audio = new Audio();
  public isPlaying = false;
  public tracks: Track[] = [];
  public currentTrackIndex = 0;
  public panelOpenState = false; 
  public selectedNoiseTypes: string[] = [];
  private playingAudios: { [key: string]: HTMLAudioElement } = {}; // Declaration of playingAudios object

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Track[]>('/api/tracks').subscribe(data => {
      this.tracks = data;
    });
    this.selectedNoiseTypes = [];
    // const panelOpenState = false;
    // this.audio.src = 'assets/music/t1.mp3';
  }

  get currentTrackName() {
    return this.tracks[this.currentTrackIndex]?.title || '';
  }

  get currentArtistName() {
    return this.tracks[this.currentTrackIndex]?.artist || '';
  }

  playPause() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.src = this.tracks[this.currentTrackIndex]?.path;
      this.audio.load();
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  // playPause() {
  //   if (this.isPlaying) {
  //     this.audio.pause();
  //   } else {
  //     this.audio.play();
  //   }
  //   this.isPlaying = !this.isPlaying;
  // }
  

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.isPlaying = false;
    this.playPause();
  }

  previousTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.isPlaying = false;
    this.playPause();
  }

  handleSelectedNoiseTypes() {
    // Pause currently playing audio that are not in the selectedNoiseTypes array
    for (const noiseType in this.playingAudios) {
      if (!this.selectedNoiseTypes.includes(noiseType)) {
        this.playingAudios[noiseType].pause();
        delete this.playingAudios[noiseType];
      }
    }
  
    // Start playing audio for selected noise types
    this.selectedNoiseTypes.forEach(noiseType => {
      if (!this.playingAudios[noiseType]) {
        const audioFile = `${noiseType}.mp3`;
        this.playNoise(audioFile);
      }
    });
  }

  playNoise(audioFile: string) {
    // Check if audio for the specified file is already playing
    if (this.playingAudios[audioFile]) {
      return; // Audio is already playing, so no need to start it again
    }
  
    const noise = new Audio();
    noise.src = `/assets/noise/${audioFile}`;
    noise.load();
    noise.play();
  
    // Pause previously playing audio for this noise type, if any
    const previouslyPlayingAudio = this.playingAudios[audioFile];
    if (previouslyPlayingAudio) {
      previouslyPlayingAudio.pause();
    }
  
    // Update the playing audio for this noise type
    this.playingAudios[audioFile] = noise;
  }
  
  
}
