import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2, MessageSquare, Terminal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { Profile, SocialLink } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { SocialLinks } from '../components/SocialLinks';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactProps {
  profile: Profile | null;
  socialLinks: SocialLink[];
}

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export function Contact({ profile, socialLinks }: ContactProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!CONTACT_ENDPOINT) {
      // Gracefully open mailto client with prefilled details
      const subject = encodeURIComponent(`[Portfolio] ${data.subject}`);
      const body = encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`);
      window.open(`mailto:${profile?.email || 'contact@example.com'}?subject=${subject}&body=${body}`, '_self');
      setSubmitStatus('success');
      reset();
      return;
    }

    setSubmitStatus('loading');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="INITIATE CONTACT"
          title="Get In Touch"
          subtitle="Open for architectural consulting, senior engineering roles, open source collaboration, or freelance projects"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                <Terminal className="w-4 h-4" />
                <span>Direct Communication</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
                Let's Build Something Exceptional
              </h3>
              <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed font-light">
                Have a question or proposal? Send a message through the form or reach out directly via email or social networks.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider mb-0.5">Direct Email</p>
                    <p className="text-[var(--text-primary)] text-base font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>
              )}

              {profile?.location && (
                <div className="glass-card rounded-2xl p-5 flex items-center gap-4 border border-[var(--border-subtle)]">
                  <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-[var(--text-primary)] text-base font-medium">{profile.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <p className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider mb-3">Connect Online</p>
              <SocialLinks socialLinks={socialLinks} email={profile?.email} size="lg" />
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            {submitStatus === 'success' ? (
              <div className="glass-card rounded-3xl p-10 flex flex-col items-center text-center gap-5 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
                <div className="p-4 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/40">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Message Dispatched!</h4>
                  <p className="text-[var(--text-muted)] text-sm max-w-md font-light leading-relaxed">
                    Thank you for reaching out. Your communication has been forwarded and I will respond as promptly as possible.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-purple-500/10 text-[var(--text-secondary)] hover:text-purple-600 dark:hover:text-purple-400 border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card rounded-3xl p-7 sm:p-9 space-y-5"
                noValidate
              >
                <div className="flex items-center gap-2 pb-2 text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Send A Direct Message</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Your Name <span className="text-purple-600 dark:text-purple-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-sm font-light"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Email Address <span className="text-purple-600 dark:text-purple-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please provide a valid email address',
                        },
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-sm font-light"
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Subject Line <span className="text-purple-600 dark:text-purple-400">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', { required: 'Subject line is required' })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-sm font-light"
                    placeholder="Project Inquiry / Opportunity"
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Message Body <span className="text-purple-600 dark:text-purple-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Message content is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-sm font-light resize-none"
                    placeholder="Details about your inquiry, timeline, and requirements..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.message.message}</p>}
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Unable to submit form. Please use the direct email link instead.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full py-4 rounded-xl neon-glow-btn text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
