'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Code, Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageModalProps {
  images: Array<{
    src: string;
    title: string;
    explanation: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const currentImage = images[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative flex w-full max-w-7xl mx-4 h-[80vh] bg-gray-900/90 rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
          }}
          className="absolute right-[400px] top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-20"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="relative flex-1 p-4">
          <div className="relative w-full h-full">
            <Image
              src={currentImage.src}
              alt={currentImage.title}
              fill
              className="object-contain rounded-lg"
              quality={90}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>

        <div className="w-96 border-l border-gray-700 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{currentImage.title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur-sm">
              <p className="text-sm text-gray-300">
                {currentImage.explanation}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`
                  relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors aspect-video
                  ${idx === currentIndex ? 'border-blue-500' : 'border-transparent hover:border-blue-500/50'}
                `}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 100px"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface LinkType {
  url: string;
  icon: React.ReactElement;
  label: string;
}

interface Project {
  icon: React.ReactElement;
  title: string;
  company: string;
  description: string;
  period: string;
  tech?: string[];
  links?: LinkType[];
  images?: {
    src: string;
    title: string;
    explanation: string;
  }[];
}

interface SelectedImageInfo {
  projectIndex: number;
  imageIndex: number;
}

const SplitRevealTitle: React.FC = () => {
  return (
    <div className="mb-12 text-center">
      <div className="relative overflow-hidden">
        <h2 
          className="text-6xl mb-4 invisible"
          style={{
            fontFamily: 'Optima, Candara, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.01em'
          }}
        >
          Projects
        </h2>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ clipPath: 'inset(0 50% 0 50%)' }}
            whileInView={{ 
              clipPath: 'inset(0 0 0 0)',
              transition: {
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
            viewport={{ once: true }}
            className="text-6xl relative"
            style={{
              fontFamily: 'Optima, Candara, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.01em',
              textShadow: '0 0 15px rgba(255,255,255,0.3)'
            }}
          >
            Projects
          </motion.div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <motion.div
          className="h-[1px] bg-gradient-to-r from-gray-500 to-transparent w-16"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ 
            x: 0, 
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.3
            }
          }}
          viewport={{ once: true }}
        />
        <motion.div
          className="h-[1px] bg-gradient-to-l from-gray-500 to-transparent w-16"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ 
            x: 0, 
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.3
            }
          }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

const AnimatedCard: React.FC<{ project: Project; index: number; onImageClick: (projectIndex: number, imageIndex: number) => void }> = ({ 
  project, 
  index,
  onImageClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ 
        transitionDelay: `${index * 200}ms`
      }}
    >
      <div className="group bg-blue-900/60 backdrop-blur-sm rounded-lg p-6 hover:bg-blue-900/70 transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-800/30 rounded-lg">
            {project.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-blue-300">{project.company}</p>
              </div>
              <span className="text-sm text-gray-400">{project.period}</span>
            </div>

            <p className="text-gray-300 mb-4">{project.description}</p>

            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {project.images.slice(0, 3).map((image, i) => (
                  <div 
                    key={i} 
                    className="relative rounded-lg overflow-hidden bg-blue-900/30 group/image cursor-pointer aspect-video"
                    onClick={() => onImageClick(index, i)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                      sizes="(max-width: 768px) 33vw, 300px"
                      quality={75}
                    />
                  </div>
                ))}
              </div>
            )}

            {project.tech && (
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((item, i) => (
                  <span 
                    key={i}
                    className="text-sm px-3 py-1 rounded-full bg-blue-800/40 text-blue-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {project.links && (
              <div className="flex gap-4 mt-4 pt-3 border-t border-blue-800/30">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-lg 
                      text-gray-300 hover:text-blue-300 hover:bg-blue-900/50 transition-all duration-300"
                  >
                    {link.icon}
                    <span className="text-sm">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImageInfo | null>(null);

  const projects: Project[] = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Project Lead, Lead UX/UI Designer",
      company: "Calcoy",
      description: "Developed a user-friendly calendar application that bridges the accessibility gap in digital time management. Born from personal struggles with traditional calendar apps, this project aims to help both calendar newcomers and experienced users better manage their time. Core features include flexible task management, social coordination through shared spaces, and smart recommendations to optimize daily routines. The app succeeds by prioritizing simplicity and forgiveness in the user experience, allowing users to maintain productivity without the pressure of strict time constraints.",
      tech: ["JavaScript", "React", "Node.js", "PostgreSQL", "OAuth", "Jina Ai(Embeddings)", "Express.js", "Vercel(Webhosting)"],
      period: "2024 - Current",
      links: [
        { 
          url: "https://github.com/gsdyu/Calcoy", 
          icon: <Github className="w-5 h-5" />,
          label: "Github"
        },
        { 
          url: "https://www.calcoy.com/", 
          icon: <ExternalLink className="w-5 h-5" />,
          label: "Calcoy.com"
        }
      ],
      images: [
        {
          src: "/1.webp",
          title: "Calendar Interface",
          explanation: "This is the typical calendar interface left is naviagation, top is where to change days, right is sidebar where the minicalendar, groups, filters, and tasks list are located"
        },
        {
          src: "/2.webp",
          title: "Smart Scheduling",
          explanation: "This is an example of the ai creating an eventm you can change the date and talk with the ai to optimize your schedule + conversation history on the right side"
        },
        {
          src: "/3.webp",
          title: "Group + Event added",
          explanation: "An event from the groups/server is created + the group/server is added to the filters"
        },
        {
          src: "/4.webp",
          title: "In server + week interface",
          explanation: "In this interface this time we are in the actual server itself in the week option where when we navigate on the minicalendar there is a signifier for what day and week we clicked on and for the calendar itself there is a highlight for the specifc day"
        },
        {
          src: "/5.webp",
          title: "Dashboard interface + Ai Insights + Upcoming tasks",
          explanation: "So this dashboard interface is meant to show to the user like stats over time on what percentage of tasks are finished and the goal of the app is to used these stats to learn from the user and to give recommendations and optimize the users schedule to increase their productivity and completion rate"
        },
        {
          src: "/6.webp",
          title: "Friends",
          explanation: "If you ever want friends to have a community or just to keep accountibility or plan with your friend you can add friends"
        },
        {
          src: "/7.webp",
          title: "Checkings friends calendar",
          explanation: "After you have a friend added you can view and check their individual calendar so you can find a day to go out or do something or you can remind them if they are missing something"
        }
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Lead Developer",
      company: "Food Truck Finder",
      description: "Created a food truck finder that addresses common frustrations with existing food apps. Implemented unique features like real-time busyness tracking, dedicated menu sections (not just photos), and automatic map updates for open/closed status. Built with a focus on user convenience - providing accurate locations, multi-filter search, and up-to-date information that typical food apps often lack",
      tech: ["Next.js", "React Leaflet", "MVC-Architecture", "Javascript"],
      period: "2024",
      links: [
        { 
          url: "https://github.com/DeathGumi/Food-Truck-Finder", 
          icon: <Github className="w-5 h-5" />,
          label: "Github"
        }
      ],
      images: [
        {
          src: "/f1.webp",
          title: "Initial page interface",
          explanation: "This was made to be a simple project to just put out a design of an application to track where food trucks are. (Used fake data for simplicity since there wasn't actually good data that I could find regarding food trucks near me. Left side is the food truck list, filter, and right side is the map and locations of food trucks that are currently available"
        },
        {
          src: "/f2.webp",
          title: "Hover Modal",
          explanation: "When hovering the food trucks it gives detailed information of the food truck, how busy it is, the reviews, and the description"
        },
        {
          src: "/f3.webp",
          title: "Filters",
          explanation: "Filters expanded with all the options predetermined (Price, Cuisine, Minimum Rating, Operating Status) It's preset to all but the user can click any of those choices"
        },
        {
          src: "/f4.webp",
          title: "Food Truck Modal ",
          explanation: "In this modal you can see the review in menus(I put a separate menu tab cause food review apps like yelp typically dont have a menu), you can also delete reviews and delete food truck in this modal, and also has the general info"
        },
        {
          src: "/f5.webp",
          title: "Add review",
          explanation: "Straightforward you can add a review and an image"
        },
        {
          src: "/f6.webp",
          title: "Menu",
          explanation: "Expanded menu"
        },
        {
          src: "/f7.webp",
          title: "Add FoodTruck Form",
          explanation: "For owners they can add their foodtruck by filling out the form"
        },
        {
          src: "/f8.webp",
          title: "Closed food trucks",
          explanation: "Once a food truck is closed it will still show on the list but in the closed food truck list and not appear on the maps until it reopens"
        }
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Designer and Developer",
      company: "Mina Hanna Portfolio",
      description: "Built a portfolio website with a unique FPS game-inspired interface, featuring interactive elements like a fingerprint scanner entry and spy-themed terminal UI. Exercised creative freedom to craft an engaging yet professional browsing experience that stands out from traditional portfolios",
      tech: ["Next.js", "Typescript"],
      period: "January 2025",
      links: [
        { 
          url: "https://web-livid-beta.vercel.app/", 
          icon: <ExternalLink className="w-5 h-5" />,
          label: "Website"
        }
      ],
      images: [
        {
          src: "/m1.webp",
          title: "Inital Page",
          explanation: "So this page in order to bypass it there is a fingerprint scanner on the top that you click originally this idea came cause Mina likes FPS games and I wanted to encorporate something regarding it. I was also inspired by a Valorant recap so I created like a spy/fps ui."
        },
        {
          src: "/m2.webp",
          title: "Main Directory",
          explanation: "Once you gain access from pressing the finger scanner you are led to the directory, I also added little details below like the time and like fake data analytics to not only fill the space but add some detail to make it look more friendly. The directory is simple with hover effects to show that the user is hovering over and titles that are clear and concise "
        },
        {
          src: "/m3.webp",
          title: "Projects",
          explanation: "Mina wanted something simple to display his projects so I let him input whatever he wanted I just designed the page for him"
        },
        {
          src: "/m4.webp",
          title: "Experience",
          explanation: "Mina just wanted to display his experience so we used the same template as the Project page"
        },
        {
          src: "/m5.webp",
          title: "Contact",
          explanation: "For this page I just wanted it to be simple with the Logos not much to say here other than the themed messaging and same template as before"
        },
        {
          src: "/m6.webp",
          title: "About",
          explanation: "This page I wanted to differentiate from the others since this one is about Mina so I wanted to separate his about from his education and coursework (Clear conscise and straight to the point)"
        }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <SplitRevealTitle />

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <AnimatedCard 
              key={project.title} 
              project={project} 
              index={index}
              onImageClick={(projectIndex, imageIndex) => 
                setSelectedImage({ projectIndex, imageIndex })}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            images={projects[selectedImage.projectIndex].images || []}
            currentIndex={selectedImage.imageIndex}
            onClose={() => setSelectedImage(null)}
            onNavigate={(newIndex) => setSelectedImage({
              projectIndex: selectedImage.projectIndex,
              imageIndex: newIndex
            })}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;