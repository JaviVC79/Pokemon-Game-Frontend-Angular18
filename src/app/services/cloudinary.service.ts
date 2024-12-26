import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';


@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudinary: Cloudinary;

  constructor() {
    this.cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dzp3dxd7e'
      },
      url: {
        secure: true
      }
    });
  }

  async getVideoUrl(publicId: string): Promise<string> {
    const video = this.cloudinary.video(publicId);
    const videoUrl = video.toURL();
    if (await this.checkVideo(videoUrl)) return videoUrl;
    return '/squirtle.mp4';
  }

  private async checkVideo(videoUrl: string): Promise<boolean> {
    try {
      const response = await fetch(videoUrl);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error al verificar el video:', error);
      return false;
    }
  }
  


}

