interface GetServiceDto {
  name: string;
  price: number;
}

interface IReservationDate {
  id: number;
  username: string;
  phoneNumber: string;
  visitTime: number;
  active: string;
  services: GetServiceDto[];
  userGuest: boolean;
}

export { type IReservationDate };
