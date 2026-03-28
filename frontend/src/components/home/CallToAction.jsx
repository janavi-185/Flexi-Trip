import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-white/10 translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 leading-tight">
          Your next adventure is
          <br />
          one click away
        </h2>
        <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of smart travellers who trust FlexiTrip to plan
          memorable trips — without the stress.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-4 rounded-xl bg-background text-primary font-semibold text-base hover:bg-secondary transition-colors duration-200 shadow-xl"
          >
            Start Planning — It's Free
          </Link>
          <a
            href="#features"
            className="px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-medium text-base hover:border-primary-foreground/60 transition-colors duration-200"
          >
            Learn More
          </a>
        </div>

        <p className="mt-8 text-primary-foreground/50 text-sm">
          No credit card required · Free plan available
        </p>
      </div>
    </section>
  );
}
