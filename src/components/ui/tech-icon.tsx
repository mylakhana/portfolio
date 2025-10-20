interface TechIconProps {
  /**
   * The name of the technology/tool (e.g., "react", "javascript", "nextjs")
   * Full list: https://devicon.dev/
   */
  name: string;
  /**
   * Icon variant: "plain", "original", "line"
   */
  variant?: "plain" | "original" | "line";
  /**
   * Whether to use colored version (default: true)
   */
  colored?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Reusable component for displaying technology icons using Devicon
 *
 * @example
 * ```tsx
 * <TechIcon name="react" variant="original" />
 * <TechIcon name="javascript" variant="plain" colored />
 * <TechIcon name="nextjs" variant="line" className="text-4xl" />
 * ```
 */
export function TechIcon({
  name,
  variant = "plain",
  colored = true,
  className = ""
}: TechIconProps) {
  const iconClass = `devicon-${name}-${variant}${colored ? " colored" : ""}`;

  return <i className={`${iconClass} ${className}`} title={name} />;
}

/**
 * Technology icon mapping for common technologies
 * Maps display names to devicon names
 */
export const TECH_ICON_MAP: Record<string, string> = {
  // JavaScript/TypeScript
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "JavaScript/TypeScript": "javascript",

  // Frontend Frameworks
  "React": "react",
  "React/Next.js": "react",
  "Next.js": "nextjs",
  "Vue.js": "vuejs",
  "Angular": "angularjs",

  // CSS/Styling
  "HTML5/CSS3": "html5",
  "HTML5": "html5",
  "CSS3": "css3",
  "Tailwind CSS": "tailwindcss",
  "Bootstrap": "bootstrap",

  // Backend
  "Node.js": "nodejs",
  "Node.js (NestJS)": "nestjs",
  "PHP": "php",
  "Laravel": "laravel",
  "Python": "python",
  "Django": "django",
  "Flask": "flask",
  "C#": "csharp",
  ".NET": "dotnetcore",

  // Databases
  "MySQL": "mysql",
  "PostgreSQL": "postgresql",
  "MongoDB": "mongodb",
  "Redis": "redis",
  "SQLite": "sqlite",

  // Mobile
  "Flutter": "flutter",
  "Dart": "dart",
  "React Native": "react",
  "Android": "android",
  "iOS": "apple",

  // DevOps & Tools
  "Docker": "docker",
  "Kubernetes": "kubernetes",
  "Git": "git",
  "GitHub": "github",
  "GitLab": "gitlab",
  "nginx": "nginx",
  "Apache": "apache",

  // Cloud
  "AWS": "amazonwebservices",
  "Azure": "azure",
  "Google Cloud": "googlecloud",

  // Others
  "jQuery": "jquery",
  "Webpack": "webpack",
  "Vite": "vitejs",
  "npm": "npm",
  "yarn": "yarn",
  "pnpm": "pnpm",
};

/**
 * Get devicon name from a display name
 * @param displayName - The display name of the technology
 * @returns The devicon name, cleaned name, or "htmx" as fallback
 */
export function getDeviconName(displayName: string): string {
  // Check if we have a mapped name
  if (TECH_ICON_MAP[displayName]) {
    return TECH_ICON_MAP[displayName];
  }

  // Try to clean the name for common patterns
  const cleanedName = displayName.toLowerCase().replace(/[^a-z0-9]/g, "");

  // List of known devicon names - if cleaned name is in this list, use it
  const knownIcons = [
    "javascript", "typescript", "html5", "css3", "react", "nextjs", "vuejs",
    "angular", "svelte", "nodejs", "python", "java", "php", "ruby", "go",
    "rust", "csharp", "cplusplus", "c", "swift", "kotlin", "dart", "flutter",
    "mysql", "postgresql", "mongodb", "redis", "sqlite", "docker", "kubernetes",
    "git", "github", "gitlab", "npm", "yarn", "webpack", "vite", "tailwindcss",
    "bootstrap", "sass", "laravel", "django", "flask", "rails", "express",
    "nestjs", "fastify", "nginx", "apache", "aws", "azure", "googlecloud",
    "jquery", "axios", "graphql", "firebase"
  ];

  // If the cleaned name is a known icon, use it
  if (knownIcons.includes(cleanedName)) {
    return cleanedName;
  }

  // Otherwise, use htmx as fallback for unknown icons
  return "htmx";
}
