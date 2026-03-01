import SiteNavigation from '../components/SiteNavigation';
import HeroSection from '../components/HeroSection';
import ChapterSection from '../components/ChapterSection';
import CrimeaMapSVG from '../components/CrimeaMapSVG';

import HasslerCoreholderSVG from '../components/HasslerCoreholderSVG';
import TransferModelSVG from '../components/TransferModelSVG';
import FeedbackLoopSVG from '../components/FeedbackLoopSVG';
import VentureCard from '../components/VentureCard';
import TechnicalRecordSection from '../components/TechnicalRecordSection';
import OkanaCaseStudy from '../components/OkanaCaseStudy';
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
              Sevastopol is a naval city. Harbors, steel, ships engineered to take weather head-on.
            </p>
            <p>
              That was the first environment I understood — before I had any vocabulary for it.
            </p>
            <p>
              At eight, I immigrated to the United States with my mother. We landed in Temple, Texas. Different language. Different rules. Every assumption about how systems worked had to be rebuilt from scratch.
            </p>
            <p>
              Nothing was given. Everything was constructed.
            </p>
            <p>
              When you move that young, you don't think about opportunity. You think about <strong>orientation</strong> — how people communicate, how institutions function, what's rewarded, what's ignored.
            </p>
            <p>
              My mother worked long hours. Stability wasn't inherited. She engineered it, day by day, with no margin for error.
            </p>
            <p>
              That was the first operating lesson.
            </p>
            <p>
              When what you built was the only thing holding everything up, you began to see which parts were decoration and which were load-bearing.
            </p>
            <p>
              Some people try to escape pressure.
            </p>
            <p>
              <strong>I learned to measure it.</strong>
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
              Petroleum engineering at the University of Texas at Austin taught me one thing above all: how to <strong>make decisions about systems you can't directly observe</strong>. Every reservoir is a black box. The discipline is building models precise enough to act on — without ever opening it.
            </p>
            <p>
              I designed and executed over 50 tertiary chemical EOR systems — ASP, surfactant-polymer, standalone polymer — across laboratory validation and live pilot environments. Documented and published chemical recovery designs for reproducibility and knowledge transfer through five SPE papers.
            </p>
            <p>
              Deployed to Kuwait for quality control during a live pilot-stage chemical recovery program. In oilfield chemical systems, the cost of a miscalculation is measured in <strong>millions of dollars and environmental consequence</strong>. That's the operating standard I trained under.
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
            Every venture that didn't scale gave me something no successful one could — <strong>a precise map of where the model breaks</strong>.
          </p>
          <p>
            When I acquired Okana, the product was sound but the infrastructure had degraded. The flaw wasn't execution — it was <strong>load distribution</strong>. The system was designed for conditions that didn't exist. I rebuilt it for the conditions that did.
          </p>
          <p>
            Without failure data, you're optimizing against a model you've never validated. I've validated mine — repeatedly, at cost, across different substrates.
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
              I've engineered AI automation workflows and blockchain infrastructure since 2018. These aren't separate interests — <strong>they're the same discipline applied across different substrates</strong>.
            </p>
            <p>
              The common thread: systems that operate with minimal human intervention and maximum structural integrity. Whether I'm designing a chemical injection sequence, an autonomous revenue workflow, or a decentralized protocol — the architecture follows the same principles.
            </p>
            <p>
              Architecture means making decisions now that constrain decisions later — so that <strong>the constraints become advantages</strong>.
            </p>
            <p>
              The question I optimize for isn't "how do we automate this?" It's <strong>"what structure makes automation inevitable?"</strong>
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
            This chapter isn't about growth. It's about <strong>what remains when you stop adding</strong>.
          </p>
          <p>
            My mother — the person who engineered stability out of nothing — is the most important structural element in everything I've built. The most durable systems are built on <strong>foundations that predate the architect</strong>.
          </p>
          <p>
            Family is the load-bearing wall. Legacy isn't built by moving fast. It's built by <strong>designing systems that compound after you stop touching them</strong>.
          </p>
          <p>
            Restraint is the final optimization. Knowing what not to build. What not to disrupt. <strong>The last move is stillness.</strong>
          </p>
        </div>

        {/* Capital & stewardship signal */}
        <div className="mt-16 border-t border-border/30 pt-12 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              'Built for durability across cycles.',
              'Engineered for margin resilience.',
              'Structured for long-term compounding.',
              'Stewardship, not extraction.',
            ].map((signal, i) => (
              <p key={i} className="font-sans text-xs text-muted-foreground tracking-wide leading-relaxed flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-gold/30 shrink-0" />
                {signal}
              </p>
            ))}
          </div>
        </div>
      </ChapterSection>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VentureCard
              name="Livadea"
              role="Holding Company"
              description="I acquire and operate durable small businesses with long-term stewardship. Engineered to compound across cycles, not chase them."
              url="https://livadea.com"
            />
            <VentureCard
              name="Livadea Systems"
              role="AI Systems Firm"
              description="I design autonomous systems — signal processing, optimization loops, and intelligent automation — for enterprises that need to scale operations without scaling headcount."
              url="https://systems.livadea.com"
            />
          </div>

          <p className="mt-10 font-sans text-xs text-muted-foreground tracking-wide text-center max-w-lg mx-auto">
            Every entity is designed for operational durability — not short-term extraction.
          </p>
        </div>
      </section>

      <IdeasSection />
      <ContactSection />
    </div>
  );
};

export default Index;
