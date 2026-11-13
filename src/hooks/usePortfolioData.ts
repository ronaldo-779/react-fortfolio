import { useState, useEffect, useRef } from 'react';
import {
  fetchProfile, fetchSkills, fetchProjects, fetchExperience,
  fetchEducation, fetchCertifications, fetchSocialLinks, fetchServices,
} from '../services/googleSheets';
import type { Profile, Skill, Project, Experience, Education, Certification, SocialLink, Service } from '../types/portfolio';

export interface PortfolioData {
  profile: Profile | null;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  socialLinks: SocialLink[];
  services: Service[];
  loading: boolean;
  error: string | null;
}

export function usePortfolioData(): PortfolioData {
  const [state, setState] = useState<PortfolioData>({
    profile: null, skills: [], projects: [], experience: [],
    education: [], certifications: [], socialLinks: [], services: [],
    loading: true, error: null,
  });
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    Promise.allSettled([
      fetchProfile(),
      fetchSkills(),
      fetchProjects(),
      fetchExperience(),
      fetchEducation(),
      fetchCertifications(),
      fetchSocialLinks(),
      fetchServices(),
    ]).then(([profileRes, skillsRes, projectsRes, expRes, eduRes, certRes, socialRes, servicesRes]) => {
      setState({
        profile: profileRes.status === 'fulfilled' ? (profileRes.value[0] ?? null) : null,
        skills: skillsRes.status === 'fulfilled' ? skillsRes.value : [],
        projects: projectsRes.status === 'fulfilled' ? projectsRes.value : [],
        experience: expRes.status === 'fulfilled' ? expRes.value : [],
        education: eduRes.status === 'fulfilled' ? eduRes.value : [],
        certifications: certRes.status === 'fulfilled' ? certRes.value : [],
        socialLinks: socialRes.status === 'fulfilled' ? socialRes.value : [],
        services: servicesRes.status === 'fulfilled' ? servicesRes.value : [],
        loading: false,
        error: profileRes.status === 'rejected' ? (profileRes.reason as Error).message : null,
      });
    });
  }, []);

  return state;
}
