import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card, Chip } from '@heroui/react'
import {
  Building2,
  Home as HomeIcon,
  Sparkles,
  Store,
  Timer,
  Users,
  WifiOff,
  Wrench
} from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/motion'

export const Route = createFileRoute('/_marketing/')({
  component: Home
})

const features = [
  {
    icon: Timer,
    title: 'Session Tracking',
    description:
      'Start and stop generator sessions with one tap. See exactly how long each run lasts.'
  },
  {
    icon: Wrench,
    title: 'Smart Maintenance',
    description:
      'Templates that trigger by runtime hours or calendar intervals. Never guess when service is due.'
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    description:
      'Local-first architecture means the app works without internet. Data syncs when you reconnect.'
  },
  {
    icon: Users,
    title: 'Team Access',
    description:
      'Admin and employee roles. Assign people to generators. Everyone sees what they need.'
  },
  {
    icon: Sparkles,
    title: 'AI Suggestions',
    description:
      'Get intelligent maintenance recommendations researched from your generator\u2019s manufacturer data.'
  },
  {
    icon: Building2,
    title: 'Organizations',
    description:
      'Set up your org, invite your team, and manage multiple generators from one place.'
  }
] as const

const steps = [
  {
    number: '01',
    title: 'Create your organization',
    description: 'Sign up free, name your org, and invite your team.'
  },
  {
    number: '02',
    title: 'Add your generators',
    description:
      'Enter your equipment details. Set up maintenance schedules for each.'
  },
  {
    number: '03',
    title: 'Track and maintain',
    description:
      'Log sessions, get reminders, and keep everything running smooth.'
  }
] as const

function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="bg-accent/8 pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
        <div className="page-wrap relative mx-auto max-w-2xl text-center">
          <FadeIn>
            <Chip color="accent" variant="secondary" size="sm">
              Early Alpha &middot; 100% Free
            </Chip>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-foreground mt-6 text-5xl leading-[1.08] font-bold tracking-tight sm:text-7xl">
              Keep your generators running. Never miss maintenance.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted mx-auto mt-6 max-w-lg text-lg leading-relaxed">
              Svitlo tracks runtime hours, schedules maintenance by time or
              usage, and keeps your whole team in sync&nbsp;&mdash; even
              offline.
            </p>
          </FadeIn>
          <FadeIn
            delay={0.3}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <Link to="/sign-in" className="no-underline">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <a href="#features" className="no-underline">
              <Button variant="ghost" size="lg">
                See How It Works
              </Button>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 px-4 py-20 sm:py-28">
        <div className="page-wrap">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              What Svitlo Does
            </p>
            <h2 className="font-display text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to keep generators maintained
            </h2>
          </FadeIn>

          <StaggerContainer className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => (
              <StaggerItem key={f.title}>
                <Card className="h-full">
                  <Card.Content className="p-6">
                    <f.icon
                      size={28}
                      className="text-accent mb-4"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-foreground mb-2 text-base font-semibold">
                      {f.title}
                    </h3>
                    <p className="text-muted m-0 text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </Card.Content>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Built For */}
      <section className="px-4 py-20 sm:py-28">
        <div className="page-wrap">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              Who It&rsquo;s For
            </p>
            <h2 className="font-display text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Whether you own one generator or twenty
            </h2>
          </FadeIn>

          <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-2">
            <FadeIn>
              <Card className="h-full">
                <Card.Content className="p-6 sm:p-8">
                  <HomeIcon
                    size={28}
                    className="text-accent mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    For Homeowners
                  </h3>
                  <p className="text-muted m-0 text-sm leading-relaxed">
                    One generator, zero guesswork. Know exactly when your backup
                    generator needs an oil change, filter replacement, or full
                    service&nbsp;&mdash; so it starts when the lights go out.
                  </p>
                </Card.Content>
              </Card>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Card className="h-full">
                <Card.Content className="p-6 sm:p-8">
                  <Store
                    size={28}
                    className="text-accent mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    For Small Businesses
                  </h3>
                  <p className="text-muted m-0 text-sm leading-relaxed">
                    Multiple locations, multiple generators, one dashboard.
                    Assign employees to start and stop generators during
                    outages, track every runtime hour, and make sure no machine
                    is neglected. From coffee shops to warehouses&nbsp;&mdash;
                    stay powered, stay open.
                  </p>
                </Card.Content>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:py-28">
        <div className="page-wrap">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              How It Works
            </p>
            <h2 className="font-display text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Up and running in minutes
            </h2>
          </FadeIn>

          <div className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map((s, i) => (
              <FadeIn key={s.number} delay={i * 0.15}>
                <div className="text-center">
                  <span className="font-display text-accent text-5xl font-bold">
                    {s.number}
                  </span>
                  <h3 className="text-foreground mt-4 mb-2 text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="text-muted m-0 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 px-4 py-20 sm:py-28">
        <div className="page-wrap">
          <FadeIn className="mx-auto max-w-xl">
            <Card className="bg-accent/5 text-center">
              <Card.Content className="px-8 py-12 sm:px-12 sm:py-16">
                <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
                  Pricing
                </p>
                <span className="font-display text-foreground text-6xl font-bold sm:text-7xl">
                  $0
                </span>
                <h2 className="font-display text-foreground mt-4 text-2xl font-bold sm:text-3xl">
                  Free while in early alpha
                </h2>
                <p className="text-muted mx-auto mt-4 max-w-sm text-base leading-relaxed">
                  We&rsquo;re building Svitlo in the open. Sign up now and help
                  shape the product&nbsp;&mdash; no credit card, no trial
                  limits, just a tool that works.
                </p>
                <Link to="/sign-in" className="mt-8 inline-block no-underline">
                  <Button size="lg">Create Your Free Account</Button>
                </Link>
              </Card.Content>
            </Card>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
