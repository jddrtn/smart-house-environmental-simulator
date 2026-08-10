"use client";

import { FormEvent, useState } from "react";

type Scenario = {
  outdoorTemperature: number;
  occupants: number;
  heatingSetpoint: number;
  ventilationRate: number;
  cookingStart: string;
  cookingDuration: number;
};

// These defaults provide a realistic starting point while keeping every
// condition editable before the simulation is submitted.
const defaultScenario: Scenario = {
  outdoorTemperature: 8,
  occupants: 2,
  heatingSetpoint: 21,
  ventilationRate: 40,
  cookingStart: "18:00",
  cookingDuration: 45,
};

export default function Home() {
  // Keeping the configuration in one object mirrors the request body that will
  // later be sent to the FastAPI simulation endpoint.
  const [scenario, setScenario] = useState<Scenario>(defaultScenario);

  function handleSimulationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // This temporary log confirms that the full scenario is captured correctly
    // before the frontend is connected to the simulation API.
    console.log("Running simulation with:", scenario);
  }

  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#171717]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Smart House Environmental Simulator</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
            Model how occupancy, weather, heating, ventilation and household activities affect indoor environmental conditions.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Scenario Configuration</h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-black/65">
            Define the starting conditions for a 24-hour environmental simulation.
          </p>
        </div>

        <form onSubmit={handleSimulationSubmit} className="overflow-hidden border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 bg-[#faf9f6] px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6f62]">External Conditions</p>
          </div>

          <div className="grid md:grid-cols-2">
            <label className="border-b border-black/10 p-6 md:border-r">
              <span className="mb-2 block text-sm font-semibold">Outdoor temperature</span>
              <p className="mb-4 text-sm text-black/60">Ambient outdoor temperature used as the external condition.</p>

              <div className="relative">
                <input
                  type="number"
                  value={scenario.outdoorTemperature}
                  onChange={(event) =>
                    setScenario({
                      ...scenario,
                      outdoorTemperature: Number(event.target.value),
                    })
                  }
                  className="w-full border border-black/20 bg-[#faf9f6] px-4 py-3 pr-12 text-base outline-none transition focus:border-[#2f6f62] focus:ring-2 focus:ring-[#2f6f62]/15"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45">°C</span>
              </div>
            </label>

            <div className="hidden border-b border-black/10 md:block" />
          </div>

          <div className="border-b border-black/10 bg-[#faf9f6] px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6f62]">House Conditions</p>
          </div>

          <div className="grid md:grid-cols-2">
            <label className="border-b border-black/10 p-6 md:border-r">
              <span className="mb-2 block text-sm font-semibold">Occupants</span>
              <p className="mb-4 text-sm text-black/60">Number of people contributing heat and CO₂ to the house.</p>

              <input
                type="number"
                min="0"
                value={scenario.occupants}
                onChange={(event) =>
                  setScenario({
                    ...scenario,
                    occupants: Number(event.target.value),
                  })
                }
                className="w-full border border-black/20 bg-[#faf9f6] px-4 py-3 text-base outline-none transition focus:border-[#2f6f62] focus:ring-2 focus:ring-[#2f6f62]/15"
              />
            </label>

            <label className="border-b border-black/10 p-6">
              <span className="mb-2 block text-sm font-semibold">Heating setpoint</span>
              <p className="mb-4 text-sm text-black/60">Target indoor temperature maintained by the heating system.</p>

              <div className="relative">
                <input
                  type="number"
                  value={scenario.heatingSetpoint}
                  onChange={(event) =>
                    setScenario({
                      ...scenario,
                      heatingSetpoint: Number(event.target.value),
                    })
                  }
                  className="w-full border border-black/20 bg-[#faf9f6] px-4 py-3 pr-12 text-base outline-none transition focus:border-[#2f6f62] focus:ring-2 focus:ring-[#2f6f62]/15"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45">°C</span>
              </div>
            </label>

            <label className="border-b border-black/10 p-6 md:border-b-0 md:border-r">
              <span className="mb-2 block text-sm font-semibold">Ventilation rate</span>
              <p className="mb-4 text-sm text-black/60">Relative ventilation level used to remove heat and pollutants.</p>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scenario.ventilationRate}
                  onChange={(event) =>
                    setScenario({
                      ...scenario,
                      ventilationRate: Number(event.target.value),
                    })
                  }
                  className="w-full border border-black/20 bg-[#faf9f6] px-4 py-3 pr-12 text-base outline-none transition focus:border-[#2f6f62] focus:ring-2 focus:ring-[#2f6f62]/15"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45">%</span>
              </div>
            </label>

            <div className="hidden md:block" />
          </div>

          <div className="border-y border-black/10 bg-[#faf9f6] px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6f62]">Activities</p>
          </div>

          <div className="grid md:grid-cols-2">
            <label className="p-6 md:border-r">
              <span className="mb-2 block text-sm font-semibold">Cooking start time</span>
              <p className="mb-4 text-sm text-black/60">Time at which the simulated cooking activity begins.</p>

              <input
                type="time"
                value={scenario.cookingStart}
                onChange={(event) =>
                  setScenario({
                    ...scenario,
                    cookingStart: event.target.value,
                  })
                }
                className="w-full border border-black/20 bg-[#faf9f6] px-4 py-3 text-base outline-none transition focus:border-[#2f6f62] focus:ring-2 focus:ring-[#2f6f62]/15"
              />
            </label>

            <label className="border-t border-black/10 p-6 md:border-t-0">
              <span className="mb-2 block text-sm font-semibold">Cooking duration</span>
              <p className="mb-4 text-sm text-black/60">Length of the cooking event used to influence particulate levels.</p>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={scenario.cookingDuration}
                  onChange={(event) =>
                    setScenario({
                      ...scenario,
                      cookingDuration: Number(event.target.value),
                    })
                  }
                  className="w-full border border-black/20 bg-[#faf9f6] px-4 py-3 pr-20 text-base outline-none transition focus:border-[#2f6f62] focus:ring-2 focus:ring-[#2f6f62]/15"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45">min</span>
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-4 border-t border-black/10 bg-[#f7f6f2] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-black/60">24-hour simulation · 5-minute intervals</p>

            <button
              type="submit"
              className="bg-[#2f6f62] px-8 py-3.5 font-semibold text-white transition hover:bg-[#25584e] focus:outline-none focus:ring-2 focus:ring-[#2f6f62] focus:ring-offset-2"
            >
              Run Simulation
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}