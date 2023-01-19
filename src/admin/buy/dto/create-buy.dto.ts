export class CreateBuyDto {
  client: {
    _id: string;
    username: string;
    email: string;
  };
  list: [];
  total: number;
}
