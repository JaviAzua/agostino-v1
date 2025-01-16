export interface BannerT {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  url: string;
}

export interface ReviewsT {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  review: string;
  from: string;
}

export interface AboutT {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  photo: SanityImageSource[];
  machineText: string[];
  bigText: text[];
}

export interface VideoGridT {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  name: string;
  description: text;
  slug: Slug;
  url: string;
}
