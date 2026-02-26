import SiteNavigation from '../components/SiteNavigation';
import HeroSection from '../components/HeroSection';
import ChapterSection from '../components/ChapterSection';
import CrimeaMapSVG from '../components/CrimeaMapSVG';
import SevastopolDetailSVG from '../components/SevastopolDetailSVG';
import JourneyMapSVG from '../components/JourneyMapSVG';
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
              Sevastopol is a naval city. Harbors, steel, ships built to endure weather.
            </p>
            <p>
              It was the first environment I understood — even if I didn't have the language for it.
            </p>
            <p>
              At eight years old, I immigrated to the United States with my mother. We landed in Temple, Texas. Different language. Different rules. Different assumptions about how the world worked.
            </p>
            <p>
              Nothing felt stable at first.
            </p>
            <p>
              When you move that young, you don't think in terms of opportunity. You think in terms of <strong>orientation</strong>. You're trying to understand the new system — how people speak, how schools function, what earns respect, what doesn't.
            </p>
            <p>
              My mother worked long hours. Stability wasn't assumed. It was built deliberately.
            </p>
            <p>
              That was the first lesson.
            </p>
            <p>
              Pressure isn't dramatic. It's clarifying. It shows you which structures hold and which ones were decorative all along.
            </p>
            <p>
              Some people try to escape pressure.
            </p>
            <p>
              <strong>I learned to observe it.</strong>
            </p>
          </div>
          <div className="flex flex-col items-center gap-8 lg:sticky lg:top-32">
            <CrimeaMapSVG />
            <SevastopolDetailSVG />
          </div>
        </div>
      </ChapterSection>

      {/* Chapter II — Invisible Systems */}
      <ChapterSection id="invisible-systems" number="II" title="Invisible Systems">
        <div className="space-y-12">
          <div className="prose-editorial space-y-6 max-w-3xl">
            <p>
              Petroleum engineering at the University of Texas at Austin: understanding 
              <strong> invisible fluid dynamics under extreme constraint</strong>. 
              Every reservoir is a black box. The engineer's discipline is building 
              models accurate enough to make decisions without opening it.
            </p>
            <p>
              Designed and executed 50+ tertiary chemical EOR systems across 
              laboratory validation and live pilot environments. Published five 
              peer-reviewed technical papers through the Society of Petroleum Engineers 
              on ASP and polymer design.
            </p>
            <p>
              Deployed internationally to Kuwait to conduct quality control 
              during live pilot-stage tertiary recovery implementation. 
              The margin for error in oilfield chemical systems is measured 
              in <strong>millions of dollars and environmental consequence</strong>.
            </p>
          </div>

          <div className="mt-16">
            <JourneyMapSVG />
            <p className="text-center mt-6 font-sans text-[9px] tracking-[0.15em] uppercase text-muted-nav">
              Sevastopol → Temple → Austin → Kuwait
            </p>
          </div>
        </div>
      </ChapterSection>

      {/* Chapter III — Failure as Calibration */}
      <ChapterSection id="failure" number="III" title="Failure as Calibration">
        <div className="prose-editorial space-y-6 max-w-3xl">
          <p>
            The entrepreneurial path is a <strong>calibration sequence</strong>. 
            Every venture that doesn't scale reveals where the model breaks — 
            information no successful venture provides.
          </p>
          <p>
            The Okana rebuild was a structural reassessment. The original architecture 
            had a flaw not in execution but in <strong>load distribution</strong> — 
            designed for conditions that didn't exist. The rebuild was designed 
            for conditions that did.
          </p>
          <p>
            Failure is the sensor array that makes success navigable. 
            Without failure data, you're optimizing against 
            a model you've never validated.
          </p>
          <p>
            The shift: from building systems that assumed stability 
            to building systems that <strong>assumed variance</strong>.
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
              AI automation. Blockchain architecture since 2018. 
              Self-custody protocols since 2022. Not separate interests — 
              <strong>the same interest applied across different substrates</strong>.
            </p>
            <p>
              The common thread: systems that operate with minimal human intervention 
              and maximum structural integrity. Whether it's reservoir management, 
              an autonomous business process, or a self-custodied asset — 
              the design philosophy is identical.
            </p>
            <p>
              Architecture is making decisions now that constrain decisions later — 
              so that <strong>the constraints become advantages</strong>.
            </p>
            <p>
              The question isn't "how do we automate this?" 
              It's <strong>"what structure makes automation inevitable?"</strong>
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
            is the most important structural element in every system built. 
            The most durable systems are built on <strong>foundations 
            that predate the architect</strong>.
          </p>
          <p>
            Family is the load-bearing wall. Legacy isn't built by moving fast. 
            It's built by <strong>designing systems that compound 
            after you stop touching them</strong>.
          </p>
          <p>
            Restraint is the final optimization. Knowing what not to build. 
            What not to disrupt. <strong>The architect's last move is stillness.</strong>
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
              description="Acquiring and operating durable small businesses with long-term stewardship. Built to compound across cycles, not chase them."
              url="https://livadea.com"
            />
            <VentureCard
              name="Livadea Systems"
              role="AI Systems Firm"
              description="Autonomous systems architecture. Signal processing, optimization loops, and intelligent automation for enterprises scaling without scaling headcount."
              url="https://systems.livadea.com"
            />
          </div>

          <p className="mt-10 font-sans text-xs text-muted-foreground tracking-wide text-center max-w-lg mx-auto">
            Focused on acquiring and operating durable small businesses with long-term stewardship — not short-term extraction.
          </p>
        </div>
      </section>

      <IdeasSection />
      <ContactSection />
    </div>
  );
};

export default Index;
