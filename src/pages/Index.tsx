import SiteNavigation from '../components/SiteNavigation';
import HeroSection from '../components/HeroSection';
import ChapterSection from '../components/ChapterSection';
import CrimeaMapSVG from '../components/CrimeaMapSVG';
import JourneyMapSVG from '../components/JourneyMapSVG';
import TransferModelSVG from '../components/TransferModelSVG';
import FeedbackLoopSVG from '../components/FeedbackLoopSVG';
import VentureCard from '../components/VentureCard';
import IdeasSection from '../components/IdeasSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <SiteNavigation />

      <HeroSection />

      {/* Chapter I — Pressure */}
      <ChapterSection id="pressure" number="I" title="Pressure">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="prose-editorial space-y-6">
            <p>
              Some systems are born under compression. Sevastopol — a naval city engineered around containment 
              and strategic positioning — was the first architecture Dan Glushko ever understood, 
              though he wouldn't have called it that at the time.
            </p>
            <p>
              Immigration with his mother to Temple, Texas wasn't a story of escape. 
              It was a <strong>forced recalibration</strong> — the kind that strips away every assumption 
              about how things work and forces you to rebuild your operating model from first principles.
            </p>
            <p>
              Most people narrate this as hardship. The more accurate framing: 
              <strong>pressure is information</strong>. It reveals which structures are load-bearing 
              and which are decorative. The ones that survive aren't the strongest. 
              They're the ones designed to distribute force.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <CrimeaMapSVG />
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-muted-nav">
              Sevastopol · 44.6167°N, 33.5254°E
            </span>
          </div>
        </div>
      </ChapterSection>

      {/* Chapter II — Invisible Systems */}
      <ChapterSection id="invisible-systems" number="II" title="Invisible Systems">
        <div className="space-y-12">
          <div className="prose-editorial space-y-6 max-w-3xl">
            <p>
              At the University of Texas at Austin, the pattern became legible. 
              Petroleum engineering isn't about extracting oil — it's about understanding 
              <strong>invisible fluid dynamics under extreme constraint</strong>. 
              Reservoir behavior is a masterclass in systems that can't be directly observed, 
              only inferred through pressure responses and mathematical models.
            </p>
            <p>
              The UEORS research lab. SPE publications. These weren't academic exercises — 
              they were training in <strong>reading systems that refuse to be seen</strong>. 
              Every reservoir is a black box. The engineer's job isn't to open it. 
              It's to build a model accurate enough to make decisions without opening it.
            </p>
            <p>
              Kuwait extended the lesson from theory to field operations. 
              Desert reservoirs operating under conditions that penalize guesswork. 
              The margin for error in oilfield chemical systems isn't measured in percentage points — 
              it's measured in <strong>millions of dollars and environmental consequence</strong>.
            </p>
          </div>

          <div className="mt-16">
            <JourneyMapSVG />
          </div>
        </div>
      </ChapterSection>

      {/* Chapter III — Failure as Calibration */}
      <ChapterSection id="failure" number="III" title="Failure as Calibration">
        <div className="prose-editorial space-y-6 max-w-3xl">
          <p>
            The entrepreneurial path isn't a hero's journey — it's a <strong>calibration sequence</strong>. 
            Every venture that doesn't scale teaches you something no successful venture ever could: 
            where the model breaks.
          </p>
          <p>
            The rebuilding of Okana wasn't a pivot. It was a structural reassessment. 
            The original architecture had a flaw not in execution, but in <strong>load distribution</strong>. 
            The business was designed for conditions that didn't exist. 
            The rebuild was designed for conditions that did.
          </p>
          <p>
            This is the distinction most founders miss: <strong>failure isn't the opposite of success — 
            it's the sensor array that makes success navigable</strong>. Without failure data, 
            you're optimizing against a model you've never validated.
          </p>
          <p>
            The shift wasn't from "failing" to "succeeding." It was from building systems 
            that assumed stability to building systems that <strong>assumed variance</strong>.
          </p>
        </div>

        <div className="mt-16">
          <TransferModelSVG />
          <p className="text-center mt-6 font-sans text-[9px] tracking-[0.15em] uppercase text-muted-nav">
            Principle transfer: Reservoir → Business → AI
          </p>
        </div>
      </ChapterSection>

      {/* Chapter IV — Architecture */}
      <ChapterSection id="architecture" number="IV" title="Architecture">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="prose-editorial space-y-6">
            <p>
              AI automation since its inflection point. Blockchain architecture since 2018. 
              Self-custody protocols since 2022. These aren't separate interests — 
              they're <strong>the same interest applied across different substrates</strong>.
            </p>
            <p>
              The common thread: <strong>systems that operate with minimal human intervention 
              and maximum structural integrity</strong>. Whether it's a reservoir management system, 
              an autonomous business process, or a self-custodied asset — the design philosophy 
              is identical.
            </p>
            <p>
              Architecture is the practice of making decisions now that constrain decisions later — 
              in a way that <strong>the constraints become advantages</strong>. A well-architected system 
              doesn't just survive its environment. It makes the environment more navigable for everything 
              connected to it.
            </p>
            <p>
              The question isn't "how do we automate this?" It's 
              <strong>"what structure makes automation inevitable?"</strong>
            </p>
          </div>
          <div>
            <FeedbackLoopSVG />
            <p className="text-center mt-6 font-sans text-[9px] tracking-[0.15em] uppercase text-muted-nav">
              Signal → Optimize Loop
            </p>
          </div>
        </div>
      </ChapterSection>

      {/* Chapter V — Durability */}
      <ChapterSection id="durability" number="V" title="Durability">
        <div className="prose-editorial space-y-6 max-w-3xl">
          <p>
            The final chapter isn't about growth. It's about <strong>what remains</strong>.
          </p>
          <p>
            His mother — the original architect of pressure navigation — 
            remains the most important structural element in every system Dan has built. 
            Not because of sentiment. Because <strong>the most durable systems 
            are built on foundations that predate the architect</strong>.
          </p>
          <p>
            Family isn't a chapter in a founder's story. It's the <strong>load-bearing wall</strong>. 
            Remove it and the structure stands for a while. But it doesn't last.
          </p>
          <p>
            Legacy isn't built by moving fast. It's built by <strong>designing systems 
            that compound after you stop touching them</strong>. The best architecture 
            is the kind you eventually forget is there — because it's become 
            the environment itself.
          </p>
          <p>
            Restraint is the final optimization. Knowing what not to build. 
            What not to say. What not to disrupt. 
            <strong>The architect's last move is always stillness.</strong>
          </p>
        </div>
      </ChapterSection>

      {/* Current Ventures */}
      <section id="ventures" className="section-margin section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="chapter-label">Current Ventures</span>
            <div className="divider-gold mt-4 mb-6" />
            <h2 className="heading-serif text-4xl md:text-5xl text-cream">Operating Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VentureCard
              name="Livadea"
              role="Holding Company"
              description="Durable business acquisition and capital allocation. Built to compound across cycles, not chase them."
              url="https://livadea.com"
            />
            <VentureCard
              name="Livadea Systems"
              role="AI Systems Firm"
              description="Autonomous systems architecture. Signal processing, optimization loops, and intelligent automation for businesses that need to scale without scaling headcount."
              url="https://systems.livadea.com"
            />
          </div>
        </div>
      </section>

      <IdeasSection />
      <ContactSection />
    </div>
  );
};

export default Index;
