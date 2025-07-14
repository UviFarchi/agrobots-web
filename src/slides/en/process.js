import colors from "@/assets/colors.js";

export default {
    name: 'process',
    title: 'Bioromization',
    component: 'ConnectionCircles',
    content: {
        connectMessageBgColor: colors.secondary,
        connectMessageTextColor: colors.textDark,
        connectButtonBgColor: colors.secondary,
        connectButtonTextColor: colors.textDark,
        circlesClosedDiameter:"30vh",
        circlesOpenDiameter:"60vh",
        circles: [
            {
                id: "intro",
                position: "center-middle",
                title: "From Farm to Biorome",
                text: "Our process is a continuous cycle of design, deployment, operations, and optimization. Each phase feeds into the next, creating a self-improving system.",
                activeOnStart: true,
                textColor: colors.primary
            },
            {
                id: "design",
                position: "center-left",
                title: "Step 1:<br><br><strong>Design</strong>",
                text: "During the design phase, our operations team collaborates closely with the data engine to gather valuable insights from all relevant local sources—ranging from watershed drainage studies by regional authorities to in-depth reports on local ecological interactions. At the same time, our ecosystem engineers work with the AI to craft the optimal biorome design for the area. Their input helps reduce implementation time and elevate the quality of the project by providing diverse, useful data.",
                buttonText: "Next Step",
                borderColor: colors.primary,
                borderWidth: 2,
                bgColor: colors.backgroundDark,
                textColor: colors.textLight,
                connectionText: "Blueprint established and verified, proceed to biorome installation",
                target: "deployment",
                arrowColor: colors.primary
            },
            {
                id: "deployment",
                position: "top-middle",
                title: "Step 2:<br><br><strong>Deployment</strong>",
                text: "Once sufficient data has been collected and the Optimization Engine has produced a tailored instance model for the specific biorome, our team is dispatched to the site. During this phase, the physical infrastructure is installed and the robotic modules are deployed. While monitoring modules were already in place during the design phase, production modules are now installed, and the gradual introduction of biotic components begins as the robotic modules adjust the terrain to meet Land OS parameters.",
                buttonText: "Next Step",
                borderColor: colors.primary,
                borderWidth: 2,
                bgColor: colors.backgroundDark,
                textColor: colors.textLight,
                connectionText: "Infrastructure in place and biotic elements introduced, system primed for full-scale production",
                target: "operations",
                arrowColor: colors.primary
            },
            {
                id: "operations",
                position: "center-right",
                title: "Step 3:<br><br><strong>Operations</strong>",
                text: "In the production phase, the biorome is fully operational and running at maximum efficiency. Biological cycles and maintenance routines are established to ensure that the system functions autonomously and in harmony. The project transitions into full production mode, managed directly from our operations center to guarantee consistent, reliable performance.",
                buttonText: "Next Step",
                borderColor: colors.primary,
                borderWidth: 2,
                bgColor: colors.backgroundDark,
                textColor: colors.textLight,
                connectionText: "Operational data flows into the system, setting the stage for continuous refinement.",
                target: "optimization",
                arrowColor: colors.primary
            },
            {
                id: "optimization",
                position: "bottom-middle",
                title: "Step 4:<br><br><strong>Optimization</strong>",
                text: "As the biorome operates over time, its performance model is continuously refined. The data engine integrates operational data and feedback from ecosystem engineers to periodically update the instance model, while the Operations Engine adjusts tasks according to the latest parameters from the Optimization Engine. This ongoing cycle allows the biorome to evolve, boosting productivity and adapting to changing environmental conditions.",
                buttonText: "Complete Cycle",
                borderColor: colors.primary,
                borderWidth: 2,
                 bgColor: colors.backgroundDark,
                textColor: colors.textLight,
                connectionText: "Optimized parameters feed back into operations, ensuring the system evolves for sustained performance.",
                target: "operations",
                arrowColor: colors.primary
            }
        ]
    }
};