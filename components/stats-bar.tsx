import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function StatsBar() {
  return (
    <section className="bg-indigo-600 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          {/* Appointments Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 px-8">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="border-2 border-indigo-600 size-10">
                  <AvatarImage src={`/user-avatar.png?height=40&width=40&query=user avatar ${i}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-white font-bold text-lg leading-tight">
              300+ Appointments
              <br />
              Successfully
            </p>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/20" />

          {/* Doctors Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 px-8">
            <h3 className="text-white text-4xl font-bold mb-2">200+</h3>
            <p className="text-white/90 font-medium">Specialists Doctors</p>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/20" />

          {/* Customer Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 px-8">
            <h3 className="text-white text-4xl font-bold mb-2">50K</h3>
            <p className="text-white/90 font-medium">Happy Customer</p>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/20" />

          {/* Awards Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 px-8">
            <h3 className="text-white text-4xl font-bold mb-2">152+</h3>
            <p className="text-white/90 font-medium">Winning Awards</p>
          </div>
        </div>
      </div>
    </section>
  )
}
