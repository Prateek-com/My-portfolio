import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.jpeg';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'GSAP', icon: '✨' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -100, rotate: -10 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Skills stagger animation
      gsap.fromTo('.skill-item',
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-[400px] h-[400px] bg-primary/20 top-0 right-0" />
      <div className="floating-orb w-[300px] h-[300px] bg-secondary/20 bottom-20 left-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="profile-glow-ring group">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                <img 
                  src={profileImage}
                  alt="Prateek Chaudhary"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm a passionate full-stack developer with a keen eye for creating 
              elegant, user-centric web applications. With expertise in modern 
              JavaScript frameworks and backend technologies, I transform ideas 
              into seamless digital experiences that delight users and drive results.
            </p>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="skill-item skill-icon flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
