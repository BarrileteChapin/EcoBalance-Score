/**
 * APIManager - Handles API demo functionality and data source integration
 */
class APIManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.fetchDataBtn = null;
        this.apiResponse = null;
        this.apiJson = null;
    }

    /**
     * Initialize API demo functionality
     */
    initialize() {
        this.fetchDataBtn = document.getElementById('fetch-data-btn');
        this.apiResponse = document.getElementById('api-response');
        this.apiJson = document.getElementById('api-json');

        if (!this.fetchDataBtn) return;

        this.fetchDataBtn.addEventListener('click', () => this.simulateAPIFetch());
        this.populateDataSources();
    }

    /**
     * Populate data sources information
     */
    populateDataSources() {
        const apiIntegration = this.dataManager.getAPIIntegration();
        if (!apiIntegration || !apiIntegration.cities) return;

        const dataSourcesContainer = document.getElementById('data-sources-list');
        if (!dataSourcesContainer) return;

        const sourcesHTML = apiIntegration.cities.map(city => this.createDataSourceCard(city)).join('');
        dataSourcesContainer.innerHTML = sourcesHTML;
    }

    /**
     * Create data source card for a city
     */
    createDataSourceCard(city) {
        return `
            <div class="data-source-card">
                <div class="data-source-header">
                    <h3>${city.name}</h3>
                    <span class="country-tag">${city.country}</span>
                </div>
                
                <div class="data-source-content">
                    ${city.green_space_data ? `
                        <div class="source-section">
                            <h4>🌳 Green Space Data</h4>
                            <div class="source-details">
                                <p><strong>Source:</strong> ${city.green_space_data.source}</p>
                                <p><strong>Description:</strong> ${city.green_space_data.description}</p>
                                ${city.green_space_data.api_url ? `
                                    <p><strong>API URL:</strong> 
                                        <a href="${city.green_space_data.api_url}" target="_blank" class="api-link">
                                            ${city.green_space_data.api_url}
                                        </a>
                                    </p>
                                ` : ''}
                                ${city.green_space_data.authentication ? `
                                    <p><strong>Authentication:</strong> ${city.green_space_data.authentication}</p>
                                ` : ''}
                                ${city.green_space_data.update_frequency ? `
                                    <p><strong>Update Frequency:</strong> ${city.green_space_data.update_frequency}</p>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${city.emissions_data ? `
                        <div class="source-section">
                            <h4>🏭 Emissions Data</h4>
                            <div class="source-details">
                                <p><strong>Source:</strong> ${city.emissions_data.source}</p>
                                <p><strong>Description:</strong> ${city.emissions_data.description}</p>
                                ${city.emissions_data.api_url ? `
                                    <p><strong>API URL:</strong> 
                                        <a href="${city.emissions_data.api_url}" target="_blank" class="api-link">
                                            ${city.emissions_data.api_url}
                                        </a>
                                    </p>
                                ` : ''}
                                ${city.emissions_data.secondary_source ? `
                                    <p><strong>Secondary Source:</strong> 
                                        <a href="${city.emissions_data.secondary_source}" target="_blank" class="api-link">
                                            ${city.emissions_data.secondary_source}
                                        </a>
                                    </p>
                                ` : ''}
                                ${city.emissions_data.last_updated ? `
                                    <p><strong>Last Updated:</strong> ${city.emissions_data.last_updated}</p>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Simulate API data fetch
     */
    simulateAPIFetch() {
        if (!this.fetchDataBtn) return;

        // Show loading state
        this.fetchDataBtn.textContent = 'Fetching Data...';
        this.fetchDataBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            const cities = this.dataManager.getCities();
            const apiIntegration = this.dataManager.getAPIIntegration();
            
            const sampleApiData = {
                "api_call_timestamp": new Date().toISOString(),
                "project": apiIntegration?.project || "EcoBalance Score System",
                "version": apiIntegration?.version || "2.0",
                "data_sources_fetched": this.generateAPIResponses(cities, apiIntegration),
                "summary": {
                    "cities_processed": cities.length,
                    "total_emissions": cities.reduce((sum, city) => sum + city.emissions.total_co2_tons_per_year, 0),
                    "total_sequestration": cities.reduce((sum, city) => sum + city.vegetation.carbon_sequestration_tons_per_year, 0),
                    "average_score": (cities.reduce((sum, city) => sum + city.eco_balance_score, 0) / cities.length).toFixed(2)
                }
            };

            if (this.apiJson) {
                this.apiJson.textContent = JSON.stringify(sampleApiData, null, 2);
            }
            if (this.apiResponse) {
                this.apiResponse.classList.remove('hidden');
                this.apiResponse.style.display = 'block';
            }

            // Reset button
            this.fetchDataBtn.textContent = 'Simulate API Data Fetch';
            this.fetchDataBtn.disabled = false;
        }, 2000);
    }

    /**
     * Generate API responses for cities
     */
    generateAPIResponses(cities, apiIntegration) {
        return cities.map(city => {
            const cityApiData = apiIntegration?.cities?.find(c => c.name === city.name);
            
            return {
                "city": city.name,
                "country": city.country,
                "green_space_api": cityApiData?.green_space_data ? {
                    "source": cityApiData.green_space_data.source,
                    "endpoint": cityApiData.green_space_data.api_url,
                    "data_type": "urban_greenery",
                    "sample_response": {
                        "tree_canopy_coverage": city.vegetation.tree_canopy_percent,
                        "green_space_percentage": city.vegetation.green_space_percent,
                        "parks_area_km2": city.vegetation.parks_area_km2,
                        "estimated_trees": city.vegetation.estimated_trees
                    }
                } : null,
                "emissions_api": cityApiData?.emissions_data ? {
                    "source": cityApiData.emissions_data.source,
                    "endpoint": cityApiData.emissions_data.api_url,
                    "data_type": "city_emissions",
                    "sample_response": {
                        "total_emissions_tons_co2": city.emissions.total_co2_tons_per_year,
                        "per_capita_emissions": city.emissions.per_capita_tons,
                        "sectors": city.emissions.sectors
                    }
                } : null,
                "calculated_metrics": {
                    "eco_balance_score": city.eco_balance_score,
                    "rank": city.rank,
                    "sdg13_alignment": city.sdg13_alignment,
                    "carbon_sequestration_tons_year": city.vegetation.carbon_sequestration_tons_per_year
                }
            };
        }).filter(cityData => cityData.green_space_api || cityData.emissions_api);
    }

    /**
     * Update methodology view
     */
    updateMethodologyView() {
        const methodology = this.dataManager.getMethodology();
        const methodologyContainer = document.getElementById('methodology-content');
        
        if (!methodologyContainer || !methodology) return;

        methodologyContainer.innerHTML = `
            <div class="methodology-section">
                <h3>EcoBalance Formula</h3>
                <div class="formula-box">
                    <code>${methodology.eco_balance_formula}</code>
                </div>
                <p><strong>Carbon Sequestration Rate:</strong> ${methodology.carbon_sequestration_rate}</p>
                <p><strong>Emissions Metric:</strong> ${methodology.emissions_metric}</p>
            </div>

            <div class="methodology-section">
                <h3>Score Interpretation</h3>
                <div class="score-ranges">
                    ${Object.entries(methodology.score_interpretation).map(([range, description]) => `
                        <div class="score-range">
                            <span class="range">${range}:</span>
                            <span class="description">${description}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

export default APIManager;
