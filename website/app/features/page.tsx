"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  Clock,
  CheckCircle,
  Shield,
  Heart,
  Users,
  Home,
  FileText,
  BarChart,
  MessageCircle,
  Bell,
  MapPin,
  Languages,
  Cloud,
  Lock,
  Activity,
  TrendingUp,
  IdCard,
  ShieldAlert,
  AlertTriangle,
  FileSpreadsheet,
  Fingerprint,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      category: "For Community Health Workers",
      items: [
        {
          icon: Smartphone,
          title: "Offline-First",
          description:
            "Works fully without internet. Data syncs automatically once connected.",
        },
        {
          icon: Home,
          title: "Household Registration",
          description:
            "Register households and family members with GPS location capture.",
        },
        {
          icon: IdCard,
          title: "Identity Verification",
          description:
            "National ID capture (manual or QR scan), consent recording, and thumbprint or signature confirmation.",
        },
        {
          icon: FileText,
          title: "Visit Recording",
          description:
            "Record symptoms, temperature, and malnutrition (MUAC) screening at each visit.",
        },
        {
          icon: Heart,
          title: "ANC Tracking",
          description:
            "Automatic antenatal care visit schedule for pregnant women — 4-visit model.",
        },
        {
          icon: Shield,
          title: "Immunisation Tracking",
          description:
            "Automatic vaccination schedule generated for every child under 5.",
        },
        {
          icon: Bell,
          title: "Smart Alerts",
          description:
            "On-device notifications for overdue referrals, vaccines, and unvisited households.",
        },
        {
          icon: AlertTriangle,
          title: "Household Risk Level",
          description:
            "Households are automatically flagged High, Medium, or Low risk based on health indicators and visit history.",
        },
      ],
    },
    {
      category: "For Nurses & District Officers",
      items: [
        {
          icon: Users,
          title: "Team Oversight",
          description:
            "See every CHW's activity, visit count, and sync status in one place.",
        },
        {
          icon: BarChart,
          title: "Analytics Dashboard",
          description:
            "Visit trends, symptom patterns, MUAC screening, and referral completion rates.",
        },
        {
          icon: Activity,
          title: "Referral Queue",
          description:
            "Track every referral from pending to treated, with a WhatsApp-style status thread.",
        },
        {
          icon: MessageCircle,
          title: "Feedback Loop",
          description:
            "Send diagnosis and treatment feedback directly back to the referring CHW's phone.",
        },
        {
          icon: MapPin,
          title: "Live Map",
          description:
            "See every visit and household plotted on a map, colour-coded by urgency.",
        },
      ],
    },
    {
      category: "For Administrators",
      items: [
        {
          icon: FileSpreadsheet,
          title: "Reports & Exports",
          description:
            "Generate household, referral, visit, and immunisation reports as Excel or PDF.",
        },
        {
          icon: TrendingUp,
          title: "MOH-Aligned Indicators",
          description:
            "Analytics framed using official iCCM and Ministry of Health reporting language.",
        },
        {
          icon: Cloud,
          title: "Cloud Sync",
          description:
            "Data syncs to a central PostgreSQL database the moment a connection is available.",
        },
        {
          icon: Languages,
          title: "Multi-Language",
          description: "Mobile app supports English and Chichewa.",
        },
        {
          icon: Lock,
          title: "Account Security",
          description:
            "PIN-based login with automatic lockout after repeated failed attempts, enforced across all devices.",
        },
        {
          icon: ShieldAlert,
          title: "Audit Logging",
          description:
            "Every account lock, unlock, and household relocation is logged for accountability.",
        },
      ],
    },
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Features
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to deliver quality healthcare in your
              community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          {features.map((category, catIndex) => (
            <div key={catIndex} className="mb-16 last:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-text mb-2">
                  {category.category}
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="card hover:border-primary/20 hover:shadow-xl"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-text mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Want to See It in Action?
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              We'd be glad to walk you through a live demo and discuss what a
              pilot could look like for your district or organisation.
            </p>
            <a
              href="/contact"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Request a Demo
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
