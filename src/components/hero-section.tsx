import { Button } from "@/components/ui/button"
import { InteractiveGrid } from "@/components/ui/interactive-grid"
import { ShineBorder } from "@/components/ui/shine-border"
import { Play } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <InteractiveGrid containerClassName="absolute inset-0" className="opacity-30" points={40} />

      <ShineBorder
        className="relative z-10 max-w-6xl mx-auto px-6"
        borderClassName="border border-white/10 rounded-xl overflow-hidden"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Healthy Living. Happiness. Longevity.
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Rooting out the lies and propaganda. Undoing generations of malnutrition.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="gap-2 border-white/10 bg-black/5 hover:bg-black/10">
              <Play className="w-4 h-4" />
              Video
            </Button>
            <Button variant="secondary" className="bg-white text-black hover:bg-gray" onClick={() => console.log('aaa')}>
              Login
            </Button>
          </div>
        </div>

        <ShineBorder className="relative mx-auto" borderClassName="border border-white/10 rounded-xl overflow-hidden">
          <div className="relative">
            <Image
              src="/jumping.jpg"
              alt="Background Gradient"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 flex items-end justify-center pb-16">
              <div className="bg-black/20 backdrop-blur-sm p-2 rounded-xl w-[90%] h-[70%] flex">
                <div className="flex-1 pr-2">
                  <Image
                    src="/Red-meat440-980233e.jpg"
                    alt="Browser Preview"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover rounded-lg"
                    priority
                  />
                </div>
                <div className="flex-1 pl-2">
                  <Image
                    src="/207464.jpg"
                    alt="Code Editor"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </ShineBorder>
      </ShineBorder>
    </section>
  )
}

