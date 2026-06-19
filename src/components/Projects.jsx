// Project.jsx - With responsive category filter (dropdown on mobile)
import React, { useState, useEffect, useRef } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Project.module.css';
import { createClient } from 'contentful';

// Contentful client setup
const client = createClient({
  space: '7wddt967mgfr',
  accessToken: 'HDc3S_flilPqMp3DMm0LTOMpUWIhlDnLdjeTn8nyekY',
});

function Projects() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [projectLists, setProjectLists] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const categoryScrollRef = useRef(null);
  const projectsGridRef = useRef(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);
  
  // Dropdown state for mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Truncate text based on screen size
  const getTruncateLength = () => {
    if (window.innerWidth <= 576) return 60;
    if (window.innerWidth <= 768) return 80;
    return 100;
  };

  const truncateText = (text, maxLength = null) => {
    if (!text) return '';
    const length = maxLength || getTruncateLength();
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  // Helper function to extract description from rich text
  const extractDescription = (richText) => {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    
    let fullText = '';
    
    const extractText = (node) => {
      if (node.nodeType === 'text') {
        return node.value || '';
      }
      
      if (node.content) {
        let text = '';
        for (const child of node.content) {
          text += extractText(child);
        }
        if (node.nodeType === 'paragraph' && text) {
          text += ' ';
        }
        return text;
      }
      
      return '';
    };
    
    if (richText.content) {
      for (const node of richText.content) {
        fullText += extractText(node);
      }
    }
    
    return fullText.trim();
  };

  // Get unique categories from projects
  const getUniqueCategories = (projects) => {
    const allCategories = projects.flatMap(project => project.categories || []);
    return [...new Set(allCategories)];
  };

  // Filter projects based on selected category
  const filterProjects = (category) => {
    if (category === 'All Designs' || category === 'All') {
      setFilteredProjects(projectLists);
    } else {
      const filtered = projectLists.filter(project => 
        project.categories && project.categories.includes(category)
      );
      setFilteredProjects(filtered);
    }
  };

  const handleCatLinks = (index, categoryName) => {
    setActiveIndex(index);
    filterProjects(categoryName);
    setIsDropdownOpen(false); // Close dropdown after selection on mobile
    
    // Scroll category into view on mobile
    if (window.innerWidth <= 768 && categoryScrollRef.current) {
      const activeElement = categoryScrollRef.current.children[index];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // Navigate to project details page
  const handleReadMore = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Change page - WITHOUT scrolling to top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go to next page - WITHOUT scrolling to top
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page - WITHOUT scrolling to top
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  useEffect(() => {
    setIsLoading(true);
    
    client.getEntries({ content_type: 'cvProjects' })
      .then((response) => {
        console.log("Contentful API Response:", response);
        
        const projectData = response.items.map((item) => {
          let imageUrl = '';
          if (item.fields.image && item.fields.image[0]) {
            imageUrl = `https:${item.fields.image[0]?.fields?.file?.url || ''}`;
          }
          
          let description = extractDescription(item.fields.description);
          
          let projectCategories = [];
          if (item.fields.categories) {
            if (Array.isArray(item.fields.categories)) {
              projectCategories = item.fields.categories;
            } else if (typeof item.fields.categories === 'string') {
              projectCategories = [item.fields.categories];
            }
          }
          
          return {
            id: item.sys.id,
            title: item.fields.title || 'Untitled',
            description: description,
            categories: projectCategories,
            imageUrl: imageUrl,
            date: item.fields.date || '',
          };
        });

        setProjectLists(projectData);
        setFilteredProjects(projectData);
        
        const uniqueCats = getUniqueCategories(projectData);
        setCategories(uniqueCats);
        
        setIsLoading(false);
        console.log("Processed Projects:", projectData);
        console.log("Unique Categories:", uniqueCats);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const categoryList = ['All Designs', ...categories];
  const currentCategory = categoryList[activeIndex];

  return (
    <div className={styles.projectsWrapper}>
      <CContainer>
        {/* Header Section */}
        <CRow>
          <CCol>
            <h1 className={styles.title}>My Recent Works</h1>
            <h4 className={`mb-5 ${styles.subtitle}`}>
              Showcases a collection of my latest projects, highlighting the quality and creativity of my work.
            </h4>
          </CCol>
        </CRow>

        {/* Category Filter - Desktop: Horizontal Scroll, Mobile: Dropdown */}
        <CRow>
          <CCol className={styles.blueBox}>
            {/* Desktop View - Horizontal Filter */}
            <div className={styles.categoryWrapperDesktop}>
              <ul className={styles.ul} ref={categoryScrollRef}>
                {categoryList.map((category, index) => (
                  <li
                    key={index}
                    className={`${styles.li} ${activeIndex === index ? styles.active : ''}`}
                    onClick={() => handleCatLinks(index, category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile View - Dropdown Filter */}
            <div className={styles.categoryWrapperMobile} ref={dropdownRef}>
              <button 
                className={styles.dropdownButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{currentCategory}</span>
                <svg className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.rotated : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  {categoryList.map((category, index) => (
                    <li
                      key={index}
                      className={`${styles.dropdownItem} ${activeIndex === index ? styles.dropdownActive : ''}`}
                      onClick={() => handleCatLinks(index, category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CCol>
        </CRow>

        {/* Loading State */}
        {isLoading ? (
          <CRow className="mt-5">
            <CCol className="text-center py-5">
              <div className={styles.loader}>
                <div className={styles.spinner}></div>
                <p>Loading projects...</p>
              </div>
            </CCol>
          </CRow>
        ) : filteredProjects.length === 0 ? (
          <CRow className="mt-5">
            <CCol className="text-center py-5">
              <div className={styles.noProjects}>
                <p>No projects found in this category.</p>
              </div>
            </CCol>
          </CRow>
        ) : (
          <>
            {/* Projects Grid */}
            <div ref={projectsGridRef}>
              <CRow className={styles.projectsGrid}>
                {currentProjects.map((project) => (
                  <CCol 
                    key={project.id} 
                    lg={4} 
                    md={6} 
                    sm={12} 
                    xs={6}
                    className={styles.projectColumn}
                  >
                    <div className={styles.projectCard}>
                      <div className={styles.imageContainer}>
                        <img
                          src={project.imageUrl}
                          className={styles.projectImage}
                          alt={project.title}
                          loading="lazy"
                        />
                        {project.categories && project.categories.length > 0 && (
                          <span className={styles.categoryBadge}>
                            {project.categories[0]}
                          </span>
                        )}
                      </div>
                      
                      <div className={styles.projectInfo}>
                        <h4 className={styles.name}>{project.title}</h4>
                        {project.description && (
                          <p className={styles.description}>
                            {truncateText(project.description)}
                          </p>
                        )}
                        <div className={styles.linkWrapper}>
                          <button 
                            className={styles.readMoreBtn}
                            onClick={() => handleReadMore(project.id)}
                          >
                            Read More
                            <svg className={styles.btnIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CCol>
                ))}
              </CRow>
            </div>

            {/* Modern Pagination */}
            {totalPages > 1 && (
              <div className={styles.paginationWrapper}>
                <div className={styles.pagination}>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`${styles.pageBtn} ${styles.prevBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Prev</span>
                  </button>

                  <div className={styles.pageNumbers}>
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && paginate(page)}
                        className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''} ${page === '...' ? styles.dots : ''}`}
                        disabled={page === '...'}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`${styles.pageBtn} ${styles.nextBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
                  >
                    <span>Next</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Page Info */}
                <div className={styles.pageInfo}>
                  Showing {indexOfFirstProject + 1} to {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
                </div>
              </div>
            )}
          </>
        )}
      </CContainer>
    </div>
  );
}

export default Projects;