import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

interface AutoClampTextProps {
  children: React.ReactNode;
  className?: string;
  parentHeight?: number;
}

export function AutoClampText({
  children,
  className = '',
  parentHeight = 0,
}: AutoClampTextProps) {
  const [lineClamp, setLineClamp] = useState(4); // Default number of lines
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current && parentHeight > 0) {
      // Calculate the maximum number of lines based on 1/4 of the parent height and line-height
      const maxLines = Math.floor(parentHeight / 4 / 12);

      // Limit the maximum number of lines based on the parent height
      setLineClamp(maxLines > 4 ? 4 : maxLines);
    }
  }, [parentHeight, children]);

  return (
    <p
      ref={textRef}
      className={cn(className, 'text-lg font-medium')}
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        WebkitLineClamp: lineClamp,
      }}
    >
      {children}
    </p>
  );
}
