const features = [
  {
    icon: '🧠',
    title: 'AI-Powered Itineraries',
    description:
      'Our AI analyses thousands of travel possibilities to build a personalised itinerary tailored to your preferences, budget, and time.',
  },
  {
    icon: '💸',
    title: 'Smart Budget Planning',
    description:
      'Set your budget and let FlexiTrip automatically optimise accommodation, transport, and activities to get the most out of every rupee.',
  },
  {
    icon: '🗺️',
    title: 'Day-by-Day Planning',
    description:
      'Get a structured, hour-by-hour plan with maps, opening hours, and travel time baked in — so you can focus on the experience.',
  },
  {
    icon: '🔀',
    title: 'Flexible & Editable',
    description:
      'Plans change. Easily swap out activities, update dates, or add new destinations with a single click.',
  },
  {
    icon: '🌐',
    title: 'Destination Discovery',
    description:
      'Not sure where to go? Tell FlexiTrip your interests and let it recommend hidden gems and popular destinations alike.',
  },
  {
    icon: '📲',
    title: 'Access Anywhere',
    description:
      'Your travel plans are synced across all your devices — ready whenever you need them, online or offline.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to plan
            <br />
            <span className="text-primary">the perfect trip</span>
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg">
            FlexiTrip combines powerful AI with intuitive design to make travel
            planning effortless.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
