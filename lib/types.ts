type Service = {
  title: string;
  icon: any;
  description?: string;
  slug?: string;
};
type EventType = {
  id: number;
  department: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  start: string;
  end: string;
  doctor: string;
};

type UserType = {
  id: number;
  role_id?: number;
  role?: string;
  email?: string;
  name?: string;
};

type AuthContextType = {
  user: UserType | null;
  saveUser: (user: UserType) => void;
};

export type { Service, EventType, AuthContextType, UserType };

export interface Course {
  title: string;
  shortDescription: string;
  price: number;
  duration: string;
  modules: number;
  image: string;
  about: string;
  whoIsFor: string;
  features: string[];
  coverage: string[];
}
