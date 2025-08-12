/**
 * ComparisonManager - Handles city comparison functionality
 */
class ComparisonManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.city1Select = null;
        this.city2Select = null;
        this.comparisonResult = null;
    }

    /**
     * Initialize comparison functionality
     */
    initialize() {
        this.city1Select = document.getElementById('city1-select');
        this.city2Select = document.getElementById('city2-select');
        this.comparisonResult = document.getElementById('comparison-result');

        if (!this.city1Select || !this.city2Select || !this.comparisonResult) {
            console.warn('Comparison elements not found');
            return;
        }

        this.populateCitySelects();
        
        this.city1Select.addEventListener('change', () => this.updateComparison());
        this.city2Select.addEventListener('change', () => this.updateComparison());
    }

    /**
     * Populate city select dropdowns
     */
    populateCitySelects() {
        const cities = this.dataManager.getCities();
        const options = cities.map(city => 
            `<option value="${city.id}">${city.name}</option>`
        ).join('');

        if (this.city1Select) {
            this.city1Select.innerHTML = '<option value="">Select a city...</option>' + options;
        }
        if (this.city2Select) {
            this.city2Select.innerHTML = '<option value="">Select a city...</option>' + options;
        }
    }

    /**
     * Update comparison when selections change
     */
    updateComparison() {
        const city1Id = this.city1Select?.value;
        const city2Id = this.city2Select?.value;

        if (!city1Id || !city2Id || city1Id === city2Id) {
            this.comparisonResult.innerHTML = '<p>Please select two different cities to compare.</p>';
            return;
        }

        const city1 = this.dataManager.getCityById(city1Id);
        const city2 = this.dataManager.getCityById(city2Id);

        if (!city1 || !city2) {
            this.comparisonResult.innerHTML = '<p>Error loading city data.</p>';
            return;
        }

        this.comparisonResult.innerHTML = this.createComparisonContent(city1, city2);
    }

    /**
     * Create comparison content
     */
    createComparisonContent(city1, city2) {
        return `
            <div class="comparison-header">
                <div class="city-comparison-card">
                    <h3>${city1.name}</h3>
                    <div class="score-badge ${this.getScoreClass(city1.eco_balance_score)}">
                        ${city1.eco_balance_score.toFixed(2)}
                    </div>
                    <p class="rank">${city1.rank}</p>
                </div>
                <div class="vs-divider">VS</div>
                <div class="city-comparison-card">
                    <h3>${city2.name}</h3>
                    <div class="score-badge ${this.getScoreClass(city2.eco_balance_score)}">
                        ${city2.eco_balance_score.toFixed(2)}
                    </div>
                    <p class="rank">${city2.rank}</p>
                </div>
            </div>

            <div class="comparison-metrics">
                <h4>Detailed Comparison</h4>
                
                <div class="metric-comparison-grid">
                    <div class="comparison-section">
                        <h5>🏭 Emissions</h5>
                        ${this.createComparisonMetric('Total CO₂ (tons/year)', 
                            this.formatNumber(city1.emissions.total_co2_tons_per_year), 
                            this.formatNumber(city2.emissions.total_co2_tons_per_year), 
                            city1.emissions.total_co2_tons_per_year < city2.emissions.total_co2_tons_per_year, 'lower')}
                        ${this.createComparisonMetric('Per Capita (tons)', 
                            city1.emissions.per_capita_tons, 
                            city2.emissions.per_capita_tons, 
                            city1.emissions.per_capita_tons < city2.emissions.per_capita_tons, 'lower')}
                    </div>

                    <div class="comparison-section">
                        <h5>🌳 Green Space</h5>
                        ${this.createComparisonMetric('Tree Canopy (%)', 
                            city1.vegetation.tree_canopy_percent + '%', 
                            city2.vegetation.tree_canopy_percent + '%', 
                            city1.vegetation.tree_canopy_percent > city2.vegetation.tree_canopy_percent, 'higher')}
                        ${this.createComparisonMetric('Green Space (%)', 
                            city1.vegetation.green_space_percent + '%', 
                            city2.vegetation.green_space_percent + '%', 
                            city1.vegetation.green_space_percent > city2.vegetation.green_space_percent, 'higher')}
                        ${this.createComparisonMetric('Parks Area (km²)', 
                            city1.vegetation.parks_area_km2, 
                            city2.vegetation.parks_area_km2, 
                            city1.vegetation.parks_area_km2 > city2.vegetation.parks_area_km2, 'higher')}
                    </div>

                    <div class="comparison-section">
                        <h5>🌱 Carbon Impact</h5>
                        ${this.createComparisonMetric('Carbon Sequestration (tons/year)', 
                            this.formatNumber(city1.vegetation.carbon_sequestration_tons_per_year), 
                            this.formatNumber(city2.vegetation.carbon_sequestration_tons_per_year), 
                            city1.vegetation.carbon_sequestration_tons_per_year > city2.vegetation.carbon_sequestration_tons_per_year, 'higher')}
                        ${this.createComparisonMetric('SDG 13 Alignment', 
                            city1.sdg13_alignment + '%', 
                            city2.sdg13_alignment + '%', 
                            city1.sdg13_alignment > city2.sdg13_alignment, 'higher')}
                    </div>

                    <div class="comparison-section">
                        <h5>📊 Demographics</h5>
                        ${this.createComparisonMetric('Population', 
                            this.formatNumber(city1.population), 
                            this.formatNumber(city2.population), 
                            false, 'neutral')}
                        ${this.createComparisonMetric('Area (km²)', 
                            city1.area_km2, 
                            city2.area_km2, 
                            false, 'neutral')}
                    </div>
                </div>

                <div class="comparison-winner">
                    ${this.determineWinner(city1, city2)}
                </div>
            </div>
        `;
    }

    /**
     * Create a comparison metric row
     */
    createComparisonMetric(label, value1, value2, city1Better, betterType) {
        let city1Class = '';
        let city2Class = '';
        
        if (betterType !== 'neutral') {
            city1Class = city1Better ? 'better-value' : '';
            city2Class = city1Better ? '' : 'better-value';
        }

        return `
            <div class="comparison-metric-row">
                <div class="metric-label">${label}</div>
                <div class="metric-values">
                    <span class="value ${city1Class}">${value1}</span>
                    <span class="vs">vs</span>
                    <span class="value ${city2Class}">${value2}</span>
                </div>
            </div>
        `;
    }

    /**
     * Determine overall winner
     */
    determineWinner(city1, city2) {
        if (city1.eco_balance_score > city2.eco_balance_score) {
            return `
                <div class="winner-announcement">
                    🏆 <strong>${city1.name}</strong> has a better overall EcoBalance score 
                    (${city1.eco_balance_score.toFixed(2)} vs ${city2.eco_balance_score.toFixed(2)})
                </div>
            `;
        } else if (city2.eco_balance_score > city1.eco_balance_score) {
            return `
                <div class="winner-announcement">
                    🏆 <strong>${city2.name}</strong> has a better overall EcoBalance score 
                    (${city2.eco_balance_score.toFixed(2)} vs ${city1.eco_balance_score.toFixed(2)})
                </div>
            `;
        } else {
            return `
                <div class="winner-announcement">
                    🤝 Both cities have the same EcoBalance score (${city1.eco_balance_score.toFixed(2)})
                </div>
            `;
        }
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
}

export default ComparisonManager;
