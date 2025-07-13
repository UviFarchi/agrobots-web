export default {
    en: {
        next: "Next",
        back: "Back",
        submit: "Submit",
        add: "Add",
        remove: "Remove",
        none: "None",
        close: "Close",
        errors: {
            choose_purpose: "Please select one option.",
            enter_land_size: "Please enter your land size.",
            choose_country: "Please select a country.",
            choose_region: "Please select a region.",
            choose_land_use: "Please select the land use.",
            choose_service_tier: "Please select a service tier.",
            choose_at_least_one_kpi: "Please select at least one KPI or enter your own.",
            enter_name: "Please enter your name.",
            enter_valid_email: "Please enter a valid email address.",
            choose_contact_method: "Please choose how you'd like to be contacted.",
            enter_phone: "Please enter your phone number.",
            toast_title: "Please review the following:",
        },
        steps: {
            purpose: {
                title: "Select Your Land's Purpose",
                options: {
                    ecological_monitoring: "Ecological Monitoring",
                    brownfield_bioremediation: "Brownfield Bioremediation",
                    agricultural_production: "Agricultural Production"
                }
            },
            details: {
                title: "Describe Your Terrain",
                land_size: "Land Size",
                land_area_units: {
                    ha: "hectares (ha)",
                    ac: "acres (ac)",
                    km2: "square km (km²)"
                },
                country: "Country",
                region: "Region/State",
                land_use: "Land Use",
                land_use_options: {
                    idle: "Idle",
                    light_use: "Light Use",
                    contaminated: "Contaminated",
                    actively_farmed: "Actively Farmed"
                },
                available_infra: "Available Infrastructure",
                infra: {
                    water: "Water",
                    electricity: "Electricity",
                    internet: "Internet"
                }
            },
            service: {
                title: "Choose Service Tier",
                service_tiers: {
                    essentials: {
                        label: "Essentials",
                        subhead: "Monitoring & Reporting",
                        desc: "We monitor your land and deliver regular reports—no interventions, just data and independent analysis.",
                        ideal: "Ideal if you want to monitor your land’s ecological or agricultural status for compliance, certification, or baseline insights. You receive regular data, reports, and analysis—no interventions, just independent measurement."
                    },
                    design_plus: {
                        label: "Design+",
                        subhead: "Monitoring, Reporting & Ecosystem Design",
                        desc: "Includes Essentials, plus a custom plan for regenerating your land. You get science-based recommendations and a roadmap for action.",
                        ideal: "Great for landowners seeking practical, science-backed recommendations but who want to implement changes themselves. Includes monitoring and reports plus a custom ecosystem or regeneration plan tailored to your goals."
                    },
                    full_service: {
                        label: "Full Service",
                        subhead: "End-to-End Terrain Management",
                        desc: "Includes monitoring, reporting, and ecosystem design—and we do all implementation and ongoing management for you.",
                        ideal: "Best for those who want everything managed—monitoring, analysis, design, and hands-on implementation. We execute and adapt the plan on your behalf, optimizing outcomes over time."
                    }
                }
            },
            kpis: {
                title: "Pick Your Success Metrics",
                kpi_options: {
                    increase_productivity: "Increase Productivity",
                    improve_soil_health: "Improve Soil Health",
                    maximize_biodiversity: "Maximize Biodiversity",
                    reduce_water_usage: "Reduce Water Usage",
                    eliminate_chemicals: "Eliminate Chemical Inputs",
                    generate_carbon_offsets: "Generate Carbon Offsets",
                    meet_environmental_standards: "Meet Environmental Standards",
                    restore_land: "Restore Land",
                    reduce_operating_costs: "Reduce Operating Costs",
                    transition_regenerative: "Transition to Regenerative"
                },
                other_priorities_placeholder: "Add your own KPI",
                selected_kpis: "Selected KPIs"
            },
            estimate: {
                title: "Your Custom Package Estimate",
                purpose: "Purpose",
                land_size: "Land Size",
                location: "Location",
                service_tier: "Service Tier",
                kpis: "KPIs",
                per_unit: "per {unit} / year",
                note: "Final pricing will be confirmed after site assessment.\nMinimum 3-year contract."
            },
            contact: {
                title: "Your Details",
                name: "Name",
                email: "Email",
                organization: "Organization (optional)",
                schedule_call: "Would you like to schedule a site assessment call?",
                call_yes: "Yes, schedule a call",
                call_no: "No, email is fine",
                phone: "Phone number"
            },
            confirm: {
                title: "Confirmation",
                thank_you: "Thank you",
                confirmation: "We’ve received your request. Our team will review your information and contact you with a tailored terrain management proposal."
            }
        }
    },
    es: {}
};