const steps = [
  {
    number: '01',
    title: 'Tell us your dream trip',
    description:
      'Share your destination, travel dates, budget, and what you love doing — adventure, culture, food, or relaxation.',
    icon: '✍️',
  },
  {
    number: '02',
    title: 'AI builds your itinerary',
    description:
      "FlexiTrip's AI engine processes thousands of options and generates a personalised, day-by-day travel plan in seconds.",
    icon: '⚡',
  },
  {
    number: '03',
    title: 'Pack your bags & go',
    description:
      'Review, tweak if needed, and export your itinerary. Your perfect trip is ready — all you need to do is show up.',
    icon: '🧳',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            From idea to itinerary
            <br />
            <span className="text-primary">in 3 simple steps</span>
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg">
            No more overwhelm. Just tell FlexiTrip what you want, and it does
            the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Step icon bubble */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl shadow-lg shadow-primary/20">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center text-primary text-xs font-bold">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
