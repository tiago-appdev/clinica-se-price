"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/Dialog"
import Input from "../components/Input"
import Label from "../components/Label"

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [id, setId] = useState("")
    const [professional, setProfessional] = useState("")
    const [datetime, setDatetime] = useState("")
    const handleModalOpen = () => {
      setIsModalOpen(true)
    }
    const handleModalClose = () => {
      setIsModalOpen(false)
      setId("")
      setProfessional("")
      setDatetime("")
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log("ID:", id)
      console.log("Professional:", professional)
      console.log("Datetime:", datetime)
      handleModalClose()
    }
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <header className="bg-gray-900 text-white px-4 lg:px-6 h-14 flex items-center">
          <a href="#" className="flex items-center justify-center" >
            <CrossIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Clinica SePrice</span>
          </a>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
              Admin
            </a>
            <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
              Patient
            </a>
          </nav>
        </header>
        <main className="flex-1">
          <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 space-y-8">
              <div className="grid max-w-[800px] mx-auto gap-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bienvenido a Clinica SePrice</h1>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  We are a leading healthcare provider dedicated to delivering exceptional care and personalized attention
                  to our patients.
                </p>
                <div>
                  <button
                    onClick={handleModalOpen}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center space-y-2 p-4">
                  <StethoscopeIcon className="h-8 w-8" />
                  <h3 className="text-lg font-semibold">Primary Care</h3>
                  <p className="text-gray-500 text-center dark:text-gray-400">
                    Comprehensive primary care services for all your healthcare needs.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 p-4">
                  <HeartPulseIcon className="h-8 w-8" />
                  <h3 className="text-lg font-semibold">Cardiology</h3>
                  <p className="text-gray-500 text-center dark:text-gray-400">
                    Expert cardiac care to keep your heart healthy and strong.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 p-4">
                  <MicroscopeIcon className="h-8 w-8" />
                  <h3 className="text-lg font-semibold">Diagnostics</h3>
                  <p className="text-gray-500 text-center dark:text-gray-400">
                    Advanced diagnostic services to identify and address your health concerns.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 p-4">
                  <StethoscopeIcon className="h-8 w-8" />
                  <h3 className="text-lg font-semibold">Urgent Care</h3>
                  <p className="text-gray-500 text-center dark:text-gray-400">
                    Prompt and efficient care for unexpected medical needs.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-gray-900 text-white px-4 md:px-6 py-6 w-full shrink-0">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; 2024 Clinica SePrice. Todos los derechos reservados.</p>
            <nav className="flex gap-4 sm:gap-6">
              <a href="#" className="text-sm hover:underline underline-offset-4" >
                Terms of Service
              </a>
              <a href="#" className="text-sm hover:underline underline-offset-4" >
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:underline underline-offset-4" >
                Disclaimer
              </a>
              <a href="#" className="text-sm hover:underline underline-offset-4" >
                Contact Us
              </a>
            </nav>
          </div>
        </footer>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Book Appointment</DialogTitle>
              <DialogDescription>Please provide the following information to book your appointment.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="id" className="text-right">
                  ID Number
                </Label>
                <Input id="id" value={id} onChange={(e) => setId(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="professional" className="text-right">
                  Professional
                </Label>
                <Input
                  id="professional"
                  value={professional}
                  onChange={(e) => setProfessional(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="datetime" className="text-right">
                  Date and Time
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  Book Appointment
                </button>
                <div>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  

function CrossIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  )
}

function HeartPulseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  )
}

function MicroscopeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  )
}

function StethoscopeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}
