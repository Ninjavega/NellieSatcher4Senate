import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  Shield,
  Activity,
  Scale,
  X,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface PolicyDetail {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  summary: string;
  actionItems: string[];
  legislativePledge: string;
}

const PLATFORM_ITEMS: PolicyDetail[] = [
  {
    id: 'families',
    title: 'Stronger Families',
    icon: Users,
    tagline: 'Supporting youth, seniors, and working parents',
    summary:
      'Support comprehensive programs that empower our children, protect senior citizens, and advocate for sustainable working families across District 34.',
    actionItems: [
      'Expand access to affordable, licensed after-school care and early childhood learning programs.',
      'Protect senior fixed-incomes through property tax relief and utilities protection.',
      'Champion child tax credits and working-family financial relief at the state level.',
      'Fund neighborhood community centers with nutritious meal programs and intergenerational activities.',
    ],
    legislativePledge:
      'Co-sponsor legislation to safeguard senior exemptions and fund community youth centers in our first 100 days.',
  },
  {
    id: 'education',
    title: 'Quality Education',
    icon: GraduationCap,
    tagline: 'Investing in our schools, teachers & students',
    summary:
      'Advocate for stronger funding formulas, competitive teacher compensation, modern classroom resources, and vocational career pathways.',
    actionItems: [
      'Fight for full funding of the public education formula to modernize district classrooms.',
      'Raise educator and support staff salaries to attract and retain the best teachers.',
      'Expand high school dual-enrollment and vocational/technical trade apprenticeships.',
      'Equip every public school with updated STEM labs, updated textbooks, and mental health counselors.',
    ],
    legislativePledge:
      'Introduce the District 34 Classroom Modernization Act to direct state infrastructure funds directly into local school labs.',
  },
  {
    id: 'economy',
    title: 'Economic Growth',
    icon: TrendingUp,
    tagline: 'Small business growth & good-paying jobs',
    summary:
      'Create good-paying jobs, support local small businesses, and invest strategic state capital back into local community infrastructure.',
    actionItems: [
      'Establish a Small Business Innovation Fund offering micro-grants to District 34 entrepreneurs.',
      'Repair roads, bridges, water systems, and expand high-speed fiber broadband to commercial corridors.',
      'Ensure local District 34 contractors receive fair opportunity for state infrastructure bids.',
      'Partner with community colleges to provide rapid retraining for high-demand careers.',
    ],
    legislativePledge:
      'Secure our fair share of state infrastructure grants for neighborhood revitalization and local street paving.',
  },
  {
    id: 'safety',
    title: 'Safe Neighborhoods',
    icon: Shield,
    tagline: 'Collaborative policing & crime prevention',
    summary:
      'Work collaboratively with law enforcement, first responders, and neighborhood leaders to implement effective strategies for safer communities.',
    actionItems: [
      'Promote community-oriented policing that builds mutual trust between officers and residents.',
      'Invest in neighborhood street lighting, modern crosswalks, and smart emergency dispatch systems.',
      'Expand youth violence prevention programs, weekend sports leagues, and summer mentorship jobs.',
      'Provide dedicated crisis response units for mental health emergency calls.',
    ],
    legislativePledge:
      'Deliver state grant funding for improved neighborhood lighting and equipment for local first responders.',
  },
  {
    id: 'healthcare',
    title: 'Access to Healthcare',
    icon: Activity,
    tagline: 'Affordable clinics, prescriptions & wellness',
    summary:
      'Support initiatives for affordable care, healthier communities, mental health resources, and stronger preventative healthcare.',
    actionItems: [
      'Cap out-of-pocket costs on life-saving prescription medicines including insulin and asthma inhalers.',
      'Expand funding for local community health clinics and mobile preventative screening vans.',
      'Tackle maternal healthcare disparities and expand postpartum Medicaid coverage to a full 12 months.',
      'Increase community-based behavioral health and addiction recovery centers.',
    ],
    legislativePledge:
      'Champion healthcare transparency to protect patients from surprise medical bills and predatory fees.',
  },
  {
    id: 'transparency',
    title: 'Accountability & Transparency',
    icon: Scale,
    tagline: 'Ethical governance & open constituent access',
    summary:
      'Be an accessible voice for the people, ensuring total transparency and keeping District 34 residents regularly informed.',
    actionItems: [
      'Hold quarterly, open-to-the-public town halls across different neighborhoods of District 34.',
      'Publish a plain-language summary of every major bill voted on in the State Senate.',
      'Operate an active constituent casework desk to assist residents with state agency issues.',
      'Refuse donations from corporate PACs that conflict with District 34 community interests.',
    ],
    legislativePledge:
      'Host quarterly public legislative report-backs with live constituent Q&A throughout every legislative session.',
  },
];

export const PlatformCommitments: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDetail | null>(null);

  return (
    <section id="commitments" className="py-20 md:py-28 bg-slate-100/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block text-crimson-700 font-extrabold text-xs tracking-widest uppercase bg-crimson-100 px-3 py-1 rounded-full">
            Our Platform
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950">
            My Commitment To You
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full" />
          <p className="text-slate-600 text-base md:text-lg pt-1">
            Real solutions designed to build a safer, healthier, and more prosperous District 34.
          </p>
        </div>

        {/* 6 Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLATFORM_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-13 h-13 rounded-xl bg-navy-950 text-amber-300 flex items-center justify-center text-xl mb-5 shadow-md group-hover:bg-crimson-700 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy-950 mb-1.5 group-hover:text-crimson-700 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-3">
                    {item.tagline}
                  </div>

                  <p className="text-slate-600 leading-relaxed text-sm">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedPolicy(item)}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-navy-950 text-navy-950 hover:text-amber-300 font-semibold text-xs tracking-wide uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Policy Plan</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl border border-amber-400 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPolicy(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-amber-300 flex items-center justify-center">
                <selectedPolicy.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-crimson-700">
                  Platform Pillar
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 leading-tight">
                  {selectedPolicy.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-medium">
              {selectedPolicy.summary}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="font-bold text-xs uppercase tracking-wider text-navy-950">
                Key Legislative Action Items:
              </h4>
              <ul className="space-y-2.5">
                {selectedPolicy.actionItems.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                Nellie's Day-1 Pledge:
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-serif italic">
                "{selectedPolicy.legislativePledge}"
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPolicy(null)}
                className="px-5 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
