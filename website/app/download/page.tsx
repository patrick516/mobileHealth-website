'use client';

import { motion } from 'framer-motion';
import { Download, Smartphone, CheckCircle, Shield, Clock } from 'lucide-react';

export default function DownloadPage() {
  const requirements = [
    { icon: Smartphone, text: 'Android 9.0 or higher' },
    { icon: Shield, text: 'Minimum 2GB RAM' },
    { icon: Clock, text: '200MB storage space' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Download MobileHealth Malawi</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Get the app on your Android phone and start delivering quality healthcare today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Download Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-text mb-4">Download the App</h2>
              <p className="text-text-secondary mb-6">
                Get MobileHealth Malawi on your Android phone. Works offline, built for Community Health Workers.
              </p>

              <div className="bg-background rounded-2xl p-6 border-2 border-dashed border-primary/30 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">Version 1.0.0</h3>
                  <p className="text-text-secondary mb-4">APK Size: 25MB</p>
                  <a
                    href="/apk/mobilehealth.apk"
                    className="btn-primary inline-flex items-center gap-2"
                    download
                  >
                    <Download size={20} />
                    Download APK
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-text">System Requirements</h4>
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 text-text-secondary">
                    <req.icon className="w-5 h-5 text-primary" />
                    <span>{req.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Phone Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-64 h-[500px] bg-primary-dark rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20">
                <div className="bg-primary p-4 text-white text-center text-sm font-semibold">
                  MobileHealth Malawi
                </div>
                <div className="p-4 bg-white h-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-2xl">MH</span>
                    </div>
                    <p className="text-text font-semibold">Ready to use!</p>
                    <p className="text-xs text-text-secondary">Offline mode available</p>
                  </div>
                  <div className="space-y-2">
                    {['Register Households', 'Record Visits', 'Track Health', 'Sync Data'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Secure & Private', description: 'Your data is encrypted and secure.' },
              { icon: CheckCircle, title: 'Trusted by Health Workers', description: 'Used by CHWs across Malawi.' },
              { icon: Clock, title: '24/7 Support', description: 'Get help whenever you need it.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-1">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
