"use client";

export default function LearningsChart() {
  return (
    <div className="mt-20 w-full max-w-6xl mx-auto pb-20">
      {/* Title */}
      <div className="text-center mb-12">
        <p className="font-michroma text-4xl">LEARNINGS</p>
      </div>

      {/* Charts Container */}
      <div className="flex flex-col gap-12">
        {/* System Integration Chart */}
        <div className="bg-gradient-to-br from-orange-500/2 to-orange-600/3 rounded-2xl p-8 border border-amber-300/40 w-full">
          <h3 className="font-michroma text-2xl font-bold text-[#FFC35B] mb-6 text-center">
            SYSTEM INTEGRATION
          </h3>

          {/* Chart Bars Container */}
          <div className="relative h-36 flex items-end justify-between px-4">
            {/* Baseline */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-300/40"></div>

            {/* API */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                API
              </span>
              <div
                className="w-12 h-8 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#C18EF0",
                  border: "2px solid #F0A6FF",
                }}
              ></div>
            </div>

            {/* MICROSERVICES */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                MICROSERVICES
              </span>
              <div
                className="w-12 h-24 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#C18EF0",
                  border: "2px solid #F0A6FF",
                }}
              ></div>
            </div>

            {/* WEB HOOKS */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                WEB HOOKS
              </span>
              <div
                className="w-12 h-14 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#C18EF0",
                  border: "2px solid #F0A6FF",
                }}
              ></div>
            </div>

            {/* AUTHENTICATION */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                AUTHENTICATION
              </span>
              <div
                className="w-12 h-24 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#C18EF0",
                  border: "2px solid #F0A6FF",
                }}
              ></div>
            </div>

            {/* ELT TOOLS */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                ELT TOOLS
              </span>
              <div
                className="w-12 h-30 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#C18EF0",
                  border: "2px solid #F0A6FF",
                }}
              ></div>
            </div>

            {/* MIDDLEWARE */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                MIDDLEWARE
              </span>
              <div
                className="w-12 h-14 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#C18EF0",
                  border: "2px solid #F0A6FF",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Cloud Computing Chart */}
        <div className="bg-gradient-to-br from-orange-500/2 to-orange-600/3 rounded-2xl p-8 border border-amber-300/40 w-full">
          <h3 className="font-michroma text-2xl font-bold text-[#FFC35B] mb-6 text-center">
            CLOUD COMPUTING
          </h3>

          {/* Chart Bars Container */}
          <div className="relative h-36 flex items-end justify-between px-4">
            {/* Baseline */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-300/40"></div>

            {/* IAAS */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                IAAS
              </span>
              <div
                className="w-12 h-24 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#8ABEE7",
                  border: "2px solid #B2F0FF",
                }}
              ></div>
            </div>

            {/* PAAS */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                PAAS
              </span>
              <div
                className="w-12 h-24 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#8ABEE7",
                  border: "2px solid #B2F0FF",
                }}
              ></div>
            </div>

            {/* FAAS */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                FAAS
              </span>
              <div
                className="w-12 h-15 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#8ABEE7",
                  border: "2px solid #B2F0FF",
                }}
              ></div>
            </div>

            {/* CONTAINERS */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                CONTAINERS
              </span>
              <div
                className="w-12 h-24 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#8ABEE7",
                  border: "2px solid #B2F0FF",
                }}
              ></div>
            </div>

            {/* DEVOPS */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                DEVOPS
              </span>
              <div
                className="w-12 h-24 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#8ABEE7",
                  border: "2px solid #B2F0FF",
                }}
              ></div>
            </div>

            {/* NETWORKING */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                NETWORKING
              </span>
              <div
                className="w-12 h-24 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#8ABEE7",
                  border: "2px solid #B2F0FF",
                }}
              ></div>
            </div>

            {/* CON */}
            <div className="flex flex-col items-center relative z-10">
              <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                CON
              </span>
              <div
                className="w-12 h-8 rounded-t-md shadow-lg"
                style={{
                  backgroundColor: "#8ABEE7",
                  border: "2px solid #B2F0FF",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
