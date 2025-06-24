import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface BannerType {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  url: string;
}

export interface ReviewsType {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  review: string;
  from: string;
}

export interface AboutType {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  bigText: string[];
  machineText: string[];
  photo: SanityImageSource[];
}

export interface VideoGridType {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  description: string;
  name: string;
  slug: SlugType;
  url: string;
}

export interface SlugType {
  _type: string;
  current: string;
}
