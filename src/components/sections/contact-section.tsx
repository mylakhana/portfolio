"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";

interface ContactInfo {
  email: string;
  phone: string;
}

interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  blog?: string;
}

interface ContactSectionProps {
  contact: ContactInfo;
  socialLinks: SocialLinks;
  name: string;
}

export function ContactSection({ contact, socialLinks, name }: ContactSectionProps) {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Let&apos;s Build Something Amazing
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-2xl mx-auto mb-12">
          <div className="space-y-6">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <Mail className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-900 font-medium">{contact.email}</span>
            </a>

            <a
              href={`tel:${contact.phone}`}
              className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <Phone className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-900 font-medium">{contact.phone}</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Connect with me</p>
            <div className="flex justify-center gap-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-sky-500 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </LampContainer>
  );
}
