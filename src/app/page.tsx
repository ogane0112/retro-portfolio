'use client'

import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Gamepad2, User, Mail, ChevronLeft, Menu } from 'lucide-react';
import Image from 'next/image';

export default function Component() {
  const [selectedSection, setSelectedSection] = useState('about');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const profile = {
    name: "YOUR NAME",
    title: "Full Stack Developer",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    projects: [
      {
        title: "Project 1",
        description: "ゲーム風ポートフォリオサイト",
        tech: ["React", "Tailwind CSS"]
      },
      {
        title: "Project 2",
        description: "タスク管理アプリ",
        tech: ["Node.js", "Express", "MongoDB"]
      }
    ]
  };

  const slides = [
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const NavigationItems = () => (
    <>
      {[
        { id: 'about', icon: User, label: 'About Me' },
        { id: 'skills', icon: Code, label: 'Skills' },
        { id: 'projects', icon: Gamepad2, label: 'Projects' },
        { id: 'contact', icon: Mail, label: 'Contact' }
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => {
            setSelectedSection(id);
            setIsMobileMenuOpen(false);
          }}
          className={`p-4 rounded-lg border-2 flex items-center gap-2 transition-all transform hover:scale-105 w-full
            ${selectedSection === id 
              ? 'bg-emerald-600 border-yellow-300 shadow-lg shadow-emerald-500/50' 
              : 'bg-indigo-900/50 border-emerald-400 hover:bg-emerald-600/50'}
            ${isSidebarCollapsed ? 'justify-center' : ''}`}
          title={label}
        >
          <Icon className="animate-pulse" /> 
          <span className={`text-left ${isSidebarCollapsed ? 'hidden' : ''}`}>{label}</span>
        </button>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-emerald-900 text-white font-mono">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* サイドバー - デスクトップ */}
        <div className={`hidden lg:flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'} p-6 bg-indigo-900/50 border-r-2 border-emerald-400 space-y-4 transition-all duration-300`}>
          <NavigationItems />
          <button
            onClick={toggleSidebar}
            className="mt-auto p-2 bg-emerald-600 rounded-lg self-center"
          >
            {isSidebarCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>

        {/* モバイルメニュー */}
        <div className={`lg:hidden fixed inset-0 bg-indigo-900/95 z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-emerald-600 rounded-lg mb-4"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="space-y-2">
              <NavigationItems />
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 p-4 lg:p-8">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden fixed top-4 left-6 z-50 p-2 bg-emerald-600 rounded-lg ${
              isMobileMenuOpen ? 'hidden' : 'block'
            }`}
          >
            <Menu size={24} />
          </button>
          {/* ヘッダー（モバイルとデスクトップ両方で表示） */}
          <header className="text-center mb-8 bg-indigo-800/50 p-6 rounded-lg border-4 border-emerald-400 shadow-lg shadow-emerald-500/20">
            <div className="animate-bounce mb-4">
              <span className="inline-block px-4 py-2 bg-emerald-500 rounded-full text-sm">Welcome!</span>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-yellow-300 animate-pulse">
              {profile.name}
            </h1>
            <p className="text-xl text-emerald-400">{profile.title}</p>
          </header>


          {/* プロジェクトスライドショー */}
          <div className="relative mb-8 bg-indigo-800/50 p-4 rounded-lg border-4 border-emerald-400">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src={slides[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-500"
              />
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-emerald-500 p-2 rounded-full hover:bg-emerald-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 p-2 rounded-full hover:bg-emerald-600 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-emerald-500' : 'bg-emerald-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* セクションコンテンツ */}
          <div className="bg-indigo-800/50 p-6 rounded-lg border-4 border-emerald-400 shadow-lg shadow-emerald-500/20">
            {selectedSection === 'about' && (
              <div className="space-y-4">
                <h2 className="text-2xl text-yellow-300 flex items-center gap-2">
                  <ChevronRight className="text-emerald-400" />
                  About Me
                </h2>
                <p className="leading-relaxed">
                  こんにちは！私はフルスタック開発者として、
                  モダンな技術を使用して革新的なウェブアプリケーションの開発に情熱を注いでいます。
                  ユーザー体験を重視し、クリエイティブな問題解決を心がけています。
                </p>
              </div>
            )}

            {selectedSection === 'skills' && (
              <div className="space-y-4">
                <h2 className="text-2xl text-yellow-300 flex items-center gap-2">
                  <ChevronRight className="text-emerald-400" />
                  Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {profile.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="bg-indigo-700/50 p-3 rounded-lg border-2 border-emerald-400 text-center transform transition-all hover:scale-105 hover:bg-emerald-600/50"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSection === 'projects' && (
              <div className="space-y-4">
                <h2 className="text-2xl text-yellow-300 flex items-center gap-2">
                  <ChevronRight className="text-emerald-400" />
                  Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.projects.map((project, index) => (
                    <div 
                      key={index}
                      className="bg-indigo-700/50 p-4 rounded-lg border-2 border-emerald-400 transform transition-all hover:scale-105 hover:bg-emerald-600/50"
                    >
                      <h3 className="text-xl text-yellow-300 mb-2">{project.title}</h3>
                      <p className="mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="bg-emerald-600 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSection === 'contact' && (
              <div className="space-y-4">
                <h2 className="text-2xl text-yellow-300 flex items-center gap-2">
                  <ChevronRight className="text-emerald-400" />
                  Contact
                </h2>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 rounded bg-indigo-700/50 border-2 border-emerald-400 text-white placeholder-emerald-300 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 rounded bg-indigo-700/50 border-2 border-emerald-400 text-white placeholder-emerald-300 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full p-3 rounded bg-indigo-700/50 border-2 border-emerald-400 text-white placeholder-emerald-300 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg border-2 border-yellow-300 w-full transform transition-all hover:scale-105">
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
