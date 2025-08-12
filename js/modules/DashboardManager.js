/**
 * DashboardManager - Handles dashboard functionality and city cards
 */
class DashboardManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
    }

    /**
     * Initialize dashboard
     */
    initialize() {
        this.calculateAndDisplayMetrics();
        this.renderCityCards();
    }

    /**
     * Calculate and display summary metrics
     */
    calculateAndDisplayMetrics() {
        const cities = this.dataManager.getCities();
        
        // Update total cities
        const totalCitiesElement = document.getElementById('total-cities');
        if (totalCitiesElement) {
            totalCitiesElement.textContent = cities.length;
        }

        // Find top performer
        const topPerformer = cities.reduce((best, city) => 
            city.eco_balance_score > best.eco_balance_score ? city : best
        );
        
        const topPerformerElement = document.getElementById('top-performer');
        if (topPerformerElement) {
            topPerformerElement.textContent = topPerformer.name;
        }

        // Calculate average score
        const avgScore = cities.reduce((sum, city) => sum + city.eco_balance_score, 0) / cities.length;
        const avgScoreElement = document.getElementById('avg-score');
        if (avgScoreElement) {
            avgScoreElement.textContent = avgScore.toFixed(2);
        }
    }

    /**
     * Render city cards
     */
    renderCityCards() {
        const citiesGrid = document.getElementById('cities-grid');
        if (!citiesGrid) return;

        const cities = this.dataManager.getCities();
        citiesGrid.innerHTML = cities.map(city => this.createCityCard(city)).join('');

        // Add click event listeners to city cards
        citiesGrid.querySelectorAll('.city-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('citySelected', { 
                    detail: cities[index] 
                }));
            });
        });
    }

    /**
     * Create a city card
     */
    createCityCard(city) {
        return `
            <div class="city-card" data-city-id="${city.id}">
                <div class="city-card-header">
                    <h3>${city.name}</h3>
                    <div class="city-score ${this.getScoreClass(city.eco_balance_score)}">
                        ${city.eco_balance_score.toFixed(2)}
                    </div>
                </div>
                
                <div class="city-card-content">
                    <div class="city-info">
                        <div class="info-item">
                            <span class="info-label">Country:</span>
                            <span class="info-value">${city.country}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Population:</span>
                            <span class="info-value">${this.formatNumber(city.population)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Rank:</span>
                            <span class="info-value rank-${city.rank.toLowerCase()}">${city.rank}</span>
                        </div>
                    </div>

                    <div class="city-metrics">
                        <div class="metric-row">
                            <div class="metric-item">
                                <div class="metric-icon">🏭</div>
                                <div class="metric-details">
                                    <span class="metric-label">CO₂ per capita</span>
                                    <span class="metric-value">${city.emissions.per_capita_tons} tons</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="metric-row">
                            <div class="metric-item">
                                <div class="metric-icon">🌳</div>
                                <div class="metric-details">
                                    <span class="metric-label">Tree canopy</span>
                                    <span class="metric-value">${city.vegetation.tree_canopy_percent}%</span>
                                </div>
                            </div>
                        </div>

                        <div class="metric-row">
                            <div class="metric-item">
                                <div class="metric-icon">🌱</div>
                                <div class="metric-details">
                                    <span class="metric-label">Carbon sequestration</span>
                                    <span class="metric-value">${this.formatNumber(city.vegetation.carbon_sequestration_tons_per_year)} tons/year</span>
                                </div>
                            </div>
                        </div>

                        <div class="metric-row">
                            <div class="metric-item">
                                <div class="metric-icon">🎯</div>
                                <div class="metric-details">
                                    <span class="metric-label">SDG 13 alignment</span>
                                    <span class="metric-value">${city.sdg13_alignment}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="emissions-breakdown">
                        <h4>Emissions by Sector</h4>
                        <div class="sector-bars">
                            ${Object.entries(city.emissions.sectors).map(([sector, percentage]) => `
                                <div class="sector-bar">
                                    <div class="sector-info">
                                        <span class="sector-name">${sector.charAt(0).toUpperCase() + sector.slice(1)}</span>
                                        <span class="sector-percentage">${percentage}%</span>
                                    </div>
                                    <div class="sector-progress">
                                        <div class="sector-fill" style="width: ${percentage}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="city-card-footer">
                    <button class="view-details-btn">View Details</button>
                </div>
            </div>
        `;
    }

    /**
     * Get CSS class based on score
     */
    getScoreClass(score) {
        if (score >= 1.5) return 'excellent';
        if (score >= 1.0) return 'good';
        if (score >= 0.5) return 'fair';
        return 'poor';
    }

    /**
     * Format numbers with commas
     */
    formatNumber(num) {
        return num.toLocaleString();
    }

    /**
     * Update dashboard with new data
     */
    update() {
        this.calculateAndDisplayMetrics();
        this.renderCityCards();
    }
}

export default DashboardManager;
