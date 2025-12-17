export default function StatsSection() {
  const stats = [
    { value: "32215", label: "GROUP CUSTOMERS" },
    { value: "2.3Mil", label: "PEOPLE TRAINED" },
    { value: "200+", label: "LIVE COURSES" },
    { value: "99.6%", label: "HAPPY CUSTOMERS" },
  ]

  return (
    <section className="py-16 px-6 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-5xl lg:text-6xl font-bold text-blue-900">{stat.value}</div>
              <div className="text-sm font-semibold text-blue-800 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
