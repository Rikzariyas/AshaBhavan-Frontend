import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, MessageCircle, Copy, Check, Send } from 'lucide-react'
import { DUMMY_DATA } from '../constants'

export default function Contact() {
  const displayContactInfo = DUMMY_DATA.CONTACT
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(displayContactInfo.email)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const handleSendEmail = () => {
    window.location.href = `mailto:${displayContactInfo.email}`
  }

  const handleWhatsApp = () => {
    // Extract phone number from WhatsApp URL or use the phone number
    const phoneNumber = displayContactInfo.whatsapp.replace(/[^\d]/g, '')
    window.open(`https://wa.me/${phoneNumber}`, '_blank')
  }

  const contactMethods = [
    {
      icon: Phone,
      label: 'Phone',
      value: displayContactInfo.phone,
      href: `tel:${displayContactInfo.phone}`,
      color: 'bg-asha-pink/20 text-asha-green',
    },
    {
      icon: Mail,
      label: 'Email',
      value: displayContactInfo.email,
      href: `mailto:${displayContactInfo.email}`,
      color: 'bg-asha-pink/20 text-asha-green',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: displayContactInfo.address,
      href: '#',
      color: 'bg-green-100 text-green-600',
    },
  ]

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: displayContactInfo.instagram,
      color: 'bg-pink-100 text-pink-600 hover:bg-pink-200',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: displayContactInfo.whatsapp,
      color: 'bg-green-100 text-green-600 hover:bg-green-200',
    },
  ]

  return (
    <div id="contact" className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with us. We'd love to hear from you!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <motion.a
                    key={index}
                    href={method.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${method.color} shadow-sm`}
                    >
                      <Icon size={26} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{method.label}</p>
                      <p className="text-lg font-semibold text-gray-900">{method.value}</p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-xl transition-all shadow-md hover:shadow-lg ${social.color}`}
                    >
                      <Icon size={24} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <MapPin className="text-asha-green" size={20} />
                  <span>Our Location</span>
                </h3>
              </div>
              <iframe
                src={displayContactInfo.mapLocation}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                className="w-full"
              />
            </motion.div>
          </div>

          {/* Send us a Message Section */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              Send us a Message
            </motion.h2>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-asha-green/20 hover:border-asha-green/40 transition-all"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-asha-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-asha-green" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-4">Send us an email for inquiries and support</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {displayContactInfo.email}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      onClick={handleCopyEmail}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      {emailCopied ? (
                        <>
                          <Check size={18} className="text-asha-green" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          <span>Copy Email</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={handleSendEmail}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-asha-green text-white rounded-lg font-semibold hover:bg-asha-green/90 transition-colors"
                    >
                      <Send size={18} />
                      <span>Send Email</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 hover:border-green-400 transition-all"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="text-green-600" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Us</h3>
                  <p className="text-gray-600 mb-4">Chat with us directly on WhatsApp</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {displayContactInfo.phone}
                    </p>
                  </div>
                  <motion.button
                    onClick={handleWhatsApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span>Send Message on WhatsApp</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
