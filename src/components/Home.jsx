
import AnimatedIcons from "../AnimatedIcons"
import SlidingText from "./SlidingText"
import Footer from "./footer"



function Home() {
    return(
        <>
        <div className="min-h-screen flex flex-col bg-[url('/bg-image.jpg')] bg-[center_60%] bg-cover ">
    
        <AnimatedIcons />
        <SlidingText />
        <Footer />

        </div>
        


        </>
    )
}

export default Home