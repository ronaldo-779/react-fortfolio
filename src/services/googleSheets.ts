import type { Profile, Skill, Project, Experience, Education, Certification, SocialLink, Service, Setting } from '../types/portfolio';

const API_URL: string = import.meta.env.VITE_SHEETS_API_URL;

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

export function getSheetData<T>(sheetName: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (!API_URL) {
      reject(new Error('Missing Google Sheets API URL in .env'));
      return;
    }
    const callbackName = `portfolioCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const cleanup = () => {
      clearTimeout(timeoutId);
      delete window[callbackName];
      script.remove();
    };
    window[callbackName] = (data: unknown) => {
      cleanup();
      if (!Array.isArray(data)) {
        reject(new Error('Invalid Google Sheets response'));
        return;
      }
      resolve(data as T[]);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error('Google Sheets script failed to load'));
    };
    const timeoutId: number = window.setTimeout(() => {
      cleanup();
      reject(new Error('Google Sheets API request timed out'));
    }, 15000);
    const separator = API_URL.includes('?') ? '&' : '?';
    script.src = `${API_URL}${separator}sheet=${encodeURIComponent(sheetName)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

function sortByOrder<T extends { display_order?: string }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => Number(a.display_order ?? 0) - Number(b.display_order ?? 0));
}

function filterVisible<T extends { is_visible?: string }>(arr: T[]): T[] {
  return arr.filter(item => {
    const v = item.is_visible?.toLowerCase();
    return v !== 'false' && v !== '0' && v !== 'no';
  });
}

export const fetchProfile = (): Promise<Profile[]> =>
  getSheetData<Profile>('Profile');

export const fetchSkills = (): Promise<Skill[]> =>
  getSheetData<Skill>('Skills').then(data => sortByOrder(filterVisible(data)));

export const fetchProjects = (): Promise<Project[]> =>
  getSheetData<Project>('Projects').then(data => sortByOrder(filterVisible(data)));

export const fetchExperience = (): Promise<Experience[]> =>
  getSheetData<Experience>('Experience').then(data => sortByOrder(filterVisible(data)));

export const fetchEducation = (): Promise<Education[]> =>
  getSheetData<Education>('Education').then(data => sortByOrder(filterVisible(data)));

export const fetchCertifications = (): Promise<Certification[]> =>
  getSheetData<Certification>('Certifications').then(data => sortByOrder(filterVisible(data)));

export const fetchSocialLinks = (): Promise<SocialLink[]> =>
  getSheetData<SocialLink>('SocialLinks').then(data => sortByOrder(filterVisible(data)));

export const fetchServices = (): Promise<Service[]> =>
  getSheetData<Service>('Services').then(data => sortByOrder(filterVisible(data)));

export const fetchSettings = (): Promise<Setting[]> =>
  getSheetData<Setting>('Settings');
