// app/about/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Coffee, Users, Heart, Clock, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
  // Shop memories/images data
  const memories = [
    {
      id: 1,
      src: '/images/about-1.jpg',
      alt: 'FIEND Coffee Club interior',
      caption: 'Our cozy coffee corner'
    },
    {
      id: 2,
      src: '/images/about-2.jpg',
      alt: 'FIEND Coffee Club team',
      caption: 'The FIEND family'
    },
    {
      id: 3,
      src: '/images/about-3.jpg',
      alt: 'FIEND Coffee Club first day',
      caption: 'Opening day memories'
    },
    {
      id: 4,
      src: '/images/about-4.jpg',
      alt: 'FIEND Coffee Club community',
      caption: 'Community first'
    }
  ];

  // Branch data with labels and map links
  const branches = [
    {
      id: 'juna',
      name: 'Juna Branch',
      address: 'Davao City, Philippines',
      mapLink: 'https://www.google.com/maps/place/Fiend+Coffee+Club/@7.0611527,125.593298,17z/data=!3m1!4b1!4m6!3m5!1s0x32f96d7debe00243:0xdab487d34da1a845!8m2!3d7.0611527!4d125.593298!16s%2Fg%2F11xctycl99?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D',
      embedSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15807.358556529042!2d125.593298!3d7.0611527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d7debe00243%3A0xdab487d34da1a845!2sFiend%20Coffee%20Club!5e0!3m2!1sen!2sph!4v1725123456789!5m2!1sen!2sph'
    },
    {
      id: 'obrero',
      name: 'Obrero Branch',
      address: 'Davao City, Philippines',
      mapLink: 'https://www.google.com/maps/place/Fiend+Coffee+Club/@7.0835389,125.6121035,17z/data=!3m1!4b1!4m6!3m5!1s0x32f96d1aa3557cbf:0x736cb48a08def248!8m2!3d7.0835389!4d125.6146784!16s%2Fg%2F11nbz1tc2g?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D',
      embedSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15807.123456789!2d125.6146784!3d7.0835389!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d1aa3557cbf%3A0x736cb48a08def248!2sFiend%20Coffee%20Club!5e0!3m2!1sen!2sph!4v1725123456790!5m2!1sen!2sph'
    }
  ];

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative bg-maroon text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-maroon/70">
          <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="text-sm tracking-[0.2em] uppercase bg-white/10 px-4 py-1 rounded-full inline-block mb-4">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-serif leading-[1.1]">
              Good Coffee.<br />
              <span className="text-gold-400">Great Community.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mt-4 max-w-xl">
              From a simple dream to a place where friendships are brewed and stories are shared.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-maroon mb-6">
                Where It All Started
              </h2>
              <div className="w-20 h-1 bg-gold-400 mb-6"></div>
              <p className="text-gray-700 leading-relaxed mb-4">
                FIEND Coffee Club was born from a simple idea in the heart of Davao City — 
                <strong className="text-maroon"> good coffee brings people together</strong>. 
                What started as a passion project between friends quickly grew into a community 
                hub where every cup tells a story.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our name, <strong className="text-maroon">FIEND</strong>, reflects our deep passion 
                for great coffee and our commitment to being a place where friends gather, 
                conversations flow, and memories are made.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we're proud to serve our community with premium coffee, artisanal matcha, 
                and a space that feels like home. Every cup is crafted with love, and every 
                customer is part of the FIEND family.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/menu">
                  <button className="bg-maroon text-white px-6 py-2.5 rounded-full font-semibold hover:bg-maroon-dark transition hover:scale-105">
                    Explore Our Menu
                  </button>
                </Link>
                <Link href="/shop">
                  <button className="border-2 border-maroon text-maroon px-6 py-2.5 rounded-full font-semibold hover:bg-maroon hover:text-white transition">
                    Visit Our Shop
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative h-64 rounded-xl overflow-hidden shadow-soft">
                <Image
                  src="/images/about-story-1.jpg"
                  alt="FIEND Coffee Club story"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = ''; // Fallback if image missing
                  }}
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden shadow-soft">
                <Image
                  src="/images/about-story-2.jpg"
                  alt="FIEND Coffee Club"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden shadow-soft">
                <Image
                  src="/images/about-story-3.jpg"
                  alt="FIEND Coffee Club"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Memories Gallery */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-maroon">Our Memories</h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              A glimpse into the moments that make FIEND Coffee Club special.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {memories.map((memory) => (
              <div key={memory.id} className="group relative overflow-hidden rounded-xl shadow-soft">
                <div className="relative h-64 bg-gradient-to-br from-maroon/5 to-maroon/10">
                  <Image
                    src={memory.src}
                    alt={memory.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback: show emoji if image missing
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'absolute inset-0 flex items-center justify-center text-8xl';
                        fallback.textContent = '📸';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <p className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-lg">
                    {memory.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section with Both Branches */}
      <section className="py-16 bg-maroon text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">Visit Us</h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mt-4"></div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Come experience the FIEND difference at either of our locations. 
              We're always brewing something special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-serif text-gold-400 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gold-400" />
                  {branch.name}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="h-4 w-4 text-gold-400 flex-shrink-0" />
                    <span>{branch.address}</span>
                  </div>
                  
                  {/* Map Embed */}
                  <div className="w-full h-[200px] md:h-[250px] rounded-lg overflow-hidden shadow-soft">
                    <iframe
                      src={branch.embedSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title={`${branch.name} Location`}
                    ></iframe>
                  </div>

                  {/* Open in Google Maps Button */}
                  <a 
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <button className="w-full bg-gold-400 text-maroon px-6 py-2.5 rounded-full font-semibold hover:bg-gold-300 transition hover:scale-105">
                      Open in Google Maps
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Contact & Hours */}
          <div className="mt-12 text-center border-t border-white/10 pt-8">
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold-400" />
                <span>Mon - Sun: 11:00 AM - 3:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gold-400" />
                <span>+63 912 345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gold-400" />
                <span>hello@fiendcoffee.com</span>
              </div>
            </div>
            
           
          </div>
        </div>
      </section>
    </div>
  );
}