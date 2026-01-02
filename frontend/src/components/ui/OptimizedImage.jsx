import { useState, useRef, useEffect } from 'react';

/**
 * OptimizedImage component with lazy loading and blur placeholder
 */
const OptimizedImage = ({ 
    src, 
    alt, 
    className = '', 
    width,
    height,
    placeholder = 'blur', // 'blur' | 'empty'
    objectFit = 'cover'
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Generate low-quality placeholder from Cloudinary URL
    const getPlaceholderUrl = (url) => {
        if (!url) return '';
        // Cloudinary transformation for tiny placeholder
        if (url.includes('cloudinary.com')) {
            return url.replace('/upload/', '/upload/w_20,q_10,f_auto/');
        }
        return url;
    };

    const placeholderUrl = placeholder === 'blur' ? getPlaceholderUrl(src) : '';

    return (
        <div 
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            style={{ width, height }}
        >
            {/* Blur placeholder */}
            {placeholder === 'blur' && !isLoaded && (
                <img
                    src={placeholderUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full blur-lg scale-110"
                    style={{ objectFit }}
                    aria-hidden="true"
                />
            )}
            
            {/* Actual image - only load when in view */}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ objectFit }}
                />
            )}
            
            {/* Empty placeholder when not blur */}
            {placeholder === 'empty' && !isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
        </div>
    );
};

export default OptimizedImage;
