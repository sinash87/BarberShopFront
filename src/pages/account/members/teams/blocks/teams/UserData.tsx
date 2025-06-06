interface GetServiceDto{
  name: string;
  price: number
}


interface IUserData {
  id: number;
  username: string;
  phoneNumber: string;
  visitTime: number;
  active: string;
  services: GetServiceDto[];
}

export { type IUserData };
