export type TBaseAuthBody = {
  email: string;
  password: string;
};

export type TLoginBody = {} & TBaseAuthBody;

export type TRegisterBody = {
  firstName: string;
} & TBaseAuthBody;
