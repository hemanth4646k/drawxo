
// Server component
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import Link from "next/link";

// This is now a server component
export default async function Home() {
  // Generate a random room ID on the server
  const generateRoomId = () => Math.random().toString(36).substr(2, 9);
  const newRoomId = generateRoomId();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">DrawXO</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/about">
              <Button variant="outline" size="default" >About</Button>
              </Link>
              <Link href="/signin">
              <Button variant="outline" >Sign In</Button>
              </Link>
              <Link href="/signup">
              <Button >Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Collaborative</span>{' '}
                  <span className="block text-indigo-600 xl:inline">Drawing & Chat</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create, draw, and chat with friends in real-time. Join existing rooms or create your own drawing space.
                </p>
                
                {/* Room Join Section */}
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Quick Start</h3>
                      <p className="text-sm text-gray-600">Join an existing room or create a new one</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Using form for server-side handling */}
                      <form action="/api/join-room" className="flex space-x-2">
                        <Input
                          name="roomId"
                          type="text"
                          placeholder="Enter Room ID"
                        />
                        <Button type="submit">
                          Join
                        </Button>
                      </form>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or</span>
                        </div>
                      </div>
                      <Link href={`/room/${newRoomId}`} className="w-full">
                        <Button 
                          variant="outline" 
                          className="w-full"
                        >
                          Create New Room
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
        
        {/* Hero Illustration */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-xl font-semibold">Real-time Drawing</p>
              <p className="text-lg">& Collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for collaboration
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              DrawXO provides all the tools you need for real-time collaborative drawing and communication.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        ✏️
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Real-time Drawing</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Draw together in real-time. See changes as they happen with instant synchronization.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        💬
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Live Chat</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Communicate with your team while drawing. Share ideas and feedback instantly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        👥
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Multiple Users</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Invite multiple people to collaborate. Perfect for team brainstorming sessions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        🔒
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Secure Rooms</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Private rooms with authentication. Your drawings and conversations stay secure.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Button variant="ghost">Privacy</Button>
            <Button variant="ghost">Terms</Button>
            <Button variant="ghost">Contact</Button>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 DrawXO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
