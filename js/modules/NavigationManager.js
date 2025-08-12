/**
 * NavigationManager - Handles navigation between different views
 */
class NavigationManager {
    constructor() {
        this.currentView = 'dashboard';
        this.navButtons = [];
        this.views = [];
    }

    /**
     * Initialize navigation
     */
    initialize() {
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.views = document.querySelectorAll('.view');
        
        this.navButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Set initial view
        this.showView('dashboard');
    }

    /**
     * Handle navigation button clicks
     */
    handleNavClick(e) {
        e.preventDefault();
        const targetView = e.target.getAttribute('data-view');
        
        if (targetView) {
            this.showView(targetView);
        }
    }

    /**
     * Show a specific view
     */
    showView(viewName) {
        console.log('Switching to view:', viewName);
        
        // Update active nav button
        this.navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-view') === viewName) {
                btn.classList.add('active');
            }
        });

        // Hide all views and show target view
        this.views.forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none';
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            targetView.style.display = 'block';
            this.currentView = viewName;
            
            // Dispatch view change event
            document.dispatchEvent(new CustomEvent('viewChanged', { 
                detail: { view: viewName } 
            }));
        }
    }

    /**
     * Get current view
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Add navigation event listener
     */
    onViewChange(callback) {
        document.addEventListener('viewChanged', callback);
    }
}

export default NavigationManager;
