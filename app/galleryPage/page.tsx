'use client';

import { motion } from "framer-motion";
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos = [
    // ...existing code...
    {
      src: '/images/main1.jpeg',
      alt: 'Industrial silos and structures',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Silos'
    },
    {
      src: '/images/main2.jpeg',
      alt: 'Factory interior with machinery',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Manufacturing'
    },
    {
      src: '/images/main3.jpeg',
      alt: 'Conveyor system and material handling',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Conveyors'
    },
    {
      src: '/images/main4.jpeg',
      alt: 'Industrial silos and structures',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Silos'
    },
    {
      src: '/images/main5.jpeg',
      alt: 'Factory interior with machinery',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Manufacturing'
    },
    {
      src: '/images/main6.jpeg',
      alt: 'Conveyor system and material handling',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Conveyors'
    },
    {
      src: '/images/main7.jpeg',
      alt: 'Industrial equipment installation',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Installation'
    },
    {
      src: '/images/main8.jpeg',
      alt: 'Dust collection systems',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Dust Collectors'
    },
    {
      src: '/images/main9.jpeg',
      alt: 'Material handling equipment',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Material Handling'
    },
    {
      src: '/images/main10.jpeg',
      alt: 'Industrial plant overview',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Plants'
    },
    {
      src: '/images/main11.jpeg',
      alt: 'Screw conveyor systems',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Conveyors'
    },
    {
      src: '/images/main12.jpeg',
      alt: 'Cement storage facilities',
      credit: 'Pexels',
      link: 'https://www.pexels.com',
      category: 'Storage'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-all duration-300 mb-6"
          >
            <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" size={20} />
            <span className="relative">
              Back to Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Title Section */}
          <div className="text-center">
            <div className="inline-block mb-3">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2">
                Full Gallery
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Our Work Gallery
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
              Explore our complete collection of industrial equipment and installations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-blue-500/30 hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              {/* Image Container */}
              <div className="aspect-[5/4] bg-slate-800 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  width={600}
                  height={450}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-white">{photo.category}</span>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <p className="text-sm font-medium mb-1">{photo.alt}</p>
                </div>

                <a
                  href={photo.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Image credit: {photo.credit}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* View Icon */}
              <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 bg-slate-800/50 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-slate-700">
            Images are for illustrative purposes and sourced from open resources like Pexels.
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {/* ...existing code... */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              className="w-full h-auto rounded-2xl shadow-2xl"
              width={1200}
              height={900}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-lg font-semibold mb-1">{photos[selectedImage].alt}</p>
                  <a
                    href={photos[selectedImage].link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-sm text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <span>Image credit: {photos[selectedImage].credit}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <Badge className="bg-blue-500/90 text-white border-none">
                  {photos[selectedImage].category}
                </Badge>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110 rotate-180"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
              }}
            >
              <ArrowLeft size={24} />
            </button>
          </motion.div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            {selectedImage + 1} / {photos.length}
          </div>
        </motion.div>
      )}
    </div>
  );
}