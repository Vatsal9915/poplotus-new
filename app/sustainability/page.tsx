"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* Counter Component */
function Counter({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

export default function SustainabilityPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Fixed background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/farming1.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-10" />

      {/* Navigation */}
      <header className="relative z-30">
        <Navigation />
      </header>

      {/* Main */}
      <main className="relative z-20 flex-1 overflow-auto">
        {/* Hero */}
        <section className="h-screen flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
              Sustainability at PopLotus
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
              From farm to shelf, we make every step sustainable — supporting
              farmers, reducing waste, and designing with the planet in mind.
            </p>
          </motion.div>
        </section>

        {/* Mission */}
        <section className="py-20 px-6 bg-black/30 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-semibold text-yellow-400">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-200">
              We partner with local farmer groups, use eco-conscious packaging,
              and continually measure our impact.
            </p>
          </motion.div>
        </section>

        {/* Pillars */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Supporting Farmers",
                desc: "Direct procurement, fair pricing, training.",
              },
              {
                title: "Eco Packaging",
                desc: "Mono-materials & recyclable pouches.",
              },
              {
                title: "Carbon Action",
                desc: "Optimized routes, renewable energy pilots.",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="p-8 rounded-2xl bg-white/5 border border-yellow-400/30"
              >
                <h3 className="text-2xl font-semibold text-yellow-400">
                  {p.title}
                </h3>
                <p className="mt-3 text-gray-200">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="py-20 px-6 bg-black/25">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { end: 500, suffix: "+", label: "Farmers Empowered" },
              { end: 75, suffix: "%", label: "Packaging Recyclable" },
              { end: 10000, suffix: "+", label: "Trees Planted" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="p-6 rounded-2xl bg-white/5 border border-yellow-400/30"
              >
                <div className="text-4xl font-bold text-yellow-400">
                  <Counter end={item.end} duration={2} suffix={item.suffix} />
                </div>
                <p className="mt-2 text-gray-200">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-8">
              Farm → Processing → Packaging → Shelf
            </h2>
            <div className="grid md:grid-cols-5 gap-6">
              {["Farm", "Processing", "Packaging", "Logistics", "Retail"].map(
                (s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-white/5 border border-yellow-400/20 text-center"
                  >
                    <div className="text-lg font-semibold text-yellow-400">
                      {s}
                    </div>
                    <p className="mt-2 text-gray-200 text-sm">
                      Short description about {s.toLowerCase()} step.
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 px-6 bg-black/30">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">
              Certifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["FSSAI", "ISO 22000", "HACCP", "Recycle Ready"].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-lg bg-white/5 border border-yellow-400/20 text-gray-200"
                >
                  {c}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-6">
              FAQs
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "Are your packs recyclable?",
                  a: "Yes — we use mono-materials where infrastructure allows recycling.",
                },
                {
                  q: "How do you help farmers?",
                  a: "Fair pay, trainings, and long-term contracts with FPOs.",
                },
              ].map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-yellow-400/20 rounded-lg bg-white/5"
                >
                  <AccordionTrigger className="px-4 py-2 text-yellow-400">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-gray-200 text-sm">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-black/40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold text-yellow-400">
              Partner with PopLotus
            </h2>
            <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
              Interested in collaborating on sustainable projects? Let's talk.
            </p>
            <a
              href="https://poplotus-new.vercel.app/contact"
              className="inline-block mt-8 px-8 py-3 rounded-full font-semibold bg-yellow-400 text-black hover:brightness-95 transition"
              rel="noopener noreferrer"
            >
              Partner with Us
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-30">
        <Footer />
      </footer>
    </div>
  );
}
