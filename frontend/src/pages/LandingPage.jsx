import { useNavigate } from "react-router-dom" 

export function LandingPage () {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen bg-blue-700">
            <div className="pl-[130px] pt-[30px] flex">
                <h1 className="text-3xl text-white">TeamWrite</h1>
                {/* <h1>Hello</h1> */}
                <div className="flex justify-end items-center pr-[75px] w-full ">
                    <button onClick = {() => (navigate("/login"))} className="border border-white text-white hover:bg-blue-600 font-semibold py-2 px-6 rounded-lg transition duration-300">Login</button>
                    <div className="p-2"></div>
                    <button onClick = {() => (navigate("/signup"))} className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-6 rounded-lg transition duration-300">Sign Up</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[175px]">
                <div className="flex flex-col justify-center items-center text-center px-10">
                    <p className="text-white text-[60px] font-bold mb-5">CREATE. DRAW. REPEAT.</p>
                    <p className="text-white text-[30px] max-w-6xl">
                    TeamWrite lets you and your friends draw together in real time. Whether you’re brainstorming,
                    storyboarding, or just having fun — your creativity belongs here.
                    </p>
                    <button className="mt-8 bg-white font-bold rounded-full py-2 px-7 text-[20px]">Explore</button>
                </div>
            </div>


        </div>
        
    )
}