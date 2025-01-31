import { ImageLinks } from "./interfaces";

export class LivroVolumeInfo {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: ImageLinks;

  constructor(Item){
    this.title = Item.volumeInfo.title;
    this.authors = Item.volumeInfo.authors;
    this.publisher = Item.volumeInfo.publisher;
    this.publishedDate = Item.volumeInfo.publishedDate;
    this.description = Item.volumeInfo.description;
    this.previewLink = Item.volumeInfo.previewLink;
    this.thumbnail = Item.volumeInfo.imageLinks;
  }
}
