export interface LinkProps {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
  created_at: Date;
  updated_at: Date;
}

export interface NetworkProps {
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
}

export interface SocialProps {
  name: string;
  url: string;
}