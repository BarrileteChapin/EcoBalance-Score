/**
 * ChartManager - Handles chart creation and management
 */
class ChartManager {
    constructor() {
        this.ecoBalanceChart = null;
        this.emissionsChart = null;
    }

    /**
     * Create the EcoBalance score chart
     */
    createEcoBalanceChart(cities) {
        const ctx = document.getElementById('eco-balance-chart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.ecoBalanceChart) {
            this.ecoBalanceChart.destroy();
        }

        const data = {
            labels: cities.map(city => city.name),
            datasets: [{
                label: 'EcoBalance Score',
                data: cities.map(city => city.eco_balance_score),
                backgroundColor: cities.map(city => this.getScoreColor(city.eco_balance_score)),
                borderColor: cities.map(city => this.getScoreColor(city.eco_balance_score)),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'EcoBalance Scores by City',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const city = cities[context.dataIndex];
                                return [
                                    `Score: ${context.parsed.y.toFixed(2)}`,
                                    `Rank: ${city.rank}`,
                                    `SDG 13 Alignment: ${city.sdg13_alignment}%`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'EcoBalance Score'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Cities'
                        }
                    }
                },
                onClick: (evt, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const city = cities[index];
                        // Dispatch custom event for city selection
                        document.dispatchEvent(new CustomEvent('citySelected', { detail: city }));
                    }
                }
            }
        };

        this.ecoBalanceChart = new Chart(ctx, config);
    }

    /**
     * Create the emissions comparison chart
     */
    createEmissionsChart(cities) {
        const ctx = document.getElementById('emissions-chart');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.emissionsChart) {
            this.emissionsChart.destroy();
        }

        const data = {
            labels: cities.map(city => city.name),
            datasets: [{
                label: 'CO₂ Emissions (per capita)',
                data: cities.map(city => city.emissions.per_capita_tons),
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 2
            }, {
                label: 'Carbon Sequestration Rate',
                data: cities.map(city => 
                    (city.vegetation.carbon_sequestration_tons_per_year / city.population * 1000).toFixed(2)
                ),
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Emissions vs Carbon Sequestration',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tonnes CO₂ per capita'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Cities'
                        }
                    }
                }
            }
        };

        this.emissionsChart = new Chart(ctx, config);
    }

    /**
     * Get color based on score
     */
    getScoreColor(score) {
        if (score >= 1.5) return 'rgba(34, 197, 94, 0.8)'; // Green - Excellent
        if (score >= 1.0) return 'rgba(59, 130, 246, 0.8)'; // Blue - Good
        if (score >= 0.5) return 'rgba(245, 158, 11, 0.8)'; // Yellow - Fair
        return 'rgba(239, 68, 68, 0.8)'; // Red - Poor
    }

    /**
     * Update charts with new data
     */
    updateCharts(cities) {
        this.createEcoBalanceChart(cities);
        this.createEmissionsChart(cities);
    }

    /**
     * Resize charts (for responsive behavior)
     */
    resizeCharts() {
        if (this.ecoBalanceChart) this.ecoBalanceChart.resize();
        if (this.emissionsChart) this.emissionsChart.resize();
    }

    /**
     * Destroy all charts
     */
    destroyCharts() {
        if (this.ecoBalanceChart) {
            this.ecoBalanceChart.destroy();
            this.ecoBalanceChart = null;
        }
        if (this.emissionsChart) {
            this.emissionsChart.destroy();
            this.emissionsChart = null;
        }
    }
}

export default ChartManager;
