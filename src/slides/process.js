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
                    title: "From Farm to Biorome",
                    text: "Our process is a continuous cycle of design, deployment, operations, and optimization. Each phase feeds into the next, creating a self-improving system.",
                    activeOnStart: true,
                    textColor: colors.primary
                },
                {
                    id: "design",
                    position: "center-left",
                    title: "Step 1:<br><br><strong>Design</strong>",
                    text: "In the design phase, our team collaborates with the Data Engine to collect insights from local studies—such as water drainage, land use, and biodiversity reports. Ecosystem engineers and AI together define the optimal biorome setup for the site. This approach shortens implementation time and raises project quality.",
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
                    text: "Once the Optimization Engine delivers a tailored model, our team goes on-site. Physical infrastructure is installed, robotic modules are deployed, and biotic elements are introduced as the system adapts the terrain to Land OS parameters.",
                    buttonText: "Next Step",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "Infrastructure and biotic elements in place—system ready for production",
                    target: "operations",
                    arrowColor: colors.primary
                },
                {
                    id: "operations",
                    position: "center-right",
                    title: "Step 3:<br><br><strong>Operations</strong>",
                    text: "The biorome is now fully operational. Autonomous biological cycles and maintenance routines ensure the system functions reliably and in harmony. Our operations center manages all activity to guarantee consistent, high performance.",
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
                    text: "Over time, Land OS continuously refines the biorome model. The Data Engine integrates feedback and operational data, while the Operations Engine adjusts actions according to updated parameters. This cycle boosts productivity and adapts to changing conditions.",
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
                    title: "De finca a biorome",
                    text: "Nuestro proceso es un ciclo continuo de diseño, despliegue, operación y optimización. Cada fase alimenta la siguiente, creando un sistema que mejora por sí mismo.",
                    activeOnStart: true,
                    textColor: colors.primary
                },
                {
                    id: "design",
                    position: "center-left",
                    title: "Paso 1:<br><br><strong>Diseño</strong>",
                    text: "En la fase de diseño, el equipo colabora con el Motor de Datos para recopilar información local—como estudios de drenaje, uso del suelo y biodiversidad. Los ingenieros de ecosistemas y la IA definen juntos la configuración óptima del biorome. Este enfoque acorta los tiempos y eleva la calidad del proyecto.",
                    buttonText: "Siguiente paso",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "Plano verificado, listo para instalar el biorome",
                    target: "deployment",
                    arrowColor: colors.primary
                },
                {
                    id: "deployment",
                    position: "top-middle",
                    title: "Paso 2:<br><br><strong>Despliegue</strong>",
                    text: "Cuando el Motor de Optimización entrega un modelo adaptado, nuestro equipo va al terreno. Se instala la infraestructura física, se despliegan los módulos robóticos y se introducen los elementos bióticos mientras el sistema adapta el terreno a los parámetros de Land OS.",
                    buttonText: "Siguiente paso",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "Infraestructura y elementos bióticos listos—sistema preparado para producción",
                    target: "operations",
                    arrowColor: colors.primary
                },
                {
                    id: "operations",
                    position: "center-right",
                    title: "Paso 3:<br><br><strong>Operaciones</strong>",
                    text: "El biorome ya está plenamente operativo. Los ciclos biológicos y las rutinas de mantenimiento autónomas aseguran que el sistema funcione en armonía y de forma fiable. Nuestro centro de operaciones gestiona toda la actividad para garantizar alto rendimiento y consistencia.",
                    buttonText: "Siguiente paso",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "Los datos operativos alimentan el sistema, base para el perfeccionamiento continuo.",
                    target: "optimization",
                    arrowColor: colors.primary
                },
                {
                    id: "optimization",
                    position: "bottom-middle",
                    title: "Paso 4:<br><br><strong>Optimización</strong>",
                    text: "Con el tiempo, Land OS refina continuamente el modelo del biorome. El Motor de Datos integra feedback y datos operativos, mientras el Motor de Operaciones ajusta las acciones según los parámetros actualizados. Este ciclo eleva la productividad y se adapta a los cambios.",
                    buttonText: "Completar ciclo",
                    borderColor: colors.primary,
                    borderWidth: 2,
                    bgColor: colors.backgroundDark,
                    textColor: colors.textLight,
                    connectionText: "Los parámetros optimizados realimentan las operaciones, asegurando la evolución y el rendimiento sostenible.",
                    target: "operations",
                    arrowColor: colors.primary
                }
            ]
        }
    }
};
