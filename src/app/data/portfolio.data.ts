/**
 * ─────────────────────────────────────────────────────────────
 *  ALL WEBSITE CONTENT LIVES IN THIS ONE FILE.
 *  Edit the values below and the whole site updates.
 *
 *  Anything with `placeholder: true` shows a small "Replace me"
 *  tag on the site. Fill in the real details, then delete the
 *  `placeholder: true` line (or set it to false).
 * ─────────────────────────────────────────────────────────────
 */

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  intro?: string;
  points: string[];
  tech: string[];
  placeholder?: boolean;
}

export interface Project {
  name: string;
  kind: string;
  summary: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
  placeholder?: boolean;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  note?: string;
  placeholder?: boolean;
}

export const PROFILE = {
  name: 'Gireesha R',
  initials: 'GR',
  title: 'Senior Frontend Developer',
  tagline:
    'Angular developer building scalable, responsive web applications for a multi-country insurance platform.',
  location: 'Hosur, Tamil Nadu, India',
  shortLocation: 'Hosur, TN',
  latestAngular: 'Angular 20',
  badge: 'Angular · TypeScript · RxJS · NgRx',
  about: [
    'Frontend developer building Angular apps for Afrisure, a multi-country insurance platform. I lead a team of 4 and focus on clean architecture and reusable components.',
  ],
  languages: 'English, Tamil, Telugu, Kannada',
  email: 'gireeshafed@gmail.com',
  phone: '+91 73585 29368',
  linkedin: 'https://www.linkedin.com/', // TODO: paste your LinkedIn profile URL
  github: '', // optional: paste your GitHub URL, or leave empty to hide it
  resumeUrl: 'Gireesha_R_Resume.pdf', // your CV in the public/ folder; replace the file to update it
};

/** Headline numbers shown under the hero. */
export const STATS: Stat[] = [
  { value: '6+', label: 'insurance platforms shipped' },
  { value: '30%', label: 'lower policy admin costs' },
  { value: '2', label: 'countries served' },
  { value: '4', label: 'developers led & mentored' },
];

export const SKILLS: SkillGroup[] = [
  { title: 'Core', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Node.js'] },
  {
    title: 'Angular ecosystem',
    items: ['RxJS', 'NgRx', 'Angular Signals', 'Standalone Components', 'Angular Material', 'Bootstrap'],
  },
  { title: 'Architecture', items: ['Monorepo design', 'Component libraries', 'Dynamic theming', 'REST APIs', 'Responsive design'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'GitLab', 'Azure DevOps', 'Angular CLI'] },
];

export const EXPERIENCE: Job[] = [
  {
    role: 'Frontend Developer / Angular Developer',
    company: 'Swiftant IT Solutions',
    period: 'Jan 2022 – Present',
    location: 'Hosur, Tamil Nadu',
    intro: 'Building Afrisure, an Azure-based insurance platform for Kenya and Malawi. Helped cut policy admin costs by 30%.',
    points: [
      'Merged B2B and B2C apps into one monorepo.',
      'Built a dynamic theming system loaded from Azure.',
      'Created a shared Angular component library.',
      'Moved auth state to NgRx and forms to Reactive Forms.',
      'Lead and mentor a team of 4 developers.',
    ],
    tech: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Azure'],
  },
];

export const PROJECTS: Project[] = [
  // Descriptions follow the CV. Add a sentence on your own part in each one if you like.
  {
    name: 'Core Afrisure',
    kind: 'Insurance product platform',
    summary:
      'Configurable insurance product platform on Azure.',
    tech: ['Angular', 'TypeScript', 'NgRx', 'Azure'],
  },
  {
    name: 'DMVIC V7',
    kind: 'Claims management',
    summary: 'Claims management for the insurance association and its member companies in Kenya.',
    tech: ['Angular', 'TypeScript', 'RxJS'],
  },
  {
    name: 'CRA',
    kind: 'Claims management system',
    summary: 'Claims management system on the Afrisure insurance platform.',
    tech: ['Angular', 'TypeScript', 'RxJS'],
  },
  {
    name: 'Patabima',
    kind: 'Motor insurance marketplace',
    summary: 'Motor insurance marketplace for the Insurance Association.',
    tech: ['Angular', 'TypeScript', 'REST APIs'],
  },
  {
    name: 'Nyala',
    kind: 'Partner integration',
    summary: 'Integration of the Afrisure platform with Hollard Insurance.',
    tech: ['Angular', 'TypeScript', 'REST APIs'],
  },
  {
    name: 'IAM Malawi',
    kind: 'Member company platform',
    summary: 'Insurance platform for member companies in the Malawian market.',
    tech: ['Angular', 'TypeScript', 'REST APIs'],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'B.E., Electronics and Communication',
    school: 'Adhiyamaan College of Engineering, Hosur',
    period: '2015 – 2019',
    note: 'CGPA 7.2',
  },
];
