
export enum Section {
  HOME = 'home',
  BOOKS = 'books',
  PHILOSOPHY = 'philosophy',
  CONTACT = 'contact'
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  url: string;
  color: string;
}

export interface Recommendation {
  title: string;
  author: string;
  description: string;
}
