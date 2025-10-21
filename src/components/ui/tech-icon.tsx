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
 * Maps display names to devicon names with their best available variant
 * Format: "display-name": "icon-name" or "icon-name:variant"
 */
export const TECH_ICON_MAP: Record<string, string> = {
  // JavaScript/TypeScript
  "JavaScript": "javascript:plain",
  "TypeScript": "typescript:plain",
  "JavaScript/TypeScript": "javascript:plain",

  // Frontend Frameworks
  "React": "react:original",
  "React/Next.js": "react:original",
  "Next.js": "nextjs:plain",
  "Vue.js": "vuejs:plain",
  "Angular": "angularjs:plain",

  // CSS/Styling
  "HTML5/CSS3": "html5:plain",
  "HTML5": "html5:plain",
  "CSS3": "css3:plain",
  "Tailwind CSS": "tailwindcss:original",
  "Bootstrap": "bootstrap:plain",

  // Backend
  "Node.js": "nodejs:plain",
  "Node.js (NestJS)": "nestjs:plain",
  "PHP": "php:plain",
  "Laravel": "laravel:plain",
  "Python": "python:plain",
  "Django": "django:plain",
  "Flask": "flask:original",
  "C#": "csharp:plain",
  ".NET": "dotnetcore:plain",

  // Databases
  "MySQL": "mysql:plain",
  "PostgreSQL": "postgresql:plain",
  "MongoDB": "mongodb:plain",
  "Redis": "redis:plain",
  "SQLite": "sqlite:plain",

  // Mobile
  "Flutter": "flutter:plain",
  "Dart": "dart:plain",
  "React Native": "react:original",
  "Android": "android:plain",
  "iOS": "apple:original",

  // DevOps & Tools
  "Docker": "docker:plain",
  "Kubernetes": "kubernetes:plain",
  "Git": "git:plain",
  "GitHub": "github:original",
  "GitLab": "gitlab:plain",
  "nginx": "nginx:original",
  "Apache": "apache:plain",

  // Cloud
  "AWS": "amazonwebservices:plain",
  "Azure": "azure:plain",
  "Google Cloud": "googlecloud:plain",

  // Others
  "jQuery": "jquery:plain",
  "Webpack": "webpack:plain",
  "Vite": "vitejs:plain",
  "npm": "npm:original",
  "yarn": "yarn:plain",
  "pnpm": "pnpm:plain",

  // Design & IDE Tools
  "Photoshop": "photoshop:plain",
  "Figma": "figma:plain",
  "VSCode": "vscode:plain",
  "PHPStorm": "phpstorm:plain",
  "Cursor": "vscode:plain", // Cursor uses VS Code icon as fallback since it's VS Code-based
};

/**
 * Get devicon name and variant from a display name
 * @param displayName - The display name of the technology
 * @returns Object with icon name and variant, or fallback
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
    "jquery", "axios", "graphql", "firebase", "photoshop", "figma", "vscode",
    "phpstorm", "pnpm"
  ];

  // If the cleaned name is a known icon, use it
  if (knownIcons.includes(cleanedName)) {
    return cleanedName;
  }

  // Otherwise, use htmx as fallback for unknown icons
  return "htmx";
}

/**
 * Parse icon name and variant from the mapping string
 * @param iconString - String like "vscode:plain" or just "react"
 * @returns Object with name and variant
 */
export function parseIconString(iconString: string): { name: string; variant: string } {
  if (iconString.includes(':')) {
    const [name, variant] = iconString.split(':');
    return { name, variant };
  }
  return { name: iconString, variant: 'original' };
}
