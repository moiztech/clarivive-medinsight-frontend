type Service = {
  title: string;
  icon: React.ReactNode | string;
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
type CategoryResponse = {
  id: number;
  name: string;
  slug: string;
  icon: string;
};

type TopicData = {
  id: number;
  name: string;
  slug: string;
};

type CourseData = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  description?: string;
  topics?: TopicData[];
  price: number;
  rating?: number;
};
export type {
  Service,
  EventType,
  AuthContextType,
  UserType,
  CategoryResponse,
  CourseData,
};

export type DetailCourse = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  price: number;
  description?: string;
  duration: string;
  modules: number;
  rating?: number;
  type?: {
    id: number;
    name: string;
  };
  topics?: TopicData[];
  content?: string;
  video?: {
    type: string;
    url: string;
    file: string | null;
  };
};

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
