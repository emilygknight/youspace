import { Button } from "@/components/ui/button.jsx"
import {
  Heart,
  Users,
  Layout,
  Music,
  Calendar,
  ArrowRight
} from "lucide-react"

import YouSpace from "../../assets/YouSpace-1.mp4";
import Balloon from "../../assets/ballons.mp4"
// import Beach from "../../assets/beach.mp4"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">


      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your space to{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                dream
              </span>
              ,{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                create
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
                inspire
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Create aesthetically pleasing vision boards that represent your
              unique personality. Share your inspirations, discover new ideas,
              and connect with friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-200 text-pink-500 hover:bg-pink-50"
              >
                See Examples
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-xl rotate-3 z-10">
              <video
                  alt="YouSpace video"
                  width="640"
                  height="360"
                  className="drop-shadow-lg rounded-lg aspect-[3/2] object-contain lg:aspect-auto lg:size-full"
                  loop
                  autoPlay
                  muted
              >
                <source src={YouSpace} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/*<img*/}
              {/*    src="https://images.pexels.com/photos/30592638/pexels-photo-30592638/free-photo-of-colorful-sticky-notes-on-a-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/}
              {/*    alt="Profile example"*/}
              {/*  alt="Vision board example"*/}
              {/*  width={500}*/}
              {/*  height={400}*/}
              {/*  className="rounded-lg"*/}
              {/*/>*/}
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-3 rounded-xl shadow-lg -rotate-6 z-20">
              <video
                  alt="Beach video"
                  width={150}
                    height={150}
                  className="rounded-lg"
                  loop
                  autoPlay
                  muted
              >
                <source src={Balloon} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/*<img*/}
              {/*    src="https://images.pexels.com/photos/30601565/pexels-photo-30601565/free-photo-of-silhouette-of-palm-trees-at-sunset-with-crescent-moon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/}
              {/*  width={100}*/}
              {/*  height={100}*/}
              {/*  className="rounded-lg"*/}
              {/*/>*/}
            </div>
            <div className="absolute -top-8 -right-8 bg-white p-2 rounded-xl shadow-lg rotate-12 z-20">
              <div className="bg-pink-100 rounded-lg p-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                <span className="text-sm font-medium text-pink-500">
                  254 likes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Express Yourself Your Way</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            YouSpace gives you all the tools to create a digital space that
            truly represents who you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <Layout className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Layouts</h3>
            <p className="text-gray-600">
              Design your board exactly how you want with flexible layouts and
              sizing options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Music className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Profile Music</h3>
            <p className="text-gray-600">
              Add your favorite tunes to your profile to set the perfect mood.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Friend Feed</h3>
            <p className="text-gray-600">
              Stay connected with friends and discover content from like-minded
              creators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Daily Diary</h3>
            <p className="text-gray-600">
              Express your daily thoughts with our prompted diary entries and
              cute stickers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to create your space?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of creators expressing themselves and finding
            inspiration every day.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-pink-500 hover:bg-gray-100"
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>


    </div>
  )
}
