export interface BookTypes {
    _id: string;
    googleBookId?: string;
    title: string;
    author: string;
    publisher?: string;
    publishedDate?: Date;
    description?: string;
    pageCount?: number;
    language?: string;
    tags?: string[];
    rating?: number;
    smallImage?: string | null;
    largeImage?: string | null;
    createdAt?: string;
    users: UserTypes[];
}

export interface UserTypes {
    _id: string;
    email: string;
    username: string;
    password: string;
    availableBooks?: BookTypes[];
}

export interface VolumeInfo {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    language?: string;
    imageLinks?: {
        smallThumbnail?: string;
        thumbnail?: string;
    };
}

export interface BookItem {
    id: string;
    volumeInfo: VolumeInfo;
    users?: UserTypes[];
}

