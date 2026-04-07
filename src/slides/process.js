import colors from "@/assets/colors.js";

export default {
    name: 'process',
    component: 'ConnectionCircles',
    content: {
        en: {
            title: 'Bioromization',
            connectMessageBgColor: colors.backgroundLightTranslucent,
            connectMessageTextColor: colors.textDark,
            connectButtonBgColor: colors.secondary,
            connectButtonTextColor: colors.textDark,
            circlesClosedDiameter: "30vh",
            circlesOpenDiameter: "60vh",
            circles: [
                {
                    id: "intro",
                    position: "center-middle",
                    title: "From terrain to biorome",
                    text: "Bioromization now follows three main phases: Discovery, Design, and Deployment. Once deployment begins, the terrain enters an ongoing operations and optimization loop that keeps improving how the system performs over time.",
                    activeOnStart: true,
                    textColor: colors.primary
                },
                {
                    id: "design",
                    position: "center-left",
                    title: "Step 1:<br><br><strong>Discovery</strong>",
                    text: "In Discovery, Agrobots works to understand the terrain before reshaping it. This phase gathers baseline information through monitoring, mapping, topography, ecology, land-use context, and other relevant field data. The goal is to build a grounded picture of what the site is, what constraints it carries, and what opportunities it contains.",
                    buttonText: "Next Step",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "Baseline terrain intelligence feeds the design phase.",
                    curveDirection: "negative",
                    curveStrengthMultiplier: 1.18,
                    target: "deployment",
                    arrowColor: colors.primary
                },
                {
                    id: "deployment",
                    position: "top-middle",
                    title: "Step 2:<br><br><strong>Design</strong>",
                    text: "In Design, ecosystem engineers and LandOS turn terrain intelligence into an operational model. This phase defines the biorome structure, the ecological logic, the performance goals, the monitoring strategy, and the module plan needed for the site. It is where terrain understanding becomes a workable system design.",
                    buttonText: "Next Step",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "The design becomes the basis for deployment on the land.",
                    curveDirection: "negative",
                    curveStrengthMultiplier: 1.18,
                    target: "operations",
                    arrowColor: colors.primary
                },
                {
                    id: "operations",
                    position: "center-right",
                    title: "Step 3:<br><br><strong>Deployment</strong>",
                    text: "In Deployment, monitoring, infrastructure, robotic modules, biological elements, workflows, and field operations are introduced onto the site. This is not the end of the process. It is the beginning of the live operational phase, where the biorome starts running. From that point onward, LandOS continuously evaluates how the site is performing, coordinates action on the ground, and updates parameters as conditions change. This ongoing operations and optimization loop helps the deployed system become more adaptive, more precise, and better tuned over time.",
                    buttonText: "Complete Cycle",
                    closeAllOnConnect: true,
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    arrowColor: colors.primary
                }
            ]
        },
        es: {
            title: 'Bioromización',
            connectMessageBgColor: colors.backgroundLightTranslucent,
            connectMessageTextColor: colors.textDark,
            connectButtonBgColor: colors.secondary,
            connectButtonTextColor: colors.textDark,
            circlesClosedDiameter: "30vh",
            circlesOpenDiameter: "60vh",
            circles: [
                {
                    id: "intro",
                    position: "center-middle",
                    title: "Del terreno al bioroma",
                    text: "La bioromización sigue ahora tres fases principales: Descubrimiento, Diseño y Despliegue. Una vez comienza el despliegue, el terreno entra en un bucle continuo de operaciones y optimización que mejora con el tiempo la forma en que funciona el sistema.",
                    activeOnStart: true,
                    textColor: colors.primary
                },
                {
                    id: "design",
                    position: "center-left",
                    title: "Paso 1:<br><br><strong>Descubrimiento</strong>",
                    text: "En Descubrimiento, Agrobots trabaja para entender el terreno antes de transformarlo. Esta fase reúne información de base mediante monitorización, cartografía, topografía, ecología, contexto de uso del suelo y otros datos de campo relevantes. El objetivo es construir una imagen fundamentada de lo que es el sitio, de qué restricciones tiene y de qué oportunidades contiene.",
                    buttonText: "Siguiente paso",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "La inteligencia de base del terreno alimenta la fase de diseño.",
                    curveDirection: "negative",
                    curveStrengthMultiplier: 1.18,
                    target: "deployment",
                    arrowColor: colors.primary
                },
                {
                    id: "deployment",
                    position: "top-middle",
                    title: "Paso 2:<br><br><strong>Diseño</strong>",
                    text: "En Diseño, los ingenieros de ecosistemas y LandOS convierten la inteligencia del terreno en un modelo operativo. Esta fase define la estructura del bioroma, la lógica ecológica, los objetivos de rendimiento, la estrategia de monitorización y el plan de módulos necesario para el sitio. Es donde la comprensión del terreno se convierte en un diseño operativo viable.",
                    buttonText: "Siguiente paso",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "El diseño se convierte en la base del despliegue sobre el terreno.",
                    curveDirection: "negative",
                    curveStrengthMultiplier: 1.18,
                    target: "operations",
                    arrowColor: colors.primary
                },
                {
                    id: "operations",
                    position: "center-right",
                    title: "Paso 3:<br><br><strong>Despliegue</strong>",
                    text: "En Despliegue, se introducen en el sitio la monitorización, la infraestructura, los módulos robóticos, los elementos biológicos, los flujos de trabajo y las operaciones de campo. Este no es el final del proceso. Es el comienzo de la fase operativa viva, en la que el bioroma empieza a funcionar. A partir de ahí, LandOS evalúa continuamente cómo está funcionando el sitio, coordina la acción sobre el terreno y actualiza parámetros a medida que cambian las condiciones. Este bucle continuo de operaciones y optimización ayuda a que el sistema desplegado sea cada vez más adaptativo, más preciso y esté mejor afinado con el tiempo.",
                    buttonText: "Completar ciclo",
                    closeAllOnConnect: true,
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    arrowColor: colors.primary
                }
            ]
        }
    }
};
