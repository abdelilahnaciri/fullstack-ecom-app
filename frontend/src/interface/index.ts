export interface IProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    stock: number;
    category: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    thumbnail?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
  };
  qty: number;
}

interface IFile {
  lastModified: number; // Timestamp of the last modification
  lastModifiedDate: Date; // Date object representing last modified time
  name: string; // Name of the file
  size: number; // File size in bytes
  type: string; // MIME type of the file (e.g., "image/jpeg")
  webkitRelativePath: string; // Relative path if using input with webkitdirectory (empty string otherwise)
}

interface Ithumb {
  thumbnail: IFile[];
}

export interface IAdminProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: {
    title: string;
  };
  thumbnail?:
    | {
        url: string;
      }
    | IFile
    | any;
}

export interface ILoginCredentials {
  identifier: string;
  password: string;
}

export interface ILoginInput {
  name: string;
  type: string;
  placeholder: string;
  validation: {
    required: boolean;
    pattern?: RegExp;
  };
}

export interface IDataResponse {
  payload: any;
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface IErrorResponse {
  // details?: {
  //   error: {
  //     message: string;
  //   }[];
  // };
  message?: string;
}
