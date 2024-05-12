import { type Category } from "@prisma/client";

export interface ListItemProps {
  id: number;
  name: string;
  isInterested: boolean;
}

export interface UserProps {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryWithInterestStatus = Category & { isInterested: boolean };
