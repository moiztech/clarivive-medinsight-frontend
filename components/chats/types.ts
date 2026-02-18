export type Message = {
  id: number;
  message: string;
  created_at: string;
  is_read: boolean;
  is_me: boolean;
  sender: {
    id: number;
    name: string;
    role: string;
    logo?: string;
  };
};
