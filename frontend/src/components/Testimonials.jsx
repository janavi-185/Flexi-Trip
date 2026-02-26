const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    avatar: 'PS',
    rating: 5,
    text: 'FlexiTrip planned my Rajasthan trip in under 2 minutes. The itinerary was spot-on — great mix of heritage sites, local food spots, and stays within my budget.',
  },
  {
    name: 'Alex Morgan',
    location: 'London, UK',
    avatar: 'AM',
    rating: 5,
    text: 'I used FlexiTrip for a spontaneous weekend trip to Barcelona. The AI nailed every detail. I showed up and just enjoyed the ride. 10/10 would plan again.',
  },
  {
    name: 'Riya Patel',
    location: 'Ahmedabad, India',
    avatar: 'RP',
    rating: 5,
    text: 'What used to take me 3 days of research now takes 30 seconds. The suggested accommodations and activities were genuinely excellent.',
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-primary text-primary" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Travellers love FlexiTrip
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg">
            Don't just take our word for it — hear from real people who planned
            real trips.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              {/* Rating */}
              <StarRating count={t.rating} />

              {/* Quote */}
              <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-card-foreground font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
