declare global {
  interface IBlog {
    likes: number;
    title: string;
    author: string;
    url: string;
    id: string;
    user: {
      username: string;
      name: string;
      id: string;
    };
  }
  interface IUser {
    username: string;
    name: string;
    id: string;
    blogs: IBlog[];
  }
  interface IUserWithToken {
    token: string;
    username: string;
    name: string;
  }
  interface IBlogFormInfo {
    title: string;
    author: string;
    url: string;
  }
}

export {};
