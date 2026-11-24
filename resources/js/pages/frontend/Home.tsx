import PublicPanel from '../layout/PublicPanel';
import ContentSection from '../components/public/ContentSection';
import ClientSection from '../components/public/ClientSection';
import AboutSection from '../components/public/AboutSection';
import ServiceSection from '../components/public/ServiceSection';
import ProjectSection from '../components/public/ProjectSection';
import SkillSection from '../components/public/SkillSection';
import ExprienceSection from '../components/public/ExprienceSection';
import CtaSection from '../components/public/CtaSection';

const Home = () => {
    return (
        <PublicPanel>
            <ContentSection/>
            <ClientSection/>
            <AboutSection/>
            <ServiceSection/>
            <ProjectSection/>
            <SkillSection/>
            <ExprienceSection/>
            <CtaSection/>
        </PublicPanel>
    );
};

export default Home;
