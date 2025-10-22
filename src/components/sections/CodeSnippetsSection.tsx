"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { PortfolioData } from "@/types/portfolio";

interface CodeSnippetsSectionProps {
  data: PortfolioData;
}

export default function CodeSnippetsSection({ data }: CodeSnippetsSectionProps) {
  if (!data.codeSnippets || data.codeSnippets.length === 0) {
    return null;
  }

  return (
    <section id="snippets" className="py-32 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
            Code Vault
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A peek into the code that defines my style — from clever abstractions to battle-tested components.
          </p>
        </div>

        <PhotoProvider
          maskOpacity={0.5}
          overlayRender={() => (
            <div
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(10px)",
              }}
            />
          )}
        >
          <div className="grid gap-8">
            {data.codeSnippets.map((snippet, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {snippet.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{snippet.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                    {snippet.language}
                  </span>
                </div>

                <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-2 min-[480px]:p-4 md:p-6 overflow-x-auto mb-4 max-w-full">
                  <pre className="text-[10px] min-[480px]:text-xs md:text-sm text-gray-100 dark:text-gray-200 font-mono whitespace-pre w-full min-w-0">
                    <code className="block">{snippet.code}</code>
                  </pre>
                </div>

                {/* Screenshots */}
                {snippet.screenshots && snippet.screenshots.length > 0 && (
                  <div className="mb-4 space-y-3">
                    {snippet.screenshots.map((screenshot, idx) => (
                      <PhotoView key={idx} src={screenshot}>
                        <img
                          src={screenshot}
                          alt={`${snippet.title} screenshot ${idx + 1}`}
                          className="w-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 shadow-sm"
                        />
                      </PhotoView>
                    ))}
                  </div>
                )}

                {snippet.gistUrl && (
                  <a
                    href={snippet.gistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-900 dark:text-white font-medium text-sm hover:underline"
                  >
                    View on GitHub Gist →
                  </a>
                )}
              </div>
            ))}
          </div>
        </PhotoProvider>
      </div>
    </section>
  );
}
