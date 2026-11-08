'use client';

import React, { useState } from 'react';
import { CLUB_INFO } from '@/lib/demo-data';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Ticketing Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-lightBorder pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-xs font-display font-bold uppercase tracking-widest text-primary">
          <Mail className="w-3.5 h-3.5" />
          COMMUNICATIONS & INQUIRIES
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-charcoal uppercase tracking-tight">
          CONTACT CHURCHILL BROTHERS FC
        </h1>
        <p className="text-sm sm:text-base text-mutedGrey max-w-2xl">
          Get in touch with our matchday operations, press office, youth academy or commercial team in Margao, Goa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Club Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-lightBorder shadow-card p-6 sm:p-8 space-y-6">
            <h2 className="font-display font-bold text-xl text-charcoal uppercase tracking-wider">
              Club Headquarters
            </h2>

            <div className="space-y-4 text-xs text-charcoal">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block mb-0.5">Physical Address:</strong>
                  <span className="text-mutedGrey">{CLUB_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block mb-0.5">Telephone:</strong>
                  <span className="text-mutedGrey">{CLUB_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block mb-0.5">General Inquiries:</strong>
                  <span className="text-mutedGrey">{CLUB_INFO.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block mb-0.5">Office Timings:</strong>
                  <span className="text-mutedGrey">Monday – Friday: 09:30 AM – 06:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded bg-offWhite border border-lightBorder text-xs text-mutedGrey flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p>
              Note: Contact form submissions on this demonstration website are simulated. Messages are recorded locally and do not dispatch external emails.
            </p>
          </div>
        </div>

        {/* Right: Simulated Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-lightBorder shadow-card p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="font-display font-black text-2xl text-charcoal uppercase">
                Simulated Message Received!
              </h2>
              <p className="text-xs text-mutedGrey max-w-md mx-auto leading-relaxed">
                Thank you for contacting Churchill Brothers FC Goa. Your demonstration inquiry has been recorded successfully.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-display font-bold text-xl text-charcoal uppercase tracking-wider mb-2">
                Send a Demonstration Inquiry
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary transition"
                    placeholder="e.g. Antonio D'Souza"
                  />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary transition"
                    placeholder="fan@churchillbrothers.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Subject Area</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary transition"
                >
                  <option value="Ticketing Inquiry">Matchday & Ticketing Inquiry</option>
                  <option value="Merchandise Store">Merchandise Megastore</option>
                  <option value="Media & Press">Media & Press Accreditation</option>
                  <option value="Youth Academy">Youth Academy Trials</option>
                  <option value="Commercial Partnerships">Commercial Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary transition"
                  placeholder="How can The Red Machines assist you?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded bg-primary hover:bg-deepRed text-white font-display font-black text-sm uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT DEMO INQUIRY</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
