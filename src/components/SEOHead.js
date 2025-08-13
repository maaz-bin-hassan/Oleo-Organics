import React from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  url, 
  type = 'website',
  image,
  structuredData 
}) => {
  React.useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && description) {
      ogDescription.setAttribute('content', description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && url) {
      ogUrl.setAttribute('content', url);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType && type) {
      ogType.setAttribute('content', type);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && image) {
      ogImage.setAttribute('content', image);
    }

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      // Cleanup on unmount
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [title, description, keywords, url, type, image, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;
