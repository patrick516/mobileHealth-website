"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  Smartphone,
  Globe,
  Clock,
  CheckCircle,
  WifiOff,
  ShieldCheck,
  MapPin,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Offline-First",
    description:
      "Works fully without internet in rural villages. Data syncs automatically once connected.",
  },
  {
    icon: Globe,
    title: "Built for Malawi",
    description:
      "Mirrors Malawi's real health structure — Region, District, TA, Zone — with Chichewa support.",
  },
  {
    icon: Clock,
    title: "Real-Time Visibility",
    description:
      "Nurses and district officers see visits, referrals, and vaccine coverage as it happens.",
  },
  {
    icon: ShieldCheck,
    title: "Built-In Safeguards",
    description:
      "Consent capture, National ID verification, and audit logging designed for accountability.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Register Households",
    description:
      "CHWs register households and family members in their catchment area — works offline.",
  },
  {
    step: "2",
    title: "Record Visits",
    description:
      "Record symptoms, malnutrition screening, and referrals during each household visit.",
  },
  {
    step: "3",
    title: "Track Health",
    description:
      "Vaccination schedules and antenatal care visits are tracked automatically per child and mother.",
  },
  {
    step: "4",
    title: "Sync & Report",
    description:
      "Once connected, data syncs to a dashboard nurses and district officers can act on immediately.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                A digital tool for Community Health Workers
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                From Paper Notebooks to
                <span className="text-secondary block">Connected Care</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                MobileHealth Malawi replaces paper-based record keeping for
                Community Health Workers — letting them register households,
                track child health, and refer patients, even without internet in
                the village.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/how-it-works"
                  className="btn-secondary flex items-center gap-2 justify-center"
                >
                  See How It Works
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all flex items-center gap-2 justify-center"
                >
                  Request a Demo
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-8 text-white/70 text-sm">
                <WifiOff size={16} />
                <span>Designed to work where the internet doesn't reach</span>
              </div>
            </motion.div>
            {/* Right Content - Phone Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-auto rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20">
                  <Image
                    src="/images/mobilephone.jpeg"
                    alt="MobileHealth App - Community Health Worker Dashboard"
                    width={400}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Optional: Add a subtle badge */}
                <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  MobileHealth
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title text-left">
                The Problem We're Solving
              </h2>
              <p className="text-text-secondary mb-4 leading-relaxed">
                Across rural Malawi, Community Health Workers still rely on
                paper registers to track household visits, child vaccinations,
                and referrals to clinics. A notebook gets damaged in the rain, a
                page goes missing, or a health worker is reassigned — and that
                record is simply gone.
              </p>
              <p className="text-text-secondary mb-4 leading-relaxed">
                Because the data sits in a bag in the village, district health
                offices often don't see what's happening until weeks later — by
                which point a pattern that could have triggered an early
                response has already passed.
              </p>
              <p className="text-text-secondary leading-relaxed">
                MobileHealth Malawi was built to close that gap — turning slow,
                fragile, paper-based tracking into a connected system that helps
                health workers act before small problems become emergencies.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-primary-lighter rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="text-primary" size={22} />
                <h3 className="font-bold text-text">Why this matters</h3>
              </div>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li className="flex gap-2">
                  <CheckCircle
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  Paper records get lost, damaged, or delayed in reaching
                  district offices
                </li>
                <li className="flex gap-2">
                  <CheckCircle
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  No feedback loop — CHWs rarely learn what happened after a
                  referral
                </li>
                <li className="flex gap-2">
                  <CheckCircle
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  Disease clusters and malnutrition trends go unnoticed for
                  weeks
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">What Makes It Different</h2>
            <p className="section-subtitle">
              Built specifically for how Community Health Work actually happens
              in Malawi.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:border-primary/20 hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              A simple, offline-first workflow designed for the field.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-primary-lighter rounded-2xl p-6 text-center h-full">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Status Section — replaces fabricated stats */}
      <section className="py-16 bg-primary-lighter">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <CheckCircle size={16} />
              Current Stage
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
              Built, Tested, and Ready for a Pilot Partner
            </h2>
            <p className="text-text-secondary leading-relaxed">
              MobileHealth Malawi is a fully working system — the mobile app,
              the backend, and the web dashboard are built and tested
              end-to-end. What hasn't happened yet is a real-world pilot with
              Community Health Workers in the field. That's the next step, and
              we're looking for district health offices and NGO partners who'd
              like to be part of it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interested in Piloting MobileHealth in Your District?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              We'd welcome the chance to show you a live demo and discuss what a
              pilot could look like.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-secondary flex items-center gap-2 justify-center"
              >
                Get in Touch
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/how-it-works"
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all flex items-center gap-2 justify-center"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
