import colors from "@/assets/colors.js";

export default {
    name: 'landos',
    title: 'Land OS',
    component: 'ConnectionCircles',
    content: {

        connectMessageBgColor: colors.primary,
        connectMessageTextColor: colors.textDark,
        connectButtonBgColor: colors.secondary,
        connectButtonTextColor: colors.textDark,
        circlesClosedDiameter: "30vh",
        circlesOpenDiameter: "60vh",
        circles: [
            {
                id: "landOsLogo",
                position: "center-middle",
                img: "../assets/img/landos_logo_glow.png",
                textColor: colors.secondary,
                title: "Unified Terrain Management Platform"
            }, {
                id: "optimizationEngine",
                position: "top-middle",
                title: "Optimization Engine",
                text: "Using advanced AI, the Optimization Engine creates change vectors and assigns probabilities based on combined and weighted data from the Data Engine. It runs simulations to determine the optimal state of the system, then performs a delta analysis comparing the current state to the desired one. At that point, it publishes a set of parameters tailored to every element of the biorome, enabling the Operations Engine to assign precise tasks to the robotic modules to achieve the optimal state.",
                buttonText: "Connect",
                connectionText: "Operational parameters for automated field execution",
                messagePosition: "center-right",
                target: "operationsEngine",
                arrowColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 2,
                bgColor: colors.backgroundDark,
                textColor: colors.primary,
            },

            {
                id: "operationsEngine",
                position: "bottom-right",
                title: "Operations Engine",
                text: "This is the control layer for the robotic modules that monitor, transform, and maintain the land. It maintains a detailed map of the topography and the living elements within the biorome, guiding their development using the parameters provided by the Optimization Engine. The Operations Engine creates and coordinates tasks for the modules, combining them as needed to gather chemical and biological data from the biorome and make the necessary adjustments.",
                buttonText: "Connect",
                connectionText: "System status and field data",
                messagePosition: "bottom-middle",
                target: "dataEngine",
                arrowColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 2,
                bgColor: colors.backgroundDark,
                textColor: colors.primary,
            },
            {
                id: "dataEngine",
                position: "bottom-left",
                title: "Data Engine",
                text: "The Data Engine is where all biorome data is gathered, computed, analyzed, and prepared. It integrates data from various bioromes alongside external sources such as weather reports, historical regional climate, and hydrography. This hybrid engine also enables Ecosystem Engineers to set constraints for the AI, aligning operations with customer KPIs and accelerating the bioromization process.",
                buttonText: "Connect",
                connectionText: "Processed data and expert inputs",
                messagePosition: "center-left",
                target: "optimizationEngine",
                arrowColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 2,
                bgColor: colors.backgroundDark,
                textColor: colors.primary,
            }
        ],

    }
};