'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { SwitchLanguage } from '@/modules/learners/components/learners-layout/header/widgets';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('welcome');
  const t = useTranslations('Consultant.navbar');

  const navItems = [
    { name: t('home'), href: '#welcome' },
    { name: t('services'), href: '#services' },
    { name: t('global'), href: '#global' },
    { name: t('insights'), href: '#insight' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string) => {
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 py-4"
      >
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold">Rabito</div>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
          <SwitchLanguage />
        </div>
      </motion.nav>
      <div className="mx-auto max-w-7xl lg:px-8 py-10">{children}</div>
    </div>
  );
};

export default Layout;
