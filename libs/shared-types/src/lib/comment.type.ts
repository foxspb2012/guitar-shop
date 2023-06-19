export type Comment = {
  id?: number;
  userId: number;
  productId: number;
  score: number;
  content: string;
  advantages: string;
  disadvantages: string;
  createdAt?: Date;
  updatedAt?: Date;
}
