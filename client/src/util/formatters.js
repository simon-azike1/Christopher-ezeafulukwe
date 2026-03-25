export const wordCount = (text) => text.trim().split(/\\s+/).filter(Boolean).length;

export const estimatedReadTime = (text, wordsPerMinute = 200) => {
  const words = wordCount(text);
  return Math.ceil(words / wordsPerMinute);
};

export const formatDate = (dateString, format = 'MMM DD, YYYY') => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(new Date(dateString));
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
