"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Counter Component
const Counter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const duration = 2 * 1000; // 2 seconds
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end]);

  return (
    <div className="text-center text-white">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gold"
      >
        {count}+
      </motion.h3>
      <p className="text-lg">{label}</p>
    </div>
  );
};

export default function SustainabilityPage() {
  return (
    <div
      className="relative w-full min-h-screen text-white"
      style={{
        backgroundImage: "url('/farming.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1 className="text-5xl font-bold text-gold drop-shadow-lg">Farm to Shelf</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            At <span className="text-gold">PopLotus</span>, sustainability is not a choice — it’s our way of life.
            From supporting farmers to eco-friendly packaging, we’re building a smarter, greener future.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-20 px-6 bg-black/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gold">Our Mission</h2>
          <p className="mt-6 text-lg leading-relaxed">
            We partner with farmers, use renewable resources, and focus on eco-conscious packaging to ensure
            every PopLotus snack helps protect our planet and empower communities.
          </p>
        </div>
      </section>

      {/* Counters Section */}
      <section className="relative z-10 py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Counter end={5000} label="Farmers Impacted" />
          <Counter end={120} label="Tons of CO₂ Reduced" />
          <Counter end={40} label="Countries Reached" />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-20 px-6 bg-black/40 backdrop-blur-sm">
        <h2 className="text-4xl text-center font-semibold text-gold mb-12">Our Journey</h2>
        <div className="max-w-5xl mx-auto grid gap-10">
          {[
            { step: "Farm", desc: "Directly sourced from trusted local farmers." },
            { step: "Processing", desc: "Clean, minimal processing to preserve nutrition." },
            { step: "Packaging", desc: "Eco-friendly, recyclable packaging." },
            { step: "Logistics", desc: "Optimized routes to reduce carbon footprint." },
            { step: "Shelf", desc: "Bringing sustainable snacks to the world." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="p-6 rounded-2xl border border-gold/40 bg-black/50 backdrop-blur"
            >
              <h3 className="text-2xl font-bold text-gold">{item.step}</h3>
              <p className="mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="relative z-10 py-20 px-6 bg-black/30 backdrop-blur-sm">
        <h2 className="text-4xl text-center font-semibold text-gold mb-12">Our Certifications</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {["FSSAI", "ISO 22000", "HACCP", "Organic Certified"].map((cert, i) => (
            <Card key={i} className="bg-black/50 border border-gold/40">
              <CardContent className="flex items-center justify-center p-6 text-lg font-semibold text-gold">
                {cert}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6 bg-black/40 backdrop-blur-sm">
        <h2 className="text-4xl text-center font-semibold text-gold mb-12">FAQs</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>How do you support farmers?</AccordionTrigger>
              <AccordionContent>
                We provide fair pricing, training, and sustainable farming support to ensure long-term growth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Is your packaging eco-friendly?</AccordionTrigger>
              <AccordionContent>
                Yes! We use recyclable, minimal-plastic packaging designed to reduce waste.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>How do you reduce carbon emissions?</AccordionTrigger>
              <AccordionContent>
                By optimizing transport, sourcing locally, and supporting renewable practices.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="relative z-10 py-20 px-6 bg-black/50 backdrop-blur-sm text-center">
        <h2 className="text-4xl font-semibold text-gold">Join the PopLotus Revolution</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Be part of the sustainable snacking movement. Together, we can make the world healthier and greener.
        </p>
        <Button className="mt-6 bg-gold text-black hover:bg-gold/90">Partner With Us</Button>
      </section>
    </div>
  );
}
