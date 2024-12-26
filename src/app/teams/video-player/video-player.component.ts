// video-player.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { CloudinaryService } from '../../services/cloudinary.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [VgCoreModule, NgIf],
  templateUrl: './video-player.component.html',
})
export class VideoPlayerComponent implements OnInit {

  constructor(private cloudinaryService: CloudinaryService) { }

  charizardVideo?: string;
  ironHandsVideo?: string;
  miraidonVideo?: string;
  squirtleVideo?: string;

  async ngOnInit(): Promise<void> {
    this.charizardVideo = await this.getVideo("PokemonGame/charizard");
    this.ironHandsVideo = await this.getVideo("PokemonGame/iron-hands");
    this.miraidonVideo = await this.getVideo("PokemonGame/miraidon");
    this.squirtleVideo = await this.getVideo("PokemonGame/squirtle");
  }

  async getVideo(publicId: string): Promise<string> {
    return await this.cloudinaryService.getVideoUrl(publicId);
  }

}

