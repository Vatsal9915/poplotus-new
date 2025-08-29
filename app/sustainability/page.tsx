"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  Leaf,
  Recycle,
  Users,
  Target,
  Globe,
  Sprout,
  Trees,
  Package,
  Truck,
  Factory,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// 🔹 Counter Component (smooth animation)
function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return <span>{count.toLocaleString()}</span>;
}

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="overflow-hidden">
        {/* 🌱 Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/farming.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
              Sustainability at PopLotus
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              We don’t just make snacks. We nurture ecosystems, empower
              communities, and reimagine the future of food.
            </p>
          </motion.div>
        </section>

        {/* 🌍 Mission Section */}
        <section className="relative py-24 bg-gradient-to-r from-green-50 to-emerald-100">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold font-serif text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>“Nourishing People, Nurturing Planet.”</strong>
                <br />
                <br />
                At PopLotus, sustainability is not an afterthought — it’s the
                core of everything we do. From regenerative farming to
                plastic-free packaging, every decision moves us closer to a
                future where mindful snacking is global and green.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-40"></div>
              <img
                src="/img.jpg"
                alt="Sustainable farming"
                className="relative z-10 rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* 🌱 Sustainability Pillars */}
        <section className="relative py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold font-serif mb-12">
              Our Pillars of Sustainability
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: <Sprout className="w-10 h-10 text-green-600" />,
                  title: "Sustainable Sourcing",
                  desc: "Partnering with regenerative farmers to protect soil health.",
                },
                {
                  icon: <Recycle className="w-10 h-10 text-blue-600" />,
                  title: "Eco Packaging",
                  desc: "100% biodegradable, recyclable & compostable materials.",
                },
                {
                  icon: <Users className="w-10 h-10 text-purple-600" />,
                  title: "Community Empowerment",
                  desc: "Fair-trade wages and skill development programs.",
                },
                {
                  icon: <Target className="w-10 h-10 text-yellow-600" />,
                  title: "Carbon Goals",
                  desc: "On track to be carbon neutral by 2030.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 📊 Impact Counters */}
        <section className="relative py-24 bg-gradient-to-br from-emerald-50 to-green-100">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
            <motion.div className="p-8 bg-white rounded-2xl shadow">
              <h3 className="text-5xl font-bold text-green-700">
                <Counter end={500} />+
              </h3>
              <p className="mt-3 text-gray-700">Farmers Supported</p>
            </motion.div>
            <motion.div className="p-8 bg-white rounded-2xl shadow">
              <h3 className="text-5xl font-bold text-blue-700">
                <Counter end={75} />%
              </h3>
              <p className="mt-3 text-gray-700">Packaging Recyclable</p>
            </motion.div>
            <motion.div className="p-8 bg-white rounded-2xl shadow">
              <h3 className="text-5xl font-bold text-emerald-700">
                <Counter end={10000} />
              </h3>
              <p className="mt-3 text-gray-700">Trees Planted</p>
            </motion.div>
          </div>
        </section>

        {/* 🚜 Farm-to-Shelf Timeline */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold font-serif mb-16">
              From Farm to Shelf
            </h2>
            <div className="grid md:grid-cols-5 gap-10">
              {[
                {
                  icon: <Leaf className="w-10 h-10 text-green-600" />,
                  title: "Farming",
                  desc: "Partnering directly with farmer groups for regenerative practices.",
                },
                {
                  icon: <Factory className="w-10 h-10 text-gray-700" />,
                  title: "Processing",
                  desc: "Low-energy roasting and zero waste shell management.",
                },
                {
                  icon: <Package className="w-10 h-10 text-yellow-600" />,
                  title: "Packaging",
                  desc: "100% recyclable & compostable packs.",
                },
                {
                  icon: <Truck className="w-10 h-10 text-blue-600" />,
                  title: "Logistics",
                  desc: "Optimized routes and reduced CO₂ shipping.",
                },
                {
                  icon: <ShoppingBag className="w-10 h-10 text-purple-600" />,
                  title: "Retail",
                  desc: "Store, Seal, Recycle campaigns for consumers.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md"
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ Certifications */}
        <section className="py-24 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Our Certifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[
                "/certs/fssai.png",
                "/certs/iso.png",
                "/certs/haccp.png",
                "/certs/recycle.png",
              ].map((logo, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-xl shadow flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt="Certification logo"
                    className="h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ❓ FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What does recyclable packaging mean?",
                  a: "Our pouches are made with mono-materials that can be recycled where local facilities exist.",
                },
                {
                  q: "How are farmers supported?",
                  a: "We partner with farmer groups, ensure fair wages, and provide training in regenerative practices.",
                },
                {
                  q: "What’s PopLotus’ carbon goal?",
                  a: "We aim to be carbon neutral by 2030 through logistics optimization and renewable energy.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border shadow-sm hover:shadow-md"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🌍 Global Reach (Spline Globe) */}
        <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
          <iframe
            title="Global reach interactive globe"
            src="https://my.spline.design/holographicearthwithdynamiclines-7pl8xHK4WPjFkUiWQTkwSzKg/"
            width="100%"
            height="100%"
          ></iframe>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-3xl px-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Our Global Vision
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/90 bg-black/40 backdrop-blur-md rounded-xl p-6">
              From India to the world — PopLotus is bringing mindful snacking to
              USA, UK, EU, and UAE, while staying rooted in sustainable
              practices.
            </p>
          </motion.div>
        </section>

        {/* 🤝 CTA */}
        <section className="py-24 bg-gradient-to-r from-emerald-100 to-green-200 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partner with PopLotus
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 mb-8">
            Are you a farmer collective, recycler, or retailer exploring
            sustainable partnerships? Join us in building a smarter, greener
            snacking future.
          </p>
          <a
            href="mailto:sustainability@poplotus.com"
            className="inline-block px-8 py-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
          >
            Get in Touch
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
