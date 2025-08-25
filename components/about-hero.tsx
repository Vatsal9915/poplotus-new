import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative h-96 lg:h-[500px] overflow-hidden">
      <Image
        src="/about-hero-bg.png"
        alt="PopLotus Story"
        width={1920}
        height={500}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From traditional farms to premium snacks, discover the journey that makes PopLotus a trusted name in healthy
            eating
          </p>
        </div>
      </div>
    </section>
  )
}
