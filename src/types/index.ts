export type TUser = {
  id: number;
  username: string;
  password: string;
  isAuth: boolean;
};

export type TRegisterForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type TTask = {
  id: string;
  userId: number;
  title: string;
  deadline: string;
  description: string;
  category: string;
};
