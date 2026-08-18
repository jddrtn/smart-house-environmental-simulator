from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Smart House Environmental Simulator API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SimulationScenario(BaseModel):
    outdoorTemperature: float
    occupants: int
    heatingSetpoint: float
    ventilationRate: float
    cookingStart: str
    cookingDuration: int


@app.get("/")
def root():
    return {
        "name": "Smart House Environmental Simulator API",
        "status": "running",
    }


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/simulations")
def create_simulation(scenario: SimulationScenario):
    return {
        "message": "Simulation received",
        "scenario": scenario,
    }