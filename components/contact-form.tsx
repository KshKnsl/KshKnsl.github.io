"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, Phone } from "lucide-react"

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const errors: FormErrors = {}

    if (!formState.name.trim()) errors.name = "Name is required"
    if (!formState.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formState.email)) errors.email = "Email is invalid"
    if (formState.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formState.phone)) 
      errors.phone = "Phone number is invalid"
    if (!formState.message.trim()) errors.message = "Message is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", phone: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="w-full">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl text-center"
        >
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Message Sent!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for reaching out. I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Send Me a Message
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50/50 dark:bg-[#0F0F10] border ${
                      formErrors.name ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-gray-700"
                    } rounded-lg focus:ring-2 focus:ring-[#3b82f6]/50 dark:focus:ring-[#60a5fa]/50 focus:border-[#3b82f6] dark:focus:border-[#60a5fa] transition-all duration-200 text-gray-900 dark:text-white`}
                    placeholder="Your name"
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.name}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50/50 dark:bg-[#0F0F10] border ${
                      formErrors.email ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-gray-700"
                    } rounded-lg focus:ring-2 focus:ring-[#3b82f6]/50 dark:focus:ring-[#60a5fa]/50 focus:border-[#3b82f6] dark:focus:border-[#60a5fa] transition-all duration-200 text-gray-900 dark:text-white`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.email}</p>}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-3 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#0F0F10] border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg">
                    <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50/50 dark:bg-[#0F0F10] border ${
                      formErrors.phone ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-gray-700"
                    } rounded-r-lg focus:ring-2 focus:ring-[#3b82f6]/50 dark:focus:ring-[#60a5fa]/50 focus:border-[#3b82f6] dark:focus:border-[#60a5fa] transition-all duration-200 text-gray-900 dark:text-white`}
                    placeholder="+91 987-654-4321"
                  />
                </div>
                {formErrors.phone && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-gray-50/50 dark:bg-[#0F0F10] border ${
                    formErrors.message ? "border-red-300 dark:border-red-700" : "border-gray-200 dark:border-gray-700"
                  } rounded-lg focus:ring-2 focus:ring-[#3b82f6]/50 dark:focus:ring-[#60a5fa]/50 focus:border-[#3b82f6] dark:focus:border-[#60a5fa] transition-all duration-200 resize-none text-gray-900 dark:text-white`}
                  placeholder="Your message here..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.message}</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 flex items-center justify-center gap-2 bg-gradient-primary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 border border-[#ec3750]/20 dark:border-[#ff4d6a]/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.form>
      )}
    </div>
  )
}