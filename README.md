# EcoBalance Score System 🌱

> **A prototype for #Deepinvent4Good event** - Urban climate assessment tool that measures whether cities are helping or hurting the planet

![EcoBalance Score System](https://img.shields.io/badge/Status-Demo%20Prototype-orange) ![SDG 13](https://img.shields.io/badge/UN%20SDG-13%20Climate%20Action-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 The Big Idea

**"What if we could instantly tell whether a city is helping or hurting the planet?"**

The **EcoBalance Score System** is an innovative urban climate assessment tool that answers this critical question by measuring whether cities are "carbon positive" or "carbon negative" in real-time.

## 🔬 How It Works

We combine two key metrics:
- **🌳 Carbon Absorption**: How much CO₂ the city's vegetation (trees, parks, green spaces) absorbs
- **🏭 Emissions Production**: How much greenhouse gases the city actually produces

**The Formula**: `EcoBalance Score = Carbon Sequestration ÷ Emissions Per Capita`

### Score Interpretation
- **1.5+**: 🟢 **Excellent** - Strong carbon positive
- **1.0-1.5**: 🔵 **Good** - Positive environmental impact
- **0.5-1.0**: 🟡 **Fair** - Moderate balance
- **0.0-0.5**: 🔴 **Poor** - High emissions, low absorption

## ✨ What Makes It Special

✅ **Real Data**: Uses live APIs from 9+ major cities (NYC, London, Singapore, Paris, Barcelona, etc.)  
✅ **SDG 13 Aligned**: Directly supports UN Climate Action goals  
✅ **Free & Open**: Built with publicly accessible data sources  
✅ **Actionable Insights**: Cities get clear, comparable scores  
✅ **Modular Architecture**: Scalable and maintainable codebase

## 🌍 Cities Currently Monitored (demo purposes only)

| City | Country | Score | Rank | Population |
|------|---------|-------|------|------------|
| London | 🇬🇧 UK | 2.05 | Excellent | 9.5M |
| Singapore | 🇸🇬 Singapore | 1.63 | Excellent | 5.9M |
| Rome | 🇮🇹 Italy | 1.57 | Excellent | 2.9M |
| Berlin | 🇩🇪 Germany | 1.46 | Good | 3.7M |
| Madrid | 🇪🇸 Spain | 1.31 | Good | 3.2M |
| New York City | 🇺🇸 USA | 0.89 | Good | 8.3M |
| Barcelona | 🇪🇸 Spain | 0.82 | Good | 1.6M |
| Amsterdam | 🇳🇱 Netherlands | 0.82 | Good | 873K |
| Paris | 🇫🇷 France | 0.61 | Fair | 2.2M |

## 🎯 The Impact

Cities can:
- **Track progress** on climate goals objectively
- **Compare performance** with other urban centers
- **Make data-driven decisions** about green infrastructure investments
- **Prove climate impact** to citizens and stakeholders

## 👥 Target Users

🏛️ **City planners** optimizing green infrastructure  
🌍 **Environmental organizations** tracking urban climate action  
📊 **Policymakers** needing evidence-based climate decisions  
🏢 **Citizens** wanting transparency on their city's environmental performance

## 🏗️ Project Structure

```
EcoBalance-Score/
├── 📄 index.html              # Main application interface
├── 🎨 style.css               # Complete styling with modular components
├── 📁 js/                     # Modular JavaScript architecture
│   ├── 🚀 app.js              # Main application orchestrator
│   ├── 📁 data/
│   │   └── DataManager.js     # JSON data loading & management
│   ├── 📁 modules/
│   │   ├── NavigationManager.js    # View navigation system
│   │   ├── DashboardManager.js     # Dashboard & city cards
│   │   ├── ChartManager.js         # Chart.js integration
│   │   ├── ModalManager.js         # City detail modals
│   │   ├── ComparisonManager.js    # City comparison tools
│   │   └── APIManager.js           # API demo & data sources
│   └── 📁 utils/
│       └── helpers.js         # Utility functions
├── 📁 demo_data/
│   └── august.json            # Real API sources & city data
└── 📄 README.md               # This file
```

### 📋 File Descriptions

#### Core Files
- **`index.html`** - Main HTML structure with navigation, dashboard, comparison views, and modals
- **`style.css`** - Comprehensive CSS with design system, responsive layouts, and component styles
- **`js/app.js`** - Main application class that orchestrates all modules and handles initialization

#### Data Layer
- **`js/data/DataManager.js`** - Handles JSON data loading, API integration, and fallback data management
- **`demo_data/august.json`** - Contains real API endpoints and data sources for all 9 cities

#### Feature Modules
- **`js/modules/NavigationManager.js`** - Manages view switching and navigation state
- **`js/modules/DashboardManager.js`** - Renders city cards, metrics, and dashboard functionality
- **`js/modules/ChartManager.js`** - Creates and manages Chart.js visualizations
- **`js/modules/ModalManager.js`** - Handles city detail popups with comprehensive information
- **`js/modules/ComparisonManager.js`** - Side-by-side city comparison tools
- **`js/modules/APIManager.js`** - API demonstration and data source integration

#### Utilities
- **`js/utils/helpers.js`** - Common utility functions for formatting, events, and data manipulation

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Charts**: Chart.js for data visualization
- **Architecture**: Modular, event-driven design
- **Data**: JSON-based with real API integration
- **Styling**: Custom CSS with design system and responsive layout

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd EcoBalance-Score
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📊 Data Sources

The system in the future could integrate with real APIs from:

- **Singapore**: National Parks Board (NPARKS) + NEA
- **New York City**: NYC Open Data + GHG Emissions Inventory
- **London**: Ordnance Survey + London Air Quality Network
- **Paris**: Paris Open Data + Data Portal for Cities
- **Barcelona**: Sentinel-2 Satellite + WAQI Air Quality
- **Berlin**: HUGSI + European Settlement Map
- **Madrid**: Sentinel-2 + WAQI Network
- **Amsterdam**: HUGSI + Climate TRACE
- **Rome**: European Settlement Map + Urban Emission Inventories

Note: current version is only a demo

## 🌟 Features

### Dashboard
- **City Cards** with key metrics and sector breakdowns
- **Interactive Charts** showing EcoBalance scores and emissions
- **Summary Metrics** with total cities and top performers

### City Comparison
- **Side-by-side analysis** of any two cities
- **Detailed metrics comparison** across all categories
- **Visual indicators** for better/worse performance

### Data Sources Integration
- **Live API demonstrations** with real endpoints
- **Comprehensive data source documentation**
- **Quality assessments** for each city's data

### Methodology
- **Transparent calculation methods**
- **SDG 13 alignment scoring**
- **Score interpretation guidelines**

## 🎨 Design Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Mode Support** - Automatic system preference detection
- **Accessible UI** - WCAG compliant with proper contrast and navigation
- **Modern Aesthetics** - Clean, professional interface with intuitive UX

## 🔮 Future Enhancements

- **Real-time API integration** for live data updates
- **More cities** from different continents
- **Historical trend analysis** and projections
- **Export functionality** for reports and presentations
- **API endpoint** for third-party integrations

## 🤝 Contributing

This is a prototype for the #Deepinvent4Good event. Contributions, suggestions, and feedback are welcome!

## 📄 License

MIT License - feel free to use this project for educational and non-commercial purposes.

## 🏆 #Deepinvent4Good

This project was created as a prototype for the #Deepinvent4Good event, demonstrating how technology can be used to address climate challenges and support sustainable urban development.

**Bottom Line**: It's like a "credit score" for cities' environmental health - simple, transparent, and actionable.

---

*Built with 💚 for a sustainable future*
