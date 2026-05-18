import React, { useState, useEffect } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/News.module.css';

// Import Swiper for slider functionality
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Arrow icon for read more
const ArrowIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 12H19M19 12L13 6M19 12L13 18" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Loading Skeleton Component
const NewsSkeleton = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonLink}></div>
    </div>
  </div>
);

// Array of different fallback images (Unsplash - tech & design related)
const fallbackImagePool = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&h=240&fit=crop',
];

// Get random fallback image (different for each news item)
const getRandomFallbackImage = (id) => {
  // Use id to get deterministic but different image for each news item
  const index = id % fallbackImagePool.length;
  return fallbackImagePool[index];
};

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo data with varied content lengths and different fallback images
  const getDemoNews = () => [
    {
      id: 1,
      title: 'The Role of Technology in Modern Business Transformation',
      description: 'We put your ideas and thus your wishes in the form of a unique web experience that drives results. Our innovative approach ensures your business stays ahead.',
      imageSrc: getRandomFallbackImage(1),
      imageAlt: 'Technology in Business',
      date: 'Dec 15, 2024',
      link: '#',
      source: 'Tech News',
    },
    {
      id: 2,
      title: 'Design Trends Shaping 2025',
      description: 'Innovative design approaches that are transforming how users interact with digital products.',
      imageSrc: getRandomFallbackImage(2),
      imageAlt: 'Design Trends',
      date: 'Dec 12, 2024',
      link: '#',
      source: 'Design Weekly',
    },
    {
      id: 3,
      title: 'AI Revolution in Web Development',
      description: 'How artificial intelligence is changing the landscape of modern web development and creating new possibilities.',
      imageSrc: getRandomFallbackImage(3),
      imageAlt: 'AI Development',
      date: 'Dec 10, 2024',
      link: '#',
      source: 'Dev Insider',
    },
    {
      id: 4,
      title: 'Sustainable Web Design Practices',
      description: 'Creating eco-friendly digital experiences that reduce carbon footprint.',
      imageSrc: getRandomFallbackImage(4),
      imageAlt: 'Sustainable Design',
      date: 'Dec 8, 2024',
      link: '#',
      source: 'Green Tech',
    },
    {
      id: 5,
      title: 'The Future of UX/UI Design',
      description: 'Emerging trends in user experience that prioritize accessibility and inclusivity for all users.',
      imageSrc: getRandomFallbackImage(5),
      imageAlt: 'UX/UI Future',
      date: 'Dec 5, 2024',
      link: '#',
      source: 'UX Collective',
    },
    {
      id: 6,
      title: 'Building Scalable React Applications',
      description: 'Best practices for creating maintainable and high-performance React apps.',
      imageSrc: getRandomFallbackImage(6),
      imageAlt: 'React Development',
      date: 'Dec 3, 2024',
      link: '#',
      source: 'React Universe',
    },
    {
      id: 7,
      title: 'Cybersecurity Trends',
      description: 'Latest developments in protecting digital assets and user privacy.',
      imageSrc: getRandomFallbackImage(7),
      imageAlt: 'Cybersecurity',
      date: 'Nov 28, 2024',
      link: '#',
      source: 'Security Today',
    },
    {
      id: 8,
      title: 'Cloud Computing Innovations',
      description: 'How cloud technology is enabling scalable and flexible business solutions for modern enterprises.',
      imageSrc: getRandomFallbackImage(8),
      imageAlt: 'Cloud Computing',
      date: 'Nov 25, 2024',
      link: '#',
      source: 'Cloud Weekly',
    },
    {
      id: 9,
      title: 'Mobile App Design Best Practices',
      description: 'Creating intuitive and engaging mobile experiences for modern users.',
      imageSrc: getRandomFallbackImage(9),
      imageAlt: 'Mobile Design',
      date: 'Nov 20, 2024',
      link: '#',
      source: 'App Design Hub',
    },
  ];

  const fetchNewsFromAPI = async () => {
    setLoading(true);
    try {
      const techFeeds = [
        { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/', source: 'TechCrunch' },
        { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.wired.com/feed/rss', source: 'Wired' },
        { url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.smashingmagazine.com/feed/', source: 'Smashing Magazine' }
      ];
      
      const responses = await Promise.all(
        techFeeds.map(async (feed) => {
          try {
            const res = await fetch(feed.url);
            const data = await res.json();
            return { data, source: feed.source };
          } catch (err) {
            console.error(`Error fetching ${feed.source}:`, err);
            return { data: null, source: feed.source };
          }
        })
      );
      
      let allArticles = [];
      let articleIndex = 0;
      
      responses.forEach(({ data, source }) => {
        if (data && data.items) {
          const articles = data.items.slice(0, 3).map((item) => {
            articleIndex++;
            let imageUrl = '';
            
            if (item.thumbnail) {
              imageUrl = item.thumbnail;
            }
            else if (item.enclosure && item.enclosure.link) {
              imageUrl = item.enclosure.link;
            }
            else if (item.description) {
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch && imgMatch[1]) {
                imageUrl = imgMatch[1];
              }
            }
            
            // Use different fallback image for each article
            if (!imageUrl || imageUrl === '') {
              imageUrl = getRandomFallbackImage(articleIndex);
            }
            
            return {
              id: `${source}-${item.pubDate}`,
              title: item.title?.length > 70 ? item.title.substring(0, 70) + '...' : item.title,
              description: item.description ? 
                (item.description.replace(/<[^>]*>/g, '').substring(0, 130) + '...') : 
                'We put your ideas and thus your wishes in the form of a unique web experience that drives results.',
              imageSrc: imageUrl,
              imageAlt: item.title,
              date: new Date(item.pubDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              }),
              link: item.link,
              source: source
            };
          });
          allArticles = [...allArticles, ...articles];
        }
      });
      
      if (allArticles.length === 0) {
        throw new Error('No articles fetched');
      }
      
      setNews(allArticles.slice(0, 9));
    } catch (err) {
      console.error('Error fetching news:', err);
      setNews(getDemoNews());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsFromAPI();
  }, []);

  if (loading) {
    return (
      <section id="news" className={styles.newsSection}>
        <CContainer>
          <CRow>
            <CCol md={12}>
              <h1 className={styles.title}>Latest News & Blogs</h1>
              <h4 className={styles.subtitle}>
                Explore our recent articles and news to keep informed about new developments, 
                expert opinions, and innovative solutions.
              </h4>
            </CCol>
          </CRow>
          <div className={styles.sliderContainer}>
            <div className={styles.skeletonGrid}>
              {[1, 2, 3].map((item) => (
                <NewsSkeleton key={item} />
              ))}
            </div>
          </div>
        </CContainer>
      </section>
    );
  }

  return (
    <section id="news" className={styles.newsSection}>
      <CContainer>
        {/* Header Section */}
        <CRow>
          <CCol md={12}>
            <h1 className={styles.title}>Latest News & Blogs</h1>
            <h4 className={styles.subtitle}>
              Explore our recent articles and news to keep informed about new developments, 
              expert opinions, and innovative solutions.
            </h4>
          </CCol>
        </CRow>

        {/* Slider Container with arrows at bottom right */}
        <div className={styles.sliderContainer}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className={styles.newsSlider}
          >
            {news.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className={styles.newsCard}>
                  <div className={styles.newsImageWrapper}>
                    <img 
                      src={item.imageSrc} 
                      alt={item.imageAlt}
                      className={styles.newsImage}
                      onError={(e) => {
                        // Use different fallback based on index
                        e.target.src = getRandomFallbackImage(index + 100);
                      }}
                    />
                    <div className={styles.dateBadge}>
                      {item.date}
                    </div>
                    {item.source && <div className={styles.sourceBadge}>{item.source}</div>}
                  </div>
                  <div className={styles.newsContent}>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsDescription}>{item.description}</p>
                    <a 
                      href={item.link} 
                      className={styles.readMoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      read more ...
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Arrows - Bottom Right */}
          <div className={styles.customNavigation}>
            <div className="swiper-button-prev-custom">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="swiper-button-next-custom">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </CContainer>
    </section>
  );
}

export default News;