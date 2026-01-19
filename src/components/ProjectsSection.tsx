import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'College Attendance Tracker',
    description: 'A comprehensive attendance tracking solution for college students. Track subjects, view statistics, and maintain academic records effortlessly.',
    image: project3,
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://college-attendance-tracker-production-19.onrender.com/',
    featured: true,
    images: [project1, project2, project3],
  },
  {
    title: 'StudyAI - Smart Study Companion',
    description: 'This project helps students by providing a daily timetable, summarized notes, and organized study planning to improve productivity.',
    image: project4,
    tech: ['Node.js', 'HTML', 'CSS'],
    link: '#',
    featured: true,
    images: [project4],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      gsap.fromTo('.project-card-item',
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-[500px] h-[500px] bg-accent/20 -top-40 -right-40" />
      <div className="floating-orb w-[400px] h-[400px] bg-secondary/20 bottom-0 left-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my latest work and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="project-card-item project-card group"
            >
              {/* Images carousel */}
              <div className="relative overflow-hidden">
                <div className={`grid gap-4 p-6 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                  {project.images.map((img, imgIndex) => (
                    <div 
                      key={imgIndex}
                      className="aspect-video overflow-hidden rounded-lg"
                    >
                      <img 
                        src={img}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6 pt-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero p-3 flex-shrink-0"
                  >
                    <ArrowUpRight size={20} weight="bold" />
                  </a>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full border border-primary/30 text-primary bg-primary/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
