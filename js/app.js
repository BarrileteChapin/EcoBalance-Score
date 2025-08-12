/**
 * EcoBalance Score System - Main Application
 * Modular architecture with JSON data integration
 */

import DataManager from './data/DataManager.js';
import NavigationManager from './modules/NavigationManager.js';
import DashboardManager from './modules/DashboardManager.js';
import ChartManager from './modules/ChartManager.js';
import ModalManager from './modules/ModalManager.js';
import ComparisonManager from './modules/ComparisonManager.js';
import APIManager from './modules/APIManager.js';
import { throttle } from './utils/helpers.js';

/**
 * Main Application Class
 */
class EcoBalanceApp {
    constructor() {
        this.dataManager = new DataManager();
        this.navigationManager = new NavigationManager();
        this.dashboardManager = null;
        this.chartManager = new ChartManager();
        this.modalManager = new ModalManager();
        this.comparisonManager = null;
        this.apiManager = null;
        
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🌱 Initializing EcoBalance Score System...');
            
            // Load data first
            await this.dataManager.loadData();
            console.log('✅ Data loaded successfully');
            
            // Initialize managers that depend on data
            this.dashboardManager = new DashboardManager(this.dataManager);
            this.comparisonManager = new ComparisonManager(this.dataManager);
            this.apiManager = new APIManager(this.dataManager);
            
            // Initialize all modules
            this.navigationManager.initialize();
            this.modalManager.initialize();
            this.dashboardManager.initialize();
            this.comparisonManager.initialize();
            this.apiManager.initialize();
            
            // Create initial charts
            this.chartManager.createEcoBalanceChart(this.dataManager.getCities());
            this.chartManager.createEmissionsChart(this.dataManager.getCities());
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Update methodology view
            this.apiManager.updateMethodologyView();
            
            this.isInitialized = true;
            console.log('🎉 EcoBalance Score System initialized successfully!');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.showErrorMessage('Failed to load the application. Please refresh the page.');
        }
    }

    /**
     * Set up global event listeners
     */
    setupEventListeners() {
        // Handle view changes
        this.navigationManager.onViewChange((event) => {
            const view = event.detail.view;
            console.log(`📍 Switched to ${view} view`);
            
            // Update charts when switching to dashboard
            if (view === 'dashboard') {
                setTimeout(() => {
                    this.chartManager.updateCharts(this.dataManager.getCities());
                }, 100);
            }
        });

        // Handle window resize with throttling
        window.addEventListener('resize', throttle(() => {
            this.chartManager.resizeCharts();
        }, 250));

        // Handle data refresh
        document.addEventListener('dataRefresh', () => {
            this.refreshData();
        });

        // Handle errors
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    /**
     * Refresh application data
     */
    async refreshData() {
        try {
            console.log('🔄 Refreshing data...');
            await this.dataManager.loadData();
            
            // Update all components
            this.dashboardManager.update();
            this.chartManager.updateCharts(this.dataManager.getCities());
            this.comparisonManager.populateCitySelects();
            this.apiManager.populateDataSources();
            
            console.log('✅ Data refreshed successfully');
        } catch (error) {
            console.error('❌ Failed to refresh data:', error);
            this.showErrorMessage('Failed to refresh data. Please try again.');
        }
    }

    /**
     * Show error message to user
     */
    showErrorMessage(message) {
        // Create or update error banner
        let errorBanner = document.getElementById('error-banner');
        if (!errorBanner) {
            errorBanner = document.createElement('div');
            errorBanner.id = 'error-banner';
            errorBanner.className = 'error-banner';
            document.body.insertBefore(errorBanner, document.body.firstChild);
        }
        
        errorBanner.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-message">${message}</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        errorBanner.style.display = 'block';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (errorBanner && errorBanner.parentNode) {
                errorBanner.remove();
            }
        }, 10000);
    }

    /**
     * Get application status
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            dataLoaded: this.dataManager.isLoaded,
            citiesCount: this.dataManager.getCities().length,
            currentView: this.navigationManager.getCurrentView()
        };
    }

    /**
     * Destroy the application and clean up resources
     */
    destroy() {
        console.log('🧹 Cleaning up EcoBalance Score System...');
        
        // Destroy charts
        this.chartManager.destroyCharts();
        
        // Remove event listeners
        window.removeEventListener('resize', this.resizeHandler);
        
        // Clear any intervals or timeouts
        // (Add any cleanup code here)
        
        this.isInitialized = false;
        console.log('✅ Cleanup completed');
    }
}

// Global application instance
let app = null;

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    app = new EcoBalanceApp();
    await app.init();
    
    // Make app globally accessible for debugging
    window.EcoBalanceApp = app;
});

/**
 * Handle page unload
 */
window.addEventListener('beforeunload', () => {
    if (app) {
        app.destroy();
    }
});

export default EcoBalanceApp;
