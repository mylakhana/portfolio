"use client";

import { PortfolioData } from "@/types/portfolio";

interface ArticlesSectionProps {
  data: PortfolioData;
}

export default function ArticlesSection({ data }: ArticlesSectionProps) {
  if (!data.articles || data.articles.length === 0) {
    return null;
  }

  return (
    <section className="py-32 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Blog & Writings</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Sharing what I learn
          </p>
        </div>

        <div className="grid gap-6">
          {data.articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{article.publication}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
