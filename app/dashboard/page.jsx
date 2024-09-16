"use client"
import React, { useState, useEffect } from 'react'
import { Bell, BookOpen, ChevronRight, Home, LogOut, Menu, MessageSquare, Search, Users, PlusCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { db } from '../db/db'
import { courseData } from '../db/db'


const Sidebar = () => (
  <div className="flex flex-col h-full bg-gray-900 text-white p-4">
    <div className="mb-8">
      <h1 className="text-2xl font-bold">📚 Knowledge</h1>
    </div>
    <nav className="space-y-4 flex-grow">
      {[
        { icon: Home, label: 'Dashboard' },
        { icon: MessageSquare, label: 'Inbox' },
        { icon: BookOpen, label: 'Lessons' },
        { icon: Users, label: 'Groups' },
      ].map((item) => (
        <Button key={item.label} variant="ghost" className="w-full justify-start p-2 hover:bg-gray-800">
          <item.icon className="h-5 w-5 mr-3" />
          <span>{item.label}</span>
        </Button>
      ))}
    </nav>
    <Button variant="ghost" className="w-full justify-start p-2 hover:bg-gray-800 text-red-400 mt-auto">
      <LogOut className="h-5 w-5 mr-3" />
      <span>Logout</span>
    </Button>
  </div>
)

const Header = () => (
  <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <Sidebar />
      </SheetContent>
    </Sheet>
    <div className="flex-grow mx-4 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input type="search" placeholder="Search courses..." className="pl-10 w-full" />
      </div>
    </div>
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="relative mr-2">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      </Button>
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </div>
  </header>
)

const bannerImages = [
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Person using laptop with code on screen"
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    alt: "Group of people collaborating over a laptop"
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Person writing on a whiteboard"
  }
]

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="relative h-48 md:h-64 lg:h-80">
        {bannerImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 mix-blend-multiply" />
        <CardContent className="relative z-10 h-full flex flex-col justify-center p-6 text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Unlock Your Potential</h2>
          <p className="mb-4 max-w-md text-sm md:text-base">
            Discover a world of knowledge with our cutting-edge online courses.
          </p>
         
        </CardContent>
      </div>
    </Card>
  )
}

const CourseCategories = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
    {['Product Design', 'Data Analysis', 'UI/UX Design'].map((category) => (
      <Button key={category} variant="outline" className="bg-white hover:bg-gray-50 border-gray-200 text-gray-700">
        {category}
      </Button>
    ))}
  </div>
)

const YourLesson = () => (
  <Card className="hover:shadow-md transition-shadow duration-300 mb-6">
    <CardHeader>
      <CardTitle>Your Next Lesson</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Mentor" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">James Francis Harding</p>
            <p className="text-sm text-gray-600">LEARN NEW THINGS</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="ml-4">
          Continue
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </CardContent>
  </Card>
)

const Profile = () => (
  <Card className="mb-6 overflow-hidden">
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
      <div className="flex items-center mb-4">
        <Avatar className="h-16 w-16 mr-4 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">STUDENT</h2>
          <p className="text-sm opacity-75">Product Design Student</p>
        </div>
      </div>
    </div>
    <CardContent className="p-6">
      <h3 className="font-semibold mb-2">Course Progress</h3>
      <Progress value={33} className="mb-2" />
      <div className="flex justify-between text-sm text-gray-600">
        <span>33% Complete</span>
        <span>12/36 Lessons</span>
      </div>
    </CardContent>
  </Card>
)

const CreateCourseButton = ({ onClick }) => (
  <Card className="hover:shadow-md transition-shadow duration-300">
    <CardContent className="p-6">
      <Button 
        className="w-full bg-gray-800 hover:bg-gray-600 text-white" 
        size="lg"
        onClick={onClick}
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Create Course
      </Button>
    </CardContent>
  </Card>
)

const EncouragementCard = ({ onClick }) => (
  <Card className="mt-6 hover:shadow-lg transition-shadow duration-300">
    <CardContent className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Create your first Course</h2>
      <p className="text-gray-600 mb-6">
        Share your knowledge and inspire others by creating your first course. It's easy to get started!
      </p>
      <Button 
        className="bg-gray-900 hover:bg-gray-600 text-white" 
        size="lg"
        onClick={onClick}
      >
        Create Your First Course
      </Button>
    </CardContent>
  </Card>
)

const Dashboard = () => {
  const router = useRouter()

  const handleCreateCourse = () => {
    router.push('/create-course')
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-2">
              <Banner />
              <CourseCategories />
              <YourLesson />
            </div>
            <div className="space-y-6">
              <Profile />
              <CreateCourseButton onClick={handleCreateCourse} />
            </div>
          </div>
          <EncouragementCard onClick={handleCreateCourse} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard