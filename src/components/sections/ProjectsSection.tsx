"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExpandableCard,
  ExpandableCardProvider,
  CardThumbnail,
  CardExpanded,
} from "@/components/ui/expandable-card";
import { AppScreenshot } from "@/components/AppScreenshot";
import { TechIcon, getDeviconName, parseIconString } from "@/components/ui/tech-icon";
import { PortfolioData } from "@/types/portfolio";

interface ProjectsSectionProps {
  data: PortfolioData;
  resolvedTheme: string | undefined;
  isVideoFile: (filename: string) => boolean;
}

export default function ProjectsSection({ data, resolvedTheme, isVideoFile }: ProjectsSectionProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [projectFilters, setProjectFilters] = useState({
    status: "All",
    type: "All",
    platform: "All",
    technology: "All",
    client: "All"
  });

  return (
    <section id="projects" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Projects & Experiments</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A showcase of projects — some live in production, others live in my GitHub, all part of my journey as a developer.

          </p>
        </div>

        {/* Filter Toggle Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "group px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-3",
              showFilters
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white"
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filter Projects</span>
            {Object.values(projectFilters).filter(v => v !== "All").length > 0 && (
              <span className="px-2 py-0.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full text-xs font-bold">
                {Object.values(projectFilters).filter(v => v !== "All").length}
              </span>
            )}
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                showFilters && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Collapsible Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-gray-700">
                {/* Status Filter */}
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Status:</span>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                      const ele = e.currentTarget;
                      ele.style.cursor = 'grabbing';
                      const startX = e.pageX - ele.offsetLeft;
                      const scrollLeft = ele.scrollLeft;
                      const handleMouseMove = (e: MouseEvent) => {
                        const x = e.pageX - ele.offsetLeft;
                        const walk = (x - startX) * 2;
                        ele.scrollLeft = scrollLeft - walk;
                      };
                      const handleMouseUp = () => {
                        ele.style.cursor = 'grab';
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}>
                    {["All", ...Array.from(new Set(data.projects.map(p => p.status)))].map((status) => (
                      <button
                        key={status}
                        onClick={() => setProjectFilters({...projectFilters, status})}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                          projectFilters.status === status
                            ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Type:</span>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                      const ele = e.currentTarget;
                      ele.style.cursor = 'grabbing';
                      const startX = e.pageX - ele.offsetLeft;
                      const scrollLeft = ele.scrollLeft;
                      const handleMouseMove = (e: MouseEvent) => {
                        const x = e.pageX - ele.offsetLeft;
                        const walk = (x - startX) * 2;
                        ele.scrollLeft = scrollLeft - walk;
                      };
                      const handleMouseUp = () => {
                        ele.style.cursor = 'grab';
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}>
                    {["All", ...Array.from(new Set(data.projects.map(p => p.type)))].map((type) => (
                      <button
                        key={type}
                        onClick={() => setProjectFilters({...projectFilters, type})}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                          projectFilters.type === type
                            ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Platform Filter */}
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Platform:</span>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                      const ele = e.currentTarget;
                      ele.style.cursor = 'grabbing';
                      const startX = e.pageX - ele.offsetLeft;
                      const scrollLeft = ele.scrollLeft;
                      const handleMouseMove = (e: MouseEvent) => {
                        const x = e.pageX - ele.offsetLeft;
                        const walk = (x - startX) * 2;
                        ele.scrollLeft = scrollLeft - walk;
                      };
                      const handleMouseUp = () => {
                        ele.style.cursor = 'grab';
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}>
                    {["All", ...Array.from(new Set(data.projects.flatMap(p => Array.isArray(p.platform) ? p.platform : [p.platform])))].map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setProjectFilters({...projectFilters, platform})}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                          projectFilters.platform === platform
                            ? "bg-purple-600 dark:bg-purple-500 text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-500"
                        )}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technology Filter */}
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Tech:</span>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                      const ele = e.currentTarget;
                      ele.style.cursor = 'grabbing';
                      const startX = e.pageX - ele.offsetLeft;
                      const scrollLeft = ele.scrollLeft;
                      const handleMouseMove = (e: MouseEvent) => {
                        const x = e.pageX - ele.offsetLeft;
                        const walk = (x - startX) * 2;
                        ele.scrollLeft = scrollLeft - walk;
                      };
                      const handleMouseUp = () => {
                        ele.style.cursor = 'grab';
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}>
                    {["All", ...Array.from(new Set(data.projects.flatMap(p => p.technologies)))].slice(0, 10).map((tech) => (
                      <button
                        key={tech}
                        onClick={() => setProjectFilters({...projectFilters, technology: tech})}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 whitespace-nowrap flex-shrink-0",
                          projectFilters.technology === tech
                            ? "bg-amber-600 dark:bg-amber-500 text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-amber-600 dark:hover:border-amber-500"
                        )}
                      >
                        {tech !== "All" && <TechIcon name={getDeviconName(tech)} variant="original" className="text-sm" />}
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Filter */}
                {data.clients && data.clients.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Client:</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => {
                        const ele = e.currentTarget;
                        ele.style.cursor = 'grabbing';
                        const startX = e.pageX - ele.offsetLeft;
                        const scrollLeft = ele.scrollLeft;
                        const handleMouseMove = (e: MouseEvent) => {
                          const x = e.pageX - ele.offsetLeft;
                          const walk = (x - startX) * 2;
                          ele.scrollLeft = scrollLeft - walk;
                        };
                        const handleMouseUp = () => {
                          ele.style.cursor = 'grab';
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}>
                      {["All", ...data.clients.map(c => c.name)].map((client) => (
                        <button
                          key={client}
                          onClick={() => setProjectFilters({...projectFilters, client})}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                            projectFilters.client === client
                              ? "bg-rose-600 dark:bg-rose-500 text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-rose-600 dark:hover:border-rose-500"
                          )}
                        >
                          {client}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Filters Button */}
                {Object.values(projectFilters).some(v => v !== "All") && (
                  <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setProjectFilters({
                        status: "All",
                        type: "All",
                        platform: "All",
                        technology: "All",
                        client: "All"
                      })}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ExpandableCardProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.filter(project => {
              const matchesStatus = projectFilters.status === "All" || project.status === projectFilters.status;
              const matchesType = projectFilters.type === "All" || project.type === projectFilters.type;
              const matchesPlatform = projectFilters.platform === "All" || (
                Array.isArray(project.platform)
                  ? project.platform.includes(projectFilters.platform)
                  : project.platform === projectFilters.platform
              );
              const matchesTech = projectFilters.technology === "All" || project.technologies.includes(projectFilters.technology);
              const matchesClient = projectFilters.client === "All" || (
                data.clients.find(c => c.name === projectFilters.client)?.id === project.clientId
              );
              return matchesStatus && matchesType && matchesPlatform && matchesTech && matchesClient;
            }).sort((a, b) => a.sort - b.sort).map((project, index) => (
              <ExpandableCard key={index} id={`project-${index}`}>
                {/* Card Thumbnail (Collapsed View) */}
                <CardThumbnail>
                  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={project.coverImageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {project.isFeatured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {project.status}
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        {project.logoUrl && (
                          <img
                            src={resolvedTheme === 'dark' && project.logoVariants?.dark ? project.logoVariants.dark : project.logoUrl}
                            alt={`${project.title} logo`}
                            className="w-16 h-16 object-contain rounded-lg"
                          />
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                        {project.technologies.slice(0, 4).map((tech, idx) => {
                          const iconString = getDeviconName(tech);
                          const { name, variant } = parseIconString(iconString);
                          return (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium h-fit flex items-center gap-1.5"
                            >
                              <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-sm" />
                              {tech}
                            </span>
                          );
                        })}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium h-fit">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      <button className="w-full px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-auto">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardThumbnail>

                {/* Card Expanded (Full Screen View) */}
                <CardExpanded className="p-8 md:p-12">
                  {/* Header with Cover Image */}
                  <div className="relative h-80 -mx-8 md:-mx-12 -mt-8 md:-mt-12 mb-8 overflow-hidden">
                    <img
                      src={project.coverImageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/50 dark:via-gray-900/50 to-transparent" />
                    <div className="absolute bottom-6 left-8 md:left-12 right-8 md:right-12">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                          {project.status}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {project.type}
                        </span>
                        {project.isFeatured && (
                          <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {project.logoUrl && (
                          <img
                            src={resolvedTheme === 'dark' && project.logoVariants?.dark ? project.logoVariants.dark : project.logoUrl}
                            alt={`${project.title} logo`}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg bg-white/80 p-2"
                          />
                        )}
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 darl:text-gray-200 dark:text-gray-300">
                          {project.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - 2 columns */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Description */}
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                          About the Project
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                          {project.description}
                        </p>
                      </div>

                      {/* Key Learnings - Full Width */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-6 border border-blue-100 dark:border-blue-900">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Key Learnings
                        </h4>
                        <ul className="space-y-2">
                          {project.keyLearnings.map((learning, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2">
                              <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mobile App Screenshots */}
                      {project.appScreenshots && project.appScreenshots.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                            Mobile Experience
                          </h3>
                          <AppScreenshot
                            screenshots={project.appScreenshots}
                            projectTitle={project.title}
                          />
                        </div>
                      )}

                      {/* Videos */}
                      {project.videos && project.videos.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                            Videos
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.videos.map((videoUrl, index) => (
                              <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <video
                                  controls
                                  className="w-full h-full object-contain"
                                  preload="metadata"
                                >
                                  <source src={videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="space-y-6">
                      {/* My Role - Compact Badge Style */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border-l-4 border-gray-900 dark:border-white">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                          My Role
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {project.myRole}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => {
                            const iconString = getDeviconName(tech);
                            const { name, variant } = parseIconString(iconString);
                            return (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600 flex items-center gap-1.5"
                              >
                                <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-sm" />
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Project Links */}
                      {(project.links.liveUrl || project.links.githubUrl || project.links.appStoreUrl || project.links.playStoreUrl) && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Links
                          </h4>
                          <div className="space-y-3">
                            {project.links.liveUrl && (
                            <a
                              href={project.links.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                              </svg>
                              <span>Live Site</span>
                            </a>
                          )}
                          {project.links.githubUrl && (
                            <a
                              href={project.links.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              <span>GitHub</span>
                            </a>
                          )}
                          {project.links.appStoreUrl && (
                            <a
                              href={project.links.appStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                              </svg>
                              <span>App Store</span>
                            </a>
                          )}
                          {project.links.playStoreUrl && (
                            <a
                              href={project.links.playStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                              </svg>
                              <span>Play Store</span>
                            </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Client Info */}
                      {project.clientId && data.clients && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Client
                          </h4>
                          {(() => {
                            const client = data.clients.find(
                              (c) => c.id === project.clientId
                            );
                            if (client) {
                              return (
                                <a
                                  href={client.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600 text-center"
                                >
                                  <img
                                    src={resolvedTheme === 'dark' && client.logoVariants?.dark ? client.logoVariants.dark : client.logoUrl}
                                    alt={client.name}
                                    className="h-16 w-auto"
                                  />
                                  <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">
                                      {client.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {client.industry}
                                    </p>
                                  </div>
                                </a>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      )}

                      {/* Web Screenshots - Peek at the Pixels */}
                      {project.screenshots && project.screenshots.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Peek at the Pixels
                          </h4>
                          <PhotoProvider maskOpacity={0.5}>
                            <div className="grid grid-cols-2 gap-2">
                              {project.screenshots.map((screenshot, idx) => (
                                isVideoFile(screenshot) ? (
                                  <video
                                    key={idx}
                                    src={screenshot}
                                    className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                  />
                                ) : (
                                  <PhotoView key={idx} src={screenshot}>
                                    <img
                                      src={screenshot}
                                      alt={`${project.title} screenshot ${idx + 1}`}
                                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 dark:border-gray-600"
                                    />
                                  </PhotoView>
                                )
                              ))}
                            </div>
                          </PhotoProvider>
                        </div>
                      )}
                    </div>
                  </div>
                </CardExpanded>
              </ExpandableCard>
            ))}
          </div>
        </ExpandableCardProvider>
      </div>
    </section>
  );
}
