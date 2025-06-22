import { FaRegLightbulb, FaTools, FaUserAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-16 px-4">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
            About Amazon Price Tracker
          </h1>

          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <section className="flex items-start gap-4">
              <FaRegLightbulb className="text-blue-600 text-2xl mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  What We Do
                </h2>
                <p>
                  We help online shoppers track product prices on Amazon and get
                  notified when the price drops below their desired target. Our
                  goal is to save your time and money with automated, real-time
                  price monitoring.
                </p>
              </div>
            </section>

            <section className="flex items-start gap-4">
              <FaTools className="text-blue-600 text-2xl mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  Tech Stack
                </h2>
                <p>
                  This project is built using the powerful{" "}
                  <span className="font-medium text-gray-900">MERN Stack</span>{" "}
                  — MongoDB, Express.js, React.js, and Node.js. It also uses{" "}
                  <span className="text-gray-900 font-medium">Playwright</span>{" "}
                  for scraping and{" "}
                  <span className="text-gray-900 font-medium">Node-Cron</span>{" "}
                  for scheduled checks.
                </p>
              </div>
            </section>

            <section className="flex items-start gap-4">
              <FaUserAlt className="text-blue-600 text-2xl mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  About the Creator
                </h2>
                <p>
                  Hi! I'm{" "}
                  <span className="font-semibold text-blue-700">
                    Anirudh Singh Chauhan
                  </span>
                  , a passionate full-stack developer and B.Tech CSE student.
                  This project reflects my love for building practical tools
                  that solve real-world problems.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Why Use This App?
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>🕒 Save time — no need to manually check prices</li>
                <li>📉 Get notified when prices drop</li>
                <li>📊 Visualize price history with graphs</li>
                <li>🔒 Built with secure user authentication</li>
              </ul>
            </section>

            <div className="text-center mt-10">
              <p className="text-gray-600 italic">
                Thank you for using this app. Your feedback is always welcome!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
