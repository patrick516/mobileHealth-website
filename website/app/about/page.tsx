"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Heart,
  Award,
  Eye,
  Shield,
  Lightbulb,
  GraduationCap,
  Code,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We put communities at the center of everything we do.",
    },
    {
      icon: Shield,
      title: "Quality Care",
      description: "Committed to delivering evidence-based healthcare.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Leveraging technology to solve real-world health challenges.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working together with health workers and communities.",
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
              About MobileHealth Malawi
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A digital health tool built to replace paper records for Community
              Health Workers — and the story of why it exists.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">Our Mission</h3>
              <p className="text-text-secondary">
                To give Community Health Workers in Malawi an accessible,
                offline-first digital tool that replaces fragile paper records —
                closing the gap between what happens in the village and what
                district health offices can see and act on.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">Our Vision</h3>
              <p className="text-text-secondary">
                A Malawi where every Community Health Worker has the tools to
                act on what they see in the field — and where district health
                offices have real-time visibility into the communities they
                serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Developer */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Who Built This</h2>
            <p className="section-subtitle">
              A Malawian developer solving a problem he saw firsthand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto card"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Code className="w-12 h-12 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-text">
                  Patrick Lingstone Kulinji
                </h3>
                <p className="text-primary text-sm font-semibold mb-3">
                  Systems Developer
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Patrick is a Systems Developer based in Blantyre, holding a
                  BSc in Management Information Systems from the Malawi
                  University of Business and Applied Sciences (MUBAS). He
                  currently works as a developer at Intelligent Monitoring
                  Systems (IMOSYS), building enterprise business applications
                  and system integrations.
                </p>
                <p className="text-text-secondary text-sm leading-relaxed mt-3">
                  MobileHealth Malawi is an independent project Patrick built
                  after observing how Community Health Workers and HSAs still
                  rely on paper records — and the gaps that creates. It is fully
                  built and tested, and is now looking for its first real-world
                  pilot partner.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-8 flex items-center gap-3 justify-center text-text-secondary text-sm"
          >
            <GraduationCap size={18} className="text-primary" />
            <span>BSc Management Information Systems — MUBAS, 2024</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
