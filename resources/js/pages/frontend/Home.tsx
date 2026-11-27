import type {
    ClientRecord,
    ExperienceRecord,
    ProjectRecord,
    SectionRecord,
    ServiceRecord,
    SkillRecord,
    TestimonialRecord,
} from "@/types/portfolio";
import PublicPanel from '../layout/PublicPanel';
import ContentSection from '../components/public/ContentSection';
import ClientSection from '../components/public/ClientSection';
import AboutSection from '../components/public/AboutSection';
import ServiceSection from '../components/public/ServiceSection';
import ProjectSection from '../components/public/ProjectSection';
import SkillSection from '../components/public/SkillSection';
import ExprienceSection from '../components/public/ExprienceSection';
import CtaSection from '../components/public/CtaSection';
import TestimonialsSection from '../components/public/TestimonialsSection';

type HomeProps = {
    sections: Record<string, SectionRecord>;
    clients: ClientRecord[];
    experiences: ExperienceRecord[];
    projects: ProjectRecord[];
    services: ServiceRecord[];
    skills: SkillRecord[];
    testimonials: TestimonialRecord[];
};

const Home = ({
    sections,
    clients,
    experiences,
    projects,
    services,
    skills,
    testimonials,
}: HomeProps) => {
    return (
        <PublicPanel>
            {sections.hero && <ContentSection section={sections.hero} skills={skills} />}
            {sections.clients && (
                <ClientSection section={sections.clients} clients={clients} />
            )}
            {sections.about && <AboutSection section={sections.about} />}
            {sections.services && (
                <ServiceSection section={sections.services} services={services} />
            )}
            {sections.projects && (
                <ProjectSection section={sections.projects} projects={projects} />
            )}
            {sections.skills && <SkillSection section={sections.skills} skills={skills} />}
            {sections.experience && (
                <ExprienceSection
                    section={sections.experience}
                    experiences={experiences}
                />
            )}
            {sections.testimonials && testimonials.length > 0 && (
                <TestimonialsSection
                    section={sections.testimonials}
                    testimonials={testimonials}
                />
            )}
            {sections.cta && <CtaSection section={sections.cta} />}
        </PublicPanel>
    );
};

export default Home;
