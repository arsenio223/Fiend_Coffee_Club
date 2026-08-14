// app/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-serif text-maroon text-center mb-8">About FIEND</h1>
      
      <div className="bg-white rounded-xl shadow-soft p-8 space-y-6">
        <p className="text-lg leading-relaxed">
          FIEND Coffee Club was born from a simple idea: <strong>good coffee brings people together</strong>.
          Founded in Davao City, we're a community-focused coffee shop and matcha lifestyle brand.
        </p>

        <p className="text-lg leading-relaxed">
          Our name, FIEND, reflects our passion for great coffee and our commitment to being 
          a place where friends gather, conversations flow, and every cup tells a story.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-4xl mb-2">☕</div>
            <h3 className="font-semibold text-maroon">Premium Coffee</h3>
            <p className="text-sm text-gray-600">Sourced from the finest beans</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🍵</div>
            <h3 className="font-semibold text-maroon">Premium Matcha</h3>
            <p className="text-sm text-gray-600">Ceremonial grade from Japan</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">❤️</div>
            <h3 className="font-semibold text-maroon">Community First</h3>
            <p className="text-sm text-gray-600">Where friendships are brewed</p>
          </div>
        </div>
      </div>
    </div>
  );
}