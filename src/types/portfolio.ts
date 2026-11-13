
export interface Profile {
  profile_id: string;
  full_name: string;
  professional_title: string;
  tagline: string;
  short_bio: string;
  about_me: string;
  profile_image_url: string;
  resume_url: string;
  email: string;
  phone_public: string;
  location: string;
  availability_status: string;
  years_experience: string;
  is_visible: string;
  background: string;
}

export interface Skill {
  skill_id: string;
  skill_name: string;
  category: string;
  icon: string;
  proficiency_label: string;
  proficiency_percent: string;
  display_order: string;
  is_visible: string;
}

export interface Project {
  project_id: string;
  project_name: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string;
  tech_stack: string;
  thumbnail_url: string;
  gallery_urls: string;
  github_url: string;
  live_demo_url: string;
  featured: string;
  status: string;
  display_order: string;
  is_visible: string;
}

export interface Experience {
  experience_id: string;
  job_title: string;
  organization: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: string;
  description: string;
  responsibilities: string;
  tech_stack: string;
  display_order: string;
  is_visible: string;
}

export interface Education {
  education_id: string;
  qualification: string;
  institution: string;
  location: string;
  start_year: string;
  end_year: string;
  is_current: string;
  grade: string;
  description: string;
  display_order: string;
  is_visible: string;
}

export interface Certification {
  certification_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string;
  credential_id: string;
  credential_url: string;
  description: string;
  display_order: string;
  is_visible: string;
}

export interface SocialLink {
  social_id: string;
  platform: string;
  url: string;
  icon: string;
  display_order: string;
  is_visible: string;
}

export interface Service {
  service_id: string;
  service_title: string;
  description: string;
  icon: string;
  display_order: string;
  is_visible: string;
}

export interface Setting {
  key: string;
  value: string;
}

export type Theme = 'dark' | 'light';
