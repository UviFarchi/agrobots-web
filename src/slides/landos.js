import colors from "@/assets/colors.js";

export default {
    name: 'landos',
    component: 'ConnectionCircles',
    content: {
        en: {
            title: 'Land OS',
            connectMessageBgColor: colors.backgroundLightTranslucent,
            connectMessageTextColor: colors.textDark,
            connectButtonBgColor: colors.secondary,
            connectButtonTextColor: colors.textDark,
            circlesClosedDiameter: "30vh",
            circlesOpenDiameter: "60vh",
            circles: [
                {
                    id: "landOsLogo",
                    position: "center-middle",
                    img: "/img/landos_logo_glow.png",
                    textColor: colors.secondary,
                    title: "Unified Terrain Management Platform",
                    activeOnStart: true
                },
                {
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
            ]
        },
        es: {
            title: 'Land OS',
            connectMessageBgColor: colors.backgroundLightTranslucent,
            connectMessageTextColor: colors.textDark,
            connectButtonBgColor: colors.secondary,
            connectButtonTextColor: colors.textDark,
            circlesClosedDiameter: "30vh",
            circlesOpenDiameter: "60vh",
            circles: [
                {
                    id: "landOsLogo",
                    position: "center-bottom",
                    img: "/img/landos_logo_glow.png",
                    textColor: colors.secondary,
                    title: "Plataforma Unificada de Gestión del Terreno",
                    activeOnStart: true
                },
                {
                    id: "optimizationEngine",
                    position: "top-middle",
                    title: "Motor de Optimización",
                    text: "Utilizando IA avanzada, el Motor de Optimización crea vectores de cambio y asigna probabilidades a partir de datos combinados y ponderados del Motor de Datos. Ejecuta simulaciones para determinar el estado óptimo del sistema, luego realiza un análisis delta comparando el estado actual con el deseado. Así publica un conjunto de parámetros personalizados para cada elemento del biorome, permitiendo que el Motor de Operaciones asigne tareas precisas a los módulos robóticos para alcanzar el estado óptimo.",
                    buttonText: "Conectar",
                    connectionText: "Parámetros operativos para la ejecución automatizada en campo",
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
                    title: "Motor de Operaciones",
                    text: "Esta es la capa de control de los módulos robóticos que monitorizan, transforman y mantienen el terreno. Mantiene un mapa detallado de la topografía y de los elementos vivos dentro del biorome, guiando su desarrollo usando los parámetros del Motor de Optimización. El Motor de Operaciones crea y coordina tareas para los módulos, combinándolos según sea necesario para recoger datos químicos y biológicos del biorome y realizar los ajustes necesarios.",
                    buttonText: "Conectar",
                    connectionText: "Estado del sistema y datos de campo",
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
                    title: "Motor de Datos",
                    text: "El Motor de Datos es donde se recopilan, calculan, analizan y preparan todos los datos del biorome. Integra información de distintos bioromes junto con fuentes externas como reportes meteorológicos, clima regional histórico e hidrogeografía. Este motor híbrido también permite que los Ingenieros de Ecosistemas definan restricciones para la IA, alineando las operaciones con los KPIs del cliente y acelerando el proceso de bioromización.",
                    buttonText: "Conectar",
                    connectionText: "Datos procesados e inputs de expertos",
                    messagePosition: "center-left",
                    target: "optimizationEngine",
                    arrowColor: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.primary,
                }
            ]
        }
    }
};