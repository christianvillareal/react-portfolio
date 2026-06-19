// ProjectDetails.jsx - With Proper Rich Text Rendering
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from 'contentful';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import styles from '../css/ProjectDetails.module.css';

import SEO from './SEO';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Contentful client setup
const client = createClient({
  space: '7wddt967mgfr',
  accessToken: 'HDc3S_flilPqMp3DMm0LTOMpUWIhlDnLdjeTn8nyekY',
});

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = project?.images?.length || 0;

  // Initialize tsparticles with slim version
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Custom rich text renderer options
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className={styles.boldText}>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em className={styles.italicText}>{text}</em>,
      [MARKS.UNDERLINE]: (text) => <u className={styles.underlineText}>{text}</u>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1 className={styles.heading1}>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className={styles.heading2}>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className={styles.heading3}>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 className={styles.heading4}>{children}</h4>,
      [BLOCKS.HEADING_5]: (node, children) => <h5 className={styles.heading5}>{children}</h5>,
      [BLOCKS.HEADING_6]: (node, children) => <h6 className={styles.heading6}>{children}</h6>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p className={styles.paragraph}>{children}</p>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote className={styles.blockquote}>{children}</blockquote>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className={styles.unorderedList}>{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className={styles.orderedList}>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className={styles.listItem}>{children}</li>,
      [BLOCKS.HR]: () => <hr className={styles.horizontalRule} />,
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} className={styles.hyperlink} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };

  // Open lightbox with selected image
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    if (!imageCount) return;

    setCurrentImageIndex((prev) => 
      prev === 0 ? imageCount - 1 : prev - 1
    );
  }, [imageCount]);

  // Navigate to next image
  const nextImage = useCallback(() => {
    if (!imageCount) return;

    setCurrentImageIndex((prev) => 
      prev === imageCount - 1 ? 0 : prev + 1
    );
  }, [imageCount]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeLightbox, lightboxOpen, nextImage, prevImage]);

  // Fetch project data
  useEffect(() => {
    setIsLoading(true);
    
    client.getEntries({ content_type: 'cvProjects', 'sys.id': id })
      .then((response) => {
        if (response.items.length > 0) {
          const item = response.items[0];
          
          const images = item.fields.image?.map(img => `https:${img.fields.file.url}`) || [];
          const categories = Array.isArray(item.fields.categories) 
            ? item.fields.categories 
            : item.fields.categories ? [item.fields.categories] : [];
          
          setProject({
            id: item.sys.id,
            title: item.fields.title || 'Untitled',
            description: item.fields.description, // Keep as rich text object
            categories,
            images,
            date: item.fields.date || '',
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching project:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <>
      <SEO 
          title="Loading Project | Christian Villareal"
          description="Loading project details..."
          url={`/project/${id}`}
        />
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Loading project...</p>
        </div>
      </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
       <SEO 
          title="Project Not Found | Christian Villareal"
          description="The project you're looking for could not be found."
          url={`/project/${id}`}
        />
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>🔍</div>
          <h2>Project Not Found</h2>
          <p>Sorry, we couldn't find the project you're looking for.</p>
          <button onClick={() => navigate('/')} className={styles.backHomeBtn}>
            Back to Home
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <SEO 
        title={`${project.title} | Christian Villareal Portfolio`}
        description={typeof project.description === 'string' 
          ? project.description.substring(0, 160) 
          : `Check out ${project.title} - a project by Christian Villareal, React Developer and UI/UX Designer.`
        }
        keywords={`${project.categories?.join(', ') || 'project'}, portfolio, React, web design, development`}
        image={project.images?.[0] || `${process.env.PUBLIC_URL}/images/og-image.png`}
        url={`/project/${id}`}
        type="article"
      />
      
    <div className={styles.projectDetails}>
      {/* Hero Section with Particles - ONLY in header */}
      <div className={styles.heroSection}>
        <div className={styles.particlesWrapper}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: {
                color: {
                  value: 'transparent',
                },
              },
              fpsLimit: 60,
              particles: {
                color: {
                  value: '#3b82f6',
                },
                links: {
                  color: '#3b82f6',
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: 'none',
                  random: false,
                  straight: false,
                  outModes: {
                    default: 'bounce',
                  },
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: 'circle',
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
        
        <div className={styles.heroOverlay}>
          <CContainer>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              ← Back to Projects
            </button>
            <div className={styles.heroContent}>
              <span className={styles.heroCategory}>
                {project.categories[0]}
              </span>
              <h1 className={styles.heroTitle}>{project.title}</h1>
              {project.date && (
                <div className={styles.heroDate}>
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
            </div>
          </CContainer>
        </div>
      </div>

      {/* Rest of the content - NO particles */}
      <CContainer>
        <div className={styles.imageSliderSection}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={false}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className={styles.imageSwiper}
          >
            {project.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  className={styles.slideItem}
                  onClick={() => openLightbox(idx)}
                >
                  <img src={img} alt={`${project.title} - ${idx + 1}`} />
                  <div className={styles.imageOverlay}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 3h6v6M14 10L21 3M10 21H4v-6M3 3L10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="9" cy="15" r="4" stroke="white" strokeWidth="2"/>
                    </svg>
                    <span>Click to enlarge</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {project.images.length > 3 && (
            <div className={styles.navigationArrows}>
              <button 
                className={styles.navArrow}
                onClick={() => swiperRef.current?.swiper?.slidePrev()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={styles.navArrow}
                onClick={() => swiperRef.current?.swiper?.slideNext()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className={styles.descriptionSection}>
          <CRow className="justify-content-center">
            <CCol lg={10}>
              <div className={styles.descriptionCard}>
                <div className={styles.descriptionHeader}>
                  <span className={styles.descriptionIcon}>📖</span>
                  <h2>Project Overview</h2>
                </div>
                <div className={styles.projectDescription}>
                  {/* Use rich text renderer instead of plain text */}
                  {documentToReactComponents(project.description, richTextOptions)}
                </div>
                
                <div className={styles.techSection}>
                  <h3>Technologies Used</h3>
                  <div className={styles.tagsContainer}>
                    {project.categories.map((cat, idx) => (
                      <span key={idx} className={styles.tag}>{cat}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CCol>
          </CRow>
        </div>
      </CContainer>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button 
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={project.images[currentImageIndex]} 
              alt={`${project.title} - ${currentImageIndex + 1}`}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxInfo}>
              <span className={styles.lightboxCounter}>
                {currentImageIndex + 1} / {project.images.length}
              </span>
              <span className={styles.lightboxTitle}>{project.title}</span>
            </div>
          </div>
          
          <button 
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default ProjectDetails;
