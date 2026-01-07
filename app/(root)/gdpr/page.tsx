import BreadCrumb from "@/components/BreadCrumb";
import { gdprData } from "@/data/gdprData";

export const dynamic = 'force-static';

const GDPR = () => {
  return (
    <>
      <BreadCrumb title="General Data Protection Regulation" paths={[{ label: "GDPR", href: "/gdprData" }]} />
      <section className="bg-blue-100/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-sm shadow-sm px-8 lg:px-20 py-10">
            {/* Header */}
            <header className="mb-10 text-center">
              <h1 className="text-2xl font-semibold text-slate-800">{gdprData.title}</h1>
              <p className="mt-2 font-medium text-slate-600">{gdprData.company}</p>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">{gdprData.intro}</p>
            </header>

            {/* Content */}
            <div className="space-y-8 text-blue-950/80 text-sm leading-relaxed">
              {gdprData.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-semibold text-2xl text-blue-950/80 mb-3">{section.heading}</h2>

                  <ul className="space-y-2 text-[15px] list-none">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        {/* <span className="text-slate-400 mt-1">•</span> */}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GDPR;
