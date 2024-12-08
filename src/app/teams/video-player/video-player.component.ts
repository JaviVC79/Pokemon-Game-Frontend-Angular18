// video-player.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { CloudinaryService } from '../../services/cloudinary.service';


@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [VgCoreModule],
  templateUrl: './video-player.component.html',
})
export class VideoPlayerComponent implements OnInit {

  constructor(private cloudinaryService: CloudinaryService) { }

  charizardVideo?: string;
  ironHandsVideo?: string;
  miraidonVideo?: string;
  squirtleVideo?: string;

  ngOnInit(): void {
    this.charizardVideo = this.getVideo("PokemonGame/charizard");
    this.ironHandsVideo = this.getVideo("PokemonGame/iron-hands");
    this.miraidonVideo = this.getVideo("PokemonGame/miraidon");
    this.squirtleVideo = this.getVideo("PokemonGame/squirtle");

  }

  getVideo(publicId: string): string {
    return this.cloudinaryService.getVideoUrl(publicId);
  }

}

