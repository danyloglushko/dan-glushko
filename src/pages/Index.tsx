import SiteNavigation from '../components/SiteNavigation';
import HeroSection from '../components/HeroSection';
import ChapterSection from '../components/ChapterSection';
import CrimeaMapSVG from '../components/CrimeaMapSVG';

import HasslerCoreholderSVG from '../components/HasslerCoreholderSVG';
import TransferModelSVG from '../components/TransferModelSVG';
import FeedbackLoopSVG from '../components/FeedbackLoopSVG';
import DurabilitySVG from '../components/DurabilitySVG';
import VentureCard from '../components/VentureCard';
import TechnicalRecordSection from '../components/TechnicalRecordSection';
import OkanaCaseStudy from '../components/OkanaCaseStudy';
import EngineeringMethodSection from '../components/EngineeringMethodSection';
import SystemsBuiltSection from '../components/SystemsBuiltSection';
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
              Sevastopol (seh vahs TOH puhl) sits on the Black Sea, a naval city of harbors, salt air, and ships built to endure weather. Long summer evenings. Stone embankments. A place that felt permanent, even when history around it rarely was.
            </p>
            <p>
              It was home before it was geopolitics.
            </p>
            <p>
              Some of my earliest memories are simple. Riding the commuter ferries across the harbor with my mother on the way to the beach. The smell of salt air and diesel from the boats. Walking between the Soviet apartment blocks where both of my grandmothers lived, one building and then another just across the street.
            </p>
            <p>
              At eight years old, my mother decided to move us to the United States.
            </p>
            <p>
              Not for adventure. Not for comfort. For possibility.
            </p>
            <p>
              We landed in Temple, Texas. The sky felt larger. The rules felt invisible. The language moved faster than I did.
            </p>
            <p>
              I did not just move countries.
            </p>
            <p>
              <strong>I moved between systems.</strong>
            </p>
            <p>
              In Crimea, life felt structured around endurance. In Texas, it felt structured around expansion. One world carried history in its architecture. The other carried optimism in its air.
            </p>
            <p>
              When you move that young, you do not think in terms of opportunity. You think in terms of <strong>orientation</strong>. You study how things work. How people signal status. How institutions reward effort. What assumptions are shared. Which ones are not.
            </p>
            <p>
              My mother worked long hours to make that transition possible. Moving continents is a logistical decision. Moving a child between worlds requires belief before evidence.
            </p>
            <p>
              Stability was never assumed. It was constructed.
            </p>
            <p>
              That was the first lesson.
            </p>
            <p>
              Over time I began to notice something broader. The things that work well in this world rarely happen by accident. They depend on systems that are carefully designed and continuously improved.
            </p>
            <p>
              Pressure is rarely loud. It is clarifying. It reveals which structures carry weight and which ones were decorative.
            </p>
            <p>
              Some people try to escape pressure.
            </p>
            <p>
              <strong>I learned to observe it.</strong>
            </p>
            <p>
              Growing up between two very different systems made me start noticing the invisible structures that shape how everything works.
            </p>
          </div>
          <div className="flex flex-col items-center gap-8 lg:sticky lg:top-32">
            <CrimeaMapSVG />
          </div>
        </div>
      </ChapterSection>

      {/* Chapter II — Invisible Systems */}
      <ChapterSection id="invisible-systems" number="II" title="Invisible Systems">
        <div className="space-y-12">
          <div className="prose-editorial space-y-6 max-w-3xl">
            <p>
              Petroleum engineering at the University of Texas at Austin taught me one thing above all: how to <strong>make decisions about systems you can not directly observe</strong>. Every reservoir is a black box. The discipline is building models precise enough to act on without ever opening it.
            </p>
            <p>
              I designed and executed over 50 tertiary chemical EOR systems, ASP, surfactant polymer, standalone polymer, across laboratory validation and live pilot environments. Documented and published chemical recovery designs for reproducibility and knowledge transfer through five SPE papers.
            </p>
            <p>
              Deployed to Kuwait for quality control during a live pilot stage chemical recovery program. In oilfield chemical systems, the cost of a miscalculation is measured in <strong>millions of dollars and environmental consequence</strong>. That is the operating standard I trained under.
            </p>
          </div>

          <div className="mt-16">
            <HasslerCoreholderSVG />
          </div>
        </div>
      </ChapterSection>

      {/* Chapter III — Failure as Calibration */}
      <ChapterSection id="failure" number="III" title="Failure as Calibration">
        <div className="prose-editorial space-y-6 max-w-3xl">
          <p>
             Every venture that did not scale gave me something no successful one could: <strong>a precise map of where the model breaks</strong>.
           </p>
           <p>
             When I acquired Okana, the product was sound but the infrastructure had degraded. The flaw was not execution. It was <strong>load distribution</strong>. The system was designed for conditions that did not exist. I rebuilt it for the conditions that did.
           </p>
           <p>
             Without failure data, you are optimizing against a model you have never validated. I have validated mine, repeatedly, at cost, across different substrates.
          </p>
          <p>
            That process shifted how I build: from designing systems that assume stability to engineering systems that <strong>absorb variance</strong>.
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
              I have engineered AI automation workflows and blockchain infrastructure since 2018. These are not separate interests. <strong>They are the same discipline applied across different substrates</strong>.
            </p>
            <p>
              The common thread: systems that operate with minimal human intervention and maximum structural integrity. Whether I am designing a chemical injection sequence, an autonomous revenue workflow, or a decentralized protocol, the architecture follows the same principles.
            </p>
            <p>
              Architecture means making decisions now that constrain decisions later, so that <strong>the constraints become advantages</strong>.
            </p>
            <p>
              The question I optimize for is not "how do we automate this?" It is <strong>"what structure makes automation inevitable?"</strong>
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
            This chapter is not about growth. It is about <strong>what remains when you stop adding</strong>.
          </p>
          <p>
            My mother, the person who engineered stability out of nothing, is the most important structural element in everything I have built. The most durable systems are built on <strong>foundations that predate the architect</strong>.
          </p>
          <p>
            Family is the load bearing wall. Legacy is not built by moving fast. It is built by <strong>designing systems that compound after you stop touching them</strong>.
          </p>
          <p>
            Restraint is the final optimization. Knowing what not to build. What not to disrupt. <strong>The last move is stillness.</strong>
          </p>
        </div>

        {/* Complexity to Durability diagram */}
        <div className="mt-16">
          <DurabilitySVG />
        </div>
      </ChapterSection>

      {/* Engineering Method */}
      <EngineeringMethodSection />

      {/* Systems Built */}
      <SystemsBuiltSection />

      {/* Technical Record */}
      <TechnicalRecordSection />

      {/* Okana Case Study */}
      <OkanaCaseStudy />

      {/* Current Ventures */}
      <section id="ventures" className="section-margin section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="chapter-label">Current Ventures</span>
            <div className="divider-gold mt-4 mb-6" />
            <h2 className="heading-serif text-4xl md:text-5xl text-cream">Operating Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <VentureCard
              name="Livadea"
              role="Holding Company"
              description="I acquire and operate durable small businesses with long term stewardship. Engineered to compound across cycles, not chase them."
              url="https://livadea.com"
            />
            <VentureCard
              name="Livadea Systems"
              role="AI Systems Firm"
              description="I design autonomous systems, signal processing, optimization loops, and intelligent automation, for enterprises that need to scale operations without scaling headcount."
              url="https://systems.livadea.com"
            />
          </div>

          <p className="mt-10 font-sans text-xs text-muted-foreground tracking-wide text-center max-w-lg mx-auto">
            Every entity is designed for operational durability, not short term extraction.
          </p>
        </div>
      </section>

      <IdeasSection />
      <ContactSection />
    </div>
  );
};

export default Index;
