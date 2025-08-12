/**
 * DataManager - Handles data loading and management for the EcoBalance Score System
 */
class DataManager {
    constructor() {
        this.cityData = null;
        this.apiSources = null;
        this.isLoaded = false;
    }

    /**
     * Load data from JSON file
     */
    async loadData() {
        try {
            // Load the August demo data
            const response = await fetch('./demo_data/august.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.apiSources = data;
            
            // For now, we'll use the hardcoded city data but with the API sources integrated
            // This allows for future expansion to pull real data from the APIs
            this.cityData = this.createCityDataWithAPISources(data);
            this.isLoaded = true;
            
            return this.cityData;
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to hardcoded data
            this.cityData = this.getFallbackData();
            this.isLoaded = true;
            return this.cityData;
        }
    }

    /**
     * Create city data structure with API source information
     */
    createCityDataWithAPISources(apiData) {
        // Enhanced city data with API source integration
        const cities = [
            {
                "id": "singapore",
                "name": "Singapore",
                "country": "Singapore",
                "population": 5896000,
                "area_km2": 728,
                "coordinates": {"lat": 1.3521, "lng": 103.8198},
                "emissions": {
                    "total_co2_tons_per_year": 32000000,
                    "per_capita_tons": 5.4,
                    "sectors": {"transport": 40, "buildings": 30, "industrial": 25, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 47,
                    "green_space_percent": 47,
                    "parks_area_km2": 80,
                    "estimated_trees": 3200000,
                    "carbon_sequestration_tons_per_year": 52000
                },
                "eco_balance_score": 1.63,
                "rank": "Excellent",
                "sdg13_alignment": 92,
                "data_sources": this.findCityDataSources(apiData, "Singapore")
            },
            {
                "id": "nyc",
                "name": "New York City",
                "country": "United States",
                "population": 8336817,
                "area_km2": 789,
                "coordinates": {"lat": 40.7128, "lng": -74.0060},
                "emissions": {
                    "total_co2_tons_per_year": 54000000,
                    "per_capita_tons": 6.5,
                    "sectors": {"transport": 45, "buildings": 35, "industrial": 15, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 24,
                    "green_space_percent": 27,
                    "parks_area_km2": 134,
                    "estimated_trees": 5200000,
                    "carbon_sequestration_tons_per_year": 48000
                },
                "eco_balance_score": 0.89,
                "rank": "Good",
                "sdg13_alignment": 75,
                "data_sources": this.findCityDataSources(apiData, "New York City")
            },
            {
                "id": "london",
                "name": "London",
                "country": "United Kingdom",
                "population": 9540576,
                "area_km2": 1572,
                "coordinates": {"lat": 51.5074, "lng": -0.1278},
                "emissions": {
                    "total_co2_tons_per_year": 38000000,
                    "per_capita_tons": 4.0,
                    "sectors": {"transport": 35, "buildings": 40, "industrial": 20, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 33,
                    "green_space_percent": 38,
                    "parks_area_km2": 210,
                    "estimated_trees": 7200000,
                    "carbon_sequestration_tons_per_year": 78000
                },
                "eco_balance_score": 2.05,
                "rank": "Excellent",
                "sdg13_alignment": 88,
                "data_sources": this.findCityDataSources(apiData, "London")
            },
            {
                "id": "paris",
                "name": "Paris",
                "country": "France",
                "population": 2161000,
                "area_km2": 105,
                "coordinates": {"lat": 48.8566, "lng": 2.3522},
                "emissions": {
                    "total_co2_tons_per_year": 12500000,
                    "per_capita_tons": 5.8,
                    "sectors": {"transport": 38, "buildings": 42, "industrial": 15, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 23,
                    "green_space_percent": 25,
                    "parks_area_km2": 26,
                    "estimated_trees": 200000,
                    "carbon_sequestration_tons_per_year": 18500
                },
                "eco_balance_score": 0.61,
                "rank": "Fair",
                "sdg13_alignment": 78,
                "data_sources": this.findCityDataSources(apiData, "Paris")
            },
            {
                "id": "barcelona",
                "name": "Barcelona",
                "country": "Spain",
                "population": 1636000,
                "area_km2": 101,
                "coordinates": {"lat": 41.3851, "lng": 2.1734},
                "emissions": {
                    "total_co2_tons_per_year": 8200000,
                    "per_capita_tons": 5.0,
                    "sectors": {"transport": 42, "buildings": 35, "industrial": 18, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 21,
                    "green_space_percent": 28,
                    "parks_area_km2": 28,
                    "estimated_trees": 180000,
                    "carbon_sequestration_tons_per_year": 16800
                },
                "eco_balance_score": 0.82,
                "rank": "Good",
                "sdg13_alignment": 82,
                "data_sources": this.findCityDataSources(apiData, "Barcelona")
            },
            {
                "id": "berlin",
                "name": "Berlin",
                "country": "Germany",
                "population": 3677000,
                "area_km2": 892,
                "coordinates": {"lat": 52.5200, "lng": 13.4050},
                "emissions": {
                    "total_co2_tons_per_year": 20100000,
                    "per_capita_tons": 5.5,
                    "sectors": {"transport": 35, "buildings": 45, "industrial": 15, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 30,
                    "green_space_percent": 44,
                    "parks_area_km2": 392,
                    "estimated_trees": 2800000,
                    "carbon_sequestration_tons_per_year": 58800
                },
                "eco_balance_score": 1.46,
                "rank": "Good",
                "sdg13_alignment": 85,
                "data_sources": this.findCityDataSources(apiData, "Berlin")
            },
            {
                "id": "madrid",
                "name": "Madrid",
                "country": "Spain",
                "population": 3223000,
                "area_km2": 604,
                "coordinates": {"lat": 40.4168, "lng": -3.7038},
                "emissions": {
                    "total_co2_tons_per_year": 18500000,
                    "per_capita_tons": 5.7,
                    "sectors": {"transport": 40, "buildings": 38, "industrial": 17, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 26,
                    "green_space_percent": 35,
                    "parks_area_km2": 211,
                    "estimated_trees": 1800000,
                    "carbon_sequestration_tons_per_year": 42300
                },
                "eco_balance_score": 1.31,
                "rank": "Good",
                "sdg13_alignment": 79,
                "data_sources": this.findCityDataSources(apiData, "Madrid")
            },
            {
                "id": "amsterdam",
                "name": "Amsterdam",
                "country": "Netherlands",
                "population": 873000,
                "area_km2": 219,
                "coordinates": {"lat": 52.3676, "lng": 4.9041},
                "emissions": {
                    "total_co2_tons_per_year": 4800000,
                    "per_capita_tons": 5.5,
                    "sectors": {"transport": 45, "buildings": 35, "industrial": 15, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 20,
                    "green_space_percent": 30,
                    "parks_area_km2": 66,
                    "estimated_trees": 220000,
                    "carbon_sequestration_tons_per_year": 19800
                },
                "eco_balance_score": 0.82,
                "rank": "Good",
                "sdg13_alignment": 87,
                "data_sources": this.findCityDataSources(apiData, "Amsterdam")
            },
            {
                "id": "rome",
                "name": "Rome",
                "country": "Italy",
                "population": 2873000,
                "area_km2": 1285,
                "coordinates": {"lat": 41.9028, "lng": 12.4964},
                "emissions": {
                    "total_co2_tons_per_year": 16800000,
                    "per_capita_tons": 5.8,
                    "sectors": {"transport": 43, "buildings": 32, "industrial": 20, "waste": 5}
                },
                "vegetation": {
                    "tree_canopy_percent": 19,
                    "green_space_percent": 34,
                    "parks_area_km2": 437,
                    "estimated_trees": 1200000,
                    "carbon_sequestration_tons_per_year": 52200
                },
                "eco_balance_score": 1.57,
                "rank": "Excellent",
                "sdg13_alignment": 76,
                "data_sources": this.findCityDataSources(apiData, "Rome")
            }
        ];

        return {
            cities,
            calculation_methodology: {
                "eco_balance_formula": "Carbon Sequestration Rate / Emissions Per Capita",
                "carbon_sequestration_rate": "tonnes CO2/year per km2 of green space",
                "emissions_metric": "tonnes CO2 per capita per year",
                "score_interpretation": {
                    "0.0-0.5": "Poor - High emissions, low carbon absorption",
                    "0.5-1.0": "Fair - Moderate balance",
                    "1.0-1.5": "Good - Positive environmental impact",
                    "1.5+": "Excellent - Strong carbon positive"
                }
            },
            data_sources: {
                "emissions": ["Climate TRACE API", "Municipal GHG inventories"],
                "vegetation": ["HUGSI satellite data", "i-Tree assessments", "OpenStreetMap"],
                "carbon_sequestration": ["Scientific literature", "i-Tree Eco calculations"]
            },
            api_integration: apiData
        };
    }

    /**
     * Find data sources for a specific city from the API data
     */
    findCityDataSources(apiData, cityName) {
        const city = apiData.cities?.find(c => c.name === cityName);
        return city ? {
            green_space: city.green_space_data,
            emissions: city.emissions_data
        } : null;
    }

    /**
     * Fallback data in case JSON loading fails
     */
    getFallbackData() {
        return {
            "cities": [
                {
                    "id": "singapore",
                    "name": "Singapore",
                    "country": "Singapore",
                    "population": 5896000,
                    "area_km2": 728,
                    "coordinates": {"lat": 1.3521, "lng": 103.8198},
                    "emissions": {
                        "total_co2_tons_per_year": 32000000,
                        "per_capita_tons": 5.4,
                        "sectors": {"transport": 40, "buildings": 30, "industrial": 25, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 47,
                        "green_space_percent": 47,
                        "parks_area_km2": 80,
                        "estimated_trees": 3200000,
                        "carbon_sequestration_tons_per_year": 52000
                    },
                    "eco_balance_score": 1.63,
                    "rank": "Excellent",
                    "sdg13_alignment": 92
                },
                {
                    "id": "nyc",
                    "name": "New York City",
                    "country": "United States",
                    "population": 8336817,
                    "area_km2": 789,
                    "coordinates": {"lat": 40.7128, "lng": -74.0060},
                    "emissions": {
                        "total_co2_tons_per_year": 54000000,
                        "per_capita_tons": 6.5,
                        "sectors": {"transport": 45, "buildings": 35, "industrial": 15, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 24,
                        "green_space_percent": 27,
                        "parks_area_km2": 134,
                        "estimated_trees": 5200000,
                        "carbon_sequestration_tons_per_year": 48000
                    },
                    "eco_balance_score": 0.89,
                    "rank": "Good",
                    "sdg13_alignment": 75
                },
                {
                    "id": "london",
                    "name": "London",
                    "country": "United Kingdom",
                    "population": 9540576,
                    "area_km2": 1572,
                    "coordinates": {"lat": 51.5074, "lng": -0.1278},
                    "emissions": {
                        "total_co2_tons_per_year": 38000000,
                        "per_capita_tons": 4.0,
                        "sectors": {"transport": 35, "buildings": 40, "industrial": 20, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 33,
                        "green_space_percent": 38,
                        "parks_area_km2": 210,
                        "estimated_trees": 7200000,
                        "carbon_sequestration_tons_per_year": 78000
                    },
                    "eco_balance_score": 2.05,
                    "rank": "Excellent",
                    "sdg13_alignment": 88
                },
                {
                    "id": "paris",
                    "name": "Paris",
                    "country": "France",
                    "population": 2161000,
                    "area_km2": 105,
                    "coordinates": {"lat": 48.8566, "lng": 2.3522},
                    "emissions": {
                        "total_co2_tons_per_year": 12500000,
                        "per_capita_tons": 5.8,
                        "sectors": {"transport": 38, "buildings": 42, "industrial": 15, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 23,
                        "green_space_percent": 25,
                        "parks_area_km2": 26,
                        "estimated_trees": 200000,
                        "carbon_sequestration_tons_per_year": 18500
                    },
                    "eco_balance_score": 0.61,
                    "rank": "Fair",
                    "sdg13_alignment": 78
                },
                {
                    "id": "barcelona",
                    "name": "Barcelona",
                    "country": "Spain",
                    "population": 1636000,
                    "area_km2": 101,
                    "coordinates": {"lat": 41.3851, "lng": 2.1734},
                    "emissions": {
                        "total_co2_tons_per_year": 8200000,
                        "per_capita_tons": 5.0,
                        "sectors": {"transport": 42, "buildings": 35, "industrial": 18, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 21,
                        "green_space_percent": 28,
                        "parks_area_km2": 28,
                        "estimated_trees": 180000,
                        "carbon_sequestration_tons_per_year": 16800
                    },
                    "eco_balance_score": 0.82,
                    "rank": "Good",
                    "sdg13_alignment": 82
                },
                {
                    "id": "berlin",
                    "name": "Berlin",
                    "country": "Germany",
                    "population": 3677000,
                    "area_km2": 892,
                    "coordinates": {"lat": 52.5200, "lng": 13.4050},
                    "emissions": {
                        "total_co2_tons_per_year": 20100000,
                        "per_capita_tons": 5.5,
                        "sectors": {"transport": 35, "buildings": 45, "industrial": 15, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 30,
                        "green_space_percent": 44,
                        "parks_area_km2": 392,
                        "estimated_trees": 2800000,
                        "carbon_sequestration_tons_per_year": 58800
                    },
                    "eco_balance_score": 1.46,
                    "rank": "Good",
                    "sdg13_alignment": 85
                },
                {
                    "id": "madrid",
                    "name": "Madrid",
                    "country": "Spain",
                    "population": 3223000,
                    "area_km2": 604,
                    "coordinates": {"lat": 40.4168, "lng": -3.7038},
                    "emissions": {
                        "total_co2_tons_per_year": 18500000,
                        "per_capita_tons": 5.7,
                        "sectors": {"transport": 40, "buildings": 38, "industrial": 17, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 26,
                        "green_space_percent": 35,
                        "parks_area_km2": 211,
                        "estimated_trees": 1800000,
                        "carbon_sequestration_tons_per_year": 42300
                    },
                    "eco_balance_score": 1.31,
                    "rank": "Good",
                    "sdg13_alignment": 79
                },
                {
                    "id": "amsterdam",
                    "name": "Amsterdam",
                    "country": "Netherlands",
                    "population": 873000,
                    "area_km2": 219,
                    "coordinates": {"lat": 52.3676, "lng": 4.9041},
                    "emissions": {
                        "total_co2_tons_per_year": 4800000,
                        "per_capita_tons": 5.5,
                        "sectors": {"transport": 45, "buildings": 35, "industrial": 15, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 20,
                        "green_space_percent": 30,
                        "parks_area_km2": 66,
                        "estimated_trees": 220000,
                        "carbon_sequestration_tons_per_year": 19800
                    },
                    "eco_balance_score": 0.82,
                    "rank": "Good",
                    "sdg13_alignment": 87
                },
                {
                    "id": "rome",
                    "name": "Rome",
                    "country": "Italy",
                    "population": 2873000,
                    "area_km2": 1285,
                    "coordinates": {"lat": 41.9028, "lng": 12.4964},
                    "emissions": {
                        "total_co2_tons_per_year": 16800000,
                        "per_capita_tons": 5.8,
                        "sectors": {"transport": 43, "buildings": 32, "industrial": 20, "waste": 5}
                    },
                    "vegetation": {
                        "tree_canopy_percent": 19,
                        "green_space_percent": 34,
                        "parks_area_km2": 437,
                        "estimated_trees": 1200000,
                        "carbon_sequestration_tons_per_year": 52200
                    },
                    "eco_balance_score": 1.57,
                    "rank": "Excellent",
                    "sdg13_alignment": 76
                }
            ],
            "calculation_methodology": {
                "eco_balance_formula": "Carbon Sequestration Rate / Emissions Per Capita",
                "carbon_sequestration_rate": "tonnes CO2/year per km2 of green space",
                "emissions_metric": "tonnes CO2 per capita per year",
                "score_interpretation": {
                    "0.0-0.5": "Poor - High emissions, low carbon absorption",
                    "0.5-1.0": "Fair - Moderate balance",
                    "1.0-1.5": "Good - Positive environmental impact",
                    "1.5+": "Excellent - Strong carbon positive"
                }
            },
            "data_sources": {
                "emissions": ["Climate TRACE API", "Municipal GHG inventories"],
                "vegetation": ["HUGSI satellite data", "i-Tree assessments", "OpenStreetMap"],
                "carbon_sequestration": ["Scientific literature", "i-Tree Eco calculations"]
            }
        };
    }

    /**
     * Get all cities
     */
    getCities() {
        return this.cityData?.cities || [];
    }

    /**
     * Get city by ID
     */
    getCityById(id) {
        return this.cityData?.cities?.find(city => city.id === id);
    }

    /**
     * Get methodology information
     */
    getMethodology() {
        return this.cityData?.calculation_methodology;
    }

    /**
     * Get data sources information
     */
    getDataSources() {
        return this.cityData?.data_sources;
    }

    /**
     * Get API integration data
     */
    getAPIIntegration() {
        return this.cityData?.api_integration;
    }
}

export default DataManager;
