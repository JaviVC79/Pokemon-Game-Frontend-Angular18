// video-player.component.ts
import { Component, Input } from '@angular/core';
import { VgCoreModule } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [VgCoreModule],
  templateUrl: './video-player.component.html',
})
export class VideoPlayerComponent {

}

