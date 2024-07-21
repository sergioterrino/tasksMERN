import ParticlesBg from "../components/ParticlesBg"

function HomePage() {
  return (
    <>
      <ParticlesBg />
      <div className="flex flex-col w-full mx-auto my-20 md:my-44 h-[calc(96vh-100)] p-2 items-center">
        <h1 className="text-5xl font-bold text-center mb-4 z-50 text-slate-50">I NEED TO ORGANIZE MY DAILY TASKS</h1>
        <h3 className="text-center font-bold text-sm z-50">EASY, JUST CREATE YOUR TASK, SET THE DATE AND THAT´S IT</h3>
      </div>
    </>
  )
}

export default HomePage