/**
 * ModalManager - Handles modal functionality for city details
 */
class ModalManager {
    constructor() {
        this.modal = null;
        this.modalContent = null;
        this.closeBtn = null;
    }

    /**
     * Initialize modal functionality
     */
    initialize() {
        this.modal = document.getElementById('city-modal');
        this.modalContent = document.getElementById('modal-content');
        this.closeBtn = document.querySelector('.close-modal');

        if (!this.modal || !this.modalContent || !this.closeBtn) {
            console.warn('Modal elements not found');
            return;
        }

        // Close button event
        this.closeBtn.addEventListener('click', () => this.closeModal());

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Listen for city selection events
        document.addEventListener('citySelected', (e) => {
            this.openCityModal(e.detail);
        });
    }

    /**
     * Open modal with city details
     */
    openCityModal(city) {
        if (!this.modal || !this.modalContent) return;

        this.modalContent.innerHTML = this.createCityDetailContent(city);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    /**
     * Close modal
     */
    closeModal() {
        if (!this.modal) return;

        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    /**
     * Create detailed city content for modal
     */
    createCityDetailContent(city) {
        const dataSources = city.data_sources ? this.renderDataSources(city.data_sources) : '';
        
        return `
            <div class="city-detail-header">
                <h2>${city.name}</h2>
                <div class="city-score-badge ${this.getScoreClass(city.eco_balance_score)}">
                    ${city.eco_balance_score.toFixed(2)}
                </div>
            </div>
            
            <div class="city-detail-grid">
                <div class="detail-section">
                    <h3>📊 Basic Information</h3>
                    <div class="detail-item">
                        <span>Country:</span>
                        <span>${city.country}</span>
                    </div>
                    <div class="detail-item">
                        <span>Population:</span>
                        <span>${this.formatNumber(city.population)}</span>
                    </div>
                    <div class="detail-item">
                        <span>Area:</span>
                        <span>${city.area_km2} km²</span>
                    </div>
                    <div class="detail-item">
                        <span>Rank:</span>
                        <span class="rank-${city.rank.toLowerCase()}">${city.rank}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>🏭 Emissions Data</h3>
                    <div class="detail-item">
                        <span>Total CO₂:</span>
                        <span>${this.formatNumber(city.emissions.total_co2_tons_per_year)} tons/year</span>
                    </div>
                    <div class="detail-item">
                        <span>Per Capita:</span>
                        <span>${city.emissions.per_capita_tons} tons/person/year</span>
                    </div>
                    <div class="emissions-breakdown">
                        <h4>Sector Breakdown:</h4>
                        ${Object.entries(city.emissions.sectors).map(([sector, percentage]) => `
                            <div class="sector-item">
                                <span>${sector.charAt(0).toUpperCase() + sector.slice(1)}:</span>
                                <span>${percentage}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="detail-section">
                    <h3>🌳 Vegetation & Green Space</h3>
                    <div class="detail-item">
                        <span>Tree Canopy:</span>
                        <span>${city.vegetation.tree_canopy_percent}%</span>
                    </div>
                    <div class="detail-item">
                        <span>Green Space:</span>
                        <span>${city.vegetation.green_space_percent}%</span>
                    </div>
                    <div class="detail-item">
                        <span>Parks Area:</span>
                        <span>${city.vegetation.parks_area_km2} km²</span>
                    </div>
                    <div class="detail-item">
                        <span>Estimated Trees:</span>
                        <span>${this.formatNumber(city.vegetation.estimated_trees)}</span>
                    </div>
                    <div class="detail-item">
                        <span>Carbon Sequestration:</span>
                        <span>${this.formatNumber(city.vegetation.carbon_sequestration_tons_per_year)} tons/year</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>🎯 SDG 13 Alignment</h3>
                    <div class="sdg-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${city.sdg13_alignment}%"></div>
                        </div>
                        <span>${city.sdg13_alignment}% aligned</span>
                    </div>
                </div>

                ${dataSources}
            </div>
        `;
    }

    /**
     * Render data sources section if available
     */
    renderDataSources(dataSources) {
        if (!dataSources) return '';

        return `
            <div class="detail-section data-sources-section">
                <h3>📡 Data Sources</h3>
                ${dataSources.green_space ? `
                    <div class="data-source-item">
                        <h4>Green Space Data</h4>
                        <p><strong>Source:</strong> ${dataSources.green_space.source}</p>
                        <p><strong>Description:</strong> ${dataSources.green_space.description}</p>
                        ${dataSources.green_space.api_url ? `<p><strong>API:</strong> <a href="${dataSources.green_space.api_url}" target="_blank">${dataSources.green_space.api_url}</a></p>` : ''}
                    </div>
                ` : ''}
                ${dataSources.emissions ? `
                    <div class="data-source-item">
                        <h4>Emissions Data</h4>
                        <p><strong>Source:</strong> ${dataSources.emissions.source}</p>
                        <p><strong>Description:</strong> ${dataSources.emissions.description}</p>
                        ${dataSources.emissions.api_url ? `<p><strong>API:</strong> <a href="${dataSources.emissions.api_url}" target="_blank">${dataSources.emissions.api_url}</a></p>` : ''}
                    </div>
                ` : ''}
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
}

export default ModalManager;
