import Image from "next/image"
import logo from "../public/deliver.png"

const HomePage = () => {
  return(
    <div className="w-screen h-screen p-5">
      <div className="w-full h-full flex items-center flex-col gap-7">
        <Image src={logo} alt="Logo" className="rounded-full shadow-xl shadow-blue-500" />
        <p className="w-2/3 text-2xl text-center">
        Our online food delivery app built for DBMS, handling orders, deliveries and payments with transactions.
        </p>
      </div>
    </div>
  )
} 

export default HomePage