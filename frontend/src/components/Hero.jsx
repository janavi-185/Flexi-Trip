import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          AI-Powered Trip Planning
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Plan Smarter.
          <br />
          <span className="text-primary">
            Travel Better.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed mb-10">
          FlexiTrip uses AI to craft personalised itineraries in seconds — based
          on your budget, interests, and schedule. No more hours spent
          stitching together plans.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
          >
            Start Planning for Free
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-base transition-all duration-200"
          >
            See How It Works →
          </a>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-white/40 text-sm">
          Trusted by{' '}
          <span className="text-white font-semibold">10,000+</span> travellers
          worldwide · Free to get started
        </p>

        {/* Mock UI card */}
        <div className="mt-16 max-w-3xl mx-auto rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-white/30 text-xs">flexitrip.ai</span>
          </div>
          <div className="space-y-3">
            <div className="h-4 rounded-full bg-white/10 w-3/4" />
            <div className="h-4 rounded-full bg-primary/30 w-1/2" />
            <div className="h-4 rounded-full bg-white/10 w-2/3" />
            <div className="mt-4 flex gap-3">
              <div className="flex-1 h-24 rounded-xl bg-white/5 border border-white/10" />
              <div className="flex-1 h-24 rounded-xl bg-primary/20 border border-primary/20" />
              <div className="flex-1 h-24 rounded-xl bg-white/5 border border-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
