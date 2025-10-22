export interface PortfolioData {
  personalInfo: {
    name: string;
    surname: string;
    title: string;
    location: string;
    bio: string;
    profilePictureUrl: string;
    resumeUrl: string;
    contact: {
      email: string;
      phone: string;
    };
    socialLinks: {
      github: string;
      linkedin: string;
      twitter: string;
      blog: string;
    };
  };
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    technologiesUsed: number;
    happyClients: number;
  };
  technologiesUsed: string[];
  clients: Array<{
    id: string;
    name: string;
    industry: string;
    website: string;
    logoUrl: string;
    logoVariants?: {
      text?: string;
      textDark?: string;
      dark?: string;
    };
  }>;
  skills: Array<{
    category: string;
    technologies: Record<string, string>;
  }>;
  workExperience: Array<{
    company: string;
    companyUrl?: string;
    jobTitle: string;
    location: string;
    type: string;
    startDate: string;
    endDate: string;
    summary: string;
    responsibilities: string[];
    technologiesUsed: string[];
    techStack: {
      frontend?: string[];
      testing?: string[];
    };
  }>;
  projects: Array<{
    title: string;
    clientId: string;
    isFeatured: boolean;
    sort: number;
    timelineSort?: number;
    logoUrl: string;
    logoVariants?: {
      text?: string;
      textDark?: string;
      dark?: string;
    };
    coverImageUrl: string;
    description: string;
    myRole: string;
    keyLearnings: string[];
    technologies: string[];
    links: {
      liveUrl: string | null;
      githubUrl: string | null;
      appStoreUrl: string | null;
      playStoreUrl: string | null;
    };
    status: string;
    type: string;
    platform: string | string[];
    screenshots: string[];
    appScreenshots?: string[];
    videos?: string[];
  }>;
  codeSnippets: Array<{
    title: string;
    description: string;
    language: string;
    code: string;
    gistUrl: string;
    screenshots: string[];
  }>;
  testimonials: Array<{
    clientId: string;
    contactPerson: string;
    contactTitle: string;
    contactAvatarUrl: string;
    quote: string;
    projectName: string;
  }>;
  articles: Array<{
    title: string;
    publication: string;
    date: string;
    url: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    details: string[];
  }>;
  certifications: Array<{
    name: string;
    issuingOrganization: string;
    date: string;
    credentialUrl: string;
  }>;
}
