import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './stickynote.component.html',
  styleUrls: ['./stickynote.component.css']
})
export class StickyNoteComponent {
  x = 100; 
  y = 100; 
  isDragging = false;
  offsetX = 0;
  offsetY = 0;
  content = '';

  onMouseDown() {
    console.log("hello")
    this.isDragging = true;
    // this.offsetX = event.clientX - this.x;
    // this.offsetY = event.clientY - this.y;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.x = event.clientX - this.offsetX;
      this.y = event.clientY - this.offsetY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }
}
