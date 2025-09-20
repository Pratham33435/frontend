export default function CreativeWritings() {

    const Firstline={
            title:"Let the World Feel Your Words",
            discription:"Let your imagination speak louder than words. Share your ideas, your art, your voice-because creativity isn't just skill, it's your fingerprint on the universe. Show the world the brillience only you can bring",
            title2:"Empower voices to rise",
            discription2:"Whether it's a poem,a story, or a spark of thought-our platform is where writers discover their strength, share their soul, and inspire others. Every words matter, and every voice deserves to be heard. This is Where writing become impact."
    }
    
     
  return (
    <div className="flex flex-col h-screen w-screen mt-14">
      {/* Top Section */}
      <div className="flex flex-row flex-1 mt-10 p-4 ">
        <div className="w-2/4 h-[90%] bg-white rounded-2xl shadow-lg overflow-hidden  opacity-70">
          <img
            src="/poems.jpg"
            alt="Top"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-center text-black m-2 flex-1 px-4">
          <h1 className="text-2xl md:text-4xl font-bold">{Firstline.title}</h1>
          <p className="mt-3 text-sm md:text-lg max-w-md">
            {Firstline.discription}
          </p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex-1 relative flex justify-center items-center text-white text-2xl md:text-3xl font-semibold">
      {/* Background image */}
      <img
        src="/bg-image-2.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text animation */}
      <div className="relative flex items-center space-x-2 overflow-hidden h-[2em] z-10">
        <span>Show your</span>
        <div className="relative h-[2em] overflow-hidden w-[7ch]">
          <div className="loop-text absolute top-0 left-0">
            <div className="h-[2em] flex items-center ">Skill</div>
            <div className="h-[2em] flex items-center">Talent</div>
            <div className="h-[2em] flex items-center">Passion</div>
            {/* repeat for infinite scroll */}
            <div className="h-[2em] flex items-center">Skill</div>
            <div className="h-[2em] flex items-center">Talent</div>
            <div className="h-[2em] flex items-center">Passion</div>
          </div>
        </div>
      </div>
    </div>

      {/* Bottom Section */}
      <div className="flex flex-row flex-1 bg-slate-900 opacity-70 p-4">
        
        <div className="flex flex-col justify-center items-center text-center text-white m-2 flex-1 px-4">
          <h1 className="text-2xl md:text-4xl font-bold">{Firstline.title2}</h1>
          <p className="mt-3 text-sm md:text-lg max-w-md">
            {Firstline.discription2}
          </p>
        </div>
      </div>
    </div>
  );
}
