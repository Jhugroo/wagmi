import { Button } from "@/components/ui/button";
import { EarthIcon, HospitalIcon, LoadingSpinner } from "@/components/ui/custom/icons";
import { ArrowRight, BusIcon, CurrencyIcon, FlagIcon, GroupIcon, HomeIcon, SchoolIcon, SirenIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image'
import homeImage from '../../public/home.jpg'
import { api } from "@/utils/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
const steps = [
  {
    title: "Créer un compte", text: "Inscrivez-vous,votre compte sera automatiquement creer a partir de votre compte Gmail, ajoutez votre numero de telephone et envoyez nous une demande de vérification",
    Button: (<Button variant="secondary" onClick={() => void signIn('google')}>Creer/Acceder a  mon compte <ArrowRight /> </Button>)
  },
  { title: "Ajoutez vos enfants", text: "Ajoutez vos enfants et envoyez nous une vérification pour chaque enfant" },
  { title: "Commencez à commander", text: "Vous pouvez désormais commencer à commander de la nourriture pour vos enfants une fois qu'ils sont vérifiés" },
]
export default function Home() {
  return (<div className="flex flex-col min-h-dvh">

    <main className="flex-1">
      <section className="bg-primary py-12 md:py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">Welcome to CEA Online Survey</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80">
            Participate in government surveys and help shape the policies that affect your community.
          </p>
          <Link href="/create-questionnaire"><Button className="mt-4">Start a New Survey</Button></Link>
        </div>
      </section>
      <section className="py-12 md:py-20 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Featured Surveys</h2>
            <p className="text-muted-foreground">Check out the latest featured surveys.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Satisfaction Survey</CardTitle>
                <CardDescription>Share your feedback on local government services.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Deadline: August 31, 2023</p>
              </CardContent>
              <CardFooter>
                <Link href="/create-questionnaire"><Button variant="link">Take Survey</Button></Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transportation Needs Assessment</CardTitle>
                <CardDescription>Help us improve public transit in your area.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Deadline: September 15, 2023</p>
              </CardContent>
              <CardFooter>
                <Link href="/create-questionnaire"><Button variant="link">Take Survey</Button></Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Education Quality Survey</CardTitle>
                <CardDescription>Share your thoughts on the local school system.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Deadline: October 1, 2023</p>
              </CardContent>
              <CardFooter>
                <Link href="/create-questionnaire"><Button variant="link">Take Survey</Button></Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="bg-muted py-12 md:py-20 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Survey Categories</h2>
            <p className="text-muted-foreground">Explore surveys by category to find ones that interest you.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <HomeIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Housing</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <HospitalIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Health</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <SchoolIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Education</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <CurrencyIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Economy</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <EarthIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Environment</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <BusIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Transportation</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <GroupIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Community</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
              prefetch={false}
            >
              <SirenIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Public Safety</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <h2 className="text-3xl font-bold">Discover the CEA Difference</h2>
          <p className="text-muted-foreground">
            Learn more about how our online survey platform can help you gather valuable feedback from your community.
          </p>
          <Button>Learn More</Button>
        </div>
      </section>
    </main>
    <footer className="bg-primary text-primary-foreground py-6 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FlagIcon className="w-6 h-6" />
          <span className="text-lg font-bold">CEA Online Survey</span>
        </div>
        <nav className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Terms
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  </div>
  )

  return (
    <div className="">
      <HeadLine />
      <InstructionVideo />
      <OrderingInfo />
      <BottomPart />
      <div className="text-center">CEA online Survey Application © 2024 | Développé  Par <Link className="underline" href="https://efflorescence.vercel.app/" target="blank">Efflorescence</Link> </div>
    </div>
  );
}

function HeadLine() {
  const user = useSession()
  const { data: userData } = api.user.get.useQuery()

  return <div className="flex min-w-full flex-col items-center justify-center">
    <div className="mt-4 mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-gray-400">
      <p className="text-sm font-semibold text-gray-700">
        CEA online Survey Application
      </p>
    </div>
    <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl text-center ">
      Commandez De La
      <span className='bg-gradient-to-r from-[#3b71ca] to-[#dc4c64] bg-clip-text text-transparent'> Nourriture </span>
      Pour Vos
      <span className='bg-gradient-to-r from-[#3b71ca] to-[#dc4c64] bg-clip-text text-transparent'> Enfants  </span>
    </h1>
    <div aria-hidden='true' className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 '>
      <div style={{
        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      }}
        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
    </div>
    <div className="mt-8 mx-auto mb-4 flex max-w-fit items-center justify-center text-center">      <i >
      CEA online Survey Application Ltd est une entreprise de restauration dédiée à offrir des expériences culinaires inoubliables
    </i>
    </div>
    <div className="mx-auto mb-6 flex max-w-fit items-center justify-center text-center">
      <p className='mt-2'>
        Goûtez la différence
      </p>
    </div>
    {user.status === 'authenticated' ? (userData?.isVerified ? <Link href="/menu"><Button className="px-8 py-4">Commandez Maintenant! <ArrowRight className="my-2" /></Button></Link> :
      <Link href="/profile"><Button className="px-8 py-4">Acceder a mon profil<ArrowRight className="my-2" /></Button></Link>) :
      (user.status === 'unauthenticated' ? <Button className="px-8 py-4" onClick={() => void signIn('google')}>Acceder a mon compte <ArrowRight /> </Button> : <LoadingSpinner />)}
  </div >
}

function InstructionVideo() {
  return <div>
    <div className='relative isolate'>
      <div aria-hidden='true' className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 '>
        <div style={{
          clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        }}
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className='mt-16 flow-root sm:mt-24'>
          <div className='-m-2 rounded-xl bg-gray-900/5 p=2 ring-1 ring-inset ruing-gray/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <Image placeholder="blur" src={homeImage} className='rounded-md bg-muted p-2 sm:p-2 md:p-2 shadow-2xl ring-1 ring-gray-900/10' quality={100} alt='product preview' width={1364} height={866} />
          </div>
        </div>
      </div>
      <div aria-hidden='true' className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 '>
        <div style={{
          clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        }}
          className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]' />
      </div>
    </div>
  </div>
}

function OrderingInfo() {
  return <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
    <div className='mb-12 px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl sm:text-center'>
        <h2 className='mt-8 font-bold text-4xl sm:text-5xl'>
          Commandez  en toute <span className='bg-gradient-to-r from-[#3b71ca] to-[#dc4c64] bg-clip-text text-transparent'> rapidité </span>
        </h2>
        <p className='mt-4 text-lg'>
          Commander n'a jamais été aussi <span className='font-bold'> simple </span>
        </p>
      </div>
    </div>
    <ol className='my-8 space-y-4  md:flex md:space-x-12 md:space-y-0'>
      {steps.map((step, index) => {
        return <Steps title={step.title} text={step.text} step={index + 1} key={index} Button={step.Button} />
      })}
    </ol>
  </div>
}
function BottomPart() {
  return <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56 bg-secondary rounded-lg p-2 py-4'>
    <div className="mt-4 mx-auto mb-4 max-w-fit items-center justify-center text-center">
      <h2 className='mt-8 font-bold text-4xl sm:text-5xl'>
        Nous Sommes CEA online Survey Application
      </h2>
    </div>
    <div className="mt-4 mx-auto mb-4 max-w-fit items-center justify-center text-center">
      <p>
        CEA online Survey Application Ltd est une entreprise de restauration dédiée à offrir des expériences culinaires inoubliables. Basée à votre localisation, notre équipe passionnée et professionnelle met un point d'honneur à satisfaire vos papilles avec des plats exquis et un service irréprochable.
      </p>
      <p>Chez Lycée de Labourdonnais, nous accordons une grande importance à la qualité et à l'équilibre nutritionnel des repas servis à nos élèves. Notre service de restauration est conçu pour offrir des repas sains, variés et savoureux qui répondent aux besoins nutritionnels des enfants et des adolescents.
      </p>
    </div>
    <div className="mt-4 mx-auto mb-4 max-w-fit items-center justify-center text-center">
      <p className='mt-5 max-w-prose sm:text-lg my-6 font-semibold'>
        Nos Menus
      </p>
    </div>
    <div className="mt-4 mx-auto mb-4 max-w-fit items-center justify-center text-center">
      <p> Nos menus sont élaborés par des professionnels et sont adaptés aux goûts et aux besoins des élèves de chaque tranche d'âge. Chaque repas est préparé avec des ingrédients frais et de saison, privilégiant les produits locaux et biologiques lorsque cela est possible.
        Pour toute question ou information supplémentaire sur nos services de restauration, n'hésitez pas à contacter notre équipe à adresse e-mail: <a className="underline" href="mailto:metrokitchensam@gmail.com">metrokitchensam@gmail.com</a>. Nous serons ravis de répondre à vos demandes.
      </p>
    </div >
  </div>
}
function Steps({ title, text, step = 1, Button }: { title: string, text: string, step?: number, Button?: JSX.Element }) {
  return <li className='md:flex-1'>
    <div className='flex flex-col space-y-2 border-1-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
      <span className='text-sm font-medium text-accent-foreground underline underline-offset-4'>Étape {step}</span>
      <span className='text-xl font-semibold'>{title}</span>
      <span className='mt-2'>{text}</span>
      {Button}
    </div>
  </li>
}

