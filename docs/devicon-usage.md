# Devicon Usage Guide

Devicon has been successfully installed and configured in this Next.js project. The CSS is automatically loaded via `src/app/layout.tsx`.

## Quick Start

### Option 1: Using the TechIcon Component (Recommended)

The `TechIcon` component provides a type-safe, reusable way to display technology icons:

```tsx
import { TechIcon } from "@/components/ui/tech-icon";

// Basic usage
<TechIcon name="react" />

// With variant
<TechIcon name="javascript" variant="plain" />
<TechIcon name="nextjs" variant="line" />

// Without colors (monochrome)
<TechIcon name="nodejs" colored={false} />

// With custom styling
<TechIcon name="typescript" className="text-4xl" />
<TechIcon name="flutter" className="text-6xl text-blue-500" />
```

### Option 2: Direct Icon Usage

You can also use devicons directly with the `<i>` tag:

```tsx
<i className="devicon-react-original colored"></i>
<i className="devicon-javascript-plain colored"></i>
<i className="devicon-nextjs-line colored"></i>
<i className="devicon-flutter-plain colored"></i>
```

## Icon Variants

Devicon provides three main variants for most icons:
- **plain** - Simple, flat icon
- **original** - Official logo with original styling
- **line** - Outlined version

## Available Icons

Visit [https://devicon.dev/](https://devicon.dev/) to browse all available icons and their variants.

## Common Technologies in This Project

Based on your `public/data.json`, here are the devicon names for your technologies:

| Technology | Devicon Name |
|-----------|-------------|
| JavaScript/TypeScript | `javascript` or `typescript` |
| HTML5/CSS3 | `html5` or `css3` |
| React/Next.js | `react` or `nextjs` |
| Flutter | `flutter` |
| Dart | `dart` |
| PHP | `php` |
| Laravel | `laravel` |
| Node.js | `nodejs` |
| MySQL | `mysql` |
| PostgreSQL | `postgresql` |
| nginx | `nginx` |
| Apache | `apache` |

## Integration Examples

### Example 1: Update Skills Section

You can enhance the skills section to show icons:

```tsx
import { TechIcon, getDeviconName } from "@/components/ui/tech-icon";

// In your skill mapping
<div className="flex items-center gap-2">
  <TechIcon name={getDeviconName(tech)} className="text-2xl" />
  <span>{tech}</span>
</div>
```

### Example 2: Technology Stack Display

```tsx
<div className="flex gap-4">
  {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
    <div key={tech} className="flex flex-col items-center">
      <TechIcon name={getDeviconName(tech)} className="text-5xl mb-2" />
      <span className="text-sm">{tech}</span>
    </div>
  ))}
</div>
```

### Example 3: Project Technologies

```tsx
// Display tech stack for a project
{project.technologies.map((tech) => (
  <TechIcon
    key={tech}
    name={getDeviconName(tech)}
    className="text-3xl hover:scale-110 transition-transform"
  />
))}
```

## Styling Tips

### Size Control
```tsx
<TechIcon name="react" className="text-2xl" />  {/* 2rem */}
<TechIcon name="react" className="text-4xl" />  {/* 2.25rem */}
<TechIcon name="react" className="text-6xl" />  {/* 3.75rem */}
```

### Color Customization
When using `colored={false}`, you can apply custom colors:
```tsx
<TechIcon
  name="react"
  colored={false}
  className="text-blue-500 dark:text-blue-400"
/>
```

### Dark Mode Support
For monochrome icons that adapt to dark mode:
```tsx
<TechIcon
  name="nextjs"
  colored={false}
  className="text-gray-900 dark:text-gray-100"
/>
```

## Best Practices

1. **Use the TechIcon component** for consistency and type safety
2. **Use colored icons** for brand recognition (default behavior)
3. **Add proper sizing** via className for responsive design
4. **Include alt text** or titles for accessibility (automatically included in TechIcon)
5. **Map display names** using `getDeviconName()` helper for automation

## Fallback Icon

If a technology icon is not found in the devicon library, the component automatically falls back to displaying the **htmx** icon. This ensures that:
- No broken or missing icons appear
- All technology chips maintain consistent visual presentation
- Unknown or custom technologies still get an icon placeholder

## Troubleshooting

**Icon not showing?**
- Verify the technology name at [devicon.dev](https://devicon.dev/)
- Check that the CSS import is in `layout.tsx` (already configured)
- Some technologies may use abbreviated names (e.g., "js" instead of "javascript")

**Seeing htmx icon for everything?**
- The technology name might not exist in devicon library
- Check the spelling and capitalization in your data
- Add a custom mapping in `TECH_ICON_MAP` in `tech-icon.tsx`

**Wrong icon variant?**
- Not all icons support all variants
- Use the devicon website to check available variants for each icon
