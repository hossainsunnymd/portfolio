export interface ProjectCategoryRecord {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    position: number;
}

export interface ProjectRecord {
    id: number;
    project_category_id: number | null;
    category?: ProjectCategoryRecord | null;
    title: string;
    slug: string;
    client: string | null;
    role: string | null;
    summary: string | null;
    body: string | null;
    cover_path: string | null;
    gallery: string[] | null;
    tech: string[] | null;
    highlights: string[] | null;
    live_url: string | null;
    repo_url: string | null;
    completed_at: string | null;
    status: string;
    is_featured: boolean;
    position: number;
    views: number;
}

export interface ServiceRecord {
    id: number;
    title: string;
    slug: string;
    icon: string;
    summary: string | null;
    body: string | null;
    features: string[] | null;
    is_featured: boolean;
    status: string;
    position: number;
}

export interface SkillRecord {
    id: number;
    name: string;
    category: string;
    level: number;
    icon: string | null;
    note: string | null;
    is_featured: boolean;
    enabled: boolean;
    position: number;
}

export interface ExperienceRecord {
    id: number;
    kind: "work" | "education" | "certification";
    role: string;
    organization: string;
    location: string | null;
    url: string | null;
    summary: string | null;
    achievements: string[] | null;
    start_date: string | null;
    end_date: string | null;
    is_current: boolean;
    enabled: boolean;
    position: number;
}

export interface ClientRecord {
    id: number;
    name: string;
    logo_path: string | null;
    url: string | null;
    enabled: boolean;
    position: number;
}

export interface TestimonialRecord {
    id: number;
    name: string;
    role: string | null;
    company: string | null;
    location: string | null;
    avatar_path: string | null;
    quote: string;
    rating: number;
    source_url: string | null;
    is_featured: boolean;
    enabled: boolean;
    position: number;
}

export interface SectionRecord {
    id: number;
    key: string;
    name: string;
    heading: string | null;
    subheading: string | null;
    enabled: boolean;
    position: number;
    config: Record<string, unknown> | null;
}

export function groupSkills(skills: SkillRecord[]) {
    const groups = new Map<string, SkillRecord[]>();

    skills
        .filter((skill) => skill.enabled)
        .sort((a, b) => a.position - b.position)
        .forEach((skill) => {
            const group = groups.get(skill.category) ?? [];
            group.push(skill);
            groups.set(skill.category, group);
        });

    return Array.from(groups, ([category, categorySkills]) => ({
        category,
        skills: categorySkills,
    }));
}

export function formatExperienceDates(experience: ExperienceRecord) {
    const startYear = experience.start_date?.slice(0, 4) ?? "Date unknown";
    const endYear = experience.is_current
        ? "Present"
        : (experience.end_date?.slice(0, 4) ?? "Date unknown");

    return `${startYear} - ${endYear}`;
}
