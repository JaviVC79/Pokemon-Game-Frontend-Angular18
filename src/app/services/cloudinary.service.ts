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

  getVideoUrl(publicId: string): string {
    const video = this.cloudinary.video(publicId);
    return video.toURL();
  }
}

