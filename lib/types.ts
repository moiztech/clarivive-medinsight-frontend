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
  company_id?: number;
  name: string;
  email: string;
  primary_contact_name?: string;
  no_of_employees?: string;
  logo?: string;
  contact?: string;
  address?: string;
  email_verified_at?: string;
  company_token?: string;
  refresh_jti?: string;
  refresh_expires_at?: string;
  created_at?: string;
  updated_at?: string;
  role_id: number;
  role: {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
  };
};

type CompanyType = {
  id: number;
  name: string;
  email: string;
  primary_contact_name: string;
  no_of_employees: string;
  logo: string;
  contact: string;
  address: string;
  company_token: string;
  created_at: string;
  updated_at: string;
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
  duration?: string;
};

type Branch = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  location: string;
  icon: string | null;
};

export type {
  Service,
  EventType,
  AuthContextType,
  UserType,
  CompanyType,
  CategoryResponse,
  CourseData,
  Branch,
};

export type Session = {
  id: number;
  date: string;
  month: string;
  start_time: string;
  end_time: string;
};

export type Schedule = {
  id: number;
  title: string;
  spaces_available: number;
  location: string;
  description: string;
  instruction: string;
  image: string;
  branch?: {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    location: string;
  };
  sessions?: Session[];
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
  is_purchased?: boolean;
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
  branches: Branch[];
  schedules?: Schedule[];
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
