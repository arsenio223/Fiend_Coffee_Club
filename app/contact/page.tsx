// app/contact/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const branches = [
    {
      name: 'Juna Branch',
      address: 'Juna Subdivision, Davao City',
      phone: '+63 912 345 6789',
      hours: 'Mon - Sun: 11:00 AM - 3:00 AM'
    },
    {
      name: 'Obrero Branch',
      address: 'Obrero, Davao City',
      phone: '+63 912 345 6790',
      hours: 'Mon - Sun: 11:00 AM - 3:00 AM'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/fiendcoffee' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/fiendcoffee' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/fiendcoffee' },
  ];

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-maroon text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/95 to-maroon/80">
          <div className="absolute inset-0 bg-[url('/images/contact-hero.jpg')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm tracking-[0.3em] uppercase bg-white/10 px-5 py-1.5 rounded-full">
                Contact Us
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif leading-[1.05]">
              <span className="text-white">Get in</span>
              <br />
              <span className="text-white/95">Touch</span>
            </h1>
            <p className="text-lg text-white/80 mt-4 max-w-xl leading-relaxed">
              We'd love to hear from you. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {branches.map((branch, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-soft p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-maroon/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-maroon" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-maroon">{branch.name}</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-maroon flex-shrink-0" />
                    {branch.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-maroon flex-shrink-0" />
                    {branch.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-maroon flex-shrink-0" />
                    {branch.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form & Social */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h2 className="text-2xl font-serif font-bold text-maroon mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button className="w-full bg-maroon text-white py-3 rounded-full font-semibold hover:bg-maroon-dark transition hover:scale-105">
                  Send Message
                </button>
              </form>
            </div>

            {/* Social & Other Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-soft p-8">
                <h2 className="text-2xl font-serif font-bold text-maroon mb-6">Follow Us</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-maroon/10 p-3 rounded-full hover:bg-maroon hover:text-white transition-all duration-300 group"
                      >
                        <Icon className="h-6 w-6 text-maroon group-hover:text-white transition-colors" />
                      </a>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-serif font-bold text-maroon mb-3">Contact Info</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-maroon flex-shrink-0" />
                      +63 912 345 6789
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-maroon flex-shrink-0" />
                      hello@fiendcoffee.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-maroon text-white rounded-2xl p-8 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-white/80" />
                <h3 className="text-2xl font-serif mb-2">Order via Chat</h3>
                <p className="text-white/80 text-sm mb-4">
                  Prefer to order through chat? We're here to help!
                </p>
                <button className="bg-white text-maroon px-6 py-2 rounded-full font-semibold hover:bg-maroon hover:text-white border-2 border-white transition-all duration-300">
                  Chat with Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-serif font-bold text-maroon text-center mb-8">Find Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-soft h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15807.358556529042!2d125.593298!3d7.0611527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d7debe00243%3A0xdab487d34da1a845!2sFiend%20Coffee%20Club!5e0!3m2!1sen!2sph!4v1725123456789!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="FIEND Coffee Club Juna Branch"
              ></iframe>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-soft h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15807.123456789!2d125.6146784!3d7.0835389!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d1aa3557cbf%3A0x736cb48a08def248!2sFiend%20Coffee%20Club!5e0!3m2!1sen!2sph!4v1725123456790!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="FIEND Coffee Club Obrero Branch"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}