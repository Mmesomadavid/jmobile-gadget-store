import {
  LifeBuoy,
  Wallet,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';

const Process = () => {
  const steps = [
    {
      id: 1,
      title: '24/7 Support',
      subtitle: 'Reach out anytime',
      icon: LifeBuoy,
      gradient: 'from-blue-100 to-blue-200',
    },
    {
      id: 2,
      title: 'Fast Payments',
      subtitle: 'Multiple & fast options',
      icon: Wallet,
      gradient: 'from-emerald-100 to-emerald-200',
    },
    {
      id: 3,
      title: 'Safe Payments',
      subtitle: 'Guaranteed safety',
      icon: ShieldCheck,
      gradient: 'from-purple-100 to-purple-200',
    },
    {
      id: 4,
      title: 'Free Shipping',
      subtitle: 'Minimum threshold required',
      icon: Truck,
      gradient: 'from-pink-100 to-pink-200',
    },
    {
      id: 5,
      title: '30 Days Return',
      subtitle: '30 days guarantee',
      icon: RotateCcw,
      gradient: 'from-red-100 to-red-200',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-10">

      {/* Process Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              className="group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white hover:shadow-md transition"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${step.gradient}
              flex items-center justify-center text-2xl sm:text-3xl md:text-4xl
              group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-gray-900" />
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight">
                  {step.title}
                </p>
                <p className="mt-1 text-[11px] sm:text-xs text-gray-500 leading-tight">
                  {step.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Process;
