"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Users,
  Home,
  Heart,
  Shield,
  Cloud,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Users,
      title: "Step 1: Register Households",
      description:
        "CHWs register households and family members in their catchment area — entirely offline.",
      details: [
        "Create household profiles with GPS location and household photo",
        "Capture consent — National ID and thumbprint or signature confirmation",
        "Add family members with demographic information",
        "Record environmental health factors like water source and sanitation",
      ],
    },
    {
      icon: Heart,
      title: "Step 2: Record Visits",
      description:
        "Record patient visits, symptoms, treatments, and referrals — all stored locally first.",
      details: [
        "Select patient from household members",
        "Record symptoms and danger signs",
        "Take MUAC measurements to screen for malnutrition",
        "Dispense medications and automatically deduct from drug stock",
      ],
    },
    {
      icon: Shield,
      title: "Step 3: Track Health Outcomes",
      description: "Monitor vaccinations, ANC visits, and health outcomes.",
      details: [
        "Track child vaccination schedules",
        "Monitor ANC visits for pregnant women",
        "Follow up on referrals and treatments",
        "Receive smart alerts for overdue tasks",
      ],
    },
    {
      icon: Cloud,
      title: "Step 4: Sync & Report",
      description:
        "The moment a connection is available, data flows to a central dashboard.",
      details: [
        "Works fully offline — no internet needed in the village",
        "Automatic background sync when connectivity returns",
        "Real-time visibility for nurses and district officers",
        "Export visit and referral data for Ministry of Health reporting",
      ],
    },
    {
      icon: FileText,
      title: "Step 5: Nurses Close the Loop",
      description:
        "On the web dashboard, nurses and district officers act on what just came in.",
      details: [
        "Referral queue shows every patient referred, with urgency and status",
        "Nurse marks a patient as arrived, then treated",
        "Diagnosis and treatment notes are sent back to the CHW's phone",
        "District officers see analytics, risk levels, and CHW activity across the area",
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
              How It Works
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A simple, intuitive workflow designed for Community Health
              Workers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center mb-16 last:mb-0`}
            >
              {/* Icon */}
              <div className="lg:w-1/3 flex justify-center">
                <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center">
                  <step.icon className="w-16 h-16 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-2/3">
                <div className="inline-flex items-center gap-2 text-sm text-primary font-semibold bg-primary/10 px-4 py-1 rounded-full mb-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Step {index + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-text-secondary"
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text mb-4">
              See the Full Workflow Live
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              We'd be glad to walk you through the mobile app and dashboard
              together, and talk through what a pilot could look like.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Request a Demo
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
